import { LayoutNames } from "@/Layout";

export default [
  {
    path: '/',
    component: () => import("./Index/Home.vue"),
    meta: {
      title: "Home",
    }
  },
  // {
  //   path: '/demo2',
  //   component: () => import("./Index/Demo2.vue"),
  //   meta: {
  //     title: "Demo",
  //     layout: LayoutNames.demo,
  //   }
  // },
];

