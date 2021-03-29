<script lang="ts">
import { defineComponent } from "vue";

type Props = {
  onClickCloseButton: Function;
  text: string;
};

export default defineComponent({
  props: {
    onClickCloseButton: {
      type: Function,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  emits: ["click-close-button"],
  setup: (_: Props, { emit }) => {
    const close = () => {
      emit("click-close-button");
    };
    return {
      close,
    };
  },
});
</script>

<template>
  <div class="toast">
    <div class="toast__text">{{ text }}</div>
    <div @click="close()" class="toast__close-button">
      <div class="material-icons">close</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/scss/main.scss";

.toast {
  display: grid;
  grid-template:
    "... ...  ...   ..." 1.4rem
    "... text close ..." 1fr
    "... ...  ...   ..." 1.4rem
    / 1.4rem 1fr 4rem 1.4rem;
  border: 0.1rem solid $danger;
  border-radius: $radius-1;
  box-shadow: $shadow-convex-hover;
  background: $base-liner;
  &__text {
    grid-area: text;
    white-space: pre-wrap;
    line-height: $multi-line;
    color: $danger;
  }
  &__close-button {
    @include button-cursor;
    @include center-flex;
    grid-area: close;
    font-size: 2rem;
    color: $button-gray;
  }
}
</style>
