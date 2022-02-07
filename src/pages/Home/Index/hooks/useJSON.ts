import useArea from '@/store/useArea';

const drawerDefaultWidth = "600px";

export default () => {
  const areaStore = useArea();

  const drawer = ref(false);
  const drawerWidth = ref(drawerDefaultWidth);

  const jsonData = ref({});
  const showJsonData = (data?: any) => {
    jsonData.value = !data ? { root: areaStore.areas } : data;
    drawer.value = true;
  }

  const chgDrawerSize = (size = "") => {
    size = size || drawerDefaultWidth;
    drawerWidth.value = size;
  }

  return {
    drawer,
    drawerWidth,
    chgDrawerSize,
    jsonData,
    showJsonData,
  }
}