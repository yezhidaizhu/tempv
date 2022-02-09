import { defineStore } from "pinia";
import { uid } from "uid";

// 现在仅支持的数据形式
export const baseType = ['String', 'Number', 'Boolean', 'Array', 'Object'];

// 数据池
export default defineStore('datas', {
  state: (): {
    datas: { [x: string]: any }
  } => ({
    datas: {}, // 存储的数据
  }),
  actions: {
    addData(val: { type: string, name: string }) {
      const { type, name } = val;
      //@ts-ignore
      const value = baseType.includes(type) ? window[type]?.() : "";
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
    }
  },
  persist: true,
});



type Data = {
  type: string,
  value: any,
}
