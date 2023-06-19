<template>
  <div>
    <van-checkbox v-model="checkState">复选框</van-checkbox>

    <van-datetime-picker v-model="date" type="date" title="选择年月日" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useEmit } from "@/hook/useEmit/useEmit";

const props = defineProps({
  //子组件接收父组件传递过来的值
  checkState: {
    type: Boolean,
    default: false,
  },
  currentDate: {
    type: Date,
    default: new Date(2021, 0, 17),
  },
});

//字符串类型
const emitData = ref(new Date(2021, 0, 17));
const emitDataSting = ref("");

//双向回显--抛出值至父组件
const [date] = useEmit(props, "currentDate", "update:modelValue", emitData);
const [checkState] = useEmit(
  props,
  "checkState",
  "update:infoValue",
  emitDataSting
);
</script>

<style></style>
