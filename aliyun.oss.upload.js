#!/usr/bin/env node

const WebpackAliyunOss = require("webpack-aliyun-oss");
const inquirer = require("inquirer");
const chalk = require("chalk");
const OSS = require("ali-oss");
const path = require("path");
const package = require("./package.json");

inquirer
  .prompt([
    {
      type: "rawlist",
      name: "operateType",
      message: "选择操作类型：",
      choices: [
        { name: "上传", value: "1" },
        { name: "删除", value: "2" },
      ],
    },
    {
      type: "input",
      name: "deletePath",
      message: "需要删除的路径：",
      suffix: "多个完整路径(用,隔开) 例：webCDN/test/1.png,webCDN/test2/2.png",
      validate(input) {
        if (input === "") {
          return "请输入需要删除的完整路径";
        }
        return true;
      },
      when(answers) {
        return answers.operateType === "2";
      },
    },
    {
      type: "rawlist",
      name: "uploadType",
      message: "选择上传类型：",
      choices: [
        { name: "公共资源 (例：第三方库 vue)", value: "1" },
        { name: "项目文件", value: "2" },
      ],
      when(answers) {
        return answers.operateType === "1";
      },
    },
    {
      type: "input",
      name: "libName",
      message: "库名：",
      suffix: "( 例：vue )",
      validate(input) {
        if (input === "") {
          return "请输入库名";
        }
        return true;
      },
      when(answers) {
        return answers.operateType === "1" && answers.uploadType === "1";
      },
    },
    {
      type: "input",
      name: "version",
      message: "版本号或路径：",
      suffix: "( 例：2.0.0 或 2.0.0/js )",
      validate(input) {
        if (input === "") {
          return "请输入版本号或路径";
        }
        return true;
      },
      when(answers) {
        return answers.operateType === "1" && answers.uploadType === "1";
      },
    },
    {
      type: "input",
      name: "project",
      message: "项目名称或路径：",
      suffix: "例：vip 或 vip/img (默认取package.json的name和version)",
      default: `${package.name}/${package.version}`,
      validate(input) {
        if (input === "") {
          return "请输入项目名称或路径";
        }
        return true;
      },
      when(answers) {
        return answers.operateType === "1" && answers.uploadType === "2";
      },
    },
    {
      type: "input",
      name: "from",
      message: "上传哪些文件：",
      suffix: "glob形式，( 例：./build/**,./test.png 多个用,隔开 )",
      validate(input) {
        if (input === "") {
          return "请输入上传路径";
        }
        return true;
      },
      when(answers) {
        return answers.operateType === "1" && answers.uploadType === "2";
      },
    },
    {
      type: "confirm",
      message: "是否覆盖同名文件：",
      suffix: "( 默认否 )",
      name: "overwrite",
      default: false,
      when(answers) {
        return answers.operateType === "1";
      },
    },
  ])
  .then(answers => {
    const bucket = "cdn-foxitreader-cn",
      region = "oss-cn-hangzhou",
      accessKeyId = "LTAI5tMzfNh4JC1F7fZP3Lgp",
      accessKeySecret = "MjYtWQ9p98vlUBYLT1tTgqeqURrq4p";
    const {
      operateType,
      deletePath = "",
      libName = "",
      version = "",
      project = "",
      uploadType = "",
      from = "",
      overwrite = "",
    } = answers;
    // 删除操作
    if (operateType === "2") {
      // https://help.aliyun.com/document_detail/111408.html  alioss node.js jsdk文档
      const client = new OSS({
        bucket,
        region,
        accessKeyId,
        accessKeySecret,
      });
      deletePath.split(",").forEach(async item => {
        try {
          await client.head(item);
          // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
          let result = await client.delete(item);
          const {
            res: { status = 200, statusMessage = "ok" },
            deleted = {},
          } = result;
          // console.log("删除==>", result);
          console.log(chalk.bold(`  ${item} 删除完成 => `), {
            status,
            statusMessage,
            deleted,
          });
        } catch (error) {
          if (error.code === "NoSuchKey") {
            console.log(chalk.red(`>> 文件：${item} 不存在！`));
          } else {
            console.log(chalk.red(`>> 删除未知错误：${error}`));
          }
        }
      });
      // 批量删除
      // async function deleteFile(deletePath) {
      //   try {
      //     // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
      //     let result = await client.deleteMulti(deletePath);
      //     const {
      //       res: { status = 200, statusMessage = "ok" },
      //       deleted = {},
      //     } = result;
      //     // console.log("删除==>", result);
      //     console.log(chalk.bold("  删除完成 => "), {
      //       status,
      //       statusMessage,
      //       deleted,
      //     });
      //   } catch (e) {
      //     console.log(e);
      //   }
      // }
      // deleteFile(deletePath.split(","));
    }
    // 上传操作
    else {
      let urlSuffix =
        uploadType === "1" ? `${libName}/${version}` : `${project}`;
      console.log(
        `${chalk.bold("  最终上传CDN路径 => ")}${chalk.green.underline(
          `https://cdn.foxitreader.cn/webCDN/${urlSuffix}/`,
        )}${chalk.cyan(" + 文件名")}`,
      );
      new WebpackAliyunOss({
        from: from.split(","),
        timeout: 600000, // 超时时间
        // from: ["./dist/**", "!./dist/**/*.html"],
        dist: "/webCDN/",
        region,
        accessKeyId,
        overwrite, // 是否覆盖同名文件，默认否并提示已存在忽略上传
        // test: true, // 调试模式
        accessKeySecret,
        bucket,
        logToLocal: true,
        setOssPath(filePath) {
          // 去除当前工作目录路径
          return `/${urlSuffix}${filePath.replace(process.cwd(), "")}`;
        },
      }).apply();
    }
  });
