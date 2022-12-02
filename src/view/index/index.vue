<template>
  <h1>demo</h1>
  <div>
    <img src="@/assets/images/logo.png" alt="" />
  </div>
  <van-button type="primary" @click="getData">获取</van-button>
  <van-button
    v-debounce="{ fn: getData, event: 'click', delay: 500 }"
    type="primary"
  >
    点击请求
  </van-button>
</template>
<script setup lang="ts">
import { getHotTag } from "api/home";
const getData = () => {
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
  font-size: 60px; //自动按比例编译为rem
  font-weight: bold;
  color: $orange; //全局配置的主题色
}
</style>
