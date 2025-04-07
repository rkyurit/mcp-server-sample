import fs from "fs";
import path from "path";

/**
 * Vue SFCファイルから抽出した情報を格納する型
 */
interface ComponentInfo {
  /** コンポーネントの役割説明 */
  description: string;
  /** コンポーネントのProps定義 */
  props: {
    /** プロパティ名 */
    name: string;
    /** 型情報 */
    type: string;
    /** 必須かどうか */
    required: boolean;
    /** 説明文 */
    description: string;
  }[];
  /** コンポーネントのEmits定義 */
  emits: {
    /** イベント名 */
    name: string;
    /** イベントの型情報 */
    params: string;
    /** 説明文 */
    description: string;
  }[];
}

/**
 * 単一のVueコンポーネント情報を表す型
 */
interface ComponentSummary {
  /** コンポーネント名 */
  name: string;
  /** ファイルパス */
  filePath: string;
  /** コンポーネントの説明 */
  description: string;
}

/**
 * Vueファイルのパスからコンポーネント情報を抽出する
 * @param filePath Vueファイルのパス
 * @returns コンポーネント情報
 */
export async function parseVueComponent(
  filePath: string
): Promise<ComponentInfo> {
  // ファイルを読み込む
  const content = await fs.promises.readFile(filePath, "utf-8");

  // デフォルトの結果オブジェクト
  const result: ComponentInfo = {
    description: "",
    props: [],
    emits: [],
  };

  // scriptタグの内容を抽出
  const scriptContent = extractScriptContent(content);
  if (!scriptContent) {
    return result;
  }

  // コンポーネントの説明を抽出
  result.description = extractComponentDescription(scriptContent);

  // コンポーネント名を取得 (ファイル名から)
  const componentName = path.basename(filePath, ".vue");

  // Propsを抽出
  result.props = extractProps(scriptContent, componentName);

  // Emitsを抽出
  result.emits = extractEmits(scriptContent, componentName);

  return result;
}

/**
 * scriptタグの内容を抽出する
 * @param content vueファイルの内容
 * @returns scriptタグの内容
 */
function extractScriptContent(content: string): string | null {
  const scriptTagMatch = content.match(/<script.*?>([\s\S]*?)<\/script>/);
  return scriptTagMatch ? scriptTagMatch[1] : null;
}

/**
 * コンポーネントの説明を抽出する
 * @param scriptContent scriptタグの内容
 * @returns コンポーネントの説明
 */
function extractComponentDescription(scriptContent: string): string {
  // scriptタグの直下にある最初のコメントブロックを探す
  const commentMatch = scriptContent.trim().match(/^\/\*\*([\s\S]*?)\*\//);
  if (commentMatch) {
    // コメント内容を行ごとに分割し、アスタリスクと余分な空白を削除
    return commentMatch[1]
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, ""))
      .filter((line) => line.trim())
      .join("\n")
      .trim();
  }
  return "";
}

/**
 * Propsの定義を抽出する
 * @param scriptContent scriptタグの内容
 * @param componentName コンポーネント名
 * @returns Props情報の配列
 */
function extractProps(
  scriptContent: string,
  componentName: string
): ComponentInfo["props"] {
  const propsArray: ComponentInfo["props"] = [];

  // コンポーネント名Propsというインターフェースを探す
  const interfaceRegex = new RegExp(
    `interface\\s+${componentName}Props\\s*{([\\s\\S]*?)}`
  );
  const interfaceMatch = scriptContent.match(interfaceRegex);

  if (!interfaceMatch) {
    return propsArray;
  }

  // インターフェースの内容を取得
  const interfaceContent = interfaceMatch[1];

  // プロパティごとに処理
  const propRegex =
    /\/\*\*\s*([\s\S]*?)\s*\*\/\s*([a-zA-Z0-9_]+)(\??):\s*([^;]*);/g;
  let match;

  while ((match = propRegex.exec(interfaceContent)) !== null) {
    const description = match[1]
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, ""))
      .filter((line) => line.trim())
      .join("\n")
      .trim();

    const name = match[2];
    const required = match[3] !== "?";
    const type = match[4].trim();

    propsArray.push({
      name,
      type,
      required,
      description,
    });
  }

  return propsArray;
}

/**
 * Emitsの定義を抽出する
 * @param scriptContent scriptタグの内容
 * @param componentName コンポーネント名
 * @returns Emits情報の配列
 */
function extractEmits(
  scriptContent: string,
  componentName: string
): ComponentInfo["emits"] {
  const emitsArray: ComponentInfo["emits"] = [];

  // コンポーネント名Emitsというインターフェースを探す
  const interfaceRegex = new RegExp(
    `interface\\s+${componentName}Emits\\s*{([\\s\\S]*?)}`
  );
  const interfaceMatch = scriptContent.match(interfaceRegex);

  if (!interfaceMatch) {
    return emitsArray;
  }

  // インターフェースの内容を取得
  const interfaceContent = interfaceMatch[1];

  // イベントごとに処理
  const emitRegex =
    /\/\*\*\s*([\s\S]*?)\s*\*\/\s*([a-zA-Z0-9_]+):\s*\[([^\]]*)\];/g;
  let match;

  while ((match = emitRegex.exec(interfaceContent)) !== null) {
    const description = match[1]
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, ""))
      .filter((line) => line.trim())
      .join("\n")
      .trim();

    const name = match[2];
    const params = match[3].trim();

    emitsArray.push({
      name,
      params,
      description,
    });
  }

  return emitsArray;
}

/**
 * 指定されたディレクトリ内のすべてのVueコンポーネントを再帰的に走査し、
 * 各コンポーネントの名前と説明を取得する
 *
 * @param directoryPath 走査対象のディレクトリパス
 * @returns コンポーネント情報の配列
 */
export async function scanComponentsDirectory(
  directoryPath: string
): Promise<ComponentSummary[]> {
  const components: ComponentSummary[] = [];

  // ディレクトリ内のファイルとサブディレクトリを再帰的に走査する関数
  async function scanDirectory(dirPath: string): Promise<void> {
    // ディレクトリ内のエントリを取得
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

    // 各エントリに対して処理
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // サブディレクトリを再帰的に走査
        await scanDirectory(entryPath);
      } else if (entry.isFile() && entry.name.endsWith(".vue")) {
        // Vueファイルをパース
        try {
          const info = await parseVueComponent(entryPath);
          const componentName = path.basename(entry.name, ".vue");

          components.push({
            name: componentName,
            filePath: entryPath,
            description: info.description,
          });
        } catch (error) {
          console.error(
            `コンポーネント '${entryPath}' の解析中にエラーが発生しました:`,
            error
          );
        }
      }
    }
  }

  // 走査開始
  await scanDirectory(directoryPath);

  // 名前順にソート
  return components.sort((a, b) => a.name.localeCompare(b.name));
}
