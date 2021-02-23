<script lang="ts">
import { defineComponent, PropType } from "vue";
import GrayFilter from "./GrayFilter.vue";

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
      type: String as PropType<"small" | "large">,
      default: "large",
      validator: function (value: string) {
        return ["small", "large"].includes(value);
      },
    },
  },
  emits: ["click"],
});
</script>

<template>
  <div
    :class="{
      modal: true,
      [`modal--${size}`]: true,
    }"
  >
    <span @click="$emit('click')" class="material-icons modal__close-btn"
      >close</span
    >
    <h1 class="modal__title">
      <slot name="title"></slot>
    </h1>
    <div class="modal__contents">
      <slot name="contents"></slot>
    </div>
    <div class="modal__button">
      <slot name="button"></slot>
    </div>
  </div>
  <GrayFilter @click="$emit('click')"></GrayFilter>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  padding: 3.6rem 3.2rem 3.2rem 3.2rem;
  background: $base-liner;
  box-sizing: border-box;
  border: 0.1rem solid $base;
  box-shadow: $shadow-base;
  border-radius: $radius-3;
  text-align: left;

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
  &__title {
    @include modal-title;
    margin-bottom: 4rem;
  }
  &__contents {
    height: 100%;
    overflow: scroll;
  }
  &__button {
    display: flex;
    flex-direction: row;
    margin-top: 2.8rem;
  }
  &__close-btn {
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
