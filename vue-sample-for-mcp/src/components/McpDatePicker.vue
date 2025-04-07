<script setup lang="ts">
/**
 * 日付選択コンポーネント
 */

/**
 * プロパティ
 */
interface McpDatePickerProps {
  /** モデルの値（ISO文字列形式の日付） */
  modelValue: string;
  /** 最小選択可能日付 */
  minDate?: string;
  /** 最大選択可能日付 */
  maxDate?: string;
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
  /** 日付フォーマット（表示用） */
  displayFormat?: string;
  /** ロケール */
  locale?: string;
  /** カレンダー週の開始日（0: 日曜, 1: 月曜, ...) */
  weekStart?: number;
}

const props = defineProps<McpDatePickerProps>();

/**
 * イベント
 */
interface McpDatePickerEmits {
  /** モデルの更新 */
  "update:modelValue": [value: string];
  /** 日付選択イベント */
  select: [value: string];
  /** カレンダー表示時イベント */
  open: [];
  /** カレンダー非表示時イベント */
  close: [];
}

const emit = defineEmits<McpDatePickerEmits>();

/**
 * 日付変更イベントハンドラ
 */
const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
  emit("select", target.value);
};
</script>

<template>
  <div>McpDatePicker</div>
</template>
