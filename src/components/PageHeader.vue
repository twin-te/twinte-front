<script lang="ts">
import { defineComponent, PropType } from "vue";

export type Calendar = {
  month: number;
  day: number;
  week: string;
  schedule: string;
};

export default defineComponent({
  name: "PageHeader",
  props: {
    atHome: {
      type: Boolean,
      default: false,
    },
    calendar: {
      type: Object as PropType<Calendar>,
      default: {},
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
  <header class="header">
    <div class="header__container">
      <div class="header__menu-icon">
        <slot name="left-btn"></slot>
      </div>
      <div v-if="atHome">
        <img class="header__title--logo" src="../assets/twintelogo-color.svg" />
      </div>
      <h1 class="header__title" v-else>
        <slot name="title"></slot>
      </h1>
      <div class="header__calendar" v-if="atHome">
        <p class="header__date">
          {{ calendar.month }}/{{ calendar.day }} ({{ calendar.week }})
        </p>
        <p class="header__schedule">{{ calendar.schedule }}</p>
      </div>
      <div class="header__dropdown-menu-icon" v-else>
        <slot name="right-btn"></slot>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.header {
  width: 100%;
  height: 6rem;
  padding: 2rem 1.6rem 0;
  &__container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__menu-icon {
    position: absolute;
    left: 0;
    top: 0;
    @include wide-screen {
      display: none;
    }
  }
  &__title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.3rem;
    &--logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-left: -0.4rem; //ロゴの視覚補正で右寄りに見えるのを防ぐ
      bottom: 0.3rem;
      width: 9.9rem;
    }
  }

  &__dropdown-menu-icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  &__calendar {
    position: absolute;
    right: 0;
    top: 0;
    text-align: right;
    line-height: $single-line;
  }
  &__date {
    font-weight: bold;
  }
  &__schedule {
    font-weight: regular;
    padding-top: 0.2rem;
    color: $text-sub;
    font-size: $font-small;
  }
}
</style>
