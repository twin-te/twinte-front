<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export type State = "default" | "none";

type Props = {
  name: string;
  room: string;
  state: State;
  caution: string;
};

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    state: {
      type: String as PropType<State>,
      required: true,
      validator: function (value: string) {
        return ["default", "none"].includes(value);
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
    :class="{
      tile: true,
      [`--${state}`]: true,
      [`--under-filter`]: hasCaution,
    }"
    @click="handleClick"
  >
    <div class="tile__course-name">{{ name }}</div>
    <div class="tile__course-room">{{ room }}</div>
    <div
      v-show="hasCaution"
      :class="{
        tile__caution: true,
      }"
    >
      {{ caution }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.tile {
  @include button-cursor;
  position: relative;
  padding: 0.5rem 0.6rem;
  border-radius: $radius-1;
  text-align: left;
  transition: $transition-box-shadow;
  overflow: hidden;
  &.--default {
    background-color: getColor(--color-primary-light);
    &:active {
      box-shadow: $shadow-tile-concave;
    }
  }
  &.--none {
    background-color: getColor(--color-undefined);
  }
  &.--under-filter::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: $radius-1;
    background-color: getColor(--color-filter-darken);
  }
  &__course-name {
    line-height: $single-line;
    font-size: $font-minimum;
    font-weight: 500;
    color: getColor(--color-text-main);
  }
  &__course-room {
    @include text-course-tile-id;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
  }
  &__caution {
    position: absolute;
    z-index: 10;
    left: $spacing-1;
    bottom: $spacing-1;
    width: calc(100% - 0.8rem);
    padding: $spacing-1 0;
    border-radius: $radius-1;
    background-color: getColor(--color-base);
    text-align: center;
    line-height: $fit;
    font-size: $font-minimum;
    font-weight: 500;
    color: getColor(--color-primary-dull);
  }
}
</style>
