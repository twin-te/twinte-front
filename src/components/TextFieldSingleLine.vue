<script lang="ts">
import { defineComponent } from "vue";

type Props = {
  modelValue: string;
  placeholder: string;
  width: number;
  height: number;
  iconName: string;
};

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    onEnterTextField: {
      type: Function,
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
    // 必要ない場合は空欄
    iconName: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "enter-text-field"],
  setup: (props: Props, { emit }) => {
    const hasIcon = () => {
      return props.iconName !== "";
    };

    const handleInput = (e: Event) => {
      if (!(e.target instanceof HTMLInputElement)) {
        return;
      }
      emit("update:modelValue", e.target.value);
    };

    const handleEnter = (e: KeyboardEvent) => {
      emit("enter-text-field", e);
    };

    return { hasIcon, handleInput, handleEnter };
  },
});
</script>

<template>
  <div
    class="text-field text-field__box"
    :style="{
      width: `${width}rem`,
      height: `${height}rem`,
    }"
  >
    <div
      :class="{
        'text-field': true,
        'text-field__icon': true,
        'material-icons': true,
        '--no-icon': hasIcon,
      }"
    >
      {{ iconName }}
    </div>
    <input
      type="text"
      @input="handleInput"
      @keydown.enter="handleEnter"
      :value="modelValue"
      :class="{
        'text-field': true,
        'text-field__input': true,
      }"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.text-field {
  background: $base;
  &__box {
    display: flex;
    align-items: center;
    padding: 0rem 1.6rem;
    box-shadow: $shadow-input-concave;
    border-radius: $radius-2;
  }
  &__icon {
    margin-right: 0.4rem;
    color: $unselected;
    font-size: 2.2rem;
    font-family: Material Icons;
    .--no-icon {
      display: none;
    }
  }
  &__input {
    display: block;
    width: 100%;
    font-size: 1.4rem;
    line-height: 1.4rem;
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
