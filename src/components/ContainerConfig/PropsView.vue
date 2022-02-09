<template>
  <div>
    <div class="flex justify-end items-center mb-2">
      <n-switch size="small" v-model:value="showProps" />
      <span class="text-gray-600 ml-2 text-sm select-none">查看 Props Api</span>
    </div>
    <n-table v-show="showProps" :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>名称</th>
          <th>类型</th>
          <th>默认值</th>
          <th>说明</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in propArr">
          <td>{{ prop.name }}</td>
          <td>
            <span class="dark:bg-gray-900 rounded p-1 px-2">{{ prop.type }}</span>
          </td>
          <td>{{ prop.default }}</td>
          <td>{{ prop.desc }}</td>
          <td>
            <n-button size="tiny" tertiary circle class="mr-1" @click="onAddProp(prop)">
              <n-icon>
                <Add />
              </n-icon>
            </n-button>
            <n-button size="tiny" tertiary circle class="mr-1" @click="onRmProp(prop)">
              <n-icon>
                <Remove />
              </n-icon>
            </n-button>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

<script setup>
import { Add, Remove } from '@vicons/ionicons5';
import { getDefaultStr, getPropsTypeStr } from '@/utils/helper';

const props = defineProps({
  compProps: {
    type: Object,
    default: {}
  }
});

const emits = defineEmits(['addProp', 'rmProp'])

const showProps = ref(false);

const propArr = computed(() => {
  const compProps = props.compProps;
  return Object.keys(compProps).map(propName => {
    const prop = compProps[propName];
    const { type } = prop;
    return {
      ...prop,
      name: propName,
      type: getPropsTypeStr(type),
      default: getDefaultStr(prop),
    }
  })
});

const onAddProp = prop => {
  const { name, type } = prop;
  let value = props.compProps[name].default ?? (typeof window[type] === 'function' ? window[type]() : `unknown_type [${type}]`);
  // 特殊处理
  if (type === "Object" && typeof props.compProps[name].default === 'function') {  // 对象类
    value = value();
  }
  emits('addProp', { [name]: value });
}

const onRmProp = prop => emits('rmProp', prop.name);




</script>