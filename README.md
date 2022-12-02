# 简介

Vue 3 + Typescript + Vite 移动端开发模板，已配置了4K等大屏兼容及px转rem

## 提交规范

全局安装 git-cz

请使用 npm run commit 进行提交

相关提交类型文档请参阅 .cz-config.js

## 准备

1、熟悉Vite、Vue语法

2、熟悉TypeScript基本语法

3、ES6+

4、Vant

## 项目运行

```
版本匹配：
node：14.18.0 
```

```
npm install
```

```
npm run dev
```

# 项目布局

```shell
├── api  // api
│   ├── baseUrlConfig.ts // api基路径配置
│   ├── home.ts // 封装的api文件
├── assets  // 静态资源存储
│   ├── images // 图片
│   ├── scss   // scss文件
├── axios  // axios
│   ├── axios.ts // 基础配置
│   ├── customInterceptors.ts // 响应拦截封装
│   ├── errCode.ts // 错误信息
│   ├── type.ts // 类型
├── common // 公共组件
├── components // 页面组件
├── config // 本地配置
├── hook // hook
│   ├── useMeta.ts // TDK写入hook
├── plugins // 第三方配置
│   ├── vant-configProvider-config.ts // vant主题
│   ├── vant-variables.scss // 全局主题色
├── router // 路由
│   ├── index.ts // 路由配置
│   ├── intercept.ts // 路由拦截器
├── store // pinia
│   ├── index.ts // 入口
├── types // 项目类型
│   ├── api.d.ts // 接口类型
│   ├── global.d.ts // 全局类型
├── utils // 工具函数
│   ├── tools.ts // 自定义
│   ├── utils.ts // 自定义
├── view // 页面
└──
```