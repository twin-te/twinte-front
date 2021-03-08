<script lang="ts">
import { defineComponent, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

export default defineComponent({
  name: "Popup",
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
  emits: ["click"],
  setup: (_, { emit }) => {
    const target = ref(null);
    onClickOutside(target, (e: any) => emit("click", e));

    return { target };
  },
});
</script>

<template>
  <ul ref="target" class="popup">
    <slot />
  </ul>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.popup {
  display: inline-block;
  padding: $spacing-2 $spacing-0;
  box-shadow: $shadow-convex-large;
  background: $base-liner;
  border-radius: $radius-2;
}
</style>
