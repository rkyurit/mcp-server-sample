<script setup lang="ts">
/**
 * 複数選択可能なセレクトコンポーネント
 */

/**
 * オプションの型定義
 */
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

/**
 * プロパティ
 */
interface McpMultiSelectProps {
  /** モデルの値（選択された値の配列） */
  modelValue: (string | number)[];
  /** 選択肢のリスト */
  options: SelectOption[];
  /** プレースホルダー */
  placeholder?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 必須項目 */
  required?: boolean;
  /** エラー状態 */
  error?: boolean;
  /** エラーメッセージ */
  errorMessage?: string;
  /** 最大選択数 */
  maxItems?: number;
}

const props = defineProps<McpMultiSelectProps>();

/**
 * イベント
 */
interface McpMultiSelectEmits {
  /** モデルの更新 */
  "update:modelValue": [value: (string | number)[]];
}

const emit = defineEmits<McpMultiSelectEmits>();

import { ref, watch, computed } from "vue";

// 選択表示の開閉状態
const isOpen = ref(false);
// 検索テキスト
const searchText = ref("");
// ドロップダウン要素への参照
const dropdownRef = ref<HTMLDivElement | null>(null);

/**
 * 選択済みの項目を表示用に変換
 */
const selectedLabels = computed(() => {
  return props.options
    .filter((option) => props.modelValue.includes(option.value))
    .map((option) => option.label);
});

/**
 * 検索条件に一致する選択肢
 */
const filteredOptions = computed(() => {
  if (!searchText.value) return props.options;

  return props.options.filter((option) =>
    option.label.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

/**
 * 選択肢がすでに選択されているかを確認
 */
const isSelected = (value: string | number): boolean => {
  return props.modelValue.includes(value);
};

/**
 * 選択の切り替え
 */
const toggleOption = (option: SelectOption) => {
  if (option.disabled) return;

  const newValue = [...props.modelValue];
  const index = newValue.indexOf(option.value);

  if (index === -1) {
    // 最大選択数のチェック
    if (props.maxItems && newValue.length >= props.maxItems) {
      return;
    }
    newValue.push(option.value);
  } else {
    newValue.splice(index, 1);
  }

  emit("update:modelValue", newValue);
};

/**
 * ドロップダウンの開閉
 */
const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    // 開いたときに検索テキストをクリア
    searchText.value = "";
    // フォーカス管理などの追加処理
    setTimeout(() => {
      const searchInput =
        dropdownRef.value?.querySelector('input[type="text"]');
      if (searchInput) {
        (searchInput as HTMLInputElement).focus();
      }
    }, 10);
  }
};

/**
 * 外部クリックの処理
 */
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

/**
 * すべての選択をクリア
 */
const clearAll = () => {
  emit("update:modelValue", []);
};

// 外部クリックイベントリスナーの設定
watch(isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }
});
</script>

<template>
  <div class="relative w-full" ref="dropdownRef">
    <!-- 選択ボックス -->
    <div
      class="flex items-center justify-between w-full px-3 py-2 border rounded-md cursor-pointer"
      :class="{
        'border-red-500': error,
        'border-gray-300 focus-within:border-blue-500': !error,
        'bg-gray-100 opacity-75 cursor-not-allowed': disabled,
        'bg-white': !disabled,
      }"
      @click="toggleDropdown"
    >
      <!-- 選択された項目またはプレースホルダー -->
      <div class="flex-grow truncate">
        <span
          v-if="selectedLabels.length === 0 && placeholder"
          class="text-gray-400"
        >
          {{ placeholder }}
        </span>
        <span v-else-if="selectedLabels.length > 0" class="text-gray-800">
          {{ selectedLabels.join(", ") }}
        </span>
        <span v-else class="text-gray-800"> 選択してください </span>
      </div>

      <!-- 矢印アイコンと選択数 -->
      <div class="flex items-center">
        <span
          v-if="selectedLabels.length > 0"
          class="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full mr-2"
        >
          {{ selectedLabels.length }}
        </span>
        <svg
          class="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>

    <!-- ドロップダウンメニュー -->
    <div
      v-if="isOpen"
      class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
    >
      <!-- 検索ボックスとクリアボタン -->
      <div class="flex items-center p-2 border-b border-gray-200">
        <input
          type="text"
          v-model="searchText"
          class="flex-grow px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="検索..."
          @click.stop
        />
        <button
          v-if="modelValue.length > 0"
          @click.stop="clearAll"
          class="px-2 py-1 ml-2 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
        >
          すべてクリア
        </button>
      </div>

      <!-- オプションリスト -->
      <div class="max-h-60 overflow-y-auto p-1">
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          class="px-3 py-2 rounded-md cursor-pointer"
          :class="{
            'bg-blue-50': isSelected(option.value),
            'hover:bg-gray-100': !option.disabled && !isSelected(option.value),
            'text-gray-400 cursor-not-allowed': option.disabled,
          }"
          @click.stop="toggleOption(option)"
        >
          <div class="flex items-center">
            <input
              type="checkbox"
              :checked="isSelected(option.value)"
              :disabled="option.disabled"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              @click.stop
            />
            <span class="ml-2">{{ option.label }}</span>
          </div>
        </div>

        <!-- 結果がない場合 -->
        <div
          v-if="filteredOptions.length === 0"
          class="px-3 py-2 text-sm text-gray-500 text-center"
        >
          検索結果がありません
        </div>
      </div>
    </div>

    <!-- エラーメッセージ -->
    <p v-if="error && errorMessage" class="mt-1 text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </div>
</template>
