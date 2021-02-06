<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    onClickCheckbox: {
      type: Function,
      required: true,
    },
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
  setup: (_, { emit }) => {
    const handleClick = (e: MouseEvent) => {
      emit("click-checkbox", e);
    };

    return { handleClick };
  },
});
</script>

<template>
  <div
    @click="handleClick"
    :class="{
      checkbox: true,
      '--checked': isChecked,
      '--unchecked': !isChecked,
    }"
  >
    <div class="material-icons">done</div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

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
    background: $base-liner;
    color: $unselected;
    &:hover {
      @include button-hover;
    }
  }
  &.--checked {
    @include button-active;
    background: $primary-liner;
    color: $base;
  }
}
</style>
