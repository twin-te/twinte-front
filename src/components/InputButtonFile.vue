<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String as PropType<"small" | "medium" | "large">,
      default: "large",
    },
    layout: {
      type: String as PropType<"flexible" | "fill" | "half">,
      default: "flexible",
    },
    color: {
      type: String as PropType<"base" | "primary" | "danger">,
      default: "base",
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
      // console.log(file);
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
        [`input-button-file__label--${color}`]: true,
        [`input-button-file__label--${layout}`]: true,
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
    line-height: 2.8rem;
    &::before {
      font-family: "Material Icons";
      content: "insert_drive_file";
      margin-right: $spacing-1;
    }

    &--unselected {
      line-height: 2.8rem;
      color: $unselected;
    }
  }

  &__label {
    input {
      display: none;
    }

    @include center-flex;
    padding: 0 1.6rem;
    margin-left: auto;

    position: relative;

    /* base */
    background: $base;
    /* shadow-convex */
    border-radius: $radius-button;
    font-weight: medium;
    vertical-align: middle;
    transition: $transition-box-shadow;

    @include button-cursor;
    @include button-inactive;
    &:hover {
      @include button-hover;
    }
    &:focus {
      // i18n
      outline: none;
    }
    &--small {
      padding: 0 1.6rem;
      font-size: 1.2rem;
      height: 2.8rem;
      line-height: 2.8rem;
    }
    &--medium {
      padding: 0 3rem;
      height: 4rem;
      font-size: 1.4rem;
      line-height: 4rem;
    }
    &--large {
      padding: 0 3.6rem;
      height: 4.6rem;
      font-size: 1.4rem;
      line-height: 4.6rem;
    }
    &--base {
      background: $base;
      color: $button-gray;
    }
    &--primary {
      background: $primary-liner;
      color: $white;
    }
    &--danger {
      background: $danger;
      color: $white;
    }
    &--fill {
      display: block;
      width: 100%;
      max-width: 60rem;
      padding: 0;
    }
    &--half {
      width: 35%;
      max-width: 200px;
    }
    &--withicon {
      &::after {
        font-family: "Material Icons";
        content: "launch";
        font-size: 100%;
        line-height: 100%;
        @include text-liner;
        @include iconlayout;
      }
    }
    &.--active,
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
