<template>
  <n-data-table :columns="columns" :data="tableData" />

  <n-drawer v-model:show="showViewData" :width="550">
    <n-drawer-content closable>
      <PropsJsonEdit
        :title="curViewData.name"
        :desc="curViewData.type"
        :value="{ value: curViewData.value }"
        id="datas_json"
        :jsonEditStyle="{ height: '70vh' }"
        :jsonEditConfig="{ mode: 'tree' }"
        @edit="onDataEdit"
      />
    </n-drawer-content>
  </n-drawer>

  <ReqSetting ref="reqSettingRef" :data="curViewData" @ok="onDataEdit" />
</template>

<script setup>
import useDatas from '@/store/useDatas';
import { getDefaultStr } from '@/utils/helper';
import PropsJsonEdit from '@/components/ContainerConfig/PropsJsonEdit/PropsJsonEdit.vue';
import cloneDeep from 'lodash/cloneDeep'
import { NSwitch, NInput, NInputNumber, NTag } from 'naive-ui';
import Action from './Action.vue';
import ReqSetting from './ReqSetting.vue';

const { datas, rmDataByName, setDataValue } = useDatas();

const tableData = computed(() => Object.keys(datas).map(name => ({ name, ...datas[name] })))

const showViewData = ref(false);
const curViewData = ref({});

const onDataEdit = ({ data }) => {
  setDataValue(curViewData.value.name, data.value);
  Object.assign(curViewData.value, data);
}

const reqSettingRef = ref(false);

const columns = [
  {
    title: "变量名",
    key: "name",
    width: 100
  },
  {
    title: "类型",
    key: "type",
    width: 100,
    render: (row) => row.type
  },
  {
    title: "值",
    key: "value",
    render: (row) => {
      const valueStr = getDefaultStr({ type: row.type, default: row.value });
      if (row.type === 'Boolean') {
        return h('div', null, [
          h(NSwitch, {
            size: "small",
            "defaultValue": row.value,
            "onUpdate:value": value => {
              setDataValue(row.name, value)
            },
            class: 'mr-2'
          }),
        ]);
      } else if (["String", "Number"].includes(row.type)) {
        return h('div', null, [
          h(row.type === "String" ? NInput : NInputNumber, {
            size: "small",
            "defaultValue": valueStr,
            "onUpdate:value": value => {
              setDataValue(row.name, value)
            },
          }),
        ]);
      } else if (row.type === "Request") {
        const { url = "", method, data } = row.value ?? {};
        let _url = url + "";
        if (_url && method == "GET") {
          const param = Object.keys(data).map(key => `${key}=${data[key]}`).join("&");
          _url += (url?.includes("?") ? "&" : param ? "?" : "") + param;
        }
        return h('div', {
          class: "text-gray-500"
        }, [
          method && h(NTag, { type: 'primary', size: "small", class: "mr-2" },
            () => h('span', null, method)),
          _url,
        ])
      }
      return valueStr;
    }
  },
  {
    title: "操作",
    key: "name",
    width: 150,
    render(row) {
      return h(
        Action,
        {
          type: row.type,
          onRm: () => rmDataByName(row.name),
          onView: () => {
            curViewData.value = cloneDeep(row);
            showViewData.value = true;
          },
          onSetReq: () => {
            curViewData.value = cloneDeep(row);
            reqSettingRef.value?.show();
          }
        },
      )
    }
  }
];



</script>