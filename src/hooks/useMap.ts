import useDatas from "@/store/useDatas";
import { isArray, isString } from "@/utils/helper";
import { isObject } from "@vue/shared";
import cloneDeep from 'lodash/cloneDeep'

/**
 *  替换和映射 areas 中 props的值
 *  数据类型采用 ${dataName} | ${dataName.foo}
 */

export default function useMap() {
  const { datas, getDatasValueByStrPath } = useDatas();

  const mapReal = (data: any) => {
    const newData = cloneDeep(data);

    const getNewData = (val: any): any => {
      if (isString(val)) {
        return strMapData(val)
      } else if (isArray(val)) {
        return val.map((v) => getNewData(v))
      } else if (isObject(val)) {
        for (const key in val) {
          if (Object.prototype.hasOwnProperty.call(val, key)) {
            val[key] = getNewData(val[key]);
          }
        }
      };
      return val;
    }

    return getNewData(newData);
  }

  // 字符串映射数据
  const strMapData = (str: string) => {
    let retData: any;
    // 查找出 ${dataName} 数据
    str.replace(/\${[.0-9a-z]*}/g, (val) => {
      const strPath = val.slice(2, -1);
      const pathArr = strPath.split(".");

      if (!strPath || !pathArr?.length) return "";
      const data = getDatasValueByStrPath(strPath);

      if (datas[pathArr[0]]) {
        retData = retData === undefined ? data : retData + data;
      };
      return "";
    });

    return retData === undefined ? str : retData;
  }

  return {
    mapReal,
  }

}