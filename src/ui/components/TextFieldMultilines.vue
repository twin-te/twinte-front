<script lang="ts">
import { defineComponent, h, ref, render, VNode, watchEffect } from "vue";
import { isUrl } from "~/utils";

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
    renderd: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "enter-text-field", "click", "focusout"],
  setup: (props, { emit }) => {
    const handleInput = (e: Event) => {
      if (!(e.target instanceof HTMLTextAreaElement)) {
        return;
      }
      emit("update:modelValue", e.target.value);
    };
    const handleClick = (e: Event) => {
      emit("click", e);
    };
    const handleFocusout = (e: Event) => {
      emit("focusout", e);
    };
    const renderingContainerRef = ref<HTMLDivElement>();
    watchEffect(() => {
      if (props.modelValue === "")
        return h("div", { class: "--empty" }, props.placeholder);
      const words = props.modelValue.split(" ");
      const renderdWords = words
        .reduce((children, word) => {
          const renderd = isUrl(word)
            ? h("a", { href: word, target: "_blank" }, word)
            : word;
          return [...children, renderd, " "];
        }, [] as (string | VNode)[])
        .slice(0, -1);
      const container = renderingContainerRef.value;
      if (!container) return;
      render(h("div", renderdWords), container);
    });
    return { handleInput, handleClick, handleFocusout, renderingContainerRef };
  },
});
</script>

<template>
  <div
    class="text-field-multilines"
    :style="{
      width,
      height,
    }"
  >
    <div
      v-if="renderd"
      ref="renderingContainerRef"
      class="text-field-multilines__renderd"
      @click="handleClick"
    ></div>
    <div v-else class="text-field-multilines__raw">
      <textarea
        :value="modelValue"
        :placeholder="placeholder"
        class="text-field-multilines__input"
        @input="handleInput"
        @focusout="handleFocusout"
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
  &__renderd,
  &__raw {
    height: 100%;
    line-height: $multi-line;
    color: getColor(--color-text-main);
  }
  &__renderd {
    width: 100%;
    display: grid;
    place-items: center;
    ::v-deep(div) {
      width: 100%;
      height: 87.5%;
      overflow: hidden;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      &.--empty {
        color: getColor(--color-unselected);
      }
      a {
        color: getColor(--color-text-link);
        text-decoration: none;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        overflow: hidden;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  &__input {
    resize: none;
    width: 100%;
    height: 100%;
    background: inherit;
    font-size: 1.6rem; //スマホでのinput入力時拡大防止
    transform: scale(0.875); //$text-mediumにする
    margin: 0 calc(-1 * (100% - 87.5%) / 2); //scaleで縮んだ表示領域の調整

    &:focus {
      outline: none;
    }
    &::placeholder {
      color: getColor(--color-unselected);
    }
  }
}
</style>
