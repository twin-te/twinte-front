<script lang="ts">
import { defineComponent, ref } from "vue";
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

    const menu = ref([
      { iconName: "home", item: "ホーム" },
      { iconName: "add", item: "授業の追加" },
      { iconName: "event_note", item: "学年暦" },
      { iconName: "campaign", item: "お知らせ" },
    ]);
    const settings = ref([
      { iconName: "view_compact", item: "表示設定" },
      { iconName: "notifications", item: "通知設定" },
    ]);
    const links = ref([
      { iconName: "help", item: "使い方" },
      { iconName: "people", item: "寄付者一覧" },
      { iconName: "share", item: "時間割のシェア" },
    ]);

    return { handleClick, menu, settings, links };
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
        {{ isLogin ? "ログアウト" : "ログイン" }}</Button
      >
    </section>

    <section class="sidebar__contents">
      <ul class="sidebar__listgroup">
        <SidebarContent
          @click="handleClick"
          v-for="value in menu"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.item"
        ></SidebarContent>
      </ul>

      <ul class="sidebar__listgroup">
        <SidebarContent
          @click="handleClick"
          v-for="value in settings"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.item"
        ></SidebarContent>
      </ul>

      <ul class="sidebar__listgroup">
        <SidebarContent
          @click="handleClick"
          v-for="value in links"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.item"
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
  min-height: 100%;
  background: $base-liner;
  border-radius: 0 $radius-4 $radius-4 0;
  box-shadow: $shadow-convex;
  z-index: 12;
  transition: $transition-all-slow;
  transform: translateX(0);
  &__head {
    padding: 6.2rem 2rem 2rem;
  }
  &__contents {
    margin: 0;
  }
  &__listgroup {
    padding-bottom: $spacing-6;
  }
}
</style>
