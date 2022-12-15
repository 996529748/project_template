const fs = require("fs");

function scanDirectory(addr) {
  return new Promise((resolve) => {
    fs.readdir(addr, (err, res) => {
      if (!err) {
        resolve(res.map((d) => `${addr}/${d}`));
      } else {
        fs.mkdirSync(addr);
        resolve(scanDirectory(addr));
      }
    });
  });
}

// 复制文件到.backup目录下
async function copyFolder(addr, targetAddr) {
  await scanDirectory(targetAddr);
  await scanDirectory(addr).then(async (ret) => {
    for (let i = 0; i < ret.length; i++) {
      const path = ret[i];

      try {
        const stat = fs.statSync(path);
        const targetPath = path.replace(addr, targetAddr);

        if (stat.isDirectory()) {
          try {
            fs.readdirSync(targetPath);
          } catch (err) {
            fs.mkdirSync(targetPath);
          }
          await copyFolder(path, targetPath);
        } else {
          try {
            fs.copyFileSync(path, targetPath);
            console.log(`${path}文件复制成功，已复制到到${targetPath}`);
          } catch (err) {
            console.log(`${path}文件复制到${targetPath}时发生错误，错误信息：`);
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
}

// 清空.backup文件夹
const clearFile = (path) => {
  const exist = fs.existsSync(path);
  if (!exist) return;
  const info = fs.statSync(path);
  if (info.isDirectory()) {
    const files = fs.readdirSync(path);
    files.forEach((childFilePath) => clearFile(`${path}/${childFilePath}`));
    fs.rmdirSync(path);
  } else {
    fs.unlinkSync(path);
  }
};

module.exports = {
  scanDirectory,
  copyFolder,
  clearFile,
};
