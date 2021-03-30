<script lang="ts">
import { defineComponent } from "vue";

type Props = {
  onClick: Function;
  size: string;
  color: string;
  iconName: string;
};

export default defineComponent({
  name: "IconButton",
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    onKeyup: {
      type: Function,
      default: () => {},
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
        return ["normal", "danger", "primary"].includes(value);
      },
    },
    iconName: {
      type: String,
      default: "",
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
    @click="handleClick"
    @keyup.enter="$emit('click', $event)"
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
    color: $button-gray;
    transition: $transition-box-shadow;
    &:active {
      color: $white;
      @include button-active;
    }
  }
  &--danger {
    color: $danger;
    transition: $transition-box-shadow;
    &:active {
      color: $white;
      @include button-active-danger;
    }
  }
  &--primary {
    span {
      @include text-liner;
      transition: $transition-box-shadow;
    }
    &:active {
      @include button-active;
      color: $white;
      span {
        @include void-text-liner;
        color: $white;
      }
    }
  }
}
</style>
