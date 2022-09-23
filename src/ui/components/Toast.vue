<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ToastType } from "~/presentation/viewmodels/toast";

type Props = {
  text: string;
};

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<ToastType>,
      default: "danger",
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
  <div :class="{ toast: true, [`toast--${type}`]: true }">
    <div :class="{ toast__text: true, [`toast__text--${type}`]: true }">
      {{ text }}
    </div>
    <div class="toast__close-button" @click="close()">
      <div class="material-icons">close</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.toast {
  display: grid;
  grid-template:
    "... ...  ...   ..." 1.4rem
    "... text close ..." 1fr
    "... ...  ...   ..." 1.4rem
    / 1.4rem 1fr 4rem 1.4rem;
  border: 0.1rem solid;
  border-radius: $radius-1;
  box-shadow: $shadow-convex-hover;
  background: var(--base-liner);
  &--primary {
    border-color: getColor(--color-primary);
  }
  &--danger {
    border-color: getColor(--color-danger);
  }
  &__text {
    grid-area: text;
    white-space: pre-wrap;
    line-height: $multi-line;
    &--primary {
      color: getColor(--color-primary);
    }
    &--danger {
      color: getColor(--color-danger);
    }
  }
  &__close-button {
    @include button-cursor;
    @include center-flex;
    grid-area: close;
    font-size: 2rem;
    color: getColor(--color-button-gray);
  }
}
</style>
