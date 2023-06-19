import { createApp } from "vue";
import router from "./router/intercept";
import "lib-flexible/flexible"; //postcss-pxtorem
import "virtual:svg-icons-register"; //svg
import App from "./App.vue";
import store from "./store";
import vant from "vant";
import "vant/lib/index.css";
import preReClick from "@/utils/preReClick";

const app = createApp(App);
app.use(router).use(store).use(vant).use(preReClick).mount("#app");

// Vue3 全局挂载示例
//app.config.globalProperties.$utils = utils; //没有install方法，vue3的use()会警告,全局挂载
