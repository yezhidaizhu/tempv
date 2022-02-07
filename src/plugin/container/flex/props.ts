export default {
  str: {
    type: String,
    default: "str",
    desc: "这是 str 说明测试"
  },
  num: {
    type: Number,
    default: 10086
  },
  bool: {
    type: Boolean,
    default: false
  },
  arr: {
    type: Array,
    default: [1, 2, 3, "66"]
  },
  obj: {
    type: Object,
    default: () => ({}),
  },
  // 以下不支持
  // date: {
  //   type: Date,
  //   default: new Date(),
  // },
  // mixin: {
  //   type: [Number, String],
  // },
  // func: {
  //   type: Function,
  //   default: () => ({}),
  // },
  // sym: {
  //   type: Symbol,
  // }
}