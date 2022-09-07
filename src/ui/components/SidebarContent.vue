<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarContent",
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
      default: "",
    },
    item: {
      type: String,
      default: "",
    },
  },
  emits: ["click"],
  setup: (_, { emit }) => {
    const handleClick = () => {
      emit("click");
    };
    return { handleClick };
  },
});
</script>
<template>
  <button
    :class="{
      sidebar__content: true,
      [`sidebar__content--selected`]: selected,
    }"
    @click="handleClick"
  >
    <span class="sidebar__icon material-icons">{{ iconName }}</span>
    <p
      :class="{
        sidebar__name: true,
        ['sidebar__name--link']: link,
      }"
    >
      {{ item }}
    </p>
  </button>
</template>

<style scoped lang="scss">
@import "~/ui/styles";
.sidebar {
  $self: &;
  &__content {
    @include button-cursor;
    display: flex;
    position: relative;
    align-items: center;
    width: 20.8rem;
    padding: $spacing-1 $spacing-5 $spacing-1;
    transition: $transition-box-shadow;
    color: getColor(--color-button-gray);
    &--selected {
      #{ $self }__icon {
        @include text-liner;
      }
      #{ $self }__name {
        @include text-liner;
      }
    }
    &:active {
      box-shadow: $shadow-concave;
    }
    &:focus {
      // i18n
      outline: none;
    }
  }
  &__icon {
    font-size: 2.8rem;
    line-height: $single-line;
  }
  &__name {
    vertical-align: bottom;
    margin-left: $spacing-4;
    font-size: $font-medium;
    font-weight: 500;
    &--link {
      &::after {
        font-family: "Material Icons";
        @include text-liner;
        content: "launch";
        padding-left: $spacing-2;
        margin-top: -0.1rem; //アイコンのずれ用
      }
    }
  }
}
</style>
