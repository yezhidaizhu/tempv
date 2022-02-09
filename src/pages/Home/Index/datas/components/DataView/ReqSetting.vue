<template>
  <n-button size="tiny" type="primary" secondary @click="show = true">设置</n-button>

  <n-drawer v-model:show="show" :width="550">
    <n-drawer-content closable>
      <n-form :model="model" ref="formRef" :rules="rules">
        <n-form-item path="url" label="请求路径">
          <n-input v-model:value="model.url" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="method" label="方法">
          <n-select placeholder="Select" :options="methodOptions" v-model:value="model.method" />
        </n-form-item>
        <n-form-item label="请求参数">
          <n-dynamic-input
            v-model:value="reqData"
            preset="pair"
            key-placeholder="变量名"
            value-placeholder="变量值"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-button type="primary" @click="onOk">确定</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { Settings } from '@vicons/ionicons5';

const props = defineProps({

});
const emits = defineEmits([]);

const show = ref(false);

const model = ref({
  url: null,
  method: 'GET',
})

const reqData = ref([{ key: '', value: '' }]);

const rules = {
  url: [{ required: true }],
  method: [{ required: true }],
}

const methodOptions = ['GET', 'POST'].map(v => ({ label: v, value: v }));

const formRef = ref();
const onOk = () => {
  formRef.value.validate((errors) => {
    if (!errors) {
      const _reqData = unref(reqData).filter(d => d.key?.trim());
      const data = {
        ...unref(model),
        data: _reqData,
      }
      console.log(data);
    }
  })
}
</script>