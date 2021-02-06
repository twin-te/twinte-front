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
  <textarea
    @input="handleInput"
    :value="modelValue"
    :style="{
      width: `${width}rem`,
      height: `${height}rem`,
    }"
    :placeholder="placeholder"
    class="text-field"
  >
  </textarea>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.text-field {
  display: block;
  width: 100%;
  resize: none;
  padding: 0.8rem 1.6rem 1rem;
  border-radius: $radius-2;
  box-shadow: $shadow-input-concave;
  background: $base;
  font-size: 1.4rem;
  line-height: 160%;
  color: $text-main;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: $unselected;
  }
}
</style>
