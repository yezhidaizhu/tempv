<template>
  <slot :showSel="showSel">
    <n-button size="small" dashed @click="showSel">添加容器</n-button>
  </slot>

  <n-drawer v-model:show="show" :width="400">
    <n-drawer-content>
      <n-list>
        <template #header>请选择容器</template>
        <n-list-item
          v-for="comp in containerList"
          class="hover:bg-gray-900 cursor-pointer"
          @click="onAdd(comp.value)"
        >
          <n-thing :title="comp.label" :description="comp.desc" />
        </n-list-item>
      </n-list>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import containers from '@/plugin/container';

const emits = defineEmits(['add']);

const show = ref(false);

const containerList = computed(() => Object.keys(containers).map((name) => {
  const { label, desc = "" } = containers[name];
  return {
    label,
    value: name,
    desc
  }
}));

const showSel = () => show.value = true;

const onAdd = (name) => {
  emits('add', name);
  show.value = false;
}

</script>