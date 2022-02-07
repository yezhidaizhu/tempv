<template>
  <div class="h-full">
    <!-- 编辑 -->
    <div class="h-full" v-show="showEdit">
      <div class="flex justify-between my-2">
        <span class="text-gray-600 text-2xl">{{ jsonEditTitle }}</span>
        <div class="flex justify-end">
          <n-button @click="onEdit" class="mx-4" type="primary">ok</n-button>
          <n-button @click="showEdit = false">Back</n-button>
        </div>
      </div>
      <div id="areajson_jsoneditor" class="h-full w-full"></div>
      <div class="h-16"></div>
    </div>

    <!-- Root 展示 -->
    <AreasJsonCard v-if="!showEdit && root" :areas="root" @edit="e => onShowEdit(e, 'Root')" />

    <n-collapse
      v-show="!showEdit && !root"
      display-directive="show"
      :default-expanded-names="['self']"
    >
      <!-- Self 展示 -->
      <n-collapse-item title="Self" name="self">
        <AreasJsonCard :areas="self" @edit="area => onShowEdit(area, 'Self')" />
      </n-collapse-item>

      <!-- Parent 展示 -->
      <n-collapse-item title="Parent" name="parent">
        <AreasJsonCard :areas="parent" @edit="area => onShowEdit(area, 'Parent')" />
      </n-collapse-item>
    </n-collapse>

    <div class="h-16"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue-demi';
import JSONEditor from 'jsoneditor'
import AreasJsonCard from './AreasJsonCard.vue'
import { useMessage, useDialog } from 'naive-ui'

defineProps({
  self: {
    type: Object,
    default: {}
  },
  parent: {
    type: Object,
    default: {}
  },
  root: Object
});

const emits = defineEmits(['edit']);

const dialog = useDialog()
const message = useMessage()
const editor = shallowRef();

const creatJsonEditor = () => {
  if (!editor.value) {
    const container = document.getElementById("areajson_jsoneditor");
    if (container) {
      const options = {
        mode: 'tree',
        modes: ['code', 'tree', 'view'],
        enableSort: false,
        enableTransform: false,
      }
      editor.value = new JSONEditor(container, options);
      return editor.value
    }
  }
};

onMounted(creatJsonEditor);

const showEdit = ref(false);
const jsonEditTitle = ref('');
const onShowEdit = (data, title) => {
  editor.value?.set(data);
  jsonEditTitle.value = title;
  showEdit.value = true;
}

const onEdit = () => {
  if (!editor.value) {
    alert('No editor is open')
  } else {
    dialog.warning({
      title: 'Reset Data',
      content: 'comfirm ？（irreversible）',
      positiveText: 'ok',
      negativeText: 'cancel',
      onPositiveClick: () => {
        const json = editor.value.get()
        emits('edit', { area: json });
        message.success('reset ok， please refresh the page')
      }
    })
  }
}

</script>
