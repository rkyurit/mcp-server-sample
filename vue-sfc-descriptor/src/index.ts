import path from "path";
import {
  parseVueComponent,
  printComponentInfo,
  scanComponentsDirectory,
  printComponentsList,
  printComponentInfoAsJson,
  printComponentsListAsJson,
} from "./parse";

async function main() {
  // コマンドライン引数を取得
  const [, , command, target, format] = process.argv;
  const outputJson = format === "--json";

  if (!command) {
    printUsage();
    process.exit(1);
  }

  try {
    switch (command) {
      case "parse":
        // 単一のVueファイルをパース
        if (!target) {
          console.error("Vueファイルのパスを指定してください。");
          printUsage();
          process.exit(1);
        }

        const absoluteFilePath = path.resolve(process.cwd(), target);
        const info = await parseVueComponent(absoluteFilePath);

        if (outputJson) {
          printComponentInfoAsJson(info);
        } else {
          printComponentInfo(info);
        }
        break;

      case "scan":
        // ディレクトリ内のVueファイルを走査
        if (!target) {
          console.error("ディレクトリパスを指定してください。");
          printUsage();
          process.exit(1);
        }

        const absoluteDirPath = path.resolve(process.cwd(), target);
        const components = await scanComponentsDirectory(absoluteDirPath);

        if (outputJson) {
          printComponentsListAsJson(components);
        } else {
          printComponentsList(components);
        }
        break;

      default:
        console.error(`不明なコマンド: ${command}`);
        printUsage();
        process.exit(1);
    }
  } catch (error) {
    console.error("エラーが発生しました:", error);
    process.exit(1);
  }
}

/**
 * 使用方法を表示
 */
function printUsage(): void {
  console.log("使用方法:");
  console.log(
    "  node dist/index.js parse <Vueファイルのパス> [--json]   - 単一のVueファイルを解析"
  );
  console.log(
    "  node dist/index.js scan <ディレクトリのパス> [--json]   - ディレクトリ内のVueファイルを一覧表示"
  );
  console.log("");
  console.log("オプション:");
  console.log("  --json  結果をJSON形式で出力");
}

// エントリーポイント
main();
