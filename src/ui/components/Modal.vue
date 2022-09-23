<script lang="ts">
import { defineComponent, PropType } from "vue";
import GrayFilter from "./GrayFilter.vue";

export default defineComponent({
  name: "Modal",
  components: {
    GrayFilter,
  },
  props: {
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
  <div>
    <div
      :class="{
        modal: true,
        [`modal--${size}`]: true,
      }"
    >
      <span class="material-icons modal__close-btn" @click="$emit('click')"
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
    <GrayFilter class="modal-filter" @click="$emit('click')"></GrayFilter>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.modal {
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding: $spacing-9 $spacing-8 $spacing-8;
  background: var(--base-liner);
  box-shadow: $shadow-base;
  border-radius: $radius-3;
  text-align: left;
  @include center-fixed;

  &--large {
    // スマホ
    width: 34rem;
    height: 56rem;
    // タブレット、PC、横向き
    @include large-screen {
      width: 40rem;
      height: 50rem;
    }
  }
  &--small {
    // スマホ
    width: 34rem;
    height: 40rem;
    // タブレット、PC、横向き
    @include large-screen {
      width: 40rem;
      height: 30rem;
    }
  }
  &__title {
    @include modal-title;
    margin-bottom: $spacing-10;
  }
  &__contents {
    height: 100%;
    overflow-y: auto;
    @include text-discription;
  }
  &__button {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    margin-top: $spacing-7;
  }
  &__close-btn {
    position: absolute;
    top: 2rem;
    right: 2rem;
    color: getColor(--color-button-gray);
    @include button-cursor;
    font-size: 2.4rem;
    font-weight: normal;
    line-height: $fit;
  }
}

.modal-filter {
  z-index: 99;
}
</style>
