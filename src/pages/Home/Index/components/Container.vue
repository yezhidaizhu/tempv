<template>
  <component
    v-if="container"
    v-bind="mapReal(container?.props)"
    :is="containers[container.name]?.component"
  >
    <component
      v-for="comp  in comps"
      :compKey="comp.compKey"
      v-bind="mapReal(comp.props)"
      :is="components[comp.name]?.component"
    />
  </component>
</template>

<script setup>
import components from '@/plugin/components'
import containers from '@/plugin/container/index'
import useMap from '@/hooks/useMap'

const props = defineProps({
  container: {
    type: Object,
    default: {},
  }
});

const { mapReal } = useMap();

// const container = computed(() => area?.container);
const comps = computed(() => props.container?.components || []);


</script>