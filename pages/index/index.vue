<template>
  <div class="index">
    <h1>页面内容dfghf</h1>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <!-- {{ res }} -->
  </div>
</template>
<script>
// import { getUseInfo } from "api/index";
export default {
  name: "HomePage",
  async asyncData() {
    // const res = await getUseInfo();
    // return { res };
  },
  data() {
    return {
      headNavSelect: "index", // 头部导航选择
    };
  },
  mounted() {
    // getUseInfo().then((res) => {
    //   console.log(res);
    // });
  },
};
</script>
<style lang="scss" scoped></style>
