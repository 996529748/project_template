const webpack = require("webpack");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");
const glob = require('glob');
const resolve = dir => path.join(__dirname, dir);
const package = require('./package.json');
const version = package.version;
const IS_PROD = ["production", "productionMultiPage", "productionTest"].includes(process.env.NODE_ENV);
const IS_PROD_RELEASE = ["productionRelease"].includes(process.env.NODE_ENV);
const IS_PROD_MULTI_PAGE = ["productionMultiPage"].includes(process.env.NODE_ENV);
const IS_DEV_MULTI_PAGE = ["developmentMultiPage"].includes(process.env.NODE_ENV);
const pagesInfo = require('./pages.config');
const pages = {};
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
//多页面打包配置
glob.sync('./src/pages/**/main.js').forEach(entry => {
  let chunk = entry.match(/\.\/src\/pages\/(.*)\/main\.js/)[1];
  const curr = pagesInfo[chunk];
  if (curr) {
    pages[chunk] = {
      entry,
      ...curr,
      chunk: ["chunk-vendors", "chunk-common", chunk]
    }
  }
})
module.exports = {
  publicPath: IS_PROD_RELEASE?`https://cdn.foxitreader.cn/${package.name}/${package.version}`:"/",
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: require("os").cpus().length > 1,
  pwa: {},
  pages:IS_DEV_MULTI_PAGE || IS_PROD_MULTI_PAGE?pages:undefined,
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          @import "base/scss/variables.scss";
          `
      }
    }
  },
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: "8080",
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target:
          "https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  configureWebpack: config => {
    const plugins = [];
    config.externals = {
      vue: 'Vue',
      vuex: 'Vuex',
      axios: 'axios',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      vant: 'vant'
    };
    if(IS_PROD){
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          analyzerPort: 8091, // 运行后的端口号 可以修改
          generateStatsFile: true,
          statsOptions: { source: false }
        })
      )
    }
    //转换图片格式为webp
    plugins.push(
      new ImageminWebpWebpackPlugin({
        config: [
          {
            test: /\.(jpe?g|png)/,
            options: {
              quality: 75
            }
          }
        ],
        overrideExtension: false
      })
    )

    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack: config => {
    const cdn = {
      css: [
        "https://cdn.foxitreader.cn/vant/2.12.15/vant.min.css",
        'https://cdn.foxitreader.cn/foxit_ui_components/0.1.2/theme-chalk/index.css'
      ],
      js: [
        "https://cdn.foxitreader.cn/vue/2.5.2/vue.min.js",
        "https://cdn.foxitreader.cn/vuex/3.6.0/vuex.min.js",
        "https://cdn.foxitreader.cn/vue-router/3.0.1/vue-router.min.js",
        'https://cdn.foxitreader.cn/axios/0.18.0/axios.min.js',
        'https://cdn.foxitreader.cn/vant/2.12.15/vant.min.js',
        'https://cdn.foxitreader.cn/foxit_ui_components/0.1.2/index.js'
      ]
    };
    if(!IS_DEV_MULTI_PAGE && !IS_PROD_MULTI_PAGE){
      config.plugin("html").tap(args => {
        // html中添加cdn
        args[0].cdn = cdn;
        // 修复 Lazy loading routes Error
        args[0].chunksSortMode = "none";
        args[0].title = 'vue';
        if (IS_PROD) args[0].IS_PROD = IS_PROD
        if (version) args[0].version = version
        return args;
      });
      config.optimization.runtimeChunk({
        name: 'manifest'
      })
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          commons: {
            name: 'chunk-components',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    } else {
      //防止多页面打包卡顿
      config => config.plugins.delete('named-chunks')

      //多页面cdn添加
      Object.keys(pagesInfo).forEach(page => {
        config.plugin(`html-${page}`).tap(args => {
          // html中添加cdn
          args[0].cdn = cdn;

          // 修复 Lazy loading routes Error
          args[0].chunksSortMode = "none";
          return args;
        });
      })
    }
    // 修复HMR
    config.resolve.symlinks(true);

    // config.plugins.delete('preload');
    // config.plugins.delete('prefetch');
    config
      .plugin("ignore")
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      );

    // 添加别名
    config.resolve.alias
      .set("src", "src")
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))
      .set("base", resolve("src/base"))
      .set("api", resolve("src/api"))
      .set("mixins", resolve("src/mixins"))
      .set("config", resolve("src/config"))
      .set("plugin", resolve("src/plugin"))
      .set("utils", resolve("src/utils"))
      .set("class", resolve("src/class"))
      .set("pages", resolve("src/pages"))
      .set("views", resolve("src/views"))

    if (IS_PROD) {
      // 压缩图片
      config.module
        .rule("images")
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.90], speed: 4 },
          gifsicle: { interlaced: false }
        });
      config.module
        .rule("images")
        .test(/\.(jpe?g|png|bmp)$/i)
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, {
          // publicPath: (url, resourcePath, context) => {
          //   return `https://cdn.foxitreader.cn/webCDN/test/img/${url.split(process.platform === "win32" ? "\\" : "/").pop()}`;//"test/img"为图片上传cdn的路径
          // },
          limit:10000,
          name: "[name].[ext]",
        }))
        .end()
    }
    // 使用svg组件
    // const svgRule = config.module.rule("svg");
    // svgRule.uses.clear();
    // svgRule.exclude.add(/node_modules/);
    // svgRule
    //   .test(/\.svg$/)
    //   .use("svg-sprite-loader")
    //   .loader("svg-sprite-loader")
    //   .options({
    //     symbolId: "icon-[name]"
    //   });

    // const imagesRule = config.module.rule("images");
    // imagesRule.exclude.add(resolve("src/icons"));
    // config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);

    return config;
  }
};
