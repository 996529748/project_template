### 目录结构

```
|= app 应用内容
|=== api 外部接口, 用axios来向外请求
|=== config 全局的一些参数配置
|=== routes 接口开发
|=== services 服务所用到的数据库操作
|=== types 类型文件
|=== utils 通用方法
|=== app.ts 应用的入口文件
|= assets 静态文件的存储位置
```

### 命令

```
"start": "nodemon ./app/app.ts", // 启动本地开发环境
"build": "ts-node ./app/app.ts", // 使用pm2启动正式环境 ( 使用命令: pm2 start npm --watch --name ServerName -- run build )
"commit": "git-cz" // 提交代码
```

> 需要全局安装nodemon(服务热更新)和git-cz(git提交规范)