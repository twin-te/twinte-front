<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { StateKey } from "~/store";
import Sidebar from "./Sidebar.vue";

export default defineComponent({
  components: { Sidebar },
  setup: () => {
    const store = useStore(StateKey);
    const close = computed<boolean>(() => store.getters.sidebar);
    return { close };
  },
});
</script>

<template>
  <div class="layout">
    <Sidebar :class="{ 'sidebar--close': close }"></Sidebar>
    <article class="layout__article">
      <slot></slot>
    </article>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";
.layout {
  display: flex;
  background: $base-liner;
  &__article {
    width: 100%;
  }
}

.sidebar {
  &--close {
    @include portrait {
      transform: translateX(-20.8rem);
      width: 0;
    }
  }
}
</style>
