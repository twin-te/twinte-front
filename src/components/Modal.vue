<script lang="ts">
import { defineComponent } from "vue";
import GrayFilter from "./GrayFilter.vue";

type Props = {
  onClick: Function;
  size: string;
  device: string;
};

export default defineComponent({
  name: "Modal",
  components: {
    GrayFilter,
  },
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    size: {
      type: String,
      default: "large",
      validator: function (value: string) {
        return ["small", "large"].includes(value);
      },
    },
    device: {
      type: String,
      default: "sp",
      validator: function (value: string) {
        return ["sp", "pc-tab"].includes(value);
      },
    },
  },
  emits: ["click"],
  setup: (props: Props, { emit }) => {
    const handleClick = () => {
      emit("click");
    };
    return { handleClick };
  },
});
</script>

<template>
  <div
    :class="{
      modal: true,
      [`modal--${size}`]: true,
    }"
  >
    <span @click="handleClick" class="material-icons close-btn">close</span>
    <slot></slot>
  </div>
  <GrayFilter @click="handleClick"></GrayFilter>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.modal {
  padding: 3.6rem 3.2rem 3.2rem 3.2rem;
  background: $base-liner;
  box-sizing: border-box;
  border: 0.1rem solid $base;
  box-shadow: $shadow-base;
  border-radius: 1.2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;

  &--large {
    // スマホ
    width: 34.4rem;
    height: 56.7rem;
    // タブレット、PC、横向き
    @include large-screen {
      width: 40rem;
      height: 51.58334rem;
    }
  }
  &--small {
    // スマホ
    width: 34.3rem;
    height: 39.5rem;
    // タブレット、PC、横向き
    @include large-screen {
      width: 40rem;
      height: 30.33334rem;
    }
  }
  .close-btn {
    position: absolute;
    top: 2.028rem;
    right: 2rem;
    color: $button-gray;
    @include button-cursor;
    font-size: 2.4rem;
    font-weight: normal;
    line-height: 2.4rem;
  }
}
</style>
