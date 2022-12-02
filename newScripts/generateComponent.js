// generateComponent.js`
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const resolve = (...file) => path.resolve(__dirname, ...file);
const log = message => console.log(chalk.green(`${message}`));
const successLog = message => console.log(chalk.blue(`${message}`));
const errorLog = error => console.log(chalk.red(`${error}`));
const { vueTemplate } = require("./template");

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`);
    return;
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, "utf8", err => {
      if (err) {
        errorLog(err.message);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
// 递归创建目录
function mkdirs(directory, callback) {
  let exists = fs.existsSync(directory);
  if (exists) {
    callback();
  } else {
    mkdirs(path.dirname(directory), function() {
      fs.mkdirSync(directory);
      callback();
    });
  }
}
function dotExistDirectoryCreate(directory) {
  return new Promise(resolve => {
    mkdirs(directory, function() {
      resolve(true);
    });
  });
}
log(
  "请输入要生成的组件名称(注：格式要以xxx/xxx)、如需生成全局组件，请加 global/ 前缀"
);
let componentName = "";
process.stdin.on("data", async chunk => {
  const inputName = String(chunk)
    .trim()
    .toString();
  /**
   * 组件目录路径
   */
  const componentDirectory = resolve(
    "../src/components",
    inputName.split("/")[0]
  );

  /**
   * Vue页面组件路径
   */
  let componentVueName = resolve(componentDirectory, inputName.split("/")[1]);
  // 如果不是以 .vue 结尾的话，自动加上
  if (!componentVueName.endsWith(".vue")) {
    componentVueName += ".vue";
  }
  // const hasComponentDirectory = fs.existsSync(componentDirectory);
  // if (hasComponentDirectory) {
  //   errorLog(`${inputName}组件目录已存在，请重新输入`);
  //   return;
  // }
  log(`正在生成 component 目录 ${componentDirectory}`);
  await dotExistDirectoryCreate(componentDirectory);
  // fs.mkdirSync(componentDirectory);

  try {
    if (inputName.includes("/")) {
      const inputArr = inputName.split("/");
      componentName = inputArr[inputArr.length - 1];
    } else {
      componentName = inputName;
    }
    log(`正在生成 vue 文件 ${componentVueName}`);
    await generateFile(componentVueName, vueTemplate(componentName));
    successLog("生成成功");
  } catch (e) {
    errorLog(e.message);
  }

  process.stdin.emit("end");
});
process.stdin.on("end", () => {
  log("exit");
  process.exit();
});
