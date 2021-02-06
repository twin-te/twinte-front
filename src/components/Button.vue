<script lang="ts">
import { defineComponent, ref } from "vue";

type Props = {
  onClick: Function;
  size: string;
  layout: string;
  color: string;
  icon: boolean;
  pauseActiveStyle: boolean;
};

export default defineComponent({
  name: "Button",
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
    layout: {
      type: String,
      default: "flexible",
      validator: function (value: string) {
        return ["flexible", "fill", "half"].includes(value);
      },
    },
    color: {
      type: String,
      default: "base",
      varidator: function (value: string) {
        return ["base", "primary"].includes(value);
      },
    },
    icon: {
      type: Boolean,
      default: false,
    },
    pauseActiveStyle: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["click"],
  setup: (props: Props, { emit }) => {
    const isActive = ref(false);

    const handleClick = (e: any) => {
      isActive.value = props.pauseActiveStyle && !isActive.value;
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
      button: true,
      '--active': isActive,
      [`button--${size}`]: true,
      [`button--${color}`]: true,
      [`button--${layout}`]: true,
      ['button--withicon']: icon,
    }"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 1.6rem;

  position: relative;

  /* base */
  background: $base;
  /* shadow-convex */
  border-radius: $radius-button;
  font-weight: medium;
  vertical-align: middle;
  transition: $transition-box-shadow;

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
    padding: 0 1.6rem;
    font-size: 1.2rem;
    height: 2.8rem;
    line-height: 2.8rem;
  }
  &--medium {
    padding: 0 3rem;
    height: 4rem;
    font-size: 1.4rem;
    line-height: 4rem;
  }
  &--large {
    padding: 0 3.6rem;
    height: 4.6rem;
    font-size: 1.4rem;
    line-height: 4.6rem;
  }
  &--base {
    background: $base;
    color: $text-main;
  }
  &--primary {
    background: $primary-liner;
    color: $white;
  }
  &--flexible {
    @include flexible;
  }
  &--fill {
    display: block;
    width: 100%;
    max-width: 400px;
  }
  &--half {
    width: 35%;
    max-width: 200px;
  }
  &--withicon {
    &::after {
      font-family: "Material Icons";
      content: "launch";
      font-size: 100%;
      line-height: 100%;
      @include text-liner;
      @include iconlayout;
    }
  }
  &.--active,
  &:active {
    color: $white;
    @include button-active;
    &:hover {
      @include button-active;
    }
    &::after {
      color: white;
      @include void-text-liner;
    }
  }
}
</style>
