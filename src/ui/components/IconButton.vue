<script lang="ts">
import { defineComponent, PropType } from "vue";
import Loader from "./Loader.vue";

type Props = {
  size: string;
  color: string;
  iconName: string;
  state: "default" | "disabled";
  loading: boolean;
};

export default defineComponent({
  name: "IconButton",
  components: { Loader },
  props: {
    onKeyup: {
      type: Function,
      default: () => void 0,
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
    state: {
      type: String as PropType<"default" | "disabled">,
      default: "default",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup: (props: Props, { emit }) => {
    const handleClick = (e: MouseEvent) => {
      if (props.state === "disabled") return;
      emit("click", e);
    };

    const getButtonWidthPixel = () => {
      const documentFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );

      switch (props.size) {
        case "small":
          return 2.8 * documentFontSize;
        case "medium":
          return 3.3 * documentFontSize;
        case "large":
          return 4 * documentFontSize;
        default:
          return 3.3 * documentFontSize;
      }
    };

    return { handleClick, getButtonWidthPixel };
  },
});
</script>

<template>
  <button
    :class="{
      'icon-button': true,
      [`icon-button--${size}`]: true,
      [`icon-button--${color}`]: true,
      '--disabled': state === 'disabled',
    }"
    @click="handleClick"
    @keyup.enter="$emit('click', $event)"
  >
    <Loader v-if="loading" :size="getButtonWidthPixel() / 2" />
    <span v-else class="material-icons">{{ iconName }}</span>
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

  &.--disabled {
    opacity: 0.3;
  }

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
    &:active:not(.--disabled) {
      color: getColor(--color-white);
      @include button-active;
    }
  }
  &--danger {
    color: getColor(--color-danger);
    transition: $transition-box-shadow;
    &:active:not(.--disabled) {
      color: getColor(--color-white);
      @include button-active-danger;
    }
  }
  &--primary {
    span {
      @include text-liner;
      transition: $transition-box-shadow;
    }
    &:active:not(.--disabled) {
      @include button-active;
      color: getColor(--color-white);
      span {
        @include void-text-liner;
        color: getColor(--color-white);
      }
    }
  }
}
</style>
