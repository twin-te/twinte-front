<script lang="ts">
import { defineComponent } from "vue";

type Props = {
  value: string;
  isSelected: boolean;
};

export default defineComponent({
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      default: "8.8rem",
    },
  },
  emits: ["click"],
  setup(props: Props, { emit }) {
    const emitClickEvent = (e: MouseEvent) => {
      emit("click", props.value, e);
    };
    return { emitClickEvent };
  },
});
</script>

<template>
  <div
    @click="emitClickEvent"
    :class="{ option: true, '--selected': isSelected }"
    :style="{ width: width }"
  >
    {{ value }}
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.option {
  @include text-main;
  font-weight: normal;
  @include button-cursor;
  padding: $spacing-2 $spacing-3;
  background-color: $base;
  &.--selected {
    box-shadow: $shadow-concave;
  }
}
</style>
