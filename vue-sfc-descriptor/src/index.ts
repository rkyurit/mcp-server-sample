import path from "path";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "fs";
import dotenv from "dotenv";
import { parseVueComponent, scanComponentsDirectory } from "./parse";

// 環境変数の読み込み
dotenv.config();

// コンポーネントディレクトリのパスを取得
const COMPONENTS_DIR = process.env.COMPONENTS_DIR || "sample";

// MCPサーバーの設定
const server = new McpServer({
  name: "vue-sfc-descriptor-mcp-server",
  version: "1.0.0",
});

// 単一コンポーネント解析ツール
server.tool(
  "get-component",
  "Vue単一ファイルコンポーネント(SFC)ファイルを解析し、コンポーネントの情報（役割、Props、Emits）を取得します",
  {
    fileName: z
      .string()
      .describe("解析するVueコンポーネントのファイル名（.vueは省略可）"),
  },
  async ({ fileName }) => {
    try {
      // ファイル名に .vue が含まれていない場合は追加
      const componentFileName = fileName.endsWith(".vue")
        ? fileName
        : `${fileName}.vue`;

      // コンポーネントディレクトリからファイルのフルパスを生成
      const absoluteFilePath = path.resolve(
        process.cwd(),
        COMPONENTS_DIR,
        componentFileName
      );

      // ファイルが存在するか確認
      if (!fs.existsSync(absoluteFilePath)) {
        return {
          content: [
            {
              type: "text",
              text: `エラー: ファイル '${componentFileName}' が見つかりません。指定されたパス: ${absoluteFilePath}`,
            },
          ],
        };
      }

      const info = await parseVueComponent(absoluteFilePath);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(info, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `エラーが発生しました: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  }
);

// ディレクトリスキャンツール（パラメータなし、環境変数のディレクトリのみを使用）
server.tool(
  "list-components",
  "環境変数で指定されたディレクトリ内のVueコンポーネントを再帰的に走査し、コンポーネント一覧を取得します",
  {},
  async () => {
    try {
      const absoluteDirPath = path.resolve(process.cwd(), COMPONENTS_DIR);

      // ディレクトリが存在するか確認
      if (!fs.existsSync(absoluteDirPath)) {
        return {
          content: [
            {
              type: "text",
              text: `エラー: ディレクトリ '${COMPONENTS_DIR}' が見つかりません。指定されたパス: ${absoluteDirPath}`,
            },
          ],
        };
      }

      const components = await scanComponentsDirectory(absoluteDirPath);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(components, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `エラーが発生しました: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  }
);

/**
 * メイン関数 - MCPサーバーを起動
 */
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(
      `Vue SFC Descriptor MCP Server 実行中 - ${new Date().toLocaleString()}`
    );
    console.error(`コンポーネントディレクトリ: ${COMPONENTS_DIR}`);
  } catch (error) {
    console.error("MCPサーバーの起動中にエラーが発生しました:", error);
    process.exit(1);
  }
}

// プログラム実行
if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });
}
