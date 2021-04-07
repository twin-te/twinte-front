<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    onClick: {
      type: Function,
      required: true,
    },
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
    @click="$emit('click')"
    :class="{ option: true, '--selected': isSelected }"
  >
    {{ value }}
  </div>
</template>

<style scoped lang="scss">
@import "~/scss/main.scss";

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
