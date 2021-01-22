<script lang="ts">
import { defineComponent, ref } from "vue";

type Props = {
  onChange: Function;
  value: string;
  isChecked: boolean;
  isDisable: boolean;
};

export default defineComponent({
  name: "ToggleSwitch",
  props: {
    onChange: {
      type: Function,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: "",
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
  setup: (props: Props, { emit }) => {
    const isChecked = ref(props.isChecked);

    const handleChange = () => {
      isChecked.value = !props.isDisable && !isChecked.value;
      emit("change", isChecked.value);
    };

    return { handleChange, isChecked };
  },
});
</script>

<template>
  <label
    :class="{
      'toggle-switch': true,
      '--checked': isChecked,
      '--unchecked': !isChecked,
    }"
  >
    <input
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="handleChange"
    />
    <div
      :class="{
        'toggle-switch__slider': true,
        '--checked': isChecked,
        '--unchecked': !isChecked,
      }"
    ></div>
  </label>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

input[type="checkbox"] {
  display: none;
}

.toggle-switch {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 4.8rem;
  height: 2.8rem;
  border: solid 0.1rem $base;
  border-radius: $radius-5;

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
