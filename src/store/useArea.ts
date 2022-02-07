import { defineStore } from "pinia";
import { uid } from "uid";

export default defineStore('areas', {
  state: (): {
    areas: Child
  } => ({
    areas: {
      "key": "root",
      "created": new Date().toLocaleString(),
      "horizontal": false,
      "children": [],
    }
  }),
  actions: {
    onAddRootFirstChild() {
      //@ts-ignore
      this.areas.children.push(createChildBaseInfo());
    },
    onAddPane(e: any) {
      const { pIsHorizontal, pKey, position, key } = e;
      const child = createChildBaseInfo();
      const isRightOrTopPosotion = ['r', 'b'].includes(position);
      const parentObj = this.queryAreaByKey(pKey);

      // 父级布局（水平或垂直）方向是否与当前添加的方向相同
      if (pIsHorizontal === isHPosition(position)) {
        if (parentObj.children) {
          const index = parentObj.children.findIndex((child: Child) => child.key === key);
          index !== -1 && parentObj.children.splice(isRightOrTopPosotion ? index + 1 : index, 0, child)
        } else {
          parentObj.children = [child];
        }
      } else {
        const _self = this.queryAreaByKey(key);

        // 不一样，则添加新的 Splitpanes
        const node = {
          ...createChildBaseInfo(),
          horizontal: isHPosition(position),
          children: [
            {
              ..._self,
            },
            {
              ...createChildBaseInfo()
            }
          ]
        };
        const childNode = parentObj.children.find((child: Child) => child.key === key);
        if (childNode) {
          Object.assign(childNode, node)
        }

      }
    },
    onRemovePane(paneKey: string) {
      const obj = this.queryAreaByKey(paneKey);
      obj.__disable = 1
    },
    onResized(sp: any) {
      const { pKey, children } = sp;
      const parentObj = this.queryAreaByKey(pKey);

      if (parentObj?.children?.filter((c: Child) => !c.__disable).length === children.length) {
        for (let i = 0, len = 0, clen = children?.length, plen = parentObj.children.length; i < plen || len > clen; i++) {
          const paneProps = children[len];
          if (parentObj.children[i].__disable) continue;
          Object.assign(parentObj.children[i], { paneProps });
          len++;
        }
      }
    },
    // 根据 key，替换对象
    onReplaceObjByKey({ area, key = "" }: { area: Child, key?: string }) {
      const _key = key || area?.key

      const thisArea = this.queryAreaByKey(_key);
      if (thisArea) {
        for (const key in thisArea) {
          if (Object.prototype.hasOwnProperty.call(thisArea, key)) {
            delete thisArea[key];
          }
        }
        Object.assign(thisArea, area);
      }
    },
    // 添加容器
    onAddContainer({ area, container, cb }: { area: Child, container: Container, cb: Function }) {
      const key = area?.key;
      const _area = this.queryAreaByKey(key);
      _area.container = container;
      cb?.();
    },
    // 根据key查找area
    queryAreaByKey(key: string) {
      return parseJson(this.areas, 'key', key);
    },
    // 根据 compKey 查找组件
    queryCompByKey(key: string) {
      return parseJson(this.areas, 'compKey', key);
    },
    // 修改组件props
    setCompProps(compKey: string, propName: string, value: any) {
      const comp = this.queryCompByKey(compKey);
      if (comp.props) {
        Object.assign(comp.props, { [propName]: value })
      };
    }
  },
  persist: true,
});

// 对象中查找pane
function parseJson(jsonObj: any, key: string, value: any): any {
  // 循环所有键
  for (let v in jsonObj) {
    let element = jsonObj[v]
    // 1.判断是对象或者数组
    if (typeof (element) == 'object') {
      let result = parseJson(element, key, value)
      if (result) return result
    } else {
      if (v == key) {
        if (element == value) return jsonObj
      }
    }
  }
}

// 是否为水平添加
function isHPosition(position: string) {
  return ['t', 'b'].includes(position)
}

// 创建Pane基本数据
function createChildBaseInfo() {
  return {
    key: uid(),
    created: new Date().toLocaleString(),
  }
}



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