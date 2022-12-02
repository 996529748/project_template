import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins";
import "./utils";
Vue.config.productionTip = false;
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
