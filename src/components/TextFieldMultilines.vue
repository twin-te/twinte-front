<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 34, // 単位: rem
    },
    height: {
      type: Number,
      default: 4, // 単位: rem
    },
  },
  emits: ["update:modelValue", "enter-text-field"],
  setup: (_, { emit }) => {
    const handleInput = (e: Event) => {
      if (!(e.target instanceof HTMLTextAreaElement)) {
        return;
      }
      emit("update:modelValue", e.target.value);
    };

    return { handleInput };
  },
});
</script>

<template>
  <div class="text-field-multilines">
    <textarea
      @input="handleInput"
      :value="modelValue"
      :style="{
        width: `${width}rem`,
        height: `${height}rem`,
      }"
      :placeholder="placeholder"
      class="text-field-multilines__input"
    >
    </textarea>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.text-field-multilines {
  box-shadow: $shadow-input-concave;
  padding: $spacing-2 $spacing-4 1rem;
  border-radius: $radius-input;
  &__input {
    display: block;
    width: 100%;
    resize: none;

    background: $base;
    font-size: $font-medium;
    line-height: $multi-line;
    color: $text-main;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: $unselected;
    }
  }
}
</style>
