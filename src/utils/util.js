const install = (Vue) => {
  /**
   * [$baseLoading 全局loading 示例]
   *
   * @param   {[type]}  index  [index description]
   * @param   {[type]}  text   [text description]
   *
   * @return  {[type]}         [return description]
   */
  // Vue.prototype.$baseLoading = (index, text) => {
  //   let loading;
  //   if (!index) {
  //     loading = Loading.service({
  //       lock: true,
  //       text: text || loadingText,
  //       background: "hsla(0,0%,100%,.8)"
  //     });
  //   } else {
  //     loading = Loading.service({
  //       lock: true,
  //       text: text || loadingText,
  //       spinner: "vab-loading-type" + index,
  //       background: "hsla(0,0%,100%,.8)"
  //     });
  //   }
  //   return loading;
  // };
  /**
   * [$baseEventBus bus事件]
   *
   * @return  {[type]}  [return description]
   */
  Vue.prototype.$baseEventBus = new Vue();
};
//实现script标签引入的方式
if (window && window.Vue) install(window.Vue);

export default install;
