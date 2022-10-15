<script lang="ts">
import { defineComponent, PropType } from "vue";
import Label from "~/ui/components/Label.vue";

export default defineComponent({
  name: "LabeledTextField",
  components: {
    Label,
  },
  props: {
    label: {
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
  <div
    :class="{
      'labeled-text-field': true,
      '--mandatory': mandatory,
    }"
  >
    <div :class="`labeled-text-field__label --${size}`">
      <Label :value="label" :mandatory="mandatory" :size="size"></Label>
    </div>
    <div class="labeled-text-field__text-field">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.labeled-text-field {
  height: 6.8rem;
  &__label {
    margin-bottom: $spacing-2;
    &.--slim {
      margin-bottom: $spacing-1;
    }
  }
}
</style>
