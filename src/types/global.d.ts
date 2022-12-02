//全局类型
import "vue-router";

//声明路由类型
declare module "vue-router" {
  interface RouteMeta {
    title: string;
    description:string;
    keywords:string
  }
}