import { createApp } from "vue";
import router from "./router/intercept";
import "lib-flexible/flexible"; //postcss-pxtorem
import "amfe-flexible";
import App from "./App.vue";
import store from "./store";
import directive from "@/utils/directive";
const app = createApp(App);
app.use(router).use(store).use(directive).mount("#app");
// Vue3 全局挂载示例
//app.config.globalProperties.$utils = utils; //没有install方法，vue3的use()会警告,全局挂载
