<script setup lang="ts">
/**
 * ドロップダウンメニューコンポーネント
 */

/**
 * メニュー項目の型定義
 */
interface MenuItem {
  id: string | number;
  label: string;
  icon?: string | object;
  disabled?: boolean;
  divider?: boolean;
  action?: () => void;
  submenu?: MenuItem[];
}

/**
 * プロパティ
 */
interface McpDropdownMenuProps {
  /** メニュー項目のリスト */
  items: MenuItem[];
  /** ドロップダウンを開くトリガーの種類（click, hover） */
  trigger?: "click" | "hover";
  /** ドロップダウンラベル（またはトリガーとして表示するテキスト） */
  label?: string;
  /** アイコン（SVGアイコン名またはコンポーネント） */
  icon?: string | object;
  /** ドロップダウンの配置（bottom-left, bottom-right, top-left, top-right） */
  placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  /** ドロップダウンの幅（自動または固定幅） */
  width?: string | number;
  /** 無効状態 */
  disabled?: boolean;
  /** メニューの開閉状態 */
  open?: boolean;
}

const props = defineProps<McpDropdownMenuProps>();

/**
 * イベント
 */
interface McpDropdownMenuEmits {
  /** 開閉状態の更新 */
  "update:open": [value: boolean];
  /** 項目選択イベント */
  select: [item: MenuItem];
  /** メニュー表示時イベント */
  open: [];
  /** メニュー非表示時イベント */
  close: [];
}

const emit = defineEmits<McpDropdownMenuEmits>();

import { ref, watch } from "vue";

// ドロップダウンの表示状態
const isOpen = ref(props.open || false);

// propsの変更を監視
watch(
  () => props.open,
  (newValue) => {
    if (newValue !== undefined) {
      isOpen.value = newValue;
    }
  }
);

// 内部状態の変更をemit
watch(isOpen, (newValue) => {
  emit("update:open", newValue);
  if (newValue) {
    emit("open");
  } else {
    emit("close");
  }
});

/**
 * メニューの開閉を切り替える
 */
const toggleMenu = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

/**
 * メニュー項目を選択
 */
const selectItem = (item: MenuItem) => {
  if (!item.disabled) {
    emit("select", item);
    if (item.action) {
      item.action();
    }
    if (!item.submenu) {
      isOpen.value = false;
    }
  }
};
</script>

<template>
  <div>McpDropdownMenu</div>
</template>
