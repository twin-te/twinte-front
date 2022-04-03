<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Toast from "~/components/Toast.vue";
import Sidebar from "./Sidebar.vue";
import GrayFilter from "~/components/GrayFilter.vue";
import Modal from "~/components/Modal.vue";
import Button from "~/components/Button.vue";
import { useSidebar } from "~/usecases/useSidebar";
import { useStore } from "~/store";
import { usePorts } from "~/usecases";
import { useSwitch } from "~/hooks/useSwitch";
import { authCheck } from "~/usecases/authCheck";
import { Toast as ToastContent } from "~/entities/toast";
import { useDisplayedYear } from "~/usecases/useDisplayedYear";
import { useDark } from "@vueuse/core";

export default defineComponent({
  components: { Toast, Sidebar, GrayFilter, Modal, Button },
  setup: async () => {
    const { isClose, isOpen, closeSidebar } = useSidebar();
    const store = useStore();
    const ports = usePorts();
    useDark({
      selector: "body",
    });

    // welcome modal
    const isLogin = ref(await authCheck(ports));
    const [welcomeModal, , closeWelcomeModal] = useSwitch(!isLogin.value);

    // Toast
    const toasts = computed<ToastContent[]>(() => {
      return store.getters.toasts;
    });

    const closeToast = (id: number) => {
      // console.log(id);
      store.commit("deleteToast", id);
    };

    // HACK: vuex を初期化する目的で呼び出している
    useDisplayedYear(ports);

    return {
      isLogin,
      isClose,
      isOpen,
      closeSidebar,
      welcomeModal,
      closeWelcomeModal,
      toasts,
      closeToast,
    };
  },
});
</script>

<template>
  <div class="layout">
    <Sidebar
      v-if="$route.meta.hasSidebar ?? true"
      :isLogin="isLogin"
      :class="{ 'sidebar--close': isClose }"
    ></Sidebar>
    <GrayFilter
      class="layout__grayfilter"
      v-show="isOpen"
      @click="closeSidebar"
    ></GrayFilter>
    <Modal
      v-if="$route.meta.hasWelcomeModal ?? welcomeModal"
      class="welcome-modal"
      @click="closeWelcomeModal"
      size="large"
    >
      <template #title>Twin:teへようこそ！</template>
      <template #contents>
        <img
          class="modal__mascot"
          src="../assets/colon2.png"
          alt="colonの画像"
        />
        <p class="modal__text">
          こんにちは！筑波大生のための時間割アプリTwin:teをご利用いただきありがとうございます。<br />
          Twin:teで時間割の作成を行うためにはログインが必要です。下のボタンからログインしてください。
        </p>
      </template>
      <template #button>
        <Button
          @click="closeWelcomeModal"
          size="medium"
          layout="fill"
          color="base"
        >
          あとで
        </Button>
        <Button
          @click="$router.push('/login')"
          size="medium"
          layout="fill"
          color="primary"
        >
          ログインする
        </Button>
      </template>
    </Modal>
    <article class="layout__article">
      <slot></slot>
    </article>
    <div class="layout__toast">
      <transition-group name="toast">
        <div class="toast__row" v-for="toast in toasts" :key="toast.id">
          <Toast
            @click-close-button="closeToast(toast.id)"
            :text="toast.text"
            :type="toast.type"
          ></Toast>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/styles";
.layout {
  display: flex;
  background: var(--base-liner);
  &__article {
    width: 100%;
    margin: $spacing-0 $spacing-4;
    @include landscape {
      margin: $spacing-0 $spacing-9;
    }
  }
  &__grayfilter {
    display: none;
    @include portrait {
      display: block;
    }
    z-index: 12;
  }
  &__toast {
    position: fixed;
    z-index: 1000;
    right: 3rem;
    bottom: 3rem;
    width: min(50rem, 90vw);
    @include portrait {
      right: 50%;
      transform: translateX(50%);
    }
  }
}

.sidebar {
  z-index: 13;
  position: fixed;
  transition: $transition-all;
  @include landscape {
    position: relative;
  }
  &--close {
    transform: translateX(-23rem);
    @include landscape {
      transform: translateX(0rem);
    }
  }
}

.welcome-modal .modal {
  &__mascot {
    width: 22.8rem;
    height: 11.4rem;
    margin: 2.7rem auto 6.4rem auto;
  }
  .button {
    width: calc(50% - $spacing-3);
    &:first-child {
      margin-right: $spacing-3;
    }
    &:last-child {
      margin-left: $spacing-3;
    }
  }
}

.toast {
  &__row {
    margin-top: 1.2rem;
  }
}
</style>
