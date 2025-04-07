# Vue SFC Descriptor

Vue 単一ファイルコンポーネント（SFC）を解析して、コンポーネントの情報を抽出するツールです。

## インストール

```bash
npm install
npm run build
```

## 使用方法

### 単一の Vue ファイルを解析

```bash
# コマンド形式
npm run parse <Vueファイルパス> [-- --json]

# 例
npm run parse sample/McpButton.vue
npm run parse sample/McpButton.vue -- --json  # JSON形式で出力
```

### ディレクトリ内の Vue コンポーネントを一覧表示

```bash
# コマンド形式
npm run scan <ディレクトリパス> [-- --json]

# 例
npm run scan sample/
npm run scan sample/ -- --json  # JSON形式で出力
```

## 抽出される情報

- **コンポーネントの役割**: スクリプトタグ直下のコメントに記述された説明
- **Props**: `コンポーネント名Props` というインターフェースで定義されたプロパティ情報
- **Emits**: `コンポーネント名Emits` というインターフェースで定義されたイベント情報

## 出力形式

### テキスト形式 (デフォルト)

人間が読みやすい形式で情報を表示します。

### JSON 形式 (`--json`)

プログラムで処理しやすい JSON 形式で情報を出力します。他のツールとの連携やデータ処理に便利です。

## 開発

```bash
# 開発ビルド
npm run dev
```
