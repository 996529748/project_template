#! /usr/bin/env node
const { program } = require('commander')
const { version } = require('../package.json')
const creatProject = require('../lib/create.js')
// 通过conmand 自定义命令行消息指令：
// 创建项目
program
    // 定义命令
    .command('create [name]')
    // 定义描述
    .description('create a new project')
    // 定义别名
    .alias('crt')
    // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
    .option('-f, --force', 'overwrite target directory if it exist')
    // 定义命令处理方法
    .action((name, options) => {
        //项目名为空
        if(!name){
            console.log(`\r\n   Create Error: Try using the command [liu-cli create projectName] \r\n`)
        }else{
            // 该方法接受一个回调函数，回调函数的参数名称就是我们前面定义的参数
            // 处理函数，定义在外部
            creatProject(name, options)
        }
    })

// .version() 方法用于设置版本号，当在命令行中执行 --version 或者 -V 时，显示的版本
// .parse() 用于解析命名行参数，默认值为 process.argv * 重要
program.version(version).parse()