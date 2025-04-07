<script setup lang="ts">
/**
 * ドロップダウン選択コンポーネント
 */

/**
 * オプションの型定義
 */
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

/**
 * プロパティ
 */
interface McpSelectProps {
  /** モデルの値 */
  modelValue: string | number;
  /** 選択肢のリスト */
  options: SelectOption[];
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
}

const props = defineProps<McpSelectProps>();

/**
 * イベント
 */
interface McpSelectEmits {
  /** モデルの更新 */
  "update:modelValue": [value: string | number];
}

const emit = defineEmits<McpSelectEmits>();

/**
 * 変更イベントハンドラ
 */
const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="w-full">
    <select
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      class="block w-full px-3 py-2 text-base border rounded-md appearance-none focus:outline-none focus:ring-2 focus:shadow-sm"
      :class="{
        'border-red-500 focus:border-red-500 focus:ring-red-500': error,
        'border-gray-300 focus:border-blue-500 focus:ring-blue-500': !error,
        'bg-gray-100 opacity-75 cursor-not-allowed': disabled,
        'bg-white': !disabled,
      }"
      @change="onChange"
    >
      <option v-if="placeholder" value="" disabled selected hidden>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="error && errorMessage" class="mt-1 text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </div>
</template>
