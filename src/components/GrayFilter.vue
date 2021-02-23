<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GrayFilter",
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
  emits: ["click"],
});
</script>

<template>
  <div @click="$emit('click')" class="grayfilter"></div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.grayfilter {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: $filter-gray;
  backdrop-filter: blur(8px);
  z-index: 13;
}
</style>
