const ora = require('ora')
const inquirer = require('inquirer')
const util = require('util')
const downloadGitRepo = require('download-git-repo')
const chalk = require('chalk')
const fs = require('fs-extra');


class Generator {
    constructor(projectName, targetDir) {
        // 目录名称
        this.projectName = projectName;
        // 创建位置
        this.targetDir = targetDir;
        // 改造 download-git-repo 支持 promise
        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }

    // 更新json配置文件
    updateJsonFile = (fileName, obj) => {
        return new Promise(resolve => {
            //判断是否存在该json文件
            if (fs.existsSync(fileName)) {
                //文件读取
                const data = fs.readFileSync(fileName).toString();
                let json = JSON.parse(data);
                //遍历赋值
                Object.keys(obj).forEach(key => {
                    json[key] = obj[key];
                });
                // 同步写入内容:覆盖式写入，后面的内容会将前面的内容覆盖
                // 参数：path，被写入文件的路径（相对路径或绝对路径）
                // data，要写入的内容，字符串格式
                // options：写入文件的参数配置，默认是utf8编码
                fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                resolve();
            }
        });
    }

    // 获取用户选择的模板
    // 1）用户选择自己新下载的模板名称
    // 2）return 用户选择的名称
    async getRepo() {
        // 2）用户选择自己新下载的模板名称
        return await inquirer.prompt([
            {
                name: 'description',
                message: '请输入项目描述：',
            },
            {
                name: 'author',
                message: '请输入项目开发者：',
            },
            {
                type: 'list',
                name: 'name',
                message: '选择开发模板：',
                choices: ['vue3_ts',"gulp4"],
                // 默认值
                default: 'vue3_ts',
            },
        ]).then(async (answer)=>{
            //TODO:根据用户选择类型下载对应模板
            const spinner = ora('请等待模板下载...');
            //远程模板路径
            let url = ''
            switch (answer.name) {
                case 'gulp4':
                    url = 'direct:https://github.com/996529748/template_vue3_mobile.git#gulp4'
                    break;
                case 'vue3_ts':
                    url = 'direct:https://github.com/996529748/template_vue3_mobile.git#vue3_ts_vant_mobile'
                    break;
                default:
                    url = 'direct:https://github.com/996529748/template_vue3_mobile.git#vue3_ts_vant_mobile'
                    break;
            }

            // 开始加载动画
            spinner.start();
            this.downloadGitRepo(url, this.targetDir, { clone: true }, (err)=>{
                if(err){
                    console.log(err);
                    console.log(`\r\n${chalk.bold.underline.bgRed.red("模板下载失败！")}\r\n`);
                    spinner.fail(`${chalk.red('Err：Request failed, refetch')}\r\n`);
                }else{
                    console.log(`\r\n${chalk.bold.underline.bgGreen.green("模板下载完成！")}\r\n`)
                    spinner.succeed(`${chalk.cyan('Success：Request succeed !!!')}\r\n`);
                    //修改项目中的json文件
                    const fileName = `${this.projectName}/package.json`;
                    this.updateJsonFile(fileName, answer)
                }
            })
        })
    }

    // 创建逻辑
    async create() {
        await this.getRepo();
    }
}

module.exports = Generator;