<template>
  <Modal
    v-if="welcomeModal"
    class="welcome-modal"
    @click="closeWelcomeModal"
    size="large"
  >
    <template #title>Twin:teへようこそ！</template>
    <template #contents>
      <img class="modal__mascot" src="../assets/colon2.png" alt="colonの画像" />
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
        >あとで</Button
      >
      <Button
        @click="$router.push('/login')"
        size="medium"
        layout="fill"
        color="primary"
        >ログインする</Button
      >
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";

export default defineComponent({
  name: "App",
  components: {
    Modal,
    Button,
  },
  setup: () => {
    // welcome-modal
    const welcomeModal = ref(true);
    const openWelcomeModal = () => {
      welcomeModal.value = true;
    };
    const closeWelcomeModal = () => {
      welcomeModal.value = false;
    };

    return {
      welcomeModal,
      openWelcomeModal,
      closeWelcomeModal,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../scss/main.scss";

.welcome-modal .modal {
  &__mascot {
    width: 22.8rem;
    height: 11.4rem;
    margin: 2.7rem auto 6.4rem auto;
  }
  &__text {
    font-size: $font-medium;
    line-height: $multi-line;
  }
  .button {
    width: calc(50% - 1.2rem);
    &:first-child {
      margin-right: 1.2rem;
    }
    &:last-child {
      margin-left: 1.2rem;
    }
  }
}

.preview__dropdown {
  padding-bottom: 10rem;
}
</style>
