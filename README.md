
# install dependencies
npm install

# serve with hot reload at localhost:8080
gulp browser-sync

# build for production with minification
gulp buildAll

# 生成html、js、css
npm run new:html

# 规范的Git提交说明
npm run commit

# 生成html、js、css
npm run new:html

## 注：node版本要不低于12，请使用npm安装依赖，使用cnpm的包可能会导致git-cz的配置读取不到

## 目录结构

```shell
├── src/js
│   └── common // 插件 or 第三方库
├── src/css
│   └── common // 公共css or 第三方库样式
├── src/images  // 图片
├── src/js  // 脚本
├── src/es5  // es5语法脚本  gulp自动生成
└── src/scss  // scss  gulp自动编译成css
```