<script lang="ts">
import { defineComponent } from "vue";
import Checkbox from "./Checkbox.vue";

export default defineComponent({
  name: "CheckContent",
  components: {
    Checkbox,
  },
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:checked"],
});
</script>

<template>
  <div class="check-content">
    <Checkbox
      :isChecked="checked"
      :isDisable="disabled"
      @click-checkbox="$emit('update:checked', !checked)"
    ></Checkbox>
    <div class="check-content__value"><slot /></div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.check-content {
  width: max-content;
  @include center-flex;
  &__value {
    padding: $spacing-0 $spacing-4 $spacing-0 $spacing-3;
    line-height: $single-line;
  }
}
</style>
