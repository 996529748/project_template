<template>
  <van-config-provider id="config-provider" :theme-vars="theme">
    <router-view />
  </van-config-provider>
</template>
<script setup lang="ts">
import theme from "./plugins/vant-configProvider-config";
import useMeta from "./hook/useMeta/useMeta";

useMeta();
</script>
<style lang="scss">
@import "./assets/scss/common.scss";
#app {
  font-family: "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
