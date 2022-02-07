<template>
  <div class="flexCCenter h-full">
    <slot />
  </div>
</template>

<script setup>
import Props from './props';

const props = defineProps(Props);
const emits = defineEmits([]);



</script>