import lkp from "./lkp";
import { App } from "vue";

export default (app: App) => {
  app.directive('lkp', lkp)
}