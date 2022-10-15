<script lang="ts">
import { defineComponent } from "vue";

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
    :class="{
      'toggle-switch': true,
      '--checked': isChecked,
      '--unchecked': !isChecked,
    }"
    @click="handleChange"
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
@import "~/ui/styles";

.toggle-switch {
  position: relative;
  display: flex;
  align-items: center;
  width: 4.8rem;
  height: 2.8rem;
  border: solid 0.1rem getColor(--color-base);
  border-radius: $radius-button;

  @include button-cursor;
  &.--unchecked {
    // figma では 3px 3px 6px rgba(165, 186, 199, 0.45); だがとりあえず $shadow-comvex で代用
    box-shadow: $shadow-convex, $shadow-unselected-concave;
    background: getColor(--color-unselected);
  }
  &.--checked {
    box-shadow: $shadow-convex, $shadow-primary-concave;
    background: var(--primary-liner);
  }

  &__slider {
    position: absolute;
    left: 0.3rem;
    width: 2.2rem;
    height: 2.2rem;
    background: var(--base-liner);
    border-radius: $circle;
    box-shadow: $shadow-drop;
    transition: $transition-all;
    &.--checked {
      transform: translate(1.8rem, 0);
    }
  }
}
</style>
