<script lang="ts">
import { defineComponent, PropType } from "vue";

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
    type: {
      type: String as PropType<"normal" | "slim">,
      default: "normal",
    },
    added: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "enter-text-field", "close"],
  setup: (_, { emit }) => {
    const handleInput = (e: Event) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      emit("update:modelValue", e.target.value);
    };

    return { handleInput };
  },
});
</script>

<template>
  <div :class="{ 'text-field': true, [`text-field--${type}`]: true }">
    <div class="text-field__box">
      <input
        :class="{
          'text-field': true,
          'text-field__input': true,
          '--disabled': disabled,
        }"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
        @keydown.enter="$emit('enter-text-field')"
      />
    </div>
    <div
      v-if="added"
      class="text-field__icon material-icons"
      @click="$emit('close')"
    >
      close
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.text-field {
  display: flex;
  align-items: center;
  gap: $spacing-2;

  &__box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0rem $spacing-4;
    box-shadow: $shadow-input-concave;
    border-radius: $radius-input;
    background: getColor(--color-base);
  }

  &--normal {
    height: 4rem;
  }

  &--slim {
    height: 3.4rem;
  }

  &__input {
    width: 100%;
    height: 2rem;
    font-size: 1.6rem; //スマホでのinput入力時拡大防止
    transform: scale(0.875); //$text-mediumにする
    margin: 0 -6%; //scaleで縮んだ表示領域の調整
    line-height: $fit;
    color: getColor(--color-text-main);
    background: getColor(--color-base);

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: getColor(--color-unselected);
    }
  }

  &__icon {
    color: getColor(--color-button-gray);
    font-size: 2rem;
    @include button-cursor;
  }

  &.--disabled {
    opacity: 0.3;
    box-shadow: $shadow-convex;
  }
}
</style>
