<script setup lang="ts">
/**
 * バッジコンポーネント
 */

/**
 * プロパティ
 */
interface McpBadgeProps {
  /** バッジの値（数値や文字列） */
  value?: string | number;
  /** 最大表示値（数値が大きい場合は{max}+と表示） */
  max?: number;
  /** バッジの種類（primary, secondary, success, warning, error, info） */
  type?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  /** ドット表示（値の代わりに丸い点を表示） */
  dot?: boolean;
  /** 非表示（valueが0または空の場合） */
  hidden?: boolean;
  /** バッジの位置（top-right, top-left, bottom-right, bottom-left） */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** バッジのサイズ（sm, md, lg） */
  size?: "sm" | "md" | "lg";
  /** 独立して表示（子要素なしでバッジのみ表示） */
  standalone?: boolean;
}

const props = defineProps<McpBadgeProps>();

import { computed } from "vue";

/**
 * 表示する値を計算
 */
const displayValue = computed(() => {
  if (props.dot) return "";

  if (
    typeof props.value === "number" &&
    props.max !== undefined &&
    props.value > props.max
  ) {
    return `${props.max}+`;
  }

  return props.value;
});

/**
 * バッジを表示するかどうか
 */
const shouldShow = computed(() => {
  if (props.hidden) return false;

  if (props.dot) return true;

  if (
    props.value === 0 ||
    props.value === "0" ||
    props.value === "" ||
    props.value === null ||
    props.value === undefined
  ) {
    return false;
  }

  return true;
});
</script>

<template>
  <div>McpBadge</div>
</template>
