<script lang="ts">
import { defineComponent } from "vue";
import Label from "~/components/Label.vue";

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
    <div class="labeled-text-field__label">
      <Label :value="label" :mandatory="mandatory"></Label>
    </div>
    <div class="labeled-text-field__text-field">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/styles";

.labeled-text-field {
  height: 6.8rem;
  &__label {
    margin-bottom: $spacing-2;
  }
}
</style>
