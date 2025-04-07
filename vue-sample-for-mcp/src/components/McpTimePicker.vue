<script setup lang="ts">
/**
 * 時間選択コンポーネント
 */

/**
 * プロパティ
 */
interface McpTimePickerProps {
  /** モデルの値（HH:MM形式の時間） */
  modelValue: string;
  /** プレースホルダー */
  placeholder?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 必須項目 */
  required?: boolean;
  /** エラー状態 */
  error?: boolean;
  /** エラーメッセージ */
  errorMessage?: string;
  /** 24時間表示 */
  use24Hours?: boolean;
  /** 時間間隔（分） */
  minuteIncrement?: number;
  /** 最小選択可能時間 */
  minTime?: string;
  /** 最大選択可能時間 */
  maxTime?: string;
}

const props = defineProps<McpTimePickerProps>();

/**
 * イベント
 */
interface McpTimePickerEmits {
  /** モデルの更新 */
  "update:modelValue": [value: string];
  /** 時間選択イベント */
  select: [value: string];
  /** 選択肢表示時イベント */
  open: [];
  /** 選択肢非表示時イベント */
  close: [];
}

const emit = defineEmits<McpTimePickerEmits>();

/**
 * 時間変更イベントハンドラ
 */
const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
  emit("select", target.value);
};
</script>

<template>
  <div>McpTimePicker</div>
</template>
