<template>
  <n-drawer v-model:show="show" :width="650">
    <n-drawer-content closable>
      <n-form :model="model" ref="formRef" :rules="rules">
        <n-form-item path="url" label="请求路径">
          <n-input v-model:value="model.url" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="method" label="方法">
          <n-select placeholder="Select" :options="methodOptions" v-model:value="model.method" />
        </n-form-item>

        <n-tabs type="line">
          <n-tab-pane name="triggers" tab="触发器">
            <!-- Trigger -->
            <n-form-item>
              <n-dynamic-input
                v-model:value="triggers"
                :on-create="() => ({ left: '', option: _triggerOptions[0].value, right: '' })"
              >
                <template #default="{ value }">
                  <div class="flex items-center w-full">
                    <n-input v-model:value="value.left" />
                    <n-select
                      v-model:value="value.option"
                      :options="_triggerOptions"
                      class="w-64 mx-2"
                    />
                    <n-input v-model:value="value.right" type="text" />
                  </div>
                </template>
              </n-dynamic-input>
            </n-form-item>
          </n-tab-pane>
          <n-tab-pane name="data" tab="请求参数">
            <!-- params -->
            <n-form-item>
              <n-dynamic-input
                v-model:value="reqData"
                preset="pair"
                key-placeholder="变量名"
                value-placeholder="变量值"
              />
            </n-form-item>
          </n-tab-pane>

          <n-tab-pane name="headers" tab="请求头">
            <!-- Headers -->
            <n-form-item>
              <n-dynamic-input
                v-model:value="headers"
                preset="pair"
                key-placeholder="变量名"
                value-placeholder="变量值"
              />
            </n-form-item>
          </n-tab-pane>
        </n-tabs>
        <n-divider />
      </n-form>
      <template #footer>
        <n-button type="primary" @click="onOk">确定</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { triggerOptions } from '@/store/useDatas'

const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  }
});
const emits = defineEmits(['ok']);

const show = ref(false);

const model = ref({
  url: null,
  method: 'GET',
});

const reqData = ref([]);
const headers = ref([]);
const triggers = ref([]);

const initData = () => {
  const { url = "", method = "GET", data = {}, header = {}, trigger = [] } = props.data?.value || {};
  model.value.url = url;
  model.value.method = method;

  const objToArr = (obj) => {
    const _data = Object.keys(obj).map((key) => ({ key, value: obj[key] }));
    return _data.length ? _data : []
  }
  reqData.value = objToArr(data);
  headers.value = objToArr(header);
  triggers.value = trigger;
};

watch(() => props.data?.value, initData);

const rules = {
  url: [{ required: true }],
  method: [{ required: true }],
}

const methodOptions = ['GET', 'POST'].map(v => ({ label: v, value: v }));

const formRef = ref();
const onOk = () => {
  formRef.value.validate((errors) => {
    if (!errors) {
      const arrToObj = (arr) => {
        const data = {};
        arr.filter(d => d.key?.trim()).map((obj) => {
          const { key, value } = obj;
          Object.assign(data, { [key]: value })
        })
        return data;
      };

      const data = {
        ...unref(model),
        data: arrToObj(unref(reqData)),
        header: arrToObj(unref(headers)),
        trigger: unref(triggers).filter(d => d.left?.trim())
      }

      emits('ok', { data: { value: data } });
      // show.value = false;
    }
  })
}

const _triggerOptions = triggerOptions.map(op => ({ label: op.label, value: op.value }))

defineExpose({
  show: (status = true) => show.value = status,
})
</script>