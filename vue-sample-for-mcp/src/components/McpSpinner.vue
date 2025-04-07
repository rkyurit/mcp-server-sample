<script setup lang="ts">
/**
 * スピナーコンポーネント
 */

/**
 * プロパティ
 */
interface McpSpinnerProps {
  /** スピナーの種類 */
  type?: "ring" | "spinner" | "dots" | "bars" | "pulse";
  /** スピナーのカラータイプ */
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  /** カスタムカラー（HEX、RGB、RGBA） */
  customColor?: string;
  /** サイズ（xs, sm, md, lg, xl） */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** カスタムサイズ（数値やCSS単位） */
  customSize?: string | number;
  /** スピナーの速度（slow, normal, fast） */
  speed?: "slow" | "normal" | "fast";
  /** カスタム速度（ミリ秒） */
  customSpeed?: number;
  /** ラベルテキスト */
  label?: string;
  /** ラベルの位置 */
  labelPosition?: "top" | "bottom" | "left" | "right";
  /** 表示/非表示 */
  visible?: boolean;
  /** フルページオーバーレイ表示 */
  fullPage?: boolean;
  /** オーバーレイの背景色 */
  overlayColor?: string;
  /** オーバーレイの透明度 */
  overlayOpacity?: number;
  /** zIndex */
  zIndex?: number;
  /** スピナーの線の太さ（ring, spinner） */
  thickness?: string | number;
}

const props = defineProps<McpSpinnerProps>();

/**
 * イベント
 */
interface McpSpinnerEmits {
  /** 表示状態の更新 */
  "update:visible": [value: boolean];
  /** 表示イベント */
  show: [];
  /** 非表示イベント */
  hide: [];
}

const emit = defineEmits<McpSpinnerEmits>();

import { ref, computed, watch, onMounted } from "vue";

// スピナーの表示状態
const isVisible = ref(props.visible !== undefined ? props.visible : true);

// スピナーのサイズ（CSS値）
const spinnerSize = computed(() => {
  if (props.customSize) {
    return typeof props.customSize === "number"
      ? `${props.customSize}px`
      : props.customSize;
  }

  // デフォルトサイズマッピング
  const sizeMap = {
    xs: "16px",
    sm: "24px",
    md: "32px",
    lg: "48px",
    xl: "64px",
  };

  return sizeMap[props.size || "md"];
});

// スピナーの線の太さ（CSS値）
const spinnerThickness = computed(() => {
  if (props.thickness) {
    return typeof props.thickness === "number"
      ? `${props.thickness}px`
      : props.thickness;
  }

  // サイズに応じた線の太さを計算
  const size = props.size || "md";
  const thicknessMap = {
    xs: "2px",
    sm: "3px",
    md: "4px",
    lg: "5px",
    xl: "6px",
  };

  return thicknessMap[size];
});

// アニメーション速度（CSS値）
const animationDuration = computed(() => {
  if (props.customSpeed) {
    return `${props.customSpeed}ms`;
  }

  // 速度マッピング
  const speedMap = {
    slow: "1500ms",
    normal: "1000ms",
    fast: "700ms",
  };

  return speedMap[props.speed || "normal"];
});

// 表示状態の変更を監視
watch(
  () => props.visible,
  (newValue) => {
    if (newValue !== undefined) {
      isVisible.value = newValue;
    }
  }
);

// 表示/非表示変更を親に通知
watch(isVisible, (newValue) => {
  emit("update:visible", newValue);
  if (newValue) {
    emit("show");
  } else {
    emit("hide");
  }
});

/**
 * スピナーを表示
 */
const showSpinner = () => {
  isVisible.value = true;
};

/**
 * スピナーを非表示
 */
const hideSpinner = () => {
  isVisible.value = false;
};

// 初期表示状態の設定
onMounted(() => {
  // 親から渡された初期状態を適用
  if (props.visible !== undefined) {
    isVisible.value = props.visible;
  }
});
</script>

<template>
  <div>McpSpinner</div>
</template>
