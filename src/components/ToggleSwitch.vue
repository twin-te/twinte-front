<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    onClickToggleSwitch: {
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
  emits: ["click-toggle-switch"],
  setup: (_, { emit }) => {
    const handleChange = (e: MouseEvent) => {
      emit("click-toggle-switch", e);
    };

    return { handleChange };
  },
});
</script>

<template>
  <div
    @click="handleChange"
    :class="{
      'toggle-switch': true,
      '--checked': isChecked,
      '--unchecked': !isChecked,
    }"
  >
    <div
      :class="{
        'toggle-switch__slider': true,
        '--checked': isChecked,
        '--unchecked': !isChecked,
      }"
    ></div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.toggle-switch {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 4.8rem;
  height: 2.8rem;
  border: solid 0.1rem $base;
  border-radius: $radius-button;

  @include button-cursor;
  &.--unchecked {
    // figma では 3px 3px 6px rgba(165, 186, 199, 0.45); だがとりあえず $shadow-comvex で代用
    box-shadow: $shadow-convex, $shadow-unselected-concave;
    background: $unselected;
  }
  &.--checked {
    box-shadow: $shadow-convex, $shadow-primary-concave;
    background: $primary-liner;
  }

  &__slider {
    position: absolute;
    left: 0.3rem;
    width: 2.2rem;
    height: 2.2rem;
    background: $base-liner;
    border-radius: $circle;
    box-shadow: $shadow-drop;
    transition: $transition-all;
    &.--checked {
      transform: translate(1.8rem, 0);
    }
  }
}
</style>
