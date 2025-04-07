<script setup lang="ts">
/**
 * ファイルアップロードコンポーネント
 */

/**
 * プロパティ
 */
interface McpFileUploadProps {
  /** モデルの値（選択されたファイル配列） */
  modelValue: File[];
  /** アップロードボタンのテキスト */
  buttonText?: string;
  /** 許可するファイル形式 */
  accept?: string;
  /** 複数ファイル選択 */
  multiple?: boolean;
  /** ドラッグ&ドロップ有効 */
  dragDrop?: boolean;
  /** 最大ファイルサイズ（バイト） */
  maxSize?: number;
  /** 最大ファイル数 */
  maxFiles?: number;
  /** 自動アップロード */
  autoUpload?: boolean;
  /** アップロードURL */
  uploadUrl?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** エラー状態 */
  error?: boolean;
  /** エラーメッセージ */
  errorMessage?: string;
}

const props = defineProps<McpFileUploadProps>();

/**
 * イベント
 */
interface McpFileUploadEmits {
  /** モデルの更新 */
  "update:modelValue": [files: File[]];
  /** ファイル選択イベント */
  select: [files: File[]];
  /** アップロード開始イベント */
  "upload-start": [files: File[]];
  /** アップロード進捗イベント */
  "upload-progress": [progress: number, file: File];
  /** アップロード完了イベント */
  "upload-complete": [response: any, file: File];
  /** アップロードエラーイベント */
  "upload-error": [error: Error, file: File];
  /** ファイル削除イベント */
  remove: [file: File];
  /** エラーイベント */
  error: [message: string, file?: File];
}

const emit = defineEmits<McpFileUploadEmits>();

/**
 * ファイル選択イベントハンドラ
 */
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const files = Array.from(target.files);
    emit("update:modelValue", files);
    emit("select", files);
  }
};
</script>

<template>
  <div>McpFileUpload</div>
</template>
