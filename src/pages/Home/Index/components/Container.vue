<template>
  <component v-if="container" v-bind="container?.props" :is="containers[container.name]?.component">
    <component
      v-for="comp  in comps"
      :compKey="comp.compKey"
      v-bind="comp.props"
      :is="components[comp.name]?.component"
    />
  </component>
</template>

<script setup>
import components from '@/plugin/components'
import containers from '@/plugin/container/index'

const props = defineProps({
  container: {
    type: Object,
    default: {},
  }
});

// const container = computed(() => area?.container);
const comps = computed(() => props.container?.components || []);


</script>