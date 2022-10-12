// gulp版本 4.0.2   请使用npm安装依赖
const gulp = require("gulp");
const minifyCss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const spritesmith = require("gulp.spritesmith");
const watch = require("gulp-watch");
const revOutdated = require("gulp-rev-outdated");
const rev = require("gulp-rev");
const gutil = require("gulp-util");
const rimraf = require("rimraf");
const path = require("path");
const through = require("through2");
const browserSync = require("browser-sync");
const usemin = require("gulp-usemin");
const babel = require("gulp-babel"); // babel转es5
const uglify = require("gulp-uglify"); // js压缩
const contact = require("gulp-concat"); // 合并
const postcss = require("gulp-postcss");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("autoprefixer");
const sass = require('gulp-sass')(require('sass')); // 编译scss 为 css
const replace = require('gulp-replace');// px转rem
/**
 * 图片处理
 */
//图片压缩
gulp.task("images", gulp.series( () => {
  return gulp.src(["./src/img/*", "./src/img/**/*"]).pipe(imagemin()).pipe(gulp.dest("./dist/img/"));
}));

//图片合并
gulp.task("sprite", gulp.series('images',() => {
  var spriteData = gulp.src("./src/img/common/*.png").pipe(
    spritesmith({
      imgName: "./img/common/sprite.png",
      cssName: "./css/common/sprite.css"
    })
  );
  return spriteData.pipe(gulp.dest("./src/")).pipe(gulp.dest("./dist/"));
}));
/**
 * es6转es5 调试
 */
 gulp.task("es6", gulp.series( done => {
  gulp
    .src(["./src/js/**/*.js"],{ignore:['./src/js/common/*.js']}) // 需要转的js
    .pipe(
      babel({
        presets: ["@babel/env"],
        plugins: ["transform-remove-strict-mode"] // 去除严格模式
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./src/es5"));
  done(console.log("es6 to es5 complete！"));
}));

/**
 * es6转es5 编译
 */
gulp.task("es6Build", gulp.series( done => {
  gulp
    .src(["./dist/js/**/*.js"]) // 需要转的js
    .pipe(
      babel({
        presets: ["@babel/env"],
        plugins: ["transform-remove-strict-mode"] // 去除严格模式
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));//输出目录
  done(console.log("es6 to es5 complete！"));
}));

//添加css前缀
gulp.task("autoprefixer", gulp.series( () => {
  return gulp
    .src(["./src/css/*", "./src/css/**/*"])
    .pipe(postcss([autoprefixer({ overrideBrowserslist: ["last 5 versions"] })]))
    .pipe(gulp.dest("./src/css"));
}));

//编译scss为css
gulp.task("scss", gulp.series( () => {
  console.log('scss编译并添加css前缀autoprefixer')
  return gulp.src(['./src/scss/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ overrideBrowserslist: ["last 5 versions"] })]))
    .pipe(gulp.dest('./src/css'))
}))

//px转rem
gulp.task("pxtorem", gulp.series( ()=>{
  console.log('scss编译为css并转为rem')
  return gulp.src(['./src/scss/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ overrideBrowserslist: ["last 5 versions"] })]))
    .pipe(replace(/(\d+)px/g, function(match, p1){
      return Number(p1) / 100 + 'rem';
    }))
    .pipe(gulp.dest('./src/css'))// 转化rem
}))

// 移动js和css公共部分
gulp.task("moveCommonFile", gulp.series( async() => {
  await gulp.src(["./src/js/common/*"]).pipe(gulp.dest("./dist/js/common"));
  await gulp.src(["./src/css/common/*"]).pipe(gulp.dest("./dist/css/common"));
  await gulp.src(["./src/favicon.ico"]).pipe(gulp.dest("./dist"));
}));

gulp.task("html", gulp.series( () => {
  var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true //删除<style>和<link>的type="text/css"
  };
  return gulp
    .src("./src/*.html")
    .pipe(
      usemin({
        html: [
          function () {
            return htmlmin(options);
          }
        ],
        js: [uglify, rev],
        inlinejs: [uglify],
        css: [minifyCss, rev]
      })
    )
    .pipe(gulp.dest("dist/"))
}));
gulp.task("cssClean", gulp.series( () => {
  return gulp.src(["./dist/css/*.css", "./dist/css/**/*.css"], { read: false }).pipe(cleaner());
}));
gulp.task("jsClean", gulp.series( () => {
  return gulp.src(["./dist/js/*.js", "./dist/js/**/*.js"], { read: false }).pipe(cleaner());
}));
gulp.task("htmlClean", gulp.series(
   () => {
    return gulp.src(["./dist/*.html"], { read: false }).pipe(cleaner());
  }
));
//执行文件清除，并将公共文件迁移至dist
gulp.task("clean", gulp.series(() => {
    return gulp.src(["./dist/*"], { read: false }).pipe(cleaner());
  }
));
//打包编译
//更改html css引用路径 css压缩 合并 重命名 js压缩 合并 重命名
gulp.task("build", gulp.series('clean', "autoprefixer", "clean", "moveCommonFile", "images", "html", "es6Build", done => {
  done(console.log("Compilation complete ！"));
}));
// //----------------------------------------------------------------------------------------------------------------------------------------------//

//清除文件
function cleaner() {
  return through.obj(function (file, enc, cb) {
    rimraf(
      path.resolve(file.cwd || process.cwd(), file.path),
      function (err) {
        if (err) {
          this.emit("error", new gutil.PluginError("Cleanup old files", err));
        }
        this.push(file);
        cb();
      }.bind(this)
    );
  });
}
//----------------------------------------------------------------------------------------------------------------------------------------------//

/**
 * 监听文件
 */

//监听文件自动刷新浏览器
gulp.task("run", gulp.series(() => {
    // var files = ["./src/*.html", "./src/css/*.css", "./src/js/*.js","./src/scss/*.scss"];
    browserSync.init('./src', {
      server: {
        baseDir: "./", // 设置服务器的根目录
        index: "index.html" // 指定默认打开的文件
      },
      port:3000  // 指定访问服务器的端口号
    })
    // watch监听
    gulp.watch('./src/scss/*.scss',gulp.series('pxtorem')); //4k兼容模式
    // gulp.watch('./src/scss/*.scss',gulp.series('scss'));//web 模式监听
    gulp.watch('./src/js/**/*.js',gulp.series('es6'));//js语法编译：es6转es5
  }
));

// 监视scss文件变化，自动执行任务
gulp.task("watch",gulp.series(()=>{
  //监听变化文件所需执行的任务
  console.log('watch监听准备完毕！')
  gulp.watch('./src/scss/*.scss',gulp.series('pxtorem'));

}))
