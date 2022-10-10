import { createApp } from 'vue'
import router from './router/intercept'
import 'lib-flexible/flexible'//postcss-pxtorem
import createMetaManager from './plugins/vue-meta'
import utils from './utils/utils'
import 'amfe-flexible'
import App from './App.vue'
import store from './store'
const app = createApp(App)
app.use(router).use(createMetaManager).use(store).mount('#app')
// Vue3 全局挂载
app.config.globalProperties.$utils = utils;