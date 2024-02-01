import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
// import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
// import serve from 'rollup-plugin-serve';
import dev from "rollup-plugin-dev";
import livereload from "rollup-plugin-livereload";
import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const resolveDir = (dir) => path.join(__dirname, dir);

export default {
  input: "src/test.ts", // 要打包的文件源路径(应用程序的主要入口点)
  output: [
    // 文件输出配置
    {
      file: "dist/bundle.cjs.js", // 打包后生产的文件位置，及文件名
      format: "cjs", // 文件的输出格式(CommonJS规范，是Node.js的官方模块化规范)
      name: "test", // 包的全局变量名称
    },
    {
      file: "dist/bundle.iife.js",
      format: "iife", // Imdiately Invoked Function Expression 立即执行函数
      name: "test",
    },
    {
      file: "dist/bundle.amd.js",
      format: "amd", // Asynchronous Module Definition 异步模块规范
      name: "test",
    },
    {
      file: "dist/bundle.umd.js",
      format: "umd", // Universal Module Definition 通用模块规范
      name: "test",
    },
  ],
  plugins: [
    // 使用插件
    typescript(),
    resolve({ mainFields: ["jsnext", "preferBuiltins", "browser"] }), //兼容axios
    commonjs(),
    babel({
      exclude: "node_modules/**", // 排除node_modules文件夹下，只编译我们的源代码
    }),
    json(),
    // terser(),
    postcss(),
    alias({
      entries: [{ find: "@", replacement: resolveDir("src") }],
    }),
    livereload(),
    // serve({
    //   open: true,
    //   port: 8888,
    //   contentBase: ''
    // }),
    dev({
      port: 8081,
      dirs: "",
    }),
  ],
};
