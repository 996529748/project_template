import { resolve } from "path";
import router from "./router/index";
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

const env = process.env;

console.log("env.buildDir", env.buildDir);

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // 自定义路由信息
  router,
  // build打包所在的文件夹名称
  buildDir: env.buildDir || ".nuxt",
  // 自定义头部信息
  head: {
    meta: [
      { "http-equiv": "Cache-Control", content: "no-transform" },
      { "http-equiv": "Cache-Control", content: "no-siteapp" },
      { name: "applicable-device", content: "pc" },
      { charset: "utf-8", hid: "charset" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // {
      //   rel: "stylesheet",
      //   href: "xxxxxx/elemebt/theme-chalk/index.css",
      // },
    ],
    // 全局注入脚本, 如下:
    script: [
      // { src: "https://cdn.xxxx.cn/xxx/xx/element" },
    ],
  },

  // 禁用页面加载效果：https://www.nuxtjs.cn/api/configuration-loading
  // loading: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ['assets/Css/common/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/poly", // 添加babel
    "@/plugins/element-ui",
    "@/utils/filter",
    "@/utils/prototype",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxt/postcss8",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "nuxt-ssr-cache",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true,
    postcss: {
      plugins: {
        autoprefixer: {
          overrideBrowserslist: ["> 1%", "last 1 versions", "ie >= 10"],
        },
      },
    },
    // 需要编译的外部包
    transpile: [
      // 内置模块
      "ansi-regex",
      "strip-ansi",
      "yallist",
      // 外部包
      "lru-cache", // 缓存系统
      "js-beautify", // html字符美化工具
      "md5",
      "cheerio", // html解析工具库
    ],
    // 分离css样式到外部文件：https://nuxtjs.org/docs/configuration-glossary/configuration-build/#extractcss
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    // 注入scss全局变量：https://juejin.cn/post/6844904029554753549
    extend(config, { isClient }) {
      // config.module.rules.push({
      //   test: /\.scss$/i,
      //   loader: 'sass-resources-loader',
      //   options: {
      //     // Provide path to the file with resources
      //     resources: './assets/Css/common/variables.scss',
      //   },
      // });
      if (isClient) {
        // TODO: cdn使用当前存在问题
        config.externals = {
          // vue: "Vue",
          // vuex: "Vuex",
          // axios: "axios",
          // "element-ui": "ELEMENT",
          // vant: "vant",
        };
      }
      if (process.dev && process.client) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    // 注入scss全局变量styleResources
    babel: {
      babelrc: false,
      presets({ envName }) {
        const envTargets = {
          client: { browsers: ["> 1%", "last 1 versions", "ie >= 10"] },
          server: { node: "current" },
        };
        return [
          [
            "@nuxt/babel-preset-app",
            {
              targets: envTargets[envName],
            },
          ],
        ];
      },
      plugins: [
        "@babel/plugin-transform-runtime",
        // element按需引入
        // [
        //   "component",
        //   {
        //     libraryName: "xxx",
        //     styleLibraryName: "theme-chalk",
        //   },
        // ],
      ],
    },

    vendor: ["babel-polyfill"],
  },

  // 定义路径别名
  alias: {
    src: resolve(__dirname, "./"),
    components: resolve(__dirname, "./components"),
    common: resolve(__dirname, "./common"),
    api: resolve(__dirname, "./api"),
    assets: resolve(__dirname, "./assets"),
    layouts: resolve(__dirname, "./layouts"),
    image: resolve(__dirname, "./assets/image"),
    style: resolve(__dirname, "./assets/style"),
    pages: resolve(__dirname, "./pages"),
    plugins: resolve(__dirname, "./plugins"),
    config: resolve(__dirname, "./config"),
    mixins: resolve(__dirname, "./mixins"),
    utils: resolve(__dirname, "./utils"),
    store: resolve(__dirname, "./store"),
  },

  // 服务器中间件
  serverMiddleware: [
    // "~/utils/serverMiddleware/pageCache.js",
    // "~/utils/serverMiddleware/snapshot.js",
  ],

  devtool: "#source-map",
};
