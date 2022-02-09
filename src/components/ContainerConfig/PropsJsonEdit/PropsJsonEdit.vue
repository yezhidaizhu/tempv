<template>
  <!-- <json-viewer :value="{}" :expand-depth="3" copyable></json-viewer> -->
  <div>
    <div class="flex justify-between pb-2">
      <span>
        <span class="text-xl">{{ title }}</span>
        <span class="text-gray-600 ml-2">{{ desc }}</span>
      </span>
      <div>
        <div v-if="!showEdit" class="flex">
          <PropsJsonEditBtn :icon="CreateOutline" @click="onShowEdit" />
        </div>
        <div v-else class="flex">
          <PropsJsonEditBtn type="success" :icon="Checkmark" @click="onEdit" />
          <PropsJsonEditBtn :icon="CloseOutline" class="mx-2" @click="showEdit = false" />
        </div>
      </div>
    </div>

    <div
      v-show="showEdit"
      ref="jsonEditRef"
      id="containerConfig_jsoneditor"
      :style="jsonEditStyle"
      class="w-full"
    ></div>

    <n-card v-show="!showEdit">
      <n-code :code="JSON.stringify(value, null, 2)" language="typescript" />
    </n-card>
  </div>
</template>

<script setup>
import { CreateOutline, Checkmark, CloseOutline } from '@vicons/ionicons5'
import JsonViewer from 'vue-json-viewer'
import JSONEditor from 'jsoneditor'
import PropsJsonEditBtn from './PropsJsonEditBtn.vue'

const props = defineProps({
  title: {
    type: String,
    default: "Object",
  },
  desc: {
    type: String,
  },
  value: {
    type: Object,
    default: {},
  },
  id: {
    type: String,
    default: "containerConfig_jsoneditor"
  },
  jsonEditStyle: {
    type: Object,
    default: {}
  },
  jsonEditConfig: {
    type: Object,
    default: {},
  }
});
const emits = defineEmits(['edit']);

const editor = shallowRef();

const jsonEditRef = ref();

const creatJsonEditor = () => {
  if (!editor.value) {
    const container = jsonEditRef.value;
    if (container) {
      const options = {
        mode: 'code',
        modes: ['code', 'tree', 'view'],
        enableSort: false,
        enableTransform: false,
        ...props.jsonEditConfig,
      }
      editor.value = new JSONEditor(container, options);
    }
  }
};

onMounted(creatJsonEditor);

const showEdit = ref(false);
const onShowEdit = () => {
  editor.value?.set(props.value);
  showEdit.value = true;
}

const onEdit = () => {
  const json = editor.value.get()
  emits('edit', { data: json });
  showEdit.value = false;
}

</script>
