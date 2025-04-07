<script setup lang="ts">
/**
 * アラートメッセージコンポーネント
 */

/**
 * プロパティ
 */
interface McpAlertProps {
  /** アラートタイプ（info, success, warning, error） */
  type?: "info" | "success" | "warning" | "error";
  /** タイトル */
  title?: string;
  /** メッセージ */
  message: string;
  /** アイコンの表示 */
  showIcon?: boolean;
  /** 閉じるボタンの表示 */
  closable?: boolean;
  /** アラートの表示状態 */
  visible?: boolean;
  /** 自動的に閉じる（ミリ秒） */
  autoClose?: number | boolean;
  /** アラートのアクション（ボタンなど） */
  actions?: boolean;
  /** ボーダーの表示位置（left, top, right, bottom, none） */
  border?: "left" | "top" | "right" | "bottom" | "none";
}

const props = defineProps<McpAlertProps>();

/**
 * イベント
 */
interface McpAlertEmits {
  /** 表示状態の更新 */
  "update:visible": [value: boolean];
  /** 閉じるイベント */
  close: [];
}

const emit = defineEmits<McpAlertEmits>();

import { ref, onMounted, onBeforeUnmount, watch } from "vue";

// アラートの表示状態
const isVisible = ref(props.visible !== false);

// propsの変更を監視
watch(
  () => props.visible,
  (newValue) => {
    if (newValue !== undefined) {
      isVisible.value = newValue;
    }
  }
);

// 自動クローズのタイマー
let autoCloseTimer: number | null = null;

/**
 * アラートを閉じる
 */
const close = () => {
  isVisible.value = false;
  emit("update:visible", false);
  emit("close");
  clearAutoCloseTimer();
};

/**
 * 自動クローズのタイマーをセット
 */
const setAutoCloseTimer = () => {
  if (props.autoClose) {
    const timeout =
      typeof props.autoClose === "boolean" ? 5000 : props.autoClose;
    autoCloseTimer = window.setTimeout(() => {
      close();
    }, timeout);
  }
};

/**
 * 自動クローズのタイマーをクリア
 */
const clearAutoCloseTimer = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = null;
  }
};

// コンポーネントマウント時にタイマーをセット
onMounted(() => {
  if (isVisible.value) {
    setAutoCloseTimer();
  }
});

// コンポーネント破棄前にタイマーをクリア
onBeforeUnmount(() => {
  clearAutoCloseTimer();
});
</script>

<template>
  <div>McpAlert</div>
</template>
