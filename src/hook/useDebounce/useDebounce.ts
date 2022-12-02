import { ref } from "vue";

// 防抖
export const useDebounce = <T extends unknown[]>(
  fn: (...params: T) => unknown,
  time = 500
) => {
  const timer = ref<ReturnType<typeof setTimeout> | null>();

  const callback = (...params: T) => {
    if (timer.value) {
      clearTimeout(timer.value);
    }

    timer.value = setTimeout(() => {
      timer.value = null;
      fn(...params);
    }, time);
  };

  return callback;
};
