<script setup lang="ts">
import { reactive, ref } from "vue";
import McpInput from "./components/McpInput.vue";
import McpTextarea from "./components/McpTextarea.vue";
import McpCheckbox from "./components/McpCheckbox.vue";
import McpRadio from "./components/McpRadio.vue";
import McpSwitch from "./components/McpSwitch.vue";
import McpSelect from "./components/McpSelect.vue";
import McpMultiSelect from "./components/McpMultiSelect.vue";
import McpSlider from "./components/McpSlider.vue";
import McpDatePicker from "./components/McpDatePicker.vue";
import McpTimePicker from "./components/McpTimePicker.vue";
import McpFileUpload from "./components/McpFileUpload.vue";
import McpButton from "./components/McpButton.vue";
import McpIconButton from "./components/McpIconButton.vue";
import McpButtonGroup from "./components/McpButtonGroup.vue";
import McpDropdownMenu from "./components/McpDropdownMenu.vue";
import McpAlert from "./components/McpAlert.vue";
import McpBadge from "./components/McpBadge.vue";
import McpToast from "./components/McpToast.vue";
import McpTooltip from "./components/McpTooltip.vue";
import McpProgress from "./components/McpProgress.vue";
import McpSpinner from "./components/McpSpinner.vue";

// フォーム状態の管理
const formState = reactive({
  input: "",
  textarea: "",
  checkbox: false,
  radioValue: "option1",
  switchValue: false,
  selectValue: "",
  multiSelectValue: [],
  sliderValue: 50,
  selectedDate: null,
  selectedTime: null,
  files: [],
  buttonClicked: false,
  iconButtonClicked: false,
  buttonGroupValue: "button1",
  buttonGroupMultiValues: [],
  dropdownSelected: null,
  alertVisible: true,
  badgeValue: 5,
  toastVisible: false,
  tooltipVisible: false,
  progressValue: 65,
  spinnerVisible: true,
});

// セレクトの選択肢
const selectOptions = [
  { value: "option1", label: "オプション1" },
  { value: "option2", label: "オプション2" },
  { value: "option3", label: "オプション3" },
  { value: "option4", label: "オプション4（無効）", disabled: true },
];

// ラジオの選択肢
const radioOptions = [
  { value: "option1", label: "オプション1" },
  { value: "option2", label: "オプション2" },
  { value: "option3", label: "オプション3" },
];

// ドロップダウンメニューアイテム
const menuItems = [
  { id: "item1", label: "メニューアイテム1" },
  { id: "item2", label: "メニューアイテム2" },
  { id: "item3", label: "メニューアイテム3", disabled: true },
  { id: "item4", label: "メニューアイテム4" },
];

// ファイルアップロード関数
const handleFileUpload = (files: File[]) => {
  formState.files = files;
  console.log("アップロードされたファイル:", files);
};

// トースト表示
const showToast = () => {
  formState.toastVisible = true;
  setTimeout(() => {
    formState.toastVisible = false;
  }, 3000);
};
</script>

<template>
  <main class="container mx-auto px-4 py-8 text-gray-800">
    <h1 class="text-3xl font-bold mb-8 text-center text-blue-800">
      Mcpコンポーネントサンプル
    </h1>

    <!-- コンポーネントの表示セクション -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 入力フィールド -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpInput</h2>
        <div class="mb-2">
          <McpInput
            v-model="formState.input"
            placeholder="テキストを入力してください"
          />
        </div>
        <div class="text-sm text-gray-800 font-medium mt-2">
          入力値: {{ formState.input }}
        </div>
      </div>

      <!-- テキストエリア -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpTextarea</h2>
        <div class="mb-2">
          <McpTextarea
            v-model="formState.textarea"
            placeholder="複数行のテキストを入力してください"
            :rows="4"
            :auto-resize="true"
          />
        </div>
        <div class="text-sm text-gray-800 font-medium mt-2">
          入力値: {{ formState.textarea }}
        </div>
      </div>

      <!-- チェックボックス -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpCheckbox</h2>
        <div class="mb-4 space-y-2">
          <McpCheckbox
            v-model="formState.checkbox"
            label="チェックボックスのサンプル"
          />
          <McpCheckbox
            label="無効状態のチェックボックス"
            :disabled="true"
            :model-value="false"
          />
          <McpCheckbox
            label="必須項目のチェックボックス"
            :required="true"
            :model-value="false"
          />
        </div>
        <div class="text-sm text-gray-800 font-medium mt-2">
          チェック状態: {{ formState.checkbox ? "オン" : "オフ" }}
        </div>
      </div>

      <!-- ラジオボタン -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpRadio</h2>
        <div class="mb-4 space-y-2">
          <div v-for="option in radioOptions" :key="option.value">
            <McpRadio
              v-model="formState.radioValue"
              :value="option.value"
              :label="option.label"
              name="radio-group"
            />
          </div>
          <McpRadio
            :model-value="'disabled'"
            value="disabled"
            label="無効状態のラジオボタン"
            :disabled="true"
          />
        </div>
        <div class="text-sm text-gray-800 font-medium mt-2">
          選択値: {{ formState.radioValue }}
        </div>
      </div>

      <!-- スイッチ -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpSwitch</h2>
        <div class="mb-4 space-y-4">
          <McpSwitch v-model="formState.switchValue" label="通常のスイッチ" />
          <McpSwitch
            label="左側にラベルがあるスイッチ"
            label-position="left"
            :model-value="false"
          />
          <div class="flex justify-start space-x-4">
            <McpSwitch label="小サイズ" size="sm" :model-value="true" />
            <McpSwitch label="標準サイズ" size="md" :model-value="true" />
            <McpSwitch label="大サイズ" size="lg" :model-value="true" />
          </div>
          <McpSwitch
            label="無効状態のスイッチ"
            :disabled="true"
            :model-value="false"
          />
        </div>
        <div class="text-sm text-gray-800 font-medium mt-2">
          スイッチ状態: {{ formState.switchValue ? "オン" : "オフ" }}
        </div>
      </div>

      <!-- セレクト -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpSelect</h2>
        <div class="mb-4">
          <McpSelect
            v-model="formState.selectValue"
            :options="selectOptions"
            placeholder="選択してください"
          />
        </div>
        <div class="mb-4">
          <McpSelect
            :model-value="''"
            :options="selectOptions"
            placeholder="エラー状態のセレクト"
            :error="true"
            error-message="選択は必須です"
          />
        </div>
        <div class="mb-4">
          <McpSelect
            :model-value="''"
            :options="selectOptions"
            placeholder="無効状態のセレクト"
            :disabled="true"
          />
        </div>
        <div class="text-sm text-gray-800 font-medium mt-2">
          選択値: {{ formState.selectValue || "なし" }}
        </div>
      </div>

      <!-- マルチセレクト -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpMultiSelect</h2>
        <div class="mb-4">
          <McpMultiSelect
            v-model="formState.multiSelectValue"
            :options="selectOptions"
            placeholder="複数選択してください"
          />
        </div>
        <div class="mb-4">
          <McpMultiSelect
            :model-value="[]"
            :options="selectOptions"
            placeholder="最大2つまで選択可能"
            :max-items="2"
          />
        </div>
        <div class="mb-4">
          <McpMultiSelect
            :model-value="[]"
            :options="selectOptions"
            placeholder="無効状態のマルチセレクト"
            :disabled="true"
          />
        </div>
        <div class="text-sm text-gray-800 font-medium mt-2">
          選択値:
          {{
            formState.multiSelectValue.length > 0
              ? formState.multiSelectValue.join(", ")
              : "なし"
          }}
        </div>
      </div>

      <!-- スライダー -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpSlider</h2>
        <div class="mb-4">
          <McpSlider
            v-model="formState.sliderValue"
            :show-value="true"
            label="基本スライダー"
          />
        </div>
        <div class="mb-4">
          <McpSlider
            :model-value="25"
            :min="0"
            :max="100"
            :step="5"
            label="ステップ5単位のスライダー"
            :show-value="true"
            :show-ticks="true"
          />
        </div>
        <div class="mb-4">
          <McpSlider
            :model-value="3"
            :min="1"
            :max="5"
            :step="1"
            label="カスタム目盛りのスライダー"
            :show-value="true"
            :ticks="[1, 2, 3, 4, 5]"
            :show-ticks="true"
          />
        </div>
        <div class="mb-4">
          <McpSlider
            :model-value="50"
            label="無効状態のスライダー"
            :disabled="true"
            :show-value="true"
          />
        </div>
        <div class="text-sm text-gray-800 font-medium mt-2">
          スライダー値: {{ formState.sliderValue }}
        </div>
      </div>

      <!-- ファイルアップロード -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpFileUpload</h2>
        <div class="mb-4">
          <McpFileUpload v-model="formState.files" @change="handleFileUpload" />
        </div>
        <div class="text-sm text-gray-800 font-medium mt-2">
          アップロードされたファイル: {{ formState.files.length }}
        </div>
      </div>

      <!-- フィードバック・通知系コンポーネント -->
      <h2
        class="text-2xl font-bold mb-4 col-span-1 md:col-span-2 mt-12 text-blue-800"
      >
        フィードバック・通知系コンポーネント
      </h2>

      <!-- アラート -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpAlert</h2>
        <div class="mb-4">
          <McpAlert
            v-model:visible="formState.alertVisible"
            title="成功メッセージ"
            message="操作が正常に完了しました。"
            type="success"
            :closable="true"
          />
        </div>
        <div class="mb-4">
          <McpAlert
            message="情報メッセージです。"
            type="info"
            :show-icon="true"
          />
        </div>
        <div class="mb-4">
          <McpAlert
            message="警告メッセージです。注意が必要です。"
            type="warning"
            :show-icon="true"
          />
        </div>
        <div class="mb-4">
          <McpAlert
            message="エラーが発生しました。確認してください。"
            type="error"
            :show-icon="true"
          />
        </div>
        <div class="text-sm text-gray-800 font-medium mt-2">
          アラート表示状態: {{ formState.alertVisible ? "表示" : "非表示" }}
        </div>
      </div>

      <!-- バッジ -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpBadge</h2>
        <div class="mb-4 flex space-x-8">
          <div>
            <McpBadge :value="formState.badgeValue" type="primary">
              <button class="px-4 py-2 bg-blue-100 rounded">通知</button>
            </McpBadge>
          </div>
          <div>
            <McpBadge dot type="error">
              <button class="px-4 py-2 bg-blue-100 rounded">新着</button>
            </McpBadge>
          </div>
          <div>
            <McpBadge :value="99" :max="9" type="warning">
              <button class="px-4 py-2 bg-blue-100 rounded">メッセージ</button>
            </McpBadge>
          </div>
        </div>
        <div class="mb-4 flex space-x-4">
          <McpBadge :value="5" standalone type="primary" />
          <McpBadge :value="10" standalone type="success" />
          <McpBadge :value="15" standalone type="warning" />
          <McpBadge :value="20" standalone type="error" />
          <McpBadge :value="0" standalone type="info" :hidden="true" />
        </div>
      </div>

      <!-- トースト -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpToast</h2>
        <div class="mb-4">
          <McpButton @click="showToast">トースト表示</McpButton>
          <McpToast
            v-model:visible="formState.toastVisible"
            title="通知"
            message="これはトースト通知です。"
            type="info"
            :duration="3000"
            :show-icon="true"
            :closable="true"
            :show-progress="true"
          />
        </div>
      </div>

      <!-- ツールチップ -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpTooltip</h2>
        <div class="mb-4 flex justify-center space-x-8">
          <div>
            <McpTooltip
              content="上側のツールチップ"
              placement="top"
              v-model:visible="formState.tooltipVisible"
            >
              <button class="px-4 py-2 bg-blue-100 rounded">ホバー</button>
            </McpTooltip>
          </div>
          <div>
            <McpTooltip
              content="右側のツールチップ"
              placement="right"
              trigger="click"
            >
              <button class="px-4 py-2 bg-blue-100 rounded">クリック</button>
            </McpTooltip>
          </div>
          <div>
            <McpTooltip
              content="左側のツールチップ"
              placement="left"
              :arrow="true"
              theme="dark"
            >
              <button class="px-4 py-2 bg-blue-100 rounded">ダーク</button>
            </McpTooltip>
          </div>
        </div>
      </div>

      <!-- プログレス -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpProgress</h2>
        <div class="mb-4">
          <McpProgress
            :value="formState.progressValue"
            type="bar"
            color="primary"
            :show-value="true"
          />
        </div>
        <div class="mb-4">
          <McpProgress
            :value="formState.progressValue"
            type="circle"
            color="success"
            :show-value="true"
          />
        </div>
        <div class="mb-4">
          <McpProgress :indeterminate="true" type="bar" color="info" />
        </div>
        <div class="mb-4 flex items-center">
          <span class="mr-4">値:</span>
          <McpSlider
            v-model="formState.progressValue"
            :min="0"
            :max="100"
            :show-value="true"
          />
        </div>
      </div>

      <!-- スピナー -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-blue-700">McpSpinner</h2>
        <div class="mb-4 flex flex-wrap gap-4">
          <McpSpinner type="ring" color="primary" />
          <McpSpinner type="spinner" color="secondary" />
          <McpSpinner type="dots" color="success" />
          <McpSpinner type="pulse" color="warning" />
          <McpSpinner type="bars" color="error" />
        </div>
        <div class="mb-4 flex flex-wrap gap-8">
          <McpSpinner type="ring" size="xs" />
          <McpSpinner type="ring" size="sm" />
          <McpSpinner type="ring" size="md" />
          <McpSpinner type="ring" size="lg" />
          <McpSpinner type="ring" size="xl" />
        </div>
        <div class="mb-4">
          <McpSpinner
            type="ring"
            color="primary"
            label="読み込み中..."
            labelPosition="right"
          />
        </div>
      </div>

      <!-- フォーム状態の表示 -->
      <div
        class="mt-12 bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        <h2 class="text-xl font-semibold mb-4 text-blue-700">フォーム状態</h2>
        <pre class="bg-gray-900 text-white p-4 rounded-md overflow-auto">{{
          formState
        }}</pre>
      </div>
    </div>
  </main>
</template>

<style>
body {
  background-color: #f5f7fa;
  color: #1a202c;
}
</style>
