<template>
  <!-- @resized="(e: any) => $emit('resized', { pKey: areas.key, children: e })" -->
  <Splitpanes
    style="height:100%"
    @resized="(e: any) => emits('resized', { pKey: props.areas.key, children: e })"
    :horizontal="areas.horizontal"
  >
    <template v-for="area in areas.children">
      <Pane
        v-if="!area.__disable"
        v-bind="area.paneProps"
        @add="(e: any) => $emit('add', { position: e, pIsHorizontal: !!areas.horizontal, pKey: areas.key, key: area.key })"
        @rm="$emit('rm', area.key)"
        @detail="$emit('detail', { self: area, parent: areas })"
        @boxDetail="$emit('addContainer', area)"
      >
        <!-- child -->
        <SpArea
          v-if="area?.children?.filter((a: any) => !a.__disable).length"
          :areas="area"
          @add="$emit('add', $event)"
          @rm="$emit('rm', $event)"
          @detail="$emit('detail', $event)"
          @resized="$emit('resized', $event)"
          @addContainer="$emit('addContainer', $event)"
        />

        <template v-else>
          <!-- container -->
          <Container v-if="area.container" :container="area.container" />
          <!-- add container -->
          <div v-else class="flexCCenter h-full">
            <Btn @click="$emit('addContainer', area)">add</Btn>
          </div>
        </template>
      </Pane>
    </template>
  </Splitpanes>
</template>

<script lang="ts">
export default {
  name: "SpArea"
}
</script>
<script lang="ts" setup >
import { Splitpanes, Pane } from '@/components/splitpanes/index';
import Btn from '@/components/Btn.vue';
import containers from '@/plugin/container/index'
import Container from './Container.vue';

const props = defineProps({
  areas: {
    type: Object,
    default: [],
  }
});

const emits = defineEmits(['add', 'rm', 'resized', 'detail', 'boxDetail', 'addContainer']);
</script>

