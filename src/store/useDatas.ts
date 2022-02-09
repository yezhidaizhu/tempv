import { defineStore } from "pinia";
import { getObjValueByStrPath } from "@/utils/helper";
import useMap from '@/hooks/useMap';

// 现在仅支持的数据形式
export const baseType = ['String', 'Number', 'Boolean', 'Array', 'Object'];

// 数据池
const useDatas = defineStore('datas', {
  state: (): {
    datas: { [x: string]: any }
  } => ({
    datas: {}, // 存储的数据
  }),
  actions: {
    addData(val: { type: DataType, name: string }) {
      const { type, name } = val;
      //@ts-ignore
      let value = baseType.includes(type) ? window[type]?.() : "";
      if (type === "Request") value = {};

      const data: Data = {
        type,
        value: value,
      }

      this.datas[name] = data;
    },
    rmDataByName(name: string) {
      delete this.datas[name];
    },
    setDataValue(name: string, value: any) {
      if (!name || !this.datas[name]) return;
      this.datas[name].value = value;
    },
    // 根据字符串路径获取值，
    // 例如，"foo.a" 则会返回 datas.foo.value.a
    // 用于与useMap一致，映射真实值
    getDatasValueByStrPath(strPath: string) {
      const pathArr = strPath.split(".");
      if (!strPath || !pathArr?.length) return this.datas;
      pathArr.splice(1, 0, 'value');
      return getObjValueByStrPath(this.datas, pathArr.join("."));
    }
  },
  persist: true,
});

export default useDatas;

// 注册请求触发器
useDatas().$subscribe((mutation, state) => {
  // console.log(mutation, state);
  // console.log(state);

  const target = mutation.events.target;

  const datas = state.datas;
  const reqTypeVals: any = [];
  Object.keys(datas).map(k => {
    if (datas[k].type === "Request" && datas[k].value?.trigger?.length) {
      reqTypeVals.push(datas[k])
    }
  });
  const { mapReal } = useMap();

  for (let i = 0; i < reqTypeVals.length; i++) {
    const reqObj = reqTypeVals[i];
    const { value: { trigger = [] } } = reqObj;
    if (trigger?.length) continue;

    for (let j = 0; j < trigger.length; j++) {
      const _trigger = trigger[j];
      // _trigger
    }

  }

});

export const triggerOptions = [
  {
    label: "等于",
    value: "==",
    exec: (leftVal: string, rightVal: string) => { },
  },
  {
    label: "严格等",
    value: "===",
    exec: (leftVal: string, rightVal: string) => { },
  },
  {
    label: "严格不等",
    value: "!==",
    exec: (leftVal: string, rightVal: string) => { },
  },
  {
    label: "大于",
    value: ">",
    exec: (leftVal: string, rightVal: string) => { },
  },
  {
    label: "小于",
    value: "<",
    exec: (leftVal: string, rightVal: string) => { },
  },
  {
    label: "大于等于",
    value: ">=",
    exec: (leftVal: string, rightVal: string) => { },
  },
  {
    label: "小于等于",
    value: "<=",
    exec: (leftVal: string, rightVal: string) => { },
  },
];


type Data = {
  type: DataType,
  value: any | RequestType,
}

type DataType = 'String' | 'Number' | 'Boolean' | 'Array' | 'Object' | 'Request';

type RequestType = {
  url: string,
  method: Method,
  data: { [param: string]: string },
  header: { [param: string]: string },
  trigger?: Array<Trigger>
}

type Trigger = {
  left: any,
  options: string,
  right: any,
}

type Method = "POST" | "GET";
