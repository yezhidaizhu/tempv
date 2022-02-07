import { defineStore } from "pinia";
import { uid } from "uid";

export const baseType = ['String', 'Number', 'Boolean', 'Array', 'Object'];

// 数据池
export default defineStore('datas', {
  state: (): {
    datas: Array<Data>
  } => ({
    datas: [],
  }),
  actions: {
    addData(val: { type: string, name: string }) {
      const { type, name } = val;
      //@ts-ignore
      const value = baseType.includes(type) ? window[type]?.() : "";
      const data: Data = {
        key: uid(5),
        type,
        name,
        value: "",
      }
      this.datas.push(data)
    },
    rmDataByIndex(index: number) {
      this.datas.splice(index, 1)
    },
    rmDataByKey(key: string) {
      const index = this.datas.findIndex(d => d.key === key);
      if (index != -1) this.rmDataByIndex(index);
    },
  },
  persist: true,
});



type Data = {
  key: string,
  type: string,
  name: string,
  value?: any,
}

