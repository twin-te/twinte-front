<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Label",
  props: {
    value: {
      type: String,
      required: true,
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<"normal" | "slim">,
      default: "normal",
    },
  },
});
</script>

<template>
  <div :class="`label --${size}`">
    {{ value }}
    <span v-if="mandatory" class="label__mandatory">必須</span>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.label {
  display: flex;
  align-items: center;
  height: 2rem;
  font-size: $font-medium;
  font-weight: 500;
  line-height: $single-line;
  color: getColor(--color-text-main);
  &.--slim {
    font-size: $font-minimum;
    font-weight: 500;
    color: getColor(--color-text-sub);
  }
  &__mandatory {
    font-size: $font-minimum;
    font-weight: 400;
    line-height: $single-line;
    color: getColor(--color-white);
    background: getColor(--color-unselected);
    border-radius: $radius-1;
    padding: 0 $spacing-1;
    margin-left: $spacing-2;
  }
}
</style>
