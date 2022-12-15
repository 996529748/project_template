// pm进程守护的配置
module.exports = {
  apps: [
    {
      name: "CLOUD_OFFICE_WORKBENCH", // 应用名称
      // eslint-disable-next-line camelcase
      exec_mode: "cluster",
      // 开启的进程数
      instances: 3, // Or a number of instances
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
    },
  ],
};
