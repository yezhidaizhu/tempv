<template>
  <div>
    <DvDecoration7>
      <div v-lkp:title class="px-4 font-bold text-2xl">{{ title }}</div>
    </DvDecoration7>
  </div>
</template>

<script setup>
import Props from './props';
import DvDecoration7 from '@/components/Datav/Decoration/decoration7/main.vue'

defineProps(Props)
const t = ref()
</script>