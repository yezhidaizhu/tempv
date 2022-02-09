<template>
  <div>
    <n-number-animation v-bind="props" />
  </div>
</template>

<script setup>
import Props from './props';

const props = defineProps(Props)

</script>