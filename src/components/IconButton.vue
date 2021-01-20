<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconButton",
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    size: {
      type: String,
      default: "large",
      validator: function (value: string) {
        return ["small", "medium", "large"].includes(value);
      },
    },
    color: {
      type: String,
      default: "normal",
      varidator: function (value: string) {
        return ["normal", "danger"].includes(value);
      },
    },
    iconName: {
      type: String,
      default: "",
    },
  },
  setup: ({}, { emit }) => {
    const handleClick = (e: any) => {
      emit("click", e.target.value);
    };

    return { handleClick };
  },
});
</script>

<template>
  <button
    @click="handleClick"
    :class="{
      'icon-button': true,
      [`icon-button--${size}`]: true,
      [`icon-button--${color}`]: true,
    }"
  >
    <span class="material-icons">{{ iconName }}</span>
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.icon-button {
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: $circle;
  background: $base-liner;

  @include button-cursor;
  @include button-inactive;
  &:hover {
    @include button-hover;
  }
  &:focus {
    // i18n
    outline: none;
  }
  &--small {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 1rem;
  }
  &--medium {
    width: 2.0625rem;
    height: 2.0625rem;
    font-size: 1.125rem;
  }
  &--large {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
  }
  &--normal {
    color: $button-gray;
    transition: $transition-box-shadow;
    &:active {
      color: $white;
      @include button-active;
      &:hover {
        @include button-active;
      }
    }
  }
  &--danger {
    color: $danger;
    transition: $transition-box-shadow;
    &:active {
      color: $white;
      @include button-active-danger;
      &:hover {
        @include button-active-danger;
      }
    }
  }
}
</style>
