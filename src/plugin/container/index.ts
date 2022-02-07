import Flex from './flex/index.vue';
import flexProps from './flex/props';

import Div from './div/index.vue';
import divProps from './div/props';

export default {
  "Div": {
    label: 'Div',
    component: Div,
    props: divProps,
    desc: "普通div，没有任何样式"
  },
  "FlexCenter": {
    label: 'FlexCenter', // 选择展示
    component: Flex,
    props: flexProps,
    desc: "flex 布局，上下左右都居中"
  },
}

