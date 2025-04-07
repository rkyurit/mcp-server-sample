# Vue SFC Descriptor

指定したディレクトリに存在する Vue コンポーネントのファイル名や Props/Emits などを取得する。

## インストール

```bash
cd vue-sfc-descriptor
npm install

# 環境設定
cp .env.sample .env
# .env ファイルを編集してコンポーネントディレクトリを設定
# COMPONENTS_DIR=sample

# ビルド
npm run build
```

## 動作確認

```
npx @modelcontextprotocol/inspector node ./build/index.js
```

## 提供されるツール

1. **get-component**: 指定した Vue コンポーネントの情報を取得

   - パラメータ: `fileName` - Vue コンポーネントのファイル名（.vue は省略可）
   - 環境変数で指定されたディレクトリから自動的にコンポーネントを検索します

2. **list-components**: ディレクトリ内の Vue コンポーネントの一覧を取得
   - パラメータ: なし（環境変数 `COMPONENTS_DIR` で指定されたディレクトリを使用）

## 解析する Vue コンポーネントの規約

- **コンポーネントの役割**: スクリプトタグ直下のコメントに記述された説明
- **Props**: `コンポーネント名Props` というインターフェースで定義されたプロパティ情報
- **Emits**: `コンポーネント名Emits` というインターフェースで定義されたイベント情報
