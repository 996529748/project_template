<template>
  <svg>
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const symbolId = computed(() => `#icon-${props.name}`);
</script>
