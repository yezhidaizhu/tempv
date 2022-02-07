import useArea from "@/store/useArea";

export default () => {
  // const areaStore = useArea();
  // const drawer = ref(true);
  // const curArea = ref(areaStore.areas.children[0].children[0]);

  const drawer = ref(false);
  const curArea = ref({});

  const onShowContainerConfig = (data?: any) => {
    curArea.value = data;
    drawer.value = true;
  };

  return {
    drawer,
    curArea,
    onShowContainerConfig,
  }
}