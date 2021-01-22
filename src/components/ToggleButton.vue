<script lang="ts">
import { defineComponent, ref } from "vue";

type Props = {
  onChange: Function;
  labels: { left: string; right: string };
  whichSelected: string;
  isDisable: boolean;
};

interface Label {
  left: string;
  right: string;
}

export default defineComponent({
  name: "ToggleButton",
  props: {
    onChange: {
      type: Function,
      required: true,
    },
    labels: {
      type: Object as () => Label,
      required: true,
    },
    whichSelected: {
      type: String,
      default: "left",
      validator: function (value: string) {
        return ["left", "right"].includes(value);
      },
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props: Props, { emit }) => {
    const isLeftSelected = ref(props.whichSelected == "left");
    const labels = ref(props.labels);

    const handleChange = (_isLeftSelected: boolean) => {
      isLeftSelected.value = !props.isDisable && _isLeftSelected;
      emit("change", isLeftSelected.value);
    };

    return { handleChange, isLeftSelected, labels };
  },
});
</script>

<template>
  <div
    :class="{
      'toggle-button': true,
    }"
  >
    <div @click="handleChange(true)" class="toggle-button__label">
      {{ labels.left }}
    </div>
    <div @click="handleChange(false)" class="toggle-button__label">
      {{ labels.right }}
    </div>
    <div
      :class="{
        'toggle-button__slider': true,
        '--left': isLeftSelected,
        '--right': !isLeftSelected,
      }"
    >
      {{ isLeftSelected ? labels.left : labels.right }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

input[type="checkbox"] {
  display: none;
}

.toggle-button {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12rem;
  height: 2.8rem;
  padding: 0 0.3rem;
  border: solid 0.1rem $base;
  border-radius: $radius-button;
  box-shadow: $shadow-input-concave, $shadow-convex;
  background-color: $base;
  color: $button-gray;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  @include button-cursor;

  &__label {
    width: 100%;
  }

  &__slider {
    position: absolute;
    left: 0.1rem;
    width: 6rem;
    height: 2.4rem;
    border-radius: $radius-button;
    box-shadow: $shadow-drop;
    background: $primary-liner;
    color: $white;
    line-height: 2.4rem;
    transition: $transition-transform;
    &.--right {
      transform: translate(5.6rem, 0);
    }
  }
}
</style>
