import { App } from "vue";

import vlkp from "./vlkp";

export default (app: App) => {
  app.directive('lkp', vlkp)
}