<script lang="ts">
import { defineComponent, PropType } from "vue";

export type TagListContentMode = "filtering" | "edit";
export type TagListContentDragHandle = "show" | "hide" | "disabled";

export default defineComponent({
  name: "TagListContent",
  props: {
    name: {
      type: String,
      default: "",
    },
    credit: {
      type: String,
      default: "0.0",
    },
    mode: {
      type: String as PropType<TagListContentMode>,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
    textfield: {
      type: Boolean,
      required: true,
    },
    dragHandle: {
      type: String as PropType<TagListContentDragHandle>,
      default: "show",
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const handleClick = () => {
      if (props.mode !== "filtering") return;
      emit("click");
    };

    return {
      handleClick,
    };
  },
});
</script>
<template>
  <div @click="handleClick" class="tag-list-content">
    <div
      :class="{
        'tag-list-content__container': true,
        '--selected': mode == 'filtering' && selected,
        '--filtering': mode == 'filtering',
      }"
    >
      <div
        v-show="mode == 'edit' && dragHandle !== 'hide'"
        class="tag-list-content__drag-icon material-icons"
      >
        drag_handle
      </div>
      <div v-show="!textfield" class="tag-list-content__name">
        {{ name }}
      </div>
      <div v-show="textfield" class="tag-list-content__textfield">
        <slot name="textfiled" />
      </div>

      <div v-show="mode == 'filtering'" class="tag-list-content__credit">
        {{ credit }}
      </div>
      <div v-show="mode == 'edit'" class="tag-list-content__btns">
        <slot name="btns" />
      </div>
    </div>
    <div
      v-show="mode == 'edit' || !selected"
      class="tag-list-content__border"
    />
  </div>
</template>

<style scoped lang="scss">
@import "~/scss/main.scss";
.tag-list-content {
  width: 100%;

  &__container {
    display: flex;
    align-items: center;

    padding: $spacing-1 $spacing-2;
    border-radius: $radius-1;

    font-size: $font-small;

    &.--selected {
      color: getColor(--color-white);
      font-size: $font-medium;

      background: var(--primary-liner);
    }

    &.--filtering {
      height: 3rem;
      justify-content: space-between;
      @include button-cursor;
    }
  }

  &__name {
    flex-grow: 1;
    user-select: none;
  }

  &__credit {
    font-size: $font-medium;
  }

  &__drag-icon {
    color: getColor(--color-button-gray);
    font-size: $font-large;

    margin-right: $spacing-3;

    @include button-cursor;
  }

  &__textfield {
    flex-grow: 1;
  }

  &__btns {
    margin-left: $spacing-4;

    display: flex;
    gap: $spacing-3;
  }

  &__border {
    width: 100%;
    height: 0.4rem;

    background: getColor(--color-base);
    box-shadow: $shadow-input-concave;
    border-radius: 0.2rem;
  }
}
</style>
