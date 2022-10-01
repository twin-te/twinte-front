<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GrayFilter",
  emits: ["click"],
});
</script>

<template>
  <div class="grayfilter" @click="$emit('click')"></div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.grayfilter {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: getColor(--color-filter-gray);
  backdrop-filter: blur(8px);
  z-index: 11;
}
</style>
