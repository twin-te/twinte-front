<script lang="ts">
import { defineComponent, ref } from "vue";

type Props = {
  onChange: Function;
  value: string;
  isChecked: boolean;
  isDisable: boolean;
};

export default defineComponent({
  name: "Checkbox",
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
    const handleChange = () => {};

    return { handleChange };
  },
});
</script>

<template>
  <label
    :class="{
      wrapper: true,
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
    <span class="material-icons">done</span>
  </label>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

input[type="checkbox"] {
  display: none;
}

.wrapper {
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
