<script setup lang="ts">
/**
 * チェックボックスコンポーネント
 */

/**
 * プロパティ
 */
interface McpCheckboxProps {
  /** モデルの値 */
  modelValue: boolean;
  /** ラベル */
  label?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 必須項目 */
  required?: boolean;
  /** 値（複数選択用） */
  value?: string | number;
}

const props = defineProps<McpCheckboxProps>();

/**
 * イベント
 */
interface McpCheckboxEmits {
  /** モデルの更新 */
  "update:modelValue": [value: boolean];
}

const emit = defineEmits<McpCheckboxEmits>();

/**
 * 変更イベントハンドラ
 */
const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
};
</script>

<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :required="required"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      @change="onChange"
    />
    <span
      v-if="label"
      class="ml-2 text-sm font-medium"
      :class="{ 'text-gray-400': disabled, 'text-gray-900': !disabled }"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </span>
  </label>
</template>
