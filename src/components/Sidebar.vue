<script>
import { defineComponent } from "vue";
import SidebarContent from "./SidebarContent.vue";
import Button from "./Button.vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    SidebarContent,
    Button,
  },

  props: {
    isLogin: {
      type: Boolean,
    },
  },

  emits: ["click"],
  setup: (_, { emit }) => {
    const handleClick = () => {
      emit("click");
    };
  },
});
</script>

<template>
  <div class="sidebar">
    <section class="sidebar__head">
      <Button
        @click="handleClick"
        size="small"
        layout="fill"
        color="primary"
        :pauseActiveStyle="false"
      >
        {{ state ? "ログアウト" : "ログイン" }}</Button
      >
    </section>

    <section class="sidebar__contents">
      <ul class="sidebar__listgroup">
        <SidebarContent
          @click="handleClick"
          v-for="value in menu"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.a"
        ></SidebarContent>
      </ul>

      <ul class="sidebar__listgroup">
        <SidebarContent
          @click="handleClick"
          v-for="value in settings"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.b"
        ></SidebarContent>
      </ul>

      <ul class="sidebar__listgroup">
        <SidebarContent
          @click="handleClick"
          v-for="value in links"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.c"
        ></SidebarContent>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "../scss/main.scss";
.sidebar {
  left: 0;
  width: 20.8rem;
  height: 100vh;
  background: $base-liner;
  border-radius: 0 1.6rem 1.6rem 0;
  box-shadow: $shadow-convex;
  z-index: 100;
  &__head {
    padding: 6.2rem 2rem 2rem;
  }
  &__contents {
    margin: 0;
  }
  &__listgroup {
    padding-bottom: 2.4rem;
  }
}
</style>
