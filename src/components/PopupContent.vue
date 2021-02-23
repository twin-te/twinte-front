<script lang="ts">
import { defineComponent } from "vue";

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
      type: String,
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
    <span v-show="link" class="material-icons popup-content__link">launch</span>
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
  padding: 0.8rem 3.4rem 0.8rem 1.6rem;
  font-size: $font-large;
  font-weight: 500;
  line-height: $single-line;
  transition: $transition-box-shadow;
  &:active {
    box-shadow: $shadow-concave;
  }
  &--normal {
    color: $button-gray;
  }
  &--danger {
    color: $danger;
  }
  &__link {
    font-size: $font-medium;
    font-weight: normal;
    margin-left: $spacing-2;
    @include text-liner;
  }
}
</style>
