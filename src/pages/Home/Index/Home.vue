<template>
  <div>
    <div class="h-screen">
      <NullArea v-if="isNoRootChildren" @add="onAddRootFirstChild" />
      <SpArea
        v-else
        :areas="areas"
        @add="onAddPane"
        @rm="onRemovePane"
        @resized="onResized"
        @detail="showJsonData"
        @addContainer="onShowContainerConfig"
      />
    </div>

    <!-- 布局详情 -->
    <n-drawer v-model:show="drawer" :style="`width: ${drawerWidth};`">
      <n-drawer-content closable>
        <!-- 头 -->
        <template #header>
          Areas
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button size="small" secondary type="error" circle class="mx-2" @click="onReset">
                <n-icon>
                  <Trash />
                </n-icon>
              </n-button>
            </template>
            清空数据
          </n-tooltip>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button
                size="small"
                secondary
                type="primary"
                circle
                class="mr-2"
                @click="chgDrawerSize(drawerWidth == '100vw' ? '' : '100vw')"
              >
                <n-icon>
                  <ExpandOutline v-if="drawerWidth !== '100vw'" />
                  <Exit v-else />
                </n-icon>
              </n-button>
            </template>
            {{ drawerWidth !== '100vw' ? '最大化' : '恢复弹窗大小' }}
          </n-tooltip>
        </template>

        <AreasJson v-bind="jsonData" @edit="onReplaceObjByKey" />
        <!-- 尾 -->
      </n-drawer-content>
    </n-drawer>

    <!-- 容器选择与配置 -->
    <n-drawer v-model:show="showContainerConfig" :width="600" :mask-closable="false">
      <ContainerConfig :area="curArea" @ok="_onAddContainer" />
    </n-drawer>

    <!-- 右下按钮 -->
    <div class="fixed right-0 bottom-0 m-4">
      <div class="flex">
        <!-- <Btn class="flexCCenter mx-2">
          <n-icon class="mr-1">
            <Eye />
          </n-icon>Preview
        </Btn>-->
        <Datas />

        <Btn class="mx-2" @click="showJsonData()">
          <n-icon>
            <ExtensionPuzzleOutline />
          </n-icon>Areas
        </Btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExtensionPuzzleOutline, Eye, Trash, ExpandOutline, Exit } from '@vicons/ionicons5'
import Btn from '@/components/Btn.vue';
import { useMessage, useDialog } from 'naive-ui'
import useArea from '@/store/useArea';
import ContainerConfig from '@/components/ContainerConfig/ContainerConfig.vue';

import SpArea from './components/SpArea.vue';
import NullArea from './components/NullArea.vue';
import AreasJson from './components/AreasJson.vue';
import Datas from './datas/index.vue';
import useJSON from './hooks/useJSON';
import useContainer from './hooks/useContainer';

import "./index.scss"

const dialog = useDialog()
const message = useMessage()
const areaStore = useArea()
const { drawer, drawerWidth, chgDrawerSize, jsonData, showJsonData } = useJSON();
const { drawer: showContainerConfig, curArea, onShowContainerConfig } = useContainer();

const areas = computed(() => areaStore.areas);

const {
  onAddRootFirstChild,
  onAddPane,
  onRemovePane,
  onResized,
  onReplaceObjByKey,
  onAddContainer
} = areaStore;

const isNoRootChildren = computed(() => (!areaStore.areas?.children?.filter(c => !c.__disable).length));

const onReset = () => {
  dialog.warning({
    title: '清空所有布局',
    content: '确定清空吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      areaStore.$reset();
      message.success('清空完成，请进行刷新')
    },
  })
};


const _onAddContainer = (data) => {
  onAddContainer(data);
  showContainerConfig.value = false
}

</script>

