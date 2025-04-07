<script setup lang="ts">
/**
 * ツールチップコンポーネント
 */

/**
 * プロパティ
 */
interface McpTooltipProps {
  /** ツールチップの内容 */
  content: string;
  /** ツールチップの位置（top, right, bottom, left） */
  placement?: "top" | "right" | "bottom" | "left";
  /** 表示トリガー（hover, click, focus） */
  trigger?: "hover" | "click" | "focus";
  /** 表示ディレイ（ミリ秒） */
  delay?: number;
  /** 表示状態 */
  visible?: boolean;
  /** 自動的に閉じる（ミリ秒） */
  duration?: number;
  /** 最大幅 */
  maxWidth?: string | number;
  /** ツールチップの種類（default, dark, light, primary） */
  theme?: "default" | "dark" | "light" | "primary";
  /** 矢印の表示 */
  arrow?: boolean;
  /** 矢印のサイズ */
  arrowSize?: string | number;
  /** オフセット */
  offset?: number;
  /** z-index */
  zIndex?: number;
}

const props = defineProps<McpTooltipProps>();

/**
 * イベント
 */
interface McpTooltipEmits {
  /** 表示状態の更新 */
  "update:visible": [value: boolean];
  /** 表示イベント */
  show: [];
  /** 非表示イベント */
  hide: [];
}

const emit = defineEmits<McpTooltipEmits>();

import { ref, watch, onMounted, onBeforeUnmount } from "vue";

// ツールチップの表示状態
const isVisible = ref(props.visible || false);

// propsの変更を監視
watch(
  () => props.visible,
  (newValue) => {
    if (newValue !== undefined) {
      isVisible.value = newValue;
    }
  }
);

// 表示/非表示の変更を監視して親に通知
watch(isVisible, (newValue) => {
  emit("update:visible", newValue);
  if (newValue) {
    emit("show");

    // 自動的に閉じる設定がある場合
    if (props.duration) {
      setTimeout(() => {
        hideTooltip();
      }, props.duration);
    }
  } else {
    emit("hide");
  }
});

// 各種タイマー
let showTimer: number | null = null;
let hideTimer: number | null = null;

/**
 * ツールチップを表示
 */
const showTooltip = () => {
  clearTimeout(hideTimer!);

  if (props.delay) {
    showTimer = window.setTimeout(() => {
      isVisible.value = true;
    }, props.delay);
  } else {
    isVisible.value = true;
  }
};

/**
 * ツールチップを非表示
 */
const hideTooltip = () => {
  clearTimeout(showTimer!);

  hideTimer = window.setTimeout(() => {
    isVisible.value = false;
  }, 50); // わずかな遅延で誤操作を防止
};

/**
 * クリックで表示切替
 */
const toggleTooltip = () => {
  if (isVisible.value) {
    hideTooltip();
  } else {
    showTooltip();
  }
};

// コンポーネント破棄前にタイマーをクリア
onBeforeUnmount(() => {
  if (showTimer) clearTimeout(showTimer);
  if (hideTimer) clearTimeout(hideTimer);
});
</script>

<template>
  <div>McpTooltip</div>
</template>
