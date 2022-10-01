<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    accept: {
      type: String,
      default: "",
    },
  },
  emits: ["change-file"],
  setup: (_, { emit }) => {
    const fileName = ref("");
    const path = ref("");

    const changeFile = (e: Event) => {
      const file = (e.currentTarget as HTMLInputElement).files?.[0];
      fileName.value = file?.name ?? "";
      emit("change-file", file);
    };

    // 同じ名前のファイルを再度選択したとき onChange が機能しないため
    const resetFileSelect = () => {
      path.value = "";
    };

    return {
      fileName,
      changeFile,
      path,
      resetFileSelect,
    };
  },
});
</script>

<template>
  <div class="input-button-file">
    <div v-if="fileName" class="input-button-file__name">{{ fileName }}</div>
    <div v-else class="input-button-file__name--unselected">未選択</div>
    <label
      :class="{
        'input-button-file__label': true,
        [`input-button-file__label--small`]: true,
        [`input-button-file__label--base`]: true,
        [`input-button-file__label--flexible`]: true,
      }"
      :for="name"
    >
      <slot />
      <input
        :id="name"
        type="file"
        :name="name"
        :accept="accept"
        :value="path"
        @click="resetFileSelect"
        @change="changeFile"
      />
    </label>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.input-button-file {
  display: flex;
  width: 100%;

  &__name {
    @include ellipsis;
    line-height: $spacing-7;
    &::before {
      font-family: "Material Icons";
      content: "insert_drive_file";
      margin-right: $spacing-2;
    }

    &--unselected {
      line-height: 2.8rem;
      color: getColor(--color-unselected);
    }
  }

  &__label {
    input {
      display: none;
    }

    @include center-flex;
    padding: 0 $spacing-4;
    font-size: $font-small;
    height: 2.8rem;
    line-height: 2.8rem;
    margin-left: auto;

    position: relative;

    background: getColor(--color-base);
    color: getColor(--color-button-gray);

    border-radius: $radius-button;
    vertical-align: middle;
    transition: $transition-box-shadow;
    white-space: nowrap;

    @include button-cursor;
    @include button-inactive;
    &:hover {
      @include button-hover;
    }
    &:focus {
      outline: none;
    }
    &:active {
      color: getColor(--color-white);
      @include button-active;
      &.button--danger {
        @include button-active-danger;
      }
      &::after {
        color: white;
        @include void-text-liner;
      }
    }
    &.--disabled {
      opacity: 0.3;
      box-shadow: $shadow-convex;
    }
  }
}
</style>
