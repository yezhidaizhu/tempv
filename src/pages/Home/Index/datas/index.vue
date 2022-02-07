<template>
  <n-button secondary type="info" circle @click="show = true">
    <n-icon>
      <Cog />
    </n-icon>
  </n-button>

  <n-drawer v-model:show="show" :width="600" :mask-closable="false">
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
        <AddData />
      </template>

      <DataView />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import useDatas from '@/store/useDatas';
import { Cog, Trash } from '@vicons/ionicons5';
import AddData from './components/AddData.vue';
import DataView from './components/DataView/DataView.vue';
import { useMessage, useDialog } from 'naive-ui';

const datasStore = useDatas();
const message = useMessage()
const dialog = useDialog()

const show = ref(false);

const onClearDatas = () => {
  dialog.warning({
    title: '清空数据',
    content: '你确定清空数据？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      datasStore.$reset();
      message.success('已清空数据')
    },
  })
}

</script>