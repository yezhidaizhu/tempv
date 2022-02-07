<template>
  <!-- <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>变量名</th>
        <th>值</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in datas" :key="data.key">
        <td>{{ data.name }}</td>
        <td>{{ data.value }}</td>
      </tr>
    </tbody>
  </n-table>-->
  <n-data-table :columns="columns" :data="datas" />
</template>

<script setup>
import { Remove } from '@vicons/ionicons5';
import useDatas, { baseType } from '@/store/useDatas';
import RmDataBtn from './RmDataBtn.vue';

const { datas, rmDataByKey } = useDatas();


const columns = [
  {
    title: "变量名",
    key: "name",
    width: 100
  },
  {
    title: "值",
    key: "value"
  },
  {
    title: "操作",
    key: "key",
    width: 100,
    render(row) {
      return h(
        RmDataBtn,
        {
          onOk: () => rmDataByKey(row.key)
        },
      )
    }
  }
];



</script>