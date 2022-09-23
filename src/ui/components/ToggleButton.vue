<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export type Labels = { left: string; right: string };
export type Select = "left" | "right";
type Props = {
  labels: Labels;
  whichSelected: Select;
  isDisable: boolean;
};

export default defineComponent({
  props: {
    labels: {
      type: Object as PropType<Labels>,
      required: true,
    },
    whichSelected: {
      type: String as PropType<Select>,
      required: true,
      validator: function (value: string) {
        return ["left", "right"].includes(value);
      },
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click-toggle-button"],
  setup: (props: Props, { emit }) => {
    const handleChange = (select: Select, e: MouseEvent) => {
      emit("click-toggle-button", select, e);
    };

    const isSelectLeft = computed(() => {
      return props.whichSelected == "left";
    });

    return { handleChange, isSelectLeft };
  },
});
</script>

<template>
  <div
    :class="{
      'toggle-button': true,
    }"
  >
    <div class="toggle-button__label" @click="handleChange('left', $event)">
      {{ labels.left }}
    </div>
    <div class="toggle-button__label" @click="handleChange('right', $event)">
      {{ labels.right }}
    </div>
    <div
      :class="{
        'toggle-button__slider': true,
        '--left': isSelectLeft,
        '--right': !isSelectLeft,
      }"
    >
      {{ isSelectLeft ? labels.left : labels.right }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

input[type="checkbox"] {
  display: none;
}

.toggle-button {
  position: relative;
  display: flex;
  align-items: center;
  width: 12rem;
  height: 2.8rem;
  padding: 0 0.3rem;
  border: solid 0.1rem getColor(--color-base);
  border-radius: $radius-button;
  box-shadow: $shadow-input-concave, $shadow-convex;
  background-color: getColor(--color-base);
  color: getColor(--color-button-gray);
  font-size: $font-small;
  font-weight: 500;
  text-align: center;
  @include button-cursor;

  &__label {
    width: 100%;
    line-height: 2.8rem;
  }

  &__slider {
    position: absolute;
    left: 0.1rem;
    width: 6rem;
    height: 2.4rem;
    border-radius: $radius-button;
    box-shadow: $shadow-drop;
    background: var(--primary-liner);
    color: getColor(--color-white);
    line-height: 2.4rem;
    transition: $transition-transform;
    &.--right {
      transform: translate(5.6rem, 0);
    }
  }
}
</style>
