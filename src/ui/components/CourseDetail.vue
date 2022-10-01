<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    item: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="course-detail">
    <div class="course-detail__icon">
      <slot></slot>
    </div>
    <div class="course-detail__item">{{ item }}</div>
    <div class="course-detail__value">{{ value }}</div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.course-detail {
  display: grid;
  grid-template:
    "icon ... item " auto
    "icon ... ...  " 1fr
    "icon ... value" auto
    / auto $spacing-4 1fr;
  text-align: left;
  &__icon {
    grid-area: icon;
  }
  &__item {
    grid-area: item;
    line-height: $single-line;
    font-size: $font-small;
    color: getColor(--color-text-sub);
  }
  &__value {
    grid-area: value;
    line-height: $single-line;
    font-size: $font-medium;
    font-weight: 500;
    color: getColor(--color-text-main);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
