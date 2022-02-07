<template>
  <n-popconfirm negative-text="取消" positive-text="确认" @positive-click="$emit('ok')">
    <template #trigger>
      <n-button size="tiny" circle secondary>
        <n-icon>
          <Remove />
        </n-icon>
      </n-button>
    </template>
    确定删除此变量吗 ？
  </n-popconfirm>
</template>

<script setup>
import { Remove } from '@vicons/ionicons5';

const props = defineProps({

});
const emits = defineEmits(['ok']);


</script>