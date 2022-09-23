<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Popup",
});
</script>

<template>
  <ul class="popup">
    <slot />
  </ul>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.popup {
  position: relative;
  z-index: 3;
  display: inline-block;
  padding: $spacing-2 $spacing-0;
  box-shadow: $shadow-convex-large;
  background: var(--base-liner);
  border-radius: $radius-2;
}
</style>
