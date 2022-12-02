import Vue from "vue";
import Router from "vue-router";
const index = (resolve) => {
  import("views/index/index").then((module) => {
    resolve(module);
  });
};

const notFoundComponent = (resolve) => {
  import("views/notFoundComponent/notFoundComponent").then((module) => {
    resolve(module);
  });
};
if (!window.VueRouter) Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      component: index,
      name: "index",
      children: [],
    },
    {
      path: "*",
      component: notFoundComponent,
    },
  ],
});
