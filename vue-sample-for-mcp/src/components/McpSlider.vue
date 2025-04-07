<script setup lang="ts">
/**
 * スライダー入力コンポーネント
 */

/**
 * プロパティ
 */
interface McpSliderProps {
  /** モデルの値 */
  modelValue: number;
  /** 最小値 */
  min?: number;
  /** 最大値 */
  max?: number;
  /** ステップ */
  step?: number;
  /** ラベル */
  label?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 値の表示 */
  showValue?: boolean;
  /** 目盛りの表示 */
  showTicks?: boolean;
  /** カスタム目盛り */
  ticks?: number[];
}

const props = defineProps<McpSliderProps>();

/**
 * イベント
 */
interface McpSliderEmits {
  /** モデルの更新 */
  "update:modelValue": [value: number];
}

const emit = defineEmits<McpSliderEmits>();

import { computed, ref } from "vue";

// デフォルト値の設定
const min = computed(() => props.min ?? 0);
const max = computed(() => props.max ?? 100);
const step = computed(() => props.step ?? 1);

/**
 * 変更イベントハンドラ
 */
const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", Number(target.value));
};

/**
 * スライダーの進捗率を計算（スタイル用）
 */
const progressStyle = computed(() => {
  const percentage =
    ((props.modelValue - min.value) / (max.value - min.value)) * 100;
  return {
    background: `linear-gradient(to right, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%)`,
  };
});

/**
 * 表示する目盛り
 */
const displayTicks = computed(() => {
  if (props.ticks) return props.ticks;

  if (!props.showTicks) return [];

  const ticks = [];
  const totalSteps = (max.value - min.value) / step.value;

  // 数が多すぎる場合は間引く
  if (totalSteps > 20) {
    const interval = Math.ceil(totalSteps / 10);
    for (let i = min.value; i <= max.value; i += step.value * interval) {
      ticks.push(i);
    }
  } else {
    for (let i = min.value; i <= max.value; i += step.value) {
      ticks.push(i);
    }
  }

  // 最大値が含まれていない場合は追加
  if (!ticks.includes(max.value)) {
    ticks.push(max.value);
  }

  return ticks;
});

/**
 * 目盛りの位置をパーセントで計算
 */
const getTickPosition = (tick: number) => {
  return ((tick - min.value) / (max.value - min.value)) * 100;
};
</script>

<template>
  <div class="w-full">
    <!-- ラベルと現在値 -->
    <div v-if="label || showValue" class="flex justify-between mb-2">
      <label v-if="label" class="text-sm font-medium text-gray-700">{{
        label
      }}</label>
      <span v-if="showValue" class="text-sm font-medium text-gray-700">{{
        modelValue
      }}</span>
    </div>

    <!-- スライダー -->
    <div class="relative">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :disabled="disabled"
        @input="onChange"
        class="w-full h-2 rounded-lg appearance-none cursor-pointer"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
        :style="progressStyle"
      />

      <!-- 目盛り -->
      <div
        v-if="showTicks && displayTicks.length > 0"
        class="relative w-full h-6 mt-1"
      >
        <div
          v-for="tick in displayTicks"
          :key="tick"
          class="absolute transform -translate-x-1/2 flex flex-col items-center"
          :style="{ left: `${getTickPosition(tick)}%` }"
        >
          <div class="w-1 h-2 bg-gray-300"></div>
          <span class="mt-1 text-xs text-gray-500">{{ tick }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

input[type="range"]:disabled::-webkit-slider-thumb {
  background: #9ca3af;
}

input[type="range"]:disabled::-moz-range-thumb {
  background: #9ca3af;
}
</style>
