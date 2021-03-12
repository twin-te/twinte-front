<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    onChangeFile: {
      type: Function,
      required: true,
    },
  },
  emits: ["change-file"],
  setup: (_, { emit }) => {
    const fileName = ref("");

    const changeFile = (e: Event) => {
      const file = (e.target as any).files[0];
      fileName.value = file.name;
      emit("change-file", file);
    };

    return {
      fileName,
      changeFile,
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
      <input type="file" :name="name" :id="name" @change="changeFile" />
    </label>
  </div>
</template>

<style scoped lang="scss">
@import "~/scss/main.scss";

.input-button-file {
  display: flex;
  width: 100%;

  &__name {
    @include ellipsis;
    line-height: $spacing-7;
    &::before {
      font-family: "Material Icons";
      content: "insert_drive_file";
      margin-right: $spacing-1;
    }

    &--unselected {
      line-height: $spacing-7;
      color: $unselected;
    }
  }

  &__label {
    input {
      display: none;
    }

    @include center-flex;
    padding: 0 $spacing-4;
    font-size: $spacing-3;
    height: $spacing-7;
    line-height: $spacing-7;
    margin-left: auto;

    position: relative;

    background: $base;
    color: $button-gray;

    border-radius: $radius-button;
    font-weight: medium;
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
      color: $white;
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
