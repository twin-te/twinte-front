<script lang="ts">
import { defineComponent, ref } from "vue";
import SidebarContent from "~/components/SidebarContent.vue";
import Button from "~/components/Button.vue";
import { useRoute, useRouter } from "vue-router";
import { useSidebar } from "~/usecases/useSidebar";
import { isiOS, isMobile } from "~/usecases/ua";
import { asyncSetTimeout } from "~/usecases/asyncSetTimeout";
import { openUrl } from "~/usecases/openUrl";
import { getLogoutUrl } from "~/usecases/getLoginUrl";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    android?: {
      openSettings: () => void;
      // eslint-disable-next-line no-unused-vars
      share: (message: string) => void;
    };
    webkit?: {
      messageHandlers?: {
        iPhoneSettings?: {
          // eslint-disable-next-line no-unused-vars
          postMessage: (hoge: string) => void;
        };
        share?: {
          // eslint-disable-next-line no-unused-vars
          postMessage: (message: string) => void;
        };
      };
    };
  }
}

type Content = {
  iconName: string;
  item: string;
  link: string;
  show: boolean;
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

    const isSelected = (link: string) => link === route.path.toString();

    const menu = ref<Content[]>(
      [
        { iconName: "home", item: "ホーム", link: "/", show: true },
        { iconName: "add", item: "授業の追加", link: "/add", show: true },
        { iconName: "payments", item: "単位数", link: "/credit", show: true },
        {
          iconName: "event_note",
          item: "学年暦",
          link: "/event_note",
          show: false,
        },
        {
          iconName: "campaign",
          item: "お知らせ",
          link: "/news",
          show: true,
        },
      ].filter((v) => v.show)
    );
    const settings = ref<Content[]>(
      [
        {
          iconName: "view_compact",
          item: "表示設定",
          link: "/view-settings",
          show: true,
        },
        {
          iconName: "notifications",
          item: "通知設定",
          link: "settings",
          show: isMobile(),
        },
      ].filter((v) => v.show)
    );
    const links = ref<Content[]>(
      [
        { iconName: "help", item: "使い方", link: "/help", show: false },
        {
          iconName: "feedback",
          item: "フィードバック",
          link: "/feedback",
          show: true,
        },
        {
          iconName: "people",
          item: "寄付者一覧",
          link: "/people",
          show: false,
        },
        {
          iconName: "share",
          item: "時間割のシェア",
          link: "share",
          show: isMobile(),
        },
      ].filter((v) => v.show)
    );

    const logout = () => {
      openUrl(getLogoutUrl());
    };

    const navigateHandler = async (link: string) => {
      const shareMessage = "#Twinte";
      if (link.startsWith("https://")) {
        openUrl(link);
      } else {
        switch (link) {
          case "settings":
            await asyncSetTimeout(300); // アニメーションの関係で必要
            isiOS()
              ? window.webkit?.messageHandlers?.iPhoneSettings?.postMessage("")
              : window.android?.openSettings();
            break;
          case "share":
            closeSidebar();
            await asyncSetTimeout(300);
            isiOS()
              ? window.webkit?.messageHandlers?.share?.postMessage(shareMessage)
              : window.android?.share(shareMessage);
            break;
          default:
            router.push(link);
        }
      }
    };

    return { menu, settings, links, isSelected, logout, navigateHandler };
  },
});
</script>

<template>
  <div class="sidebar">
    <section class="sidebar__head">
      <Button
        v-if="isLogin"
        @click="logout"
        size="small"
        layout="fill"
        color="base"
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
          @click="navigateHandler(value.link)"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.item"
          :selected="isSelected(value.link)"
        ></SidebarContent>
      </ul>

      <ul class="sidebar__listgroup">
        <SidebarContent
          v-for="value in settings"
          @click="navigateHandler(value.link)"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.item"
          :selected="isSelected(value.link)"
        ></SidebarContent>
      </ul>

      <ul class="sidebar__listgroup">
        <SidebarContent
          v-for="value in links"
          @click="navigateHandler(value.link)"
          :iconName="value.iconName"
          :item="value.item"
          :key="value.item"
          :selected="isSelected(value.link)"
        ></SidebarContent>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "~/styles";
.sidebar {
  display: flex;
  flex-direction: column;
  padding-top: $safe-area-top;
  top: 0;
  left: 0;
  width: 20.8rem;
  height: 100vh;
  min-height: 100vh;
  background: var(--base-liner);
  border-radius: 0 $radius-4 $radius-4 0;
  box-shadow: $shadow-convex;
  z-index: 12;
  transition: $transition-all-slow;
  transform: translateX(0);
  &__head {
    padding: $spacing-15 $spacing-5 $spacing-5;
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
