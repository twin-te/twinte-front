<script lang="ts">
import { defineComponent, PropType } from "vue";

export type TagListContentMode = "default" | "edit";
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
      default: "default",
    },
    textfield: {
      type: Boolean,
      default: false,
    },
    dragHandle: {
      type: String as PropType<TagListContentDragHandle>,
      default: "show",
    },
  },
});
</script>
<template>
  <div class="tag-list-content">
    <div
      :class="{
        'tag-list-content__container': true,
        '--textfield': mode === 'edit' && textfield,
      }"
    >
      <div
        v-show="mode === 'edit' && dragHandle !== 'hide'"
        :class="{
          'tag-list-content__drag-icon': true,
          'material-icons': true,
          '--disabled': dragHandle === 'disabled',
        }"
      >
        drag_handle
      </div>
      <div
        v-if="mode === 'default' || !textfield"
        class="tag-list-content__name"
      >
        {{ name }}
      </div>
      <div v-else class="tag-list-content__textfield">
        <slot name="textfiled" />
      </div>
      <div v-show="mode === 'default'" class="tag-list-content__credit">
        {{ credit }}
      </div>

      <div class="tag-list-content__btns">
        <slot name="btns" />
      </div>
    </div>
    <div class="tag-list-content__border" />
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";
.tag-list-content {
  width: 100%;

  &__container {
    display: flex;
    align-items: center;

    padding: $spacing-0 $spacing-2;

    height: 4.4rem;
    &.--textfield {
      height: 4.8rem;
    }
  }

  &__name {
    flex-grow: 1;
    font-size: $font-small;
    user-select: none;
  }

  &__credit {
    font-weight: 500;
    user-select: none;
  }

  &__drag-icon {
    color: getColor(--color-button-gray);
    font-size: $font-large;

    margin-right: $spacing-3;

    @include button-cursor;

    &.--disabled {
      opacity: 0.3;
    }
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
