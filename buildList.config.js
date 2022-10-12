module.exports = [{
  pathEntry:'./src/index.html',//需要编译文件（可批量打包 例：pathEntry:'./src/*.html'）
  pathOutput:'dist/',//编译后的html文件目录
  cssCleanEntry:'./dist/css/*.css',//删除多余css文件路径
  jsCleanEntry:'./dist/js/*.js'//删除多余js文件路径
},{
  pathEntry:'./src/test/*.html',
  pathOutput:'dist/test',
  cssCleanEntry:'./dist/css/test/*.css',
  jsCleanEntry:'./dist/js/test/*.js'
}]
