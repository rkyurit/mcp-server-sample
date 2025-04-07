<script setup lang="ts">
/**
 * 汎用ボタンコンポーネント
 */

/**
 * プロパティ
 */
interface McpButtonProps {
  /** ボタンの種類（primary, secondary, tertiary, text, danger） */
  variant?: "primary" | "secondary" | "tertiary" | "text" | "danger";
  /** ボタンのサイズ（sm, md, lg） */
  size?: "sm" | "md" | "lg";
  /** 幅いっぱいに表示 */
  fullWidth?: boolean;
  /** 角丸の大きさ（none, sm, md, lg, full） */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  /** 無効状態 */
  disabled?: boolean;
  /** 読み込み中状態 */
  loading?: boolean;
  /** アイコンの位置（left, right） */
  iconPosition?: "left" | "right";
  /** HTMLボタンタイプ */
  type?: "button" | "submit" | "reset";
  /** リンクとして機能する場合のURL */
  href?: string;
  /** リンクの開き方 */
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const props = defineProps<McpButtonProps>();

/**
 * イベント
 */
interface McpButtonEmits {
  /** クリックイベント */
  click: [event: MouseEvent];
}

const emit = defineEmits<McpButtonEmits>();

/**
 * クリックイベントハンドラ
 */
const onClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<template>
  <div>McpButton</div>
</template>
