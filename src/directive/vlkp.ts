import useArea from "@/store/useArea";

// link prop
// 将修改的数据直接修改到 areas 数据中指定的 组件中 props 中 (根据compKey查找组件)
// 在 plugin/components 的组件中使用
// 根据 arg 获取 prop, $attrs 中获取 compKey
// eg: <div v-lkp:title />

export default {
  mounted: (el: HTMLHtmlElement, binding: any) => {
    const { arg, instance: { $attrs } } = binding;
    const propName = arg;
    const compKey = $attrs.compKey;

    if (!compKey) return;

    const areaStore = useArea();
    const { setCompProps } = areaStore;

    el.setAttribute("contenteditable", "true");

    el.onblur = () => {
      const value = el.innerText;
      setCompProps(compKey, propName, value);
    }
  }

}