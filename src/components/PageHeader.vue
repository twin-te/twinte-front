<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import IconButton from "./IconButton.vue";
import ToggleIconButton from "./ToggleIconButton.vue";

type Props = {
  onClick: Function;
  atHome: boolean;
  dropdownMenu: boolean;
};

export type Calendar = {
  month: number;
  day: number;
  week: string;
  schedule: string;
};

export default defineComponent({
  name: "PageHeader",
  components: {
    IconButton,
    ToggleIconButton,
  },
  props: {
    onClick: {
      type: Function,
      default: () => {},
    },
    atHome: {
      type: Boolean,
      default: false,
    },
    dropdownMenu: {
      type: Boolean,
      default: false,
    },
    calendar: {
      type: Object as PropType<Calendar>,
      required: true,
    },
  },
  emits: ["click"],
  setup: (props: Props, { emit }) => {
    const handleClick = () => {
      emit("click");
    };
    const isBtnActive = ref({
      expand: false,
    });
    return {
      isBtnActive,
      handleClick,
    };
  },
});
</script>

<template>
  <header class="header">
    <div class="header__container">
      <IconButton
        class="header__menu-icon"
        @click="handleClick"
        size="large"
        color="normal"
        icon-name="menu"
      ></IconButton>
      <div v-if="atHome">
        <img class="header__title--logo" src="../asset/twintelogo-color.svg" />
      </div>
      <h1 class="header__title" v-else>
        <slot />
      </h1>
      <ToggleIconButton
        class="header__dropdown-menu-icon"
        @click="isBtnActive.expand = !isBtnActive.expand"
        v-if="dropdownMenu"
        size="large"
        color="normal"
        icon-name="more_vert"
        :is-active="isBtnActive.expand"
      ></ToggleIconButton>
      <div class="header__calendar" v-if="atHome">
        <p class="header__date">
          {{ calendar.month }}/{{ calendar.day }} ({{ calendar.week }})
        </p>
        <p class="header__schedule">{{ calendar.schedule }}</p>
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
