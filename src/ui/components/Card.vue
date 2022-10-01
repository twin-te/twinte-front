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
@import "~/ui/styles";

.card {
  height: auto;
  border-radius: $radius-3;
  box-shadow: $shadow-base;
  padding: $spacing-4 $spacing-6;
  background: var(--base-liner);
}
</style>
