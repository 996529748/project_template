module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      // rootValue({ file }) {
      //   return file.indexOf('vant') !== -1 ? 37.5 : 75;// 75表示750设计稿，37.5表示375设计稿

      // },
      rootValue: 75, // 75表示750设计稿，37.5表示375设计稿
      exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
      selectorBlackList: ['van'],//vant设计稿为375，当以750设计稿为基础设置时，需要屏蔽vant
      propList: ["*"], //是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
      unitPrecision: 2, //保留rem小数点多少位
      //selectorBlackList: ['.radius'],  //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
      replace: true, //不知到干嘛用的
      mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
      minPixelValue: 1, //px小于1的不会被转换
    },
  },
};