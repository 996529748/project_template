<template>
  <div id="app">
    <h1>这是layou12312t</h1>
    <nuxt></nuxt>
  </div>
</template>

<script>
import SEOMixins from "mixins/seo";
export default {
  name: "DefaultLayout",
  // 设置通用的头部信息, 如下:
  mixins: [SEOMixins],
};
</script>

<style lang="scss"></style>
