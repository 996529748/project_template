<template>
  <div class="index">index组件</div>
</template>
<script>
import { getUserDTO } from "api/webpdfapi";
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    getUserDTO()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {},
  components: {},
  watch: {},
  props: {},
  mixins: [],
  // activated() {},
  // deactivated() {},
  // beforeCreate() {},
  // created() {},
  // beforeMount() {},
  // beforeUpdate() {},
  // updated() {},
  // beforeDestory() {},
  // destroyed() {}
};
</script>
<style lang="scss" scoped>
.index {
  background: $color-test;
  width: 1000px;
}
</style>
