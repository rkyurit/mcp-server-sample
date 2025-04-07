<script setup lang="ts">
/**
 * トースト通知コンポーネント
 */

/**
 * プロパティ
 */
interface McpToastProps {
  /** トーストのタイプ（info, success, warning, error） */
  type?: "info" | "success" | "warning" | "error";
  /** タイトル */
  title?: string;
  /** メッセージ */
  message: string;
  /** アイコンの表示 */
  showIcon?: boolean;
  /** 閉じるボタンの表示 */
  closable?: boolean;
  /** トーストの表示状態 */
  visible?: boolean;
  /** 自動的に閉じる（ミリ秒） */
  duration?: number;
  /** トーストの位置（top-right, top-left, bottom-right, bottom-left, top-center, bottom-center） */
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  /** アクションのテキスト */
  actionText?: string;
  /** プログレスバーの表示 */
  showProgress?: boolean;
}

const props = defineProps<McpToastProps>();

/**
 * イベント
 */
interface McpToastEmits {
  /** 表示状態の更新 */
  "update:visible": [value: boolean];
  /** 閉じるイベント */
  close: [];
  /** アクションクリックイベント */
  action: [];
}

const emit = defineEmits<McpToastEmits>();

import { ref, onMounted, onBeforeUnmount, watch } from "vue";

// トーストの表示状態
const isVisible = ref(props.visible !== false);

// 経過時間（進捗表示用）
const elapsedTime = ref(0);
const interval = ref<number | null>(null);

// 表示状態の監視
watch(
  () => props.visible,
  (newValue) => {
    if (newValue !== undefined) {
      isVisible.value = newValue;
      if (newValue) {
        startTimer();
      } else {
        stopTimer();
      }
    }
  }
);

// 自動クローズのタイマー
let autoCloseTimer: number | null = null;

/**
 * トーストを閉じる
 */
const close = () => {
  isVisible.value = false;
  emit("update:visible", false);
  emit("close");
  clearAutoCloseTimer();
  stopTimer();
};

/**
 * アクションを実行
 */
const handleAction = () => {
  emit("action");
  close();
};

/**
 * 自動クローズのタイマーをセット
 */
const setAutoCloseTimer = () => {
  const duration = props.duration ?? 5000;
  if (duration > 0) {
    autoCloseTimer = window.setTimeout(() => {
      close();
    }, duration);
  }
};

/**
 * 自動クローズのタイマーをクリア
 */
const clearAutoCloseTimer = () => {
  if (autoCloseTimer !== null) {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = null;
  }
};

/**
 * 進捗タイマーを開始
 */
const startTimer = () => {
  if (props.showProgress && props.duration) {
    elapsedTime.value = 0;
    stopTimer();

    interval.value = window.setInterval(() => {
      elapsedTime.value += 10;
      if (elapsedTime.value >= props.duration!) {
        stopTimer();
      }
    }, 10);
  }
};

/**
 * 進捗タイマーを停止
 */
const stopTimer = () => {
  if (interval.value !== null) {
    clearInterval(interval.value);
    interval.value = null;
  }
};

// コンポーネントマウント時にタイマーをセット
onMounted(() => {
  if (isVisible.value) {
    setAutoCloseTimer();
    startTimer();
  }
});

// コンポーネント破棄前にタイマーをクリア
onBeforeUnmount(() => {
  clearAutoCloseTimer();
  stopTimer();
});
</script>

<template>
  <div>McpToast</div>
</template>
