<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button size="small" type="primary" secondary circle @click="showModal = true">
        <n-icon>
          <Add />
        </n-icon>
      </n-button>
    </template>
    添加变量
  </n-tooltip>

  <n-modal v-model:show="showModal" display-directive="if">
    <n-card style="width:400px;" :bordered="false">
      <n-form :model="form" ref="formRef" :rules="rules">
        <n-form-item path="name" label="名称" @input="() => (form.name = form.name.trim())">
          <n-input v-model:value="form.name" />
        </n-form-item>
        <n-form-item path="type" label="类型">
          <n-select v-model:value="form.type" :options="options" class="my-2" />
        </n-form-item>
      </n-form>

      <template #footer>
        <div class="flex justify-end">
          <n-button @click="onOk">确定</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { Add } from '@vicons/ionicons5';
import useDatas, { baseType } from '@/store/useDatas';

const { addData } = useDatas();

const showModal = ref(false);

const formRef = ref();
const initData = () => ({ name: "", type: null })
const form = ref(initData());

const rules = {
  name: [{ required: true, message: '请输入名称' }],
  type: [{ required: true, message: '请选择类型' }],
}

const options = baseType.map(type => ({ label: type, value: type }))

const onOk = () => {
  formRef.value.validate((errors) => {
    if (!errors) {
      addData(unref(form));
      showModal.value = false;
      form.value = initData()
    }
  })
}
</script>
