type Child = {
  key: string,
  created?: Date | string,
  horizontal?: Boolean,
  children?: Array<Child>,
  __disable?: number,
  container?: Container
}

type Container = {
  name: string,
  props?: object,
  components?: Array<{
    name: string,
    props?: object,
  }>
}