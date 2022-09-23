<script lang="ts">
import { defineComponent } from "vue";

type Props = {
  size: string;
  color: string;
  iconName: string;
  isActive: boolean;
};

export default defineComponent({
  name: "IconButton",
  props: {
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
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup: (_props: Props, { emit }) => {
    const handleClick = (e: MouseEvent) => {
      emit("click", e);
    };

    return { handleClick };
  },
});
</script>

<template>
  <button
    :class="{
      'icon-button': true,
      '--active': isActive,
      [`icon-button--${size}`]: true,
      [`icon-button--${color}`]: true,
    }"
    @click="handleClick"
  >
    <span class="material-icons">{{ iconName }}</span>
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.icon-button {
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: $circle;
  background: var(--base-liner);

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
    width: 2.8rem;
    height: 2.8rem;
    font-size: 1.6rem;
  }
  &--medium {
    width: 3.3rem;
    height: 3.3rem;
    font-size: 1.8rem;
  }
  &--large {
    width: 4rem;
    height: 4rem;
    font-size: 2.4rem;
  }
  &--normal {
    color: getColor(--color-button-gray);
    transition: $transition-box-shadow;
    &.--active {
      color: getColor(--color-white);
      @include button-active;
      &:hover {
        @include button-active;
      }
    }
  }
  &--danger {
    color: getColor(--color-danger);
    transition: $transition-box-shadow;
    &.--active {
      color: getColor(--color-white);
      @include button-active-danger;
      &:hover {
        @include button-active-danger;
      }
    }
  }
}
</style>
