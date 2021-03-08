<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "./Sidebar.vue";
import GrayFilter from "~/components/GrayFilter.vue";
import { useSidebar } from "~/usecases/useSidebar";

export default defineComponent({
  components: { Sidebar, GrayFilter },
  setup: () => {
    const { isClose, isOpen, closeSidebar } = useSidebar();
    return { isClose, isOpen, closeSidebar };
  },
});
</script>

<template>
  <div class="layout">
    <Sidebar :class="{ 'sidebar--close': isClose }"></Sidebar>
    <GrayFilter
      class="layout__grayfilter"
      v-show="isOpen"
      @click="closeSidebar"
    ></GrayFilter>
    <article class="layout__article">
      <slot></slot>
    </article>
  </div>
</template>

<style scoped lang="scss">
@import "~/scss/main.scss";
.layout {
  display: flex;
  background: $base-liner;
  &__article {
    width: 100%;
  }
  &__grayfilter {
    display: none;
    @include portrait {
      display: block;
    }
  }
}

.sidebar {
  @include portrait {
    position: fixed;
  }
  &--close {
    @include portrait {
      transform: translateX(-20.8rem);
      width: 0;
    }
  }
}
</style>
