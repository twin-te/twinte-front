<script lang="ts">
import { defineComponent, PropType } from "vue";

export type PopupContentColor = "normal" | "danger";

export default defineComponent({
  name: "PopupContent",
  props: {
    link: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
    color: {
      type: String as PropType<PopupContentColor>,
      default: "normal",
      validator: function (value: string) {
        return ["normal", "danger"].includes(value);
      },
    },
    gtmMarker: {
      type: String,
      default: "",
    },
  },
  emits: ["click"],
});
</script>

<template>
  <li
    :class="{
      'popup-content': true,
      [`popup-content--${color}`]: true,
    }"
    :data-gtm-marker="gtmMarker"
    @click="$emit('click', value)"
  >
    {{ value }}
    <span v-if="link" class="material-icons popup-content__link">launch</span>
  </li>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.popup-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 4.2rem;
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
    font-weight: 500;
    margin-left: $spacing-2;
    @include text-liner;
  }
}
</style>
