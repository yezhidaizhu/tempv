<template>
  <n-drawer-content closable>
    <template #header>
      <template v-if="selContainName">
        <span class="text-2xl text-gray-400 mr-2">{{ containers[selContainName].label }}</span>
        <SelContainer @add="name => selContainName = name">
          <template #="{ showSel }">
            <n-button tertiary size="small" circle @click="showSel">
              <n-tooltip>
                <template #trigger>
                  <n-icon>
                    <SwapHorizontal />
                  </n-icon>
                </template>
                切换容器
              </n-tooltip>
            </n-button>
          </template>
        </SelContainer>
      </template>
    </template>

    <n-collapse
      v-if="selContainName"
      display-directive="show"
      :default-expanded-names="['components']"
    >
      <!-- 容器属性设置 -->
      <n-collapse-item title="Container Porps" name="props">
        <PropsJsonEdit
          :value="propsJson"
          title="Props"
          desc="当前已设置的属性值"
          class="mb-2"
          @edit="onEditProps"
        />

        <PropsView
          v-if="selContainName"
          :compProps="containers[selContainName]?.props"
          @addProp="onAddContainerProp"
          @rmProp="onRmContainerProp"
        />
      </n-collapse-item>

      <!-- 组件设置 -->
      <n-collapse-item title="Components" name="components">
        <ComponentConfig :comps="comps" ref="compsRef" />
      </n-collapse-item>
    </n-collapse>

    <!-- 未选择容器 -->
    <n-empty v-if="!selContainName" description="暂未设置容器">
      <template #extra>
        <SelContainer @add="name => selContainName = name" />
      </template>
    </n-empty>

    <!-- 确定 -->
    <template v-if="selContainName" #footer>
      <n-button type="primary" @click="onOk">确定</n-button>
    </template>
  </n-drawer-content>
</template>

<script setup>
import containers from '@/plugin/container';
import { useMessage } from 'naive-ui';
import PropsView from './PropsView.vue';
import PropsJsonEdit from './PropsJsonEdit/PropsJsonEdit.vue';
import ComponentConfig from './ComponentConfig/ComponentConfig.vue';
import SelContainer from './SelContainer.vue';
import { SwapHorizontal } from '@vicons/ionicons5';
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  area: {
    type: Object,
    default: {},
  }
});
const emits = defineEmits(['ok']);

const message = useMessage();

const selContainName = ref();

watchEffect(() => { selContainName.value = props.area?.container?.name ?? null; });

const propsJson = ref({});
watchEffect(() => { propsJson.value = cloneDeep(props.area?.container?.props) ?? {} });
const onEditProps = ({ data }) => propsJson.value = data;

const onAddContainerProp = prop => {
  Object.assign(prop, propsJson.value)
  Object.assign(propsJson.value, prop)
};
const onRmContainerProp = propName => {
  delete propsJson.value?.[propName]
}

const onOk = () => {
  const container = {
    name: selContainName,
    props: propsJson,
    components: compsRef.value.getComps(),
  };

  emits('ok', { area: props.area, container, cb: () => message.success("container config ok") })
};


const comps = computed(() => props.area?.container?.components ?? []);
const compsRef = ref();

</script>