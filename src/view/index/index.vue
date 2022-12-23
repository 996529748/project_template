<template>
  <h1>全局颜色样式</h1>
  <div>
    <img src="@/assets/images/logo.png" alt="" />
  </div>
  <div>
    <van-button type="primary" @click="getData">获取</van-button>
  </div>
  <div>
    <van-button
      v-debounce="{ fn: getData, event: 'click', delay: 500 }"
      type="primary"
    >
      防抖请求
    </van-button>
  </div>
</template>
<script setup lang="ts">
import { getHotTag } from "api/home";
const getData = (): void => {
  const config = {
    showLoading: true,
  };
  getHotTag(config).then((res) => {
    console.log(res);
  });
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px; //自动按比例编译为rem
  font-weight: bold;
  color: $orange; //全局配置的主题色
}
div {
  margin-bottom: 10px;
}
</style>
