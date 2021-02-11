<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarContent",
  props: {
    onClick: {
      type: Function,
      required: true,
    },
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
    @click="handleClick"
    :class="{
      sidebar__content: true,
      [`sidebar__content--selected`]: selected,
    }"
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
@import "../scss/main.scss";
.sidebar {
  &__content {
    @include button-cursor;
    display: flex;
    position: relative;
    align-items: center;
    width: 20.8rem;
    padding: 0.4rem 2rem 0.4rem;
    transition: $transition-box-shadow;
    color: $button-gray;
    &--selected {
      @include text-liner;
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
    @include iconlayout;
  }
  &__name {
    font-weight: medium;
    vertical-align: bottom;
    margin-left: 1.6rem;
    font-size: $font-medium;

    &--link {
      &::after {
        font-family: "Material Icons";
        @include iconlayout;
        @include text-liner;
        content: "launch";
        padding-left: 0.8rem;
        margin-top: -0.1rem; //アイコンのずれ用
      }
    }
  }
}
</style>
