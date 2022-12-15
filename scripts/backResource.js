const path = require("path");
const Common = require("./common");

const packageAddr = path.resolve(__dirname, "../.nuxt/dist/client");
const backupAddr = path.resolve(__dirname, "../.backup");
const temporaryAddr = path.resolve(__dirname, "../temporaryAddr");

// clearFile(backupAddr);

// fs.mkdirSync(backupAddr);

const runtime = async () => {
  console.log("dist包备份到临时文件");
  await Common.copyFolder(packageAddr, temporaryAddr);

  console.log("回填上一个版本的代码");
  await Common.copyFolder(backupAddr, packageAddr);

  console.log("========== 删除backup内容 ==========");
  Common.clearFile(backupAddr);

  console.log("覆盖上个版本的代码");
  await Common.copyFolder(temporaryAddr, backupAddr);

  // 删除临时文件
  console.log("========== 完成备份，开始删除临时文件 ==========");
  Common.clearFile(temporaryAddr);
  console.log("备份成功");
};

runtime();
