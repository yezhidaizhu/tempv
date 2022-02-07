<template>
  <div class="relative">
    <div class="absolute -top-10 right-0">
      <SelComponent @add="onAddComp" />
    </div>
  </div>

  <n-collapse>
    <n-collapse-item v-for="(comp, index) in curComps" :name="index">
      <template #header>
        <span class="text-xl font-bold">{{ components[comp.name]?.label }}</span>
        <span class="text-gray-600 ml-2">{{ components[comp.name]?.desc }}</span>
      </template>
      <template #header-extra>
        <n-popconfirm @positive-click.stop="onDelComp(index)">
          <template #trigger>
            <n-button size="small" secondary type="error" @click.stop>删除</n-button>
          </template>
          确定删除此组件吗？
        </n-popconfirm>
      </template>

      <PropsJsonEdit
        :value="comp.props ?? {}"
        title="Props"
        desc="当前已设置的属性值"
        class="mb-2"
        @edit="data => onEditProps(data, index)"
      />
      <PropsView
        :compProps="components[comp.name]?.props"
        @addProp="p => onAddContainerProp(index, p)"
        @rmProp="name => onRmContainerProp(index, name)"
      />
    </n-collapse-item>
  </n-collapse>

  <!-- 暂无 -->
  <n-empty v-if="!curComps?.length" description="容器内暂无组件"></n-empty>
</template>

<script setup>
import components from '@/plugin/components';
import SelComponent from './SelComponent.vue';
import cloneDeep from 'lodash/cloneDeep'
import { watchEffect } from 'vue';
import PropsView from '../PropsView.vue';
import PropsJsonEdit from '../PropsJsonEdit/PropsJsonEdit.vue';
import { uid } from "uid";

const props = defineProps({
  comps: {
    type: Array,
    default: [],
  }
});

const curComps = ref([]);

watchEffect(() => {
  curComps.value = cloneDeep(props.comps);
})

defineEmits(['add']);

const onAddComp = (compName) => {
  curComps.value.push({
    compKey: uid(5),
    name: compName,
    props: {},
  })
}

const onEditProps = ({ data }, index) => {
  curComps.value[index].props = data;
};

const onAddContainerProp = (index, prop) => {
  Object.assign(prop, curComps.value[index].props)
  Object.assign(curComps.value[index].props, prop)
};

const onRmContainerProp = (index, propName) => {
  delete curComps.value[index].props?.[propName]
}

const onDelComp = (index) => {
  curComps.value.splice(index, 1);
}

defineExpose({
  getComps: () => curComps.value
})

</script>

<style scoped>
.n-collapse .n-collapse-item .n-collapse-item {
  margin-left: 16px;
}
</style>