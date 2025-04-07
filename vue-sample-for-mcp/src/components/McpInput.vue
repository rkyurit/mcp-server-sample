<script setup lang="ts">
/**
 * テキスト入力フィールド
 */

/**
 * プロパティ
 */
interface McpInputProps {
  /** モデルの値 */
  modelValue: string;
  /** プレースホルダー */
  placeholder?: string;
}

const props = defineProps<McpInputProps>();

/**
 * イベント
 */
interface McpInputEmits {
  /** モデルの更新 */
  "update:modelValue": [value: string];
}

const emit = defineEmits<McpInputEmits>();

/**
 * 入力イベントハンドラ
 */
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    :placeholder="placeholder"
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    @input="onInput"
  />
</template>
