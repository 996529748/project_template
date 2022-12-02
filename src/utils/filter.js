export default {
  install(Vue) {
    // 示例
    Vue.filter("test", function () {
      console.log(1);
    });
  },
};
