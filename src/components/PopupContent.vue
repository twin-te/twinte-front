<script lang="ts">
import { defineComponent, PropType } from "vue";

export type Color = "normal" | "danger";

export default defineComponent({
  name: "PopupContent",
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    link: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
    color: {
      type: String as PropType<Color>,
      default: "normal",
      validator: function (value: string) {
        return ["normal", "danger"].includes(value);
      },
    },
  },
  emits: ["click"],
});
</script>

<template>
  <li
    @click="$emit('click', value)"
    :class="{
      'popup-content': true,
      [`popup-content--${color}`]: true,
    }"
  >
    {{ value }}
    <span v-if="link" class="material-icons popup-content__link">launch</span>
  </li>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.popup-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 3.8rem;
  padding: $spacing-2 3.4rem $spacing-2 $spacing-4;
  font-size: $font-large;
  line-height: $single-line;
  transition: $transition-box-shadow;
  @include button-cursor;
  &:active {
    box-shadow: $shadow-concave;
  }
  &--normal {
    color: getColor(--color-button-gray);
  }
  &--danger {
    color: getColor(--color-danger);
  }
  &__link {
    font-size: $font-medium;
    font-weight: normal;
    margin-left: $spacing-2;
    @include text-liner;
  }
}
</style>
