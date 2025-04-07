<script setup lang="ts">
/**
 * ラジオボタンコンポーネント
 */

/**
 * プロパティ
 */
interface McpRadioProps {
  /** モデルの値 */
  modelValue: string | number | boolean;
  /** 選択肢の値 */
  value: string | number | boolean;
  /** ラベル */
  label?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 名前（グループ化用） */
  name?: string;
}

const props = defineProps<McpRadioProps>();

/**
 * イベント
 */
interface McpRadioEmits {
  /** モデルの更新 */
  "update:modelValue": [value: string | number | boolean];
}

const emit = defineEmits<McpRadioEmits>();

/**
 * 変更イベントハンドラ
 */
const onChange = () => {
  emit("update:modelValue", props.value);
};
</script>

<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="radio"
      :checked="modelValue === value"
      :value="value"
      :name="name"
      :disabled="disabled"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
      @change="onChange"
    />
    <span
      v-if="label"
      class="ml-2 text-sm font-medium"
      :class="{ 'text-gray-400': disabled, 'text-gray-900': !disabled }"
    >
      {{ label }}
    </span>
  </label>
</template>
