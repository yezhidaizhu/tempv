<template>
  <n-popconfirm negative-text="取消" positive-text="确认" @positive-click="$emit('rm')">
    <template #trigger>
      <n-button size="tiny" type="error" circle secondary>
        <n-icon>
          <Trash />
        </n-icon>
      </n-button>
    </template>
    确定删除此变量吗 ？
  </n-popconfirm>

  <n-button class="mx-2" size="tiny" type="primary" circle secondary @click="$emit('view')">
    <n-icon>
      <Eye />
    </n-icon>
  </n-button>

  <n-button
    v-if="type === 'Request'"
    size="tiny"
    type="primary"
    circle
    secondary
    @click="$emit('setReq')"
  >
    <n-icon>
      <Settings />
    </n-icon>
  </n-button>
</template>

<script setup>
import { Trash, Eye, Settings } from '@vicons/ionicons5';

defineProps({
  type: {
    type: String,
  }
});
const emits = defineEmits(['rm', 'view', 'setReq']);


</script>