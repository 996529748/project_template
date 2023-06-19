<template>
  <div></div>
  <h1>vue3+Typescript+vant+vite 适用于移动端</h1>
  <div>
    <img src="@/assets/images/logo.png" alt="" />
    <h2>SVG图标使用：传入路径name，多层文件夹用 - 隔开 例如：icon-vue</h2>
    <SvgIcon class="icon" name="vue" />
  </div>
  <div>
    <van-button v-preReClick type="primary" @click="getData">
      自定义指令防抖请求
    </van-button>
    <van-button @click="showDialog">打开命令式弹窗</van-button>
  </div>
  <div>父组件接收到的日期时间值：{{ Date.parse(currentDate.toString()) }}</div>
  <div class="check">父组件接收到的复选框值：{{ checkState }}</div>

  <Child v-model="currentDate" v-model:infoValue="checkState"></Child>
</template>

<script setup lang="ts">
import { getHotTag } from "api/home";
import { ref } from "vue";
import { SvgIcon } from "@/common/svgIcon";
import { createDialog } from "@/common/commandDialog";

//命令式弹窗调用
const showDialog = () => {
  createDialog({
    title: "命令式调用",
    confirmText: "确定",
    cancelText: "取消",
    showCancelButton: true,
    content:
      "这个是用命令式调起的弹窗，存放于公共组件中，可自行拓展。无用情况下自行删除",
  });
};

const getData = () => {
  const config = {
    showLoading: true,
  };
  getHotTag(config).then((res) => {
    console.log(res);
  });
};

const checkState = ref(false);

const currentDate = ref(new Date(2021, 0, 17));
</script>

<style lang="scss" scoped>
h1 {
  font-size: 30px; //自动按比例编译为rem
  font-weight: bold;
  color: $orange; //全局配置的主题色
}
div {
  margin-bottom: 10px;
}
:deep(.van-checkbox) {
  justify-content: center;
}
</style>
