<template>
  <n-data-table :columns="columns" :data="tableData" />

  <n-drawer v-model:show="showViewData" :width="550">
    <n-drawer-content closable>
      <PropsJsonEdit
        :title="curViewData.name"
        :desc="curViewData.type"
        :value="{ value: curViewData.value }"
        id="datas_json"
        @edit="onDataEdit"
      />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import useDatas from '@/store/useDatas';
import { Settings } from '@vicons/ionicons5';
import { getDefaultStr } from '@/utils/helper';
import PropsJsonEdit from '@/components/ContainerConfig/PropsJsonEdit/PropsJsonEdit.vue';
import cloneDeep from 'lodash/cloneDeep'
import { NSwitch, NInput, NInputNumber, NButton, NIcon } from 'naive-ui';
import Action from './Action.vue';
import ReqSetting from './ReqSetting.vue';

const { datas, rmDataByName, setDataValue } = useDatas();

const tableData = computed(() => Object.keys(datas).map(name => ({ name, ...datas[name] })))

const showViewData = ref(false);
const curViewData = ref({});
const showData = data => {
  curViewData.value = cloneDeep(data);
  showViewData.value = true;
}
const onDataEdit = ({ data }) => {
  setDataValue(curViewData.value.name, data.value);
  Object.assign(curViewData.value, data);
}

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
        // return h(NButton, {
        //   size: "tiny",
        //   type: "primary",
        //   circle: true,
        //   secondary: true,
        // },
        //   () => h(NIcon, null, () => h(Settings))
        // );
        return h(ReqSetting)
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
          onRm: () => rmDataByName(row.name),
          onView: () => showData(row)
        },
      )
    }
  }
];



</script>