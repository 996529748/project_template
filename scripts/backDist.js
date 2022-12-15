const Common = require("./common");
const path = require("path");

const backupAddr = path.resolve(__dirname, "../.nuxt");
const packageAddr = path.resolve(__dirname, "../.nuxt-dist");

const runtime = async () => {
  console.log("复制文件到dist包");
  await Common.copyFolder(packageAddr, backupAddr);
  console.log("清除.nuxt-dist目录");
  await Common.clearFile(packageAddr);
};

runtime();
