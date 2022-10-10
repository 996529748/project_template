<template>
  <h1>demo</h1>
  <van-button type="primary">主要按钮</van-button>
</template>

<script setup lang="ts">
    import { getHotTag } from "@/api/home";
    const getData = ()=>{
      let config = {
        showLoading: true,
      }
      getHotTag(config).then((res: any) => {
        console.log(res)
      });
    }
    getData();//执行
</script>

<style lang="scss" scoped>
h1{
    font-size: 60px;//自动按比例编译为rem
    font-weight: bold;
}
</style>
