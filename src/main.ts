import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import Router from './router'
import "./theme/index"

import naive from 'naive-ui'

import directive from './directive/index'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

createApp(App)
  .use(Router)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(naive)
  .use(directive)
  .mount('#app')


