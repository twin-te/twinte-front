<script lang="ts">
import { defineComponent, computed } from "vue";
import SidebarContent from "~/components/SidebarContent.vue";
import Button from "~/components/Button.vue";
import { useRouter, useRoute } from "vue-router";
import { useSidebar } from "~/usecases/useSidebar";

type Content = {
  iconName: string;
  item: string;
  link: string;
  selected: boolean;
};

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
  setup: () => {
    const router = useRouter();
    const route = useRoute();
    const { closeSidebar } = useSidebar();

    // ページ移動するとサイドバーを閉じる
    router.afterEach(closeSidebar);

    const menu = computed<Content[]>(() =>
      [
        { iconName: "home", item: "ホーム", link: "/" },
        { iconName: "add", item: "授業の追加", link: "/add" },
        { iconName: "event_note", item: "学年暦", link: "/event_note" },
        { iconName: "campaign", item: "お知らせ", link: "/campaign" },
      ].map((content) => ({
        ...content,
        selected: route.path.toString() === content.link,
      }))
    );
    const settings = computed<Content[]>(() =>
      [
        { iconName: "view_compact", item: "表示設定", link: "/view_compact" },
        { iconName: "notifications", item: "通知設定", link: "/notifications" },
      ].map((content) => ({
        ...content,
        selected: route.path.toString() === content.link,
      }))
    );
    const links = computed<Content[]>(() =>
      [
        { iconName: "help", item: "使い方", link: "/help" },
        { iconName: "people", item: "寄付者一覧", link: "/people" },
        { iconName: "share", item: "時間割のシェア", link: "/share" },
      ].map((content) => ({
        ...content,
        selected: route.path.toString() === content.link,
      }))
    );

    return { menu, settings, links };
  },
});
</script>

<template>
  <div class="sidebar">
    <section class="sidebar__head">
      <Button
        v-if="isLogin"
        @click="$router.push('/logout')"
        size="small"
        layout="fill"
        color="primary"
        :pauseActiveStyle="false"
      >
        ログアウト
      </Button>
      <Button
        v-else
        @click="$router.push('/login')"
        size="small"
        layout="fill"
        color="primary"
        :pauseActiveStyle="false"
      >
        ログイン
      </Button>
    </section>

    <section class="sidebar__contents">
      <ul class="sidebar__listgroup">
        <SidebarContent
          v-for="value in menu"
          @click="$router.push(value.link)"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.item"
          :selected="value.selected"
        ></SidebarContent>
      </ul>

      <ul class="sidebar__listgroup">
        <SidebarContent
          v-for="value in settings"
          @click="$router.push(value.link)"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.item"
        ></SidebarContent>
      </ul>

      <ul class="sidebar__listgroup">
        <SidebarContent
          v-for="value in links"
          @click="$router.push(value.link)"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.item"
        ></SidebarContent>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";
.sidebar {
  display: flex;
  flex-direction: column;
  top: 0;
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
    margin: 0 0 $spacing-10;
    overflow-y: auto;
    overflow-x: hidden;
  }
  &__listgroup {
    padding-bottom: $spacing-6;
  }
}
</style>
