<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export type State = "active" | "default" | "disabled";

type Props = {
  size: string;
  layout: string;
  color: string;
  icon: boolean;
  pauseActiveStyle: boolean;
  state: State;
};

export default defineComponent({
  name: "Button",
  props: {
    size: {
      type: String as PropType<"small" | "medium" | "large">,
      default: "large",
    },
    layout: {
      type: String as PropType<"flexible" | "fill" | "half">,
      default: "flexible",
    },
    color: {
      type: String as PropType<"base" | "primary" | "danger">,
      default: "base",
    },
    icon: {
      type: Boolean,
      default: false,
    },
    pauseActiveStyle: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String as PropType<State>,
      default: "default",
    },
  },
  emits: ["click"],
  setup: (props: Props, { emit }) => {
    const isActive = ref(false);

    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLButtonElement)) return;
      if (props.state === "disabled") return;
      isActive.value = props.pauseActiveStyle && !isActive.value;
      emit("click", e.target.value);
    };

    return { handleClick, isActive };
  },
});
</script>

<template>
  <button
    :class="{
      button: true,
      '--active': isActive || state === 'active',
      '--disabled': state === 'disabled',
      [`button--${size}`]: true,
      [`button--${color}`]: true,
      [`button--${layout}`]: true,
      ['button--withicon']: icon,
    }"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 $spacing-4;
  position: relative;

  /* base */
  background: getColor(--color-base);
  /* shadow-convex */
  border-radius: $radius-button;
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
    padding: 0 $spacing-4;
    font-size: $font-small;
    height: 2.8rem;
    line-height: 2.8rem;
  }
  &--medium {
    font-size: $font-medium;
    padding: 0 3rem;
    line-height: 4rem;
  }
  &--large {
    font-size: $font-medium;
    padding: 0 $spacing-9;
    height: 4.6rem;
    line-height: 4.6rem;
  }
  &--base {
    background: getColor(--color-base);
    color: getColor(--color-button-gray);
  }
  &--primary {
    background: var(--primary-liner);
    color: getColor(--color-white);
  }
  &--danger {
    background: getColor(--color-danger);
    color: getColor(--color-white);
  }
  &--flexible {
    @include flexible;
  }
  &--fill {
    display: block;
    width: 100%;
    max-width: 60rem;
    padding: 0;
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
      line-height: $fit;
      @include text-liner;
    }
  }
  &.--active,
  &:active {
    &:not(.--disabled) {
      color: getColor(--color-white);
      @include button-active;
      &.button--danger {
        @include button-active-danger;
      }
      &::after {
        color: white;
        @include void-text-liner;
      }
    }
  }
  &.--disabled {
    opacity: 0.3;
    box-shadow: $shadow-convex;
  }
}
</style>
