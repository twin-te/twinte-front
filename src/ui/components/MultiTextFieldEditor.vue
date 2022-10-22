<script lang="ts">
import { PropType, defineComponent } from "vue";
import Label from "~/ui/components/Label.vue";
import TertiaryButton from "~/ui/components/TertiaryButton.vue";
import TextFieldSingleLine from "~/ui/components/TextFieldSingleLine.vue";
import { useFocus } from "../hooks/useFocus";

export default defineComponent({
  components: {
    Label,
    TextFieldSingleLine,
    TertiaryButton,
  },
  props: {
    elements: {
      type: Array as PropType<string[]>,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
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
  emits: ["update:elements"],
  setup(props, { emit }) {
    const { targetRef, focus } = useFocus();

    const addElement = () => {
      const newElements = [...props.elements];
      newElements.push("");
      emit("update:elements", newElements);
      focus([`#text-field-single-line-${newElements.length - 1}`, "input"]);
    };

    const updateElement = (i: number, v: string) => {
      const newElements = [...props.elements];
      newElements.splice(i, 1, v.trim());
      emit("update:elements", newElements);
    };

    const deleteElement = (i: number) => {
      const newElements = [...props.elements];
      newElements.splice(i, 1);
      emit("update:elements", newElements);
    };

    return {
      targetRef,
      addElement,
      updateElement,
      deleteElement,
    };
  },
});
</script>

<template>
  <div ref="targetRef" class="multi-text-field">
    <Label
      v-if="label !== ''"
      :value="label"
      :mandatory="mandatory"
      :size="size"
    ></Label>
    <TextFieldSingleLine
      v-for="(el, i) in elements"
      :id="`text-field-single-line-${i}`"
      :key="`${i}`"
      :model-value="el"
      :placeholder="placeholder"
      added
      @update:model-value="(v) => updateElement(i, v)"
      @close="deleteElement(i)"
    ></TextFieldSingleLine>
    <TertiaryButton color="ghost" icon-position="left" @click="addElement">
      <template #icon>add</template>
      <template #text>追加する</template>
    </TertiaryButton>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.multi-text-field {
  display: grid;
  gap: $spacing-2;
}
</style>
