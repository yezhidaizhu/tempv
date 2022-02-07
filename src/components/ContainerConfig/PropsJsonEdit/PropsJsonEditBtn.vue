<template>
  <n-button size="tiny" strong secondary circle :type="type" #icon>
    <n-icon>
      <component :is="icon" />
    </n-icon>
  </n-button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "tertiary",
  },
  icon: {
    type: Object,
  }
});
</script>
