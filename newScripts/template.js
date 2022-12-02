// template.js
module.exports = {
  vueTemplate: (compoenntName) => `<template>
  <div class="${compoenntName}">${compoenntName}组件</div>
</template>
<script>
export default {
  name: "${compoenntName}",
  data() {
    return {};
  },
  methods: {},
  // mounted() {},
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
.${compoenntName} {
}
</style>
`,
  entryTemplate: `import Main from './main.vue'
export default Main`,
};
