import type { App } from "vue";
//自定义指令
export default {
  install(app: App<Element>): void {
    app.directive("debounce", {
      mounted(el, binding) {
        // 至少需要回调函数以及监听事件类型
        if (typeof binding.value.fn !== "function" || !binding.value.event)
          return;

        const delay = 500; // 默认延迟时间
        el.timer = null; //定时器
        // 点击事件
        el.handler = function (): void {
          if (el.timer) {
            clearTimeout(el.timer);
            el.timer = null;
          }
          //延迟执行
          el.timer = setTimeout(() => {
            // eslint-disable-next-line prefer-rest-params
            binding.value.fn.apply(this, arguments);
            el.timer = null;
          }, binding.value.delay || delay);
        };
        el.addEventListener(binding.value.event, el.handler);
      },
      // 元素卸载前清理定时器并且移除监听事件
      beforeMount(el, binding) {
        if (el.timer) {
          clearTimeout(el.timer);
          el.timer = null;
        }
        el.removeEventListener(binding.value.event, el.handler);
      },
    });
  },
};
