<script lang="ts">
import { defineComponent } from "vue";

type Props = {
  isChecked: boolean;
  isDisable: boolean;
};

export default defineComponent({
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click-checkbox"],
  setup: (props: Props, { emit }) => {
    const handleClick = (e: MouseEvent) => {
      if (props.isDisable) return;
      emit("click-checkbox", e);
    };

    return { handleClick };
  },
});
</script>

<template>
  <div
    :class="{
      checkbox: true,
      '--checked': isChecked,
      '--unchecked': !isChecked,
    }"
    @click="handleClick"
  >
    <div class="material-icons">done</div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: $radius-2;
  transition: $transition-box-shadow;
  box-shadow: none;
  font-size: 1.8rem;

  @include button-cursor;
  &.--unchecked {
    @include button-inactive;
    background: getColor(--color-base);
    color: getColor(--color-unselected);
    &:hover {
      @include button-hover;
    }
  }
  &.--checked {
    @include button-active;
    background: var(--primary-liner);
    color: getColor(--color-white);
  }
}
</style>
