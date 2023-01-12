//emit hook
import {
  computed,
  getCurrentInstance,
  nextTick,
  reactive,
  readonly,
  Ref,
} from "vue";

export function useEmit<T extends Recordable, F>(
  prop: T,
  key: keyof T = "value",
  changeEvent?: string,
  emitData?: Ref<F>
) {
  //获取全局实例，拿到 emit
  const instance = getCurrentInstance();
  const emit = instance?.emit;

  //取出props的值,并设为响应式
  const innerState = reactive({
    value: prop[key],
  });

  //修改为只读
  const defaultState = readonly(innerState);

  //返回state
  const state: Ref<F> = computed({
    get() {
      console.log("innerState", innerState.value);
      return innerState.value;
    },
    set(value) {
      //相等的情况不做emit
      if (value === defaultState.value) return;

      innerState.value = value;
      nextTick(() => {
        emit?.(changeEvent!, value, ...[emitData || []]);
      });
    },
  });

  return [state, defaultState];
}
