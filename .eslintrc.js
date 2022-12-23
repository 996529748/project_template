// https://eslint.org/docs/user-guide/configuring
// https://typescript-eslint.io/rules/
// https://eslint.vuejs.org/rules/attributes-order.html
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 6,// 支持es6语法（但不支持新的 ES6 全局变量或类型，如Set）
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json'],
    extraFileExtensions:['.vue']
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier',
    '@typescript-eslint'
  ],
  rules: {
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
    // "no-duplicate-imports": 2,
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
    //禁止未使用的变量--未使用的变量只允许params
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^params',
        varsIgnorePattern: '^params',
      },
    ],
    //在定义之前禁止使用变量
    "no-use-before-define": 2,
    //强制将typeof表达式与有效字符串进行比较
    "valid-typeof": 2,
    //箭头函数体周围需要大括号
    "arrow-body-style": 1,
    //强制执行驼峰命名约定
    "camelcase": 2,
    //禁止Array构造函数
    "no-array-constructor": 2,
    //禁止 `Object` 构造函数
    "no-new-object": 2,
    semi: ["error", "always"],
    //警告赋值为any
    "@typescript-eslint/no-explicit-any": ["warn"],
    //禁止不必要的类型约束
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    //显示函数返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',
    //禁止require在import语句中除外的语句  var foo = require("foo")禁止使用
    '@typescript-eslint/no-var-requires': 'error',
    //禁止空函数
    '@typescript-eslint/no-empty-function': 'error',
    //驼峰式自定义事件名称
    // 'vue/custom-event-name-casing': ["error", "camelCase" | "kebab-case"],  
    // 'no-use-before-define': 'off',
    //禁止在定义变量之前使用变量
    '@typescript-eslint/no-use-before-define': 'off',
    //自定义指令后不允许评论或要求描述
    '@typescript-eslint/ban-ts-comment': 'off',
    //允许非空断言
    // '@typescript-eslint/no-non-null-assertion': 'off',
    //要求在导出函数和类的公共类方法上显式返回和参数类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    //禁止未使用变量--未使用的变量只允许字母
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^params',
        varsIgnorePattern: '^params',
      },
    ],
    //要求函数重载签名是连续的
    '@typescript-eslint/adjacent-overload-signatures':'error',
    //要求一致地使用 或 for 数组T[]Array<T>.模式
    '@typescript-eslint/array-type':'warn',
    //禁止某些类型
    '@typescript-eslint/ban-types': 'error',
    //强制在构造函数调用的类型注释或构造函数名称上指定泛型类型参数
    '@typescript-eslint/consistent-generic-constructors': 'warn',
    //要求使用类型Record
    '@typescript-eslint/consistent-indexed-object-style': 'warn',
    //强制使用类型断言的一致性
    '@typescript-eslint/consistent-type-assertions': 'error',
    //强制接口类型定义以一致地使用interfacetype
    '@typescript-eslint/consistent-type-definitions':[
      'error',
      'interface'
    ],
    //强制一致使用类型导出
    // "@typescript-eslint/consistent-type-exports": "warn",
    //强制一致使用类型导入
    '@typescript-eslint/consistent-type-imports': 'warn',
    //要求函数和类方法的显式返回类型
    '@typescript-eslint/explicit-function-return-type':'error',
    //要求在导出函数和类的公共类方法上显式返回和参数类型
    "@typescript-eslint/explicit-module-boundary-types":[
      "error",
      {
        "allowedNames": ["ignoredFunctionName", "ignoredMethodName"]
      }
    ],
    //强制使用特定方法签名语法
    "@typescript-eslint/method-signature-style": "error",
    //无重复枚举值
    "@typescript-eslint/no-duplicate-enum-values": "error",
    //没有额外的非空断言
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    //不允许使用for in循环遍历数组
    "@typescript-eslint/no-for-in-array": "error",
    //禁止在 catch 子句中使用隐式类型any
    "@typescript-eslint/no-implicit-any-catch": "error",
    //不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
    "@typescript-eslint/no-inferrable-types": "error",
    //禁止泛型或返回类型之外的类型void
    "@typescript-eslint/no-invalid-void-type": "error",
    //禁止命名空间
    "@typescript-eslint/no-namespace": "error",
    //不允许在空合并运算符的左操作数中使用非空断言。
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    //不允许在可选链表达式后使用非空断言。
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    //禁止使用后缀运算符进行非空断言
    "@typescript-eslint/no-non-null-assertion": "error",
    //禁止调用require()
    "@typescript-eslint/no-require-imports": "error",
    //禁止this别名
    "@typescript-eslint/no-this-alias": "error",
    //不允许对布尔文本进行不必要的相等比较
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    //禁止等于默认值的类型参数
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    //禁止不更改表达式类型的类型断言
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    //不允许将类型值分配给变量和属性any
    "@typescript-eslint/no-unsafe-assignment": "error",
    //禁止从函数返回带有类型的值any
    "@typescript-eslint/no-unsafe-return": "error",
    //禁止语句（导入语句除外）require
    "@typescript-eslint/no-var-requires": "error",
    //强制使用过度文本类型as const
    "@typescript-eslint/prefer-as-const": "error",
    //要求加法的两个操作数是相同的类型
    "@typescript-eslint/restrict-plus-operands": "error",
    //强制模板文本表达式为类型string
    "@typescript-eslint/restrict-template-expressions": "error",
    //多词组件名称-暂时关闭，希望只适用于组件部分
    'vue/multi-word-component-names':'off'
  },
};
