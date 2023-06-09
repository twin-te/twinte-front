<script lang="ts">
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
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "~/ui/components/Button.vue";
import SidebarContent from "~/ui/components/SidebarContent.vue";
import { closeSidebar } from "~/ui/store/sidebar";
import { getApplicableYear } from "~/ui/store/year";
import { isiOS, isMobile } from "~/ui/ua";
import { getLogoutUrl, openUrl } from "~/ui/url";

defineProps<{
  isLogin: boolean;
}>();

const route = useRoute();
const router = useRouter();
router.afterEach(closeSidebar); // Close sidebar whenever the page transition happen.

/** logout */
const logout = () => {
  openUrl(getLogoutUrl());
};

/** year */
const year = getApplicableYear();

/** sidebar content */
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
      iconName: "settings",
      item: "設定",
      link: "/settings",
      show: true,
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

const navigateHandler = async (link: string) => {
  const shareMessage = "#Twinte";
  if (link.startsWith("https://")) {
    openUrl(link);
  } else {
    switch (link) {
      case "settings":
        // apply setTimeout for animation
        setTimeout(() => {
          if (isiOS())
            window.webkit?.messageHandlers?.iPhoneSettings?.postMessage("");
          else window.android?.openSettings();
        }, 300);
        break;
      case "share":
        closeSidebar();
        setTimeout(() => {
          if (isiOS())
            window.webkit?.messageHandlers?.share?.postMessage(shareMessage);
          else window.android?.share(shareMessage);
        }, 300);
        break;
      default:
        router.push(link);
    }
  }
};
</script>

<template>
  <div class="sidebar">
    <section class="sidebar__head">
      <Button
        v-if="isLogin"
        size="small"
        layout="fill"
        color="base"
        :pauseActiveStyle="false"
        @click="logout"
      >
        ログアウト
      </Button>
      <Button
        v-else
        size="small"
        layout="fill"
        color="primary"
        :pauseActiveStyle="false"
        @click="$router.push('/login')"
      >
        ログイン
      </Button>
    </section>

    <section class="sidebar__year" @click="$router.push('/settings')">
      設定中の年度 {{ year }}年度
      <span class="sidebar__icon material-icons">swap_vert</span>
    </section>

    <section class="sidebar__contents">
      <ul class="sidebar__listgroup">
        <SidebarContent
          v-for="value in menu"
          :key="value.item"
          :iconName="value.iconName"
          :item="value.item"
          :selected="isSelected(value.link)"
          @click="navigateHandler(value.link)"
        ></SidebarContent>
      </ul>

      <ul class="sidebar__listgroup">
        <SidebarContent
          v-for="value in settings"
          :key="value.item"
          :iconName="value.iconName"
          :item="value.item"
          :selected="isSelected(value.link)"
          @click="navigateHandler(value.link)"
        ></SidebarContent>
      </ul>

      <ul class="sidebar__listgroup">
        <SidebarContent
          v-for="value in links"
          :key="value.item"
          :iconName="value.iconName"
          :item="value.item"
          :selected="isSelected(value.link)"
          @click="navigateHandler(value.link)"
        ></SidebarContent>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "~/ui/styles";
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
  &__year {
    display: flex;
    gap: $spacing-1;
    padding: $spacing-1 $spacing-5;
    transition: $transition-box-shadow;
    color: getColor(--color-unselected);
    user-select: none;
    font-size: $font-small;
    margin-bottom: $spacing-4;

    &:active {
      box-shadow: $shadow-concave;
    }
  }
  &__icon {
    font-size: $font-medium;
    color: getColor(--color-primary);
  }
  &__listgroup {
    padding-bottom: $spacing-6;
  }
}
</style>
