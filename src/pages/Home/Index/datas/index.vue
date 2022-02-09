<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button secondary type="info" circle @click="show = true">
        <n-icon>
          <Cog />
        </n-icon>
      </n-button>
    </template>
    数据池
  </n-tooltip>

  <n-drawer v-model:show="show" :style="`width: ${drawerWidth};`" :mask-closable="false">
    <n-drawer-content closable>
      <template #header>
        数据池
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button size="small" secondary type="error" circle class="mx-2" @click="onClearDatas">
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
        <AddData />
      </template>

      <DataView />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import useDatas from '@/store/useDatas';
import { Cog, Trash, ExpandOutline, Exit } from '@vicons/ionicons5';
import AddData from './components/AddData.vue';
import DataView from './components/DataView/DataView.vue';
import { useMessage, useDialog } from 'naive-ui';

const datasStore = useDatas();
const message = useMessage()
const dialog = useDialog()

const show = ref(true);
const drawerWidth = ref('100vw');
const chgDrawerSize = (w) => drawerWidth.value = w || '600px';

const onClearDatas = () => {
  dialog.warning({
    title: '清空数据',
    content: '确定清空数据池中的数据？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      datasStore.$reset();
      message.success('已清空数据');
      show.value = false;
    },
  })
}

</script>