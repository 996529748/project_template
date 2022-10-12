const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const resolve = (...file) => path.resolve(__dirname, ...file);
const log = message => console.log(chalk.green(`${message}`));
const successLog = message => console.log(chalk.blue(`${message}`));
const errorLog = error => console.log(chalk.red(`${error}`));
const { template } = require("./template");
const { appTemplate } = require("./appTemplate");
const inquirer = require("inquirer");
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
inquirer.prompt([
  {
      type: 'list',
      name: 'frame',
      message: '请选择开发模版',
      choices: ['pc', 'app']
  },
  {
      type: 'input',
      name: 'chunk',
      message: '请输入要生成的html名称(注：格式要以xxx或者xxx/xxx)'
  }
]).then(async answer => {
  let templateType = answer.frame;
  let componentDirectory, componentHtmlName, componentCssName, componentScssName, componentCssDirectory,componentScssDirectory, componentJsName, componentJsDirectory, componentName;
    const inputName = String(answer.chunk)
      .trim()
      .toString();
    if (inputName === '') {
      errorLog(`名称不能为空`);
      return;
    }
    if(!inputName.includes("/")){
      componentDirectory = resolve("../src/");
      componentCssDirectory = resolve("../src/css");
      componentScssDirectory = resolve("../src/scss");
      componentJsDirectory = resolve("../src/js");
      componentHtmlName = resolve(componentDirectory, inputName);
      componentCssName = resolve(componentCssDirectory, `${inputName}.css`);
      componentScssName = resolve(componentScssDirectory, `${inputName}.scss`);
      componentJsName = resolve(componentJsDirectory, `${inputName}.js`);
    } else {
      componentDirectory = resolve("../src/", inputName.split("/")[0]);
      componentCssDirectory = resolve("../src/css", `${inputName.split("/")[0]}`);
      componentScssDirectory = resolve("../src/scss", `${inputName.split("/")[0]}`);
      componentJsDirectory = resolve("../src/js", `${inputName.split("/")[0]}`);
      componentHtmlName = resolve(componentDirectory, inputName.split("/")[1]);
      componentCssName = resolve(componentCssDirectory, `${inputName.split("/")[1]}.css`);
      componentScssName = resolve(componentScssDirectory, `${inputName.split("/")[1]}.scss`);
      componentJsName = resolve(componentJsDirectory, `${inputName.split("/")[1]}.js`);
      log(`正在生成 ${componentDirectory}`);
      log(`正在生成 ${componentCssDirectory}`);
      log(`正在生成 ${componentScssDirectory}`);
      log(`正在生成 ${componentJsDirectory}`);
      await dotExistDirectoryCreate(componentDirectory);
      await dotExistDirectoryCreate(componentCssDirectory);
      await dotExistDirectoryCreate(componentScssDirectory);
      await dotExistDirectoryCreate(componentJsDirectory);
    }
    if (inputName.split('/').length > 2) {
      errorLog(`路径错误，请输入要生成的html名称(注：格式要以xxx或者xxx/xxx)`);
      return;
    }
    // 如果不是以 .html 结尾的话，自动加上
    if (!componentHtmlName.endsWith(".html")) {
      componentHtmlName += ".html";
    }
    // // const hasComponentDirectory = fs.existsSync(componentDirectory);
    // // if (hasComponentDirectory) {
    // //   errorLog(`${inputName}组件目录已存在，请重新输入`);
    // //   return;
    // // }
    // fs.mkdirSync(componentDirectory);
    try {
      if (inputName.includes("/")) {
        const inputArr = inputName.split("/");
        componentName = inputArr[inputArr.length - 1];
      } else {
        componentName = inputName;
      }
      log(`正在生成 html 文件 ${componentHtmlName}`);
      if(templateType === 'pc'){
        await generateFile(componentHtmlName, template(componentName, inputName.includes("/")));
      } else {
        await generateFile(componentHtmlName, appTemplate(componentName, inputName.includes("/")));
      }
      await generateFile(componentCssName, '');
      await generateFile(componentScssName, '');
      await generateFile(componentJsName, `$(document).ready(function(){
  function ${componentName.replace(componentName[0], componentName[0].toUpperCase())}(){
    this.test();
  }
  /**
   * [test Handlebars 示例]
   *
   * @return  {[type]}  [return description]
   */
  ${componentName.replace(componentName[0], componentName[0].toUpperCase())}.prototype.test = function(){
    let source = $('#test').html();
    let template = Handlebars.compile(source);
    let html = template('test');
    $('body').html(html);
  };
  new ${componentName.replace(componentName[0], componentName[0].toUpperCase())}();
});
`);
      successLog("生成成功");
    } catch (e) {
      errorLog(e.message);
    }
})
