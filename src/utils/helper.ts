
// 类型字符串 String,Number,Boolean,Object,Array
export function baseTypeStr(type: any) {
  if (typeof type === "string") return type;
  const typeStr = type + "";
  return typeStr.slice(9, typeStr.split("").findIndex(x => x == '('))
}

// 根据基本类型与默认值，获取展示的字符串 String,Number,Boolean,Object,Array
export function getDefaultStr(prop: { type: Function | string, default?: any }) {
  const { type, default: defaultValue } = prop;

  if ((typeof type == 'string' && ['Object', 'Array'].includes(type))
    || (typeof type !== 'string' && baseTypeStr(type) === 'Object')) {
    return JSON.stringify(typeof defaultValue == 'function' ? defaultValue() : defaultValue)
  }

  if (baseTypeStr(type) === 'Boolean') {
    return defaultValue === false ? 'false' : defaultValue ? 'ture' : '';
  }

  return defaultValue ?? JSON.stringify(defaultValue);
}

/**
 * 获取类型字符串 String,Number,Boolean,Object,Array
 * @param type String,Number,Boolean,Object,Array
 * @returns 类型字符串
 */
export function getPropsTypeStr(type: any) {
  const typeStr = type + ""
  if (typeof type === typeof Array) {
    return typeStr.slice(9, typeStr.split("").findIndex(x => x == '('))
  } else if (({}).toString.call([]) == ({}).toString.call(type)) {
    return '[ ' + type.map((t: any) => getPropsTypeStr(t)).join(", ") + ' ]';
  }
  return typeStr
}

export const isString = (val: any) => typeof val === 'string';
export const isArray = Array.isArray;
export const isObject = (val: any) => val !== null && typeof val === 'object';
export const isBoolean = (val: any) => typeof val === 'boolean';
export const isDate = (val: any) => val instanceof Date;

