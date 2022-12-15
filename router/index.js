export const createRouter = (resolve) => [
  // 首页
  {
    path: "/",
    name: "home",
    component: resolve(__dirname, "../pages/index/index.vue"),
    meta: {},
  },
  {
    path: "/404",
    name: "404Page",
    component: resolve(__dirname, "../pages/404/404.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

// 清除原有的Nuxt自动生的路由，添加自己的新路由
const extendRoutes = (routes, resolve) => {
  routes.length = 0;
  routes.push(...createRouter(resolve));
};

// 为路由添加中间件
export default { extendRoutes, middleware: ["redirectUri"] };
