<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["click"],
});
</script>

<template>
  <div
    :class="{ option: true, '--selected': isSelected }"
    @click="$emit('click')"
  >
    {{ value }}
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.option {
  @include text-main;
  font-weight: 500;
  @include button-cursor;
  padding: $spacing-2 $spacing-3;
  background-color: getColor(--color-base);
  &:active {
    box-shadow: $shadow-concave;
  }
}
</style>
