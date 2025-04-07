<script setup lang="ts">
/**
 * プログレスコンポーネント
 */

/**
 * プロパティ
 */
interface McpProgressProps {
  /** 進捗値（0-100） */
  value: number;
  /** プログレスの種類（bar, circle, linear） */
  type?: "bar" | "circle" | "linear";
  /** プログレスのカラータイプ */
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  /** カスタムカラー（HEX、RGB、RGBA） */
  customColor?: string;
  /** サイズ（sm, md, lg） */
  size?: "sm" | "md" | "lg";
  /** トラックカラー（背景色） */
  trackColor?: string;
  /** ラベルテキスト */
  label?: string;
  /** 値のテキスト表示（円形プログレスのみ） */
  showValue?: boolean;
  /** 値の表示フォーマット */
  valueFormat?: (value: number) => string;
  /** アニメーション時間（ミリ秒） */
  duration?: number;
  /** ストライプデザイン（バープログレスのみ） */
  striped?: boolean;
  /** アニメーションするストライプ（バープログレスのみ） */
  animatedStripes?: boolean;
  /** 幅（px, %, vw） */
  width?: string | number;
  /** 高さ（px, %） - バープログレスのみ */
  height?: string | number;
  /** 丸み（バープログレスのみ） */
  rounded?: boolean | string;
  /** 太さ（円形プログレスのみ） */
  thickness?: string | number;
  /** 無限ローディング表示 */
  indeterminate?: boolean;
  /** バッファー値（二段階のプログレス表示） */
  buffer?: number;
}

const props = defineProps<McpProgressProps>();

/**
 * イベント
 */
interface McpProgressEmits {
  /** 完了イベント */
  complete: [];
  /** 進捗更新イベント */
  update: [value: number];
}

const emit = defineEmits<McpProgressEmits>();

import { ref, computed, watch, onMounted } from "vue";

// アニメーションの現在値
const currentValue = ref(0);

// 進捗完了状態
const isComplete = computed(() => currentValue.value >= 100);

// 表示する進捗値テキスト
const displayValue = computed(() => {
  if (typeof props.valueFormat === "function") {
    return props.valueFormat(currentValue.value);
  }
  return `${Math.round(currentValue.value)}%`;
});

// バープログレスのスタイル
const progressBarStyle = computed(() => {
  return {
    width: `${currentValue.value}%`,
  };
});

// 円形プログレスの計算
const circleRadius = computed(() => 42); // 固定半径
const circleCircumference = computed(() => 2 * Math.PI * circleRadius.value);
const circleStrokeDashoffset = computed(() => {
  return (
    circleCircumference.value -
    (currentValue.value / 100) * circleCircumference.value
  );
});

// バッファーのスタイル
const bufferStyle = computed(() => {
  return {
    width: `${props.buffer || 0}%`,
  };
});

// 値の変更を監視してアニメーション
watch(
  () => props.value,
  (newValue) => {
    animateProgress(newValue);
  }
);

// 完了状態を監視してイベント発火
watch(isComplete, (newValue) => {
  if (newValue) {
    emit("complete");
  }
});

/**
 * 進捗値をアニメーション
 */
const animateProgress = (targetValue: number) => {
  const start = currentValue.value;
  const end = Math.min(100, Math.max(0, targetValue)); // 0-100の範囲に制限
  const duration = props.duration || 300;
  const startTime = performance.now();

  const animate = (time: number) => {
    const elapsedTime = time - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    // イージング関数（ease-out）
    const easedProgress = 1 - Math.pow(1 - progress, 2);

    // 値の更新
    currentValue.value = start + easedProgress * (end - start);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      currentValue.value = end;
      emit("update", end);
    }
  };

  requestAnimationFrame(animate);
};

// 初期値の設定
onMounted(() => {
  // 初期値が0以外の場合はアニメーション
  if (props.value > 0) {
    animateProgress(props.value);
  }
});
</script>

<template>
  <div>McpProgress</div>
</template>
