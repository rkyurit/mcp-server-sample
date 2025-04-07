<script setup lang="ts">
/**
 * アイコン付きボタンコンポーネント
 */

/**
 * プロパティ
 */
interface McpIconButtonProps {
  /** アイコン名（SVGアイコン名、またはコンポーネント参照） */
  icon: string | object;
  /** ボタンの種類（primary, secondary, tertiary, text, danger） */
  variant?: "primary" | "secondary" | "tertiary" | "text" | "danger";
  /** ボタンのサイズ（sm, md, lg） */
  size?: "sm" | "md" | "lg";
  /** 角丸の大きさ（none, sm, md, lg, full） */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  /** 無効状態 */
  disabled?: boolean;
  /** 読み込み中状態 */
  loading?: boolean;
  /** アクセシビリティ用ラベル */
  ariaLabel?: string;
  /** HTMLボタンタイプ */
  type?: "button" | "submit" | "reset";
  /** リンクとして機能する場合のURL */
  href?: string;
  /** リンクの開き方 */
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const props = defineProps<McpIconButtonProps>();

/**
 * イベント
 */
interface McpIconButtonEmits {
  /** クリックイベント */
  click: [event: MouseEvent];
}

const emit = defineEmits<McpIconButtonEmits>();

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
  <div>McpIconButton</div>
</template>
