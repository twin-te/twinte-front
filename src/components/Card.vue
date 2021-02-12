<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    width: {
      type: String,
      default: "100%",
    },
  },
});
</script>

<template>
  <div class="card" :style="{ width }"><slot></slot></div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.card {
  box-sizing: border-box;
  height: auto;
  border: 1px solid $base;
  border-radius: $radius-3;
  box-shadow: $shadow-base;
  padding: $spacing-4 $spacing-6;
  background: $base-liner;
}
</style>
