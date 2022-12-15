# NUXT_TEMPLATE

对于全局的plugin, middleware, serverMiddleware配置可以在nuxt.config和router中选择配置

### plugin 插件

1. poly babel-polyfill导入, 用来处理浏览器兼容


### mixins
1. seo 通用的seo头部设置

### middleware 中间件
1. redirectUri url地址尾部封闭(加 '/')

### utils 公共方法
1. filter 用来定义全局的filter
2. prototype 注册了全局的bus, 用来定义挂载在vue实例上的全局方法
3. utils 定义的公共方法


### utils/serverMiddleware 服务器中间件
1. apiCache 初始化一个api缓存器
2. pageCache 初始化一个页面缓存器并配置页面缓存逻辑

### api 接口服务
1. interceptors 定义请求拦截

### newScripts 新建文件目录的命令

### 快照服务
为了处理服务端重启时ssr项目无法正常访问的情况，新增了快照模块，可以通过配置快照服务(config/snapshot.js)来返回快照
```javascript
// 用来判断服务是否可以访问的接口(事先与服务端沟通是否可以使用该接口判断服务状态)
const APIURL = `https://xxxapi.xxx.cn/xxx?`;
// 需要缓存的页面(要求该页面需要展示的内容都做ssr的数据预加载)
const HomePageURL = `xxxxxxxxxxxxxxxxxx`;
// 缓存页面所用到的静态资源的所属域名(ssr服务的静态资源域名)
const PageDomain = `xxxxxxxxxxxxxxxxx`;
// 快照文件位置(一般不需要修改)
const SnapshotDir = `./servers/snapshot/homePage.html`;
// 快照间隔时间(规定多长时间去抓取一次快照)
const SnapshotIntervalTime = 1000 * 60 * 5;
```

### 启用快照服务
```
npm run snapshot:prod 启动快照服务(只需要启动一次)

在nuxt.config中启用snapshot服务器中间件

需要自定义配置可以到config/snapshot文件中配置上述内容
```

### script命令
```javascript
// 在5050端口启动服务
"dev": "nuxt --port 5050",
// 使用backDist打包命令实现无痕刷新页面(建议使用)
"build": "cross-env buildDir=.nuxt-dist nuxt build && npm run backDist && pm2 start",
// 打包并使用pm2启动项目
"build:start": "nuxt build && pm2 start",
// 打包并启动
"build:test": "nuxt build && nuxt start",
// 启动打包的项目
"start": "nuxt start",
// 静态化部署
"generate": "nuxt generate",
// 使用git-cz提交
"commit": "git-cz"
// component目录下新建组件
"new:comp": "node ./newScripts/generateComponent",
// common目录下新建组件
"new:comm": "node ./newScripts/generateCommon",
// 新建页面
"new:pages": "node ./newScripts/generatePages",
// 添加备份文件（文件保存在.backup文件夹下）
"backup": "node ./backScript/backResource.js"
// 调试快照服务
"snapshot:dev": "nodemon ./servers/snapshot.js",
// 启动快照服务(多个快照服务存在时需要更换pm2应用应用名称)
"snapshot:prod": "pm2 start ./servers/snapshot.js --name snapshot"
```

> 请使用npm安装依赖，使用cnpm的包可能会导致git-cz的配置读取不到(要求node版本大于10.23.0)
