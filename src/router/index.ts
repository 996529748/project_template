import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "./index",
  },
  {
    path: "/index",
    name: "index",
    component: () => import("view/index/index.vue"),
    meta: {
      title: "This is a demo",
      description: "This is a demo",
      keywords: "This is a demo",
    },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
