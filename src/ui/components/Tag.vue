<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tag",
  props: {
    assign: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["click"],
});
</script>

<template>
  <div :class="{ tag: true, '--assigned': assign }" @click="$emit('click')">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";
.tag {
  width: max-content;
  height: 2rem;

  padding: 0.3rem 0.7rem;
  @include center-flex;

  font-size: $font-small;
  color: getColor(--color-unselected);
  background: getColor(--base);

  border: 0.1rem solid getColor(--color-unselected);
  border-radius: $radius-1;

  @include button-cursor;

  &.--assigned {
    color: getColor(--color-white);
    background: var(--primary-liner);

    padding: $spacing-1 $spacing-2;
    border: none;
  }
}
</style>
