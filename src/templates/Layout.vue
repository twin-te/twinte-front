<script lang="ts">
import { defineComponent, watch } from "vue";
import Sidebar from "./Sidebar.vue";
import GrayFilter from "~/components/GrayFilter.vue";
import Modal from "~/components/Modal.vue";
import Button from "~/components/Button.vue";
import { useSidebar } from "~/usecases/useSidebar";
import { useUsecase } from "~/usecases";
import { useSwitch } from "~/hooks/useSwitch";
import { authCheck } from "~/usecases/authCheck";

export default defineComponent({
  components: { Sidebar, GrayFilter, Modal, Button },
  setup: () => {
    const { isClose, isOpen, closeSidebar } = useSidebar();

    // welcome modal
    const { state: isLogin } = useUsecase(authCheck, true);
    const [welcomeModal, , closeWelcomeModal, , setWelcomeModal] = useSwitch(
      false
    );
    watch(isLogin, (v) => setWelcomeModal(!v));

    return {
      isLogin,
      isClose,
      isOpen,
      closeSidebar,
      welcomeModal,
      closeWelcomeModal,
    };
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
    <Modal
      v-if="welcomeModal"
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
          こんにちは！<br />
          筑波大生のための時間割アプリTwin:teをご利用いただきありがとうございます。<br />
          時間割の作成や複数端末間の連携のため、ログインしてください。<br />
          ※Twin:teにログインしたことがない場合は、自動的にアカウントが作成されます。
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
  </div>
</template>

<style scoped lang="scss">
@import "~/scss/main.scss";
.layout {
  display: flex;
  background: $base-liner;
  &__article {
    width: 100%;
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
}

.sidebar {
  z-index: 13;
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
</style>
