// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // 'plugin:vue/strongly-recommended',
    "plugin:prettier/recommended",
  ],
  // required to lint *.vue files
  plugins: ["vue", "prettier"],
  // add your custom rules here
  rules: {
    // "prettier/prettier": "error",
    "prettier/prettier": [
      "error",
      {
        // 换行符
        endOfLine: "auto",
      },
      {
        usePrettierrc: false,
      },
    ],
    // allow async-await
    "generator-star-spacing": "off",
    //禁止多余的 return 语句
    "no-useless-return": 2,
    //禁止没有必要的字符拼接
    "no-useless-concat": 2,
    //限制可以被抛出的异常
    "no-throw-literal": 2,
    //禁止自身比较
    "no-self-compare": 2,
    //禁止自我赋值
    "no-self-assign": 2,
    //禁用不必要的 return await
    "no-return-await": 2,
    //禁止在返回语句中赋值
    "no-return-assign": 2,
    //禁止重新声明变量
    "no-redeclare": 2,
    //禁止对函数参数再赋值
    "no-param-reassign": 2,
    //禁止多行字符串
    "no-multi-str": 2,
    //禁止出现多个空格
    "no-multi-spaces": 2,
    //禁止循环中存在函数
    "no-loop-func": 2,
    //禁用不必要的嵌套块
    "no-lone-blocks": 2,
    //禁止 this 关键字在类或类对象之外出现
    "no-invalid-this": 2,
    //禁止在全局范围使用变量和函数声明
    "no-implicit-globals": 2,
    //禁止对原生对象或只读的全局对象进行赋值
    "no-global-assign": 2,
    //禁止浮点小数
    "no-floating-decimal": 2,
    //禁用不必要的标签
    "no-extra-label": 2,
    //禁止不必要的函数绑定
    "no-extra-bind": 2,
    //禁用 eval()
    "no-eval": 2,
    //禁止使用空解构模式
    "no-empty-pattern": 2,
    //禁止出现空函数
    "no-empty-function": 2,
    //禁止 if 语句中 return 语句之后有 else 块
    "no-else-return": 2,
    //要求所有的 switch 语句中必须包含 default 分支
    "default-case": 2,
    //强制数组方法的回调函数中有 return 语句
    "array-callback-return": 1,
    //要求使用 === 和 !==
    eqeqeq: 2,
    //要求调用 isNaN()检查 NaN
    "use-isnan": 2,
    //禁止在 return、throw、continue 和 break 语句后出现不可达代码
    "no-unreachable": 2,
    //禁用稀疏数组
    "no-sparse-arrays": 2,
    //禁止将全局对象当作函数进行调用
    "no-obj-calls": 2,
    //禁止对 function 声明重新赋值
    "no-func-assign": 2,
    //禁止对 catch 子句中的异常重新赋值
    "no-ex-assign": 2,
    //禁止空块语句
    "no-empty": 2,
    //禁止重复 case 标签
    "no-duplicate-case": 2,
    // 禁止对 const 定义重新赋值
    "no-const-assign": 2,
    //要求使用 let 或 const 而不是 var
    "no-var": 2,
    // 最大块嵌套深度为 5 层
    "max-depth": [2, 5],
    //要求或禁止对象字面量的方法和属性简写语法
    "object-shorthand": 2,
    //在构造函数中需要 `super()` 调用
    "constructor-super": 2,
    //执行“for”循环更新子句将计数器移动到正确的方向。
    "for-direction": 2,
    //在 getter 中强制执行“return”语句
    "getter-return": 2,
    //禁止修改类声明的变量
    "no-class-assign": 2,
    //不允许与 -0 进行比较
    "no-compare-neg-zero": 2,
    //禁止条件表达式中的赋值运算符
    "no-cond-assign": 2,
    //禁止条件中的常量表达式
    "no-constant-condition": 2,
    //禁止在“函数”定义中出现重复参数
    "no-dupe-args": 2,
    //不允许重复的类成员
    "no-dupe-class-members": 2,
    //禁止对象字面量中的重复键
    "no-dupe-keys": 2,
    //禁止重复的模块导入
    "no-duplicate-imports": 2,
    //禁止 `case` 语句的失败
    "no-fallthrough": 2,
    //禁止function嵌套块中的变量或声明
    "no-inner-declarations": 2,
    //禁止直接使用 Object.prototypes 内置函数
    "no-prototype-builtins": 2,
    //禁止在常规字符串中使用模板文字占位符语法
    "no-template-curly-in-string": 2,
    //在构造函数中调用 `super()` 之前禁止 `this`/`super`
    "no-this-before-super": 2,
    //禁止未使用的变量
    "no-unused-vars": 2,
    //在定义之前禁止使用变量
    "no-use-before-define": 2,
    //强制将typeof表达式与有效字符串进行比较
    "valid-typeof": 2,
    //箭头函数体周围需要大括号
    "arrow-body-style": 1,
    //强制执行驼峰命名约定
    camelcase: 2,
    //禁止Array构造函数
    "no-array-constructor": 2,
    //禁止 `Object` 构造函数
    "no-new-object": 2,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    semi: ["error", "always"],
  },
};
