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
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "10rem",
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
    <div class="text-field-multilines__scaling">
      <textarea
        :value="modelValue"
        :style="{
          width,
          height,
        }"
        :placeholder="placeholder"
        class="text-field-multilines__input"
        @input="handleInput"
      >
      </textarea>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.text-field-multilines {
  box-shadow: $shadow-input-concave;
  border-radius: $radius-input;
  padding: 0 $spacing-4;
  background: getColor(--color-base);
  &__input {
    resize: none;
    line-height: $multi-line;
    color: getColor(--color-text-main);
    background: inherit;
    font-size: 1.6rem; //スマホでのinput入力時拡大防止
    transform: scale(0.875); //$text-mediumにする
    margin: 0 -6%; //scaleで縮んだ表示領域の調整

    &:focus {
      outline: none;
    }
    &::placeholder {
      color: getColor(--color-unselected);
    }
  }
}
</style>
