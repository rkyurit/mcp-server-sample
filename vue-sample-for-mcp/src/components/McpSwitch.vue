<script setup lang="ts">
/**
 * トグルスイッチコンポーネント
 */

/**
 * プロパティ
 */
interface McpSwitchProps {
  /** モデルの値 */
  modelValue: boolean;
  /** ラベル */
  label?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** ラベル位置（left/right） */
  labelPosition?: "left" | "right";
  /** サイズ（sm/md/lg） */
  size?: "sm" | "md" | "lg";
}

const props = defineProps<McpSwitchProps>();

/**
 * イベント
 */
interface McpSwitchEmits {
  /** モデルの更新 */
  "update:modelValue": [value: boolean];
}

const emit = defineEmits<McpSwitchEmits>();

/**
 * クリックイベントハンドラ
 */
const onClick = () => {
  if (!props.disabled) {
    emit("update:modelValue", !props.modelValue);
  }
};

/**
 * サイズに基づくクラス
 */
const sizeClasses = {
  sm: { track: "w-8 h-4", thumb: "w-3 h-3", translate: "translate-x-4" },
  md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5" },
  lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7" },
};

const size = props.size || "md";
const trackClass = sizeClasses[size].track;
const thumbClass = sizeClasses[size].thumb;
const translateClass = sizeClasses[size].translate;
</script>

<template>
  <div class="flex items-center">
    <label
      v-if="label && labelPosition === 'left'"
      class="mr-2 text-sm font-medium"
      :class="{ 'text-gray-400': disabled, 'text-gray-900': !disabled }"
    >
      {{ label }}
    </label>
    <button
      type="button"
      :aria-pressed="modelValue"
      :disabled="disabled"
      class="relative inline-flex flex-shrink-0 cursor-pointer items-center border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      :class="[
        trackClass,
        modelValue ? 'bg-blue-600' : 'bg-gray-200',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ]"
      @click="onClick"
    >
      <span class="sr-only">{{ label }}</span>
      <span
        aria-hidden="true"
        class="pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        :class="[thumbClass, modelValue ? translateClass : 'translate-x-0']"
      ></span>
    </button>
    <label
      v-if="label && (!labelPosition || labelPosition === 'right')"
      class="ml-2 text-sm font-medium"
      :class="{ 'text-gray-400': disabled, 'text-gray-900': !disabled }"
    >
      {{ label }}
    </label>
  </div>
</template>
