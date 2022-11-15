<script lang="ts">
import { defineComponent, PropType } from "vue";
import { getSetting } from "../store/setting";

export type Calendar = {
  schedule: string;
  month: number;
  day: number;
  week: string;
};

export default defineComponent({
  name: "PageHeader",
  props: {
    atHome: {
      type: Boolean,
      default: false,
    },
    calendar: {
      type: Object as PropType<Calendar | null>,
      default: null,
    },
  },

  emits: ["click"],
  setup: (_, { emit }) => {
    const setting = getSetting();

    const handleClick = () => {
      emit("click");
    };

    return { handleClick, setting };
  },
});
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div
        :class="{
          'header__left-button': true,
        }"
      >
        <slot name="left-button-icon"></slot>
      </div>
      <div v-if="atHome">
        <img
          v-if="setting.darkMode"
          class="header__title--logo"
          src="../assets/twintelogo-darkmode.svg"
        />
        <img
          v-else
          class="header__title--logo"
          src="../assets/twintelogo-color.svg"
        />
      </div>
      <h1 v-else class="header__title">
        <slot name="title"></slot>
      </h1>
      <div v-if="atHome && calendar" class="header__calendar">
        <p class="header__date">
          {{ calendar.month }}/{{ calendar.day }} ({{ calendar.week }})
        </p>
        <p class="header__schedule">{{ calendar.schedule }}</p>
      </div>
      <div v-else class="header__right-button">
        <slot name="right-button-icon"></slot>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.header {
  width: 100%;
  height: calc(#{$safe-area-top} + 6rem);
  padding: $spacing-5 0 0;
  @include sensor-housing;
  &__container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__left-button {
    position: absolute;
    left: 0;
    top: 0;
  }
  &__title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.3rem;
    font-size: $font-large;
    font-weight: 500;
    line-height: $single-line;
    color: getColor(--color-text-main);
    &--logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-left: -0.4rem; //ロゴの視覚補正で右寄りに見えるのを防ぐ
      bottom: 0.3rem;
      width: 9.9rem;
    }
  }

  &__right-button {
    position: absolute;
    right: 0;
    top: 0;
  }
  &__calendar {
    width: calc(50% - 4.95rem + 0.4rem - 2rem);
    position: absolute;
    right: 0;
    top: 0;
    text-align: right;
    line-height: $single-line;
  }
  &__date {
    color: getColor(--color-text-main);
    font-weight: bold;
  }
  &__schedule {
    overflow: auto;
    white-space: nowrap;
    padding-top: 0.2rem;
    color: getColor(--color-text-sub);
    font-size: $font-small;
  }
}
</style>
