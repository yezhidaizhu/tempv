<template>
  <n-button size="small" dashed @click="show = true">添加组件</n-button>

  <n-drawer v-model:show="show" :width="400">
    <n-drawer-content>
      <n-list>
        <template #header>请选择组件</template>
        <n-list-item v-for="comp in componentList">
          <n-thing :title="comp.label" :description="comp.desc" />
          <template #suffix>
            <n-button
              size="small"
              strong
              secondary
              circle
              type="primary"
              #icon
              @click="onAdd(comp.value)"
            >
              <n-icon>
                <Add />
              </n-icon>
            </n-button>
          </template>
        </n-list-item>
      </n-list>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import { Add } from '@vicons/ionicons5';
import components from '@/plugin/components/index'

const emits = defineEmits(['add']);

const show = ref(false);

const componentList = computed(() => Object.keys(components).map((name) => {
  const { label, desc = "" } = components[name];
  return {
    label,
    value: name,
    desc
  }
}));

const onAdd = (name) => {
  emits('add', name);
  show.value = false;
}

</script>