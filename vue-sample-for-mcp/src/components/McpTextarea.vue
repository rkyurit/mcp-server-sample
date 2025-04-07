<script setup lang="ts">
/**
 * 複数行テキスト入力フィールド
 */

/**
 * プロパティ
 */
interface McpTextareaProps {
  /** モデルの値 */
  modelValue: string;
  /** プレースホルダー */
  placeholder?: string;
  /** 行数 */
  rows?: number;
  /** 自動リサイズ */
  autoResize?: boolean;
  /** 最大入力文字数 */
  maxLength?: number;
}

const props = defineProps<McpTextareaProps>();

/**
 * イベント
 */
interface McpTextareaEmits {
  /** モデルの更新 */
  "update:modelValue": [value: string];
}

const emit = defineEmits<McpTextareaEmits>();

/**
 * 入力イベントハンドラ
 */
const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);

  // 自動リサイズの処理
  if (props.autoResize) {
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  }
};
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows || 3"
    :maxlength="maxLength"
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    @input="onInput"
  ></textarea>
</template>
