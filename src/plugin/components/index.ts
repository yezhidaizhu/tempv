import Title from './title/index.vue';
import titleProps from './title/props';

import Num from './number/index.vue';
import numProps from './number/props';

// 组件
export default {
  "Title": {
    label: 'Title',
    component: Title,
    props: titleProps,
    desc: "展示title，一般用于最上面"
  },
  "Num": {
    label: 'Num',
    component: Num,
    props: numProps,
    desc: "滚动数据"
  },

}