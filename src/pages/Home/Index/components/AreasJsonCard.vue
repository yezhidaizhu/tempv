<template>
  <n-card>
    <template #header>
      <span class="text-gray-600 mr-2">Key :</span>
      <span class="text-green-600">{{ areas.key }}</span>
    </template>
    <template #header-extra>
      <div class="flex">
        <n-icon size="18" class="hover:text-green-400" @click="$emit('edit', areas)">
          <CreateOutline />
        </n-icon>
      </div>
    </template>
    <json-viewer :value="areas" :expand-depth="3" copyable></json-viewer>
  </n-card>
</template>

<script setup>
import { CreateOutline } from '@vicons/ionicons5'
import JsonViewer from 'vue-json-viewer'

const props = defineProps({
  areas: {
    type: Object,
    default: {}
  }
});
defineEmits(['edit']);


</script>