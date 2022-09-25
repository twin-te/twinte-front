<script setup lang="ts">
const props = defineProps<{
  color: "ghost" | "primary";
  iconPosition: "left" | "right";
}>();
</script>

<template>
  <div
    :class="{ 'tertiary-button': true, [`tertiary-button--${color}`]: true }"
    :style="{ flexDirection: iconPosition == 'left' ? 'row' : 'row-reverse' }"
  >
    <div class="tertiary-button__icon material-icons">
      <slot name="icon"></slot>
    </div>
    <div class="tertiary-button__text">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.tertiary-button {
  display: flex;
  gap: $spacing-1;
  width: max-content;
  padding: $spacing-2 $spacing-1;
  border-radius: $radius-1;
  font-size: $font-small;
  transition: $transition-box-shadow;

  &__icon {
    font-weight: 400;
  }

  &__text {
    font-weight: 500;
  }

  &--ghost {
    color: getColor(--color-button-gray);
  }

  &--primary {
    color: getColor(--color-primary);
  }

  &:hover {
    box-shadow: $shadow-convex-hover;
  }

  &:active {
    box-shadow: $shadow-concave;
  }

  @include button-cursor;
}
</style>
