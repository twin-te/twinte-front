<script lang="ts">
import { defineComponent } from "vue";

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
  },
});
</script>

<template>
  <div class="label">
    {{ value }}
    <span v-if="mandatory" class="label__mandatory">必須</span>
  </div>
</template>

<style scoped lang="scss">
@import "~/styles";

.label {
  display: flex;
  align-items: center;
  height: 2rem;
  font-size: $font-medium;
  font-weight: 500;
  line-height: $single-line;
  color: getColor(--color-text-main);
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
