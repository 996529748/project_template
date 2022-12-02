import router from "./index";

router.beforeEach((to, from, next) => {
  console.log(`进入路由拦截`);
  next();
});

export default router;
