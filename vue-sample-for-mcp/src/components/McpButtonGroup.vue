<script setup lang="ts">
/**
 * ボタングループコンポーネント
 */

/**
 * プロパティ
 */
interface McpButtonGroupProps {
  /** ボタンの配置（horizontal, vertical） */
  orientation?: "horizontal" | "vertical";
  /** ボタン間の間隔（none, xs, sm, md, lg） */
  spacing?: "none" | "xs" | "sm" | "md" | "lg";
  /** ボタンの種類（デフォルト値として子ボタンに適用） */
  variant?: "primary" | "secondary" | "tertiary" | "text" | "danger";
  /** ボタンのサイズ（デフォルト値として子ボタンに適用） */
  size?: "sm" | "md" | "lg";
  /** 幅いっぱいに表示 */
  fullWidth?: boolean;
  /** 複数選択可能（トグルボタングループとして機能） */
  multiple?: boolean;
  /** 選択されたボタンの値（単一選択時） */
  modelValue?: string | number;
  /** 選択されたボタンの値の配列（複数選択時） */
  modelValues?: (string | number)[];
}

const props = defineProps<McpButtonGroupProps>();

/**
 * イベント
 */
interface McpButtonGroupEmits {
  /** 単一選択値の更新 */
  "update:modelValue": [value: string | number];
  /** 複数選択値の更新 */
  "update:modelValues": [values: (string | number)[]];
  /** ボタン選択イベント */
  select: [value: string | number, selected: boolean];
}

const emit = defineEmits<McpButtonGroupEmits>();

/**
 * ボタン選択イベントハンドラ
 */
const onSelect = (value: string | number, selected: boolean) => {
  if (props.multiple) {
    const values = [...(props.modelValues || [])];
    if (selected) {
      if (!values.includes(value)) {
        values.push(value);
      }
    } else {
      const index = values.indexOf(value);
      if (index !== -1) {
        values.splice(index, 1);
      }
    }
    emit("update:modelValues", values);
  } else {
    emit("update:modelValue", value);
  }

  emit("select", value, selected);
};
</script>

<template>
  <div>McpButtonGroup</div>
</template>
