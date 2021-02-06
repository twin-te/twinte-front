<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

type State = "default" | "active" | "none";

type Props = {
  courseName: string;
  courseId: string;
  state: State;
  caution: string;
};

export default defineComponent({
  props: {
    onClick: {
      type: Function,
      default: () => {},
    },
    courseName: {
      type: String,
      default: "",
    },
    courseId: {
      type: String,
      default: "",
    },
    state: {
      type: String as PropType<State>,
      default: "false",
      validator: function (value: string) {
        return ["default", "active", "none"].includes(value);
      },
    },
    caution: {
      type: String,
      default: "", // 空欄の場合 caution は表示されない
    },
  },
  emits: ["click"],
  setup: (props: Props, { emit }) => {
    const handleClick = (e: MouseEvent) => {
      emit("click", e);
    };

    const hasCaution = computed(() => {
      return props.caution !== "";
    });

    return { handleClick, hasCaution };
  },
});
</script>

<template>
  <div
    @click="handleClick"
    :class="{
      tile: true,
      [`--${state}`]: true,
      [`--under-filter`]: hasCaution,
    }"
  >
    <div class="tile__course-name">{{ courseName }}</div>
    <div class="tile__course-id">{{ courseId }}</div>
    <div
      :class="{
        tile__caution: true,
        [`--show`]: hasCaution,
      }"
    >
      {{ caution }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.tile {
  @include button-cursor;
  position: relative;
  padding: 0.5rem 0.6rem;
  border-radius: $radius-1;
  text-align: left;
  transition: $transition-box-shadow;
  &.--default {
    background-color: $primary-light;
  }
  &.--active {
    background-color: $primary-light;
    box-shadow: $shadow-tile-concave;
  }
  &.--none {
    background-color: $undefined;
  }
  &.--under-filter::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: $radius-1;
    background-color: $filter-darken;
  }
  &__course-name {
    line-height: 1.4rem;
    font-size: 1rem;
    font-weight: 500;
    color: $text-main;
  }
  &__course-id {
    line-height: 1.3rem;
    font-size: 0.9rem;
    font-weight: 400;
    color: $text-sub;
  }
  &__caution {
    display: none;
    position: absolute;
    z-index: 10;
    left: 0.4rem;
    bottom: 0.4rem;
    width: calc(100% - 0.8rem);
    padding: 0.4rem 0;
    border-radius: $radius-1;
    background-color: $base;
    text-align: center;
    line-height: 1;
    font-size: 1rem;
    font-weight: 500;
    color: $primary-dull;
    &.--show {
      display: block;
    }
  }
}
</style>
