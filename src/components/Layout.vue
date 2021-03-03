<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { StateKey } from "~/store";
import Sidebar from "./Sidebar.vue";
import GrayFilter from "./GrayFilter.vue";

export default defineComponent({
  components: { Sidebar, GrayFilter },
  setup: () => {
    const store = useStore(StateKey);
    const close = computed<boolean>(() => !store.getters.sidebar);
    const closeSidebar = () => store.commit("setSidebar", false);
    return { close, closeSidebar };
  },
});
</script>

<template>
  <div class="layout">
    <Sidebar :class="{ 'sidebar--close': close }"></Sidebar>
    <GrayFilter
      class="layout__grayfilter"
      v-show="!close"
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
