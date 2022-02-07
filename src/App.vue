<template>
  <keep-alive>
    <component :is="LayoutComp">
      <n-config-provider :theme="darkTheme" :hljs="hljs">
        <n-message-provider placement="bottom-left">
          <n-dialog-provider>
            <router-view v-slot="{ Component, route }">
              <transition :name="route.meta.transition || 'fade'" mode="out-in">
                <keep-alive :include="pageStore.keepAliveList" exclude="['Godemo2']">
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </n-dialog-provider>
        </n-message-provider>
      </n-config-provider>
    </component>
  </keep-alive>
</template>

<script setup>
import usePage from './store/usePage'
import LayoutComps from './Layout/index'
import { darkTheme } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'

hljs.registerLanguage('typescript', typescript)

const pageStore = usePage();

const LayoutComp = computed(() => LayoutComps[pageStore.layout] ?? 'div');

</script>
