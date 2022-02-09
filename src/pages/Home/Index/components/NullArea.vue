<template>
  <div class="h-screen flexCCenter">
    <Btn @click="$emit('add')">
      <span class="text-3xl">new Area</span>
    </Btn>
  </div>
</template>

<script setup>
import Btn from "@/components/Btn.vue";
// 没有任何显示的时候

const emits = defineEmits(['add']);



</script>