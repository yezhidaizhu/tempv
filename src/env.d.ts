/// <reference types="vite/client" />
/// <reference types="naive-ui/es" />

declare module 'splitpanes';

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
