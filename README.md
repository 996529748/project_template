
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# 移动端开发服务（新增了页面调试器）
npm run serveApp

# 多页面开发服务
npm run serveMultiPage

# 多页面打包
npm run buildMultiPage

# 预发布打包（添加打包后资源上传cdn）
npm run buildRelease

# 打包后项目的本地服务
npm run prodServer

# 规范的Git提交说明
npm run commit

# vuepress 文档本地服务
npm run docs:dev

# vuepress 文档打包
npm run docs:build

# 自动创建目录components .vue文件
npm run new:comp

# 自动创建目录common .vue文件
npm run new:comm

# 自动创建目录views .vue文件
npm run new:views

## ui框架
#### 配置
* 可选ui框架为element-ui、vant。
* 在开发时请在vue.config.js打开对应要使用的ui框架的cdn
#### element-ui调用
* 直接使用
``` js
<el-button type="text">文字按钮</el-button>
```
* js里调用例如：ELEMENT.Loading.service(options);
#### vant 调用
* 直接使用
``` js
<van-button type="primary">主要按钮</van-button>
```
* js里调用例如：vant.Toast.loading('提示内容')

## 图片转webp格式的自定义指令
``` js
<img v-webp="testImg" alt="test" />
<i v-webp-bg="testImg"></i>
```

## 使用vuepress
* 使用vuepress需要手动安装 npm i vuepress vuepress-plugin-fulltext-search -D

## eslint 保存自动修复
vscode settings.json配置添加
``` js
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```
## jsconfig.json未生效问题
vscode 设置->搜索jsconfig.json->并勾选重启编辑器
## FAQ
### 启动服务报错
``` js
Error: ENOENT: no such file or directory, scandir xxx/node-sass\vendor
执行cnpm rebuild node-sass
```
## 目录结构

```shell
├── docs  // vuepress文档
│   ├── .vuepress/config.js // vuepress配置文件
│   └── page // .md存放目录
├── newScripts  // 存放自动生成.vue脚本目录
│   ├── generateComponent.js // components目录下自动创建.vue脚本
│   ├── generateCommon.js // common目录下自动创建.vue脚本
│   ├── generateViews.js // views目录下自动创建.vue脚本
│   └── template.js // .vue模版
├── src/api //存放接口文件夹（不同的域名接口创建不同文件存放）
├── src/base  // 公共资源文件夹
│   ├── img // 图片
│   └── scss // 公共scss
          ├── reset.scss // 重制样式
          └── variables.scss // 定义全局变量样式
├── src/common  // 公共组件
├── src/components  // 组件
├── src/config  // 配置文件
├── src/mixins  // 封装公共方法、属性等
├── src/pages  // 多页面目录
├── src/plugins  // 第三方引入
├── src/views  // 页面入口
├── src/store  // vuex
│   ├── modules //vuex 模块
│   ├── index.js //vuex 入口文件
│   └── mutation-types // mutation-types
├── src/router //router
├── src/utils  // 工具函数
│   ├── filter.js // Vue.filter文件
│   ├── util.js // 工具函数文件
│   └── index // 入口文件
```

