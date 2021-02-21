<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Modal from "./Modal.vue";
import Button from "./Button.vue";

export default defineComponent({
  name: "WelcomeModal",
  components: {
    Modal,
    Button,
  },
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
  emits: ["click"],
  setup: (_, { emit }) => {
    const router = useRouter();

    const login = async () => {
      await router.push("/login");
    };

    const clickHandler = (e: any) => {
      emit("click", e);
    };

    return { login, clickHandler };
  },
});
</script>

<template>
  <div class="welcome-modal">
    <Modal @click="clickHandler" size="large">
      <div class="title">Twin:teへようこそ！</div>
      <div class="contents">
        <img class="contents__mascot" src="../assets/colon2.png" alt="colon2" />
        <p class="contents__text">
          こんにちは！<br />
          筑波大生のための時間割アプリTwin:teをご利用いただきありがとうございます。<br />
          時間割の作成や複数端末間の連携のため、ログインしてください。<br />
          ※Twin:teにログインしたことがない場合は、自動的にアカウントが作成されます。
        </p>
      </div>
      <div class="button-container">
        <div class="button-left">
          <Button @click="clickHandler" color="base" layout="fill" size="medium"
            >あとで</Button
          >
        </div>
        <div class="button-right">
          <Button
            @click="login"
            color="primary"
            layout="fill"
            size="medium"
            style="padding: 0"
            >ログインする</Button
          >
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.modal {
  .title {
    font-size: 2rem;
    font-weight: 500;
    line-height: $multi-line;
    color: $text-main;
    text-align: left;
  }
  .contents {
    width: 100%;
    margin: 4rem 0 2.8rem 0;
    font-size: 1.4rem;
    font-weight: normal;
    line-height: $multi-line;
    color: $text-main;
    text-align: left;
    overflow: scroll;
    &__mascot {
      width: 22.8rem;
      height: 11.4rem;
      margin: 2.7rem auto 5.4rem auto;
    }
    &__text {
      margin-bottom: 1rem;
    }
  }
  // コンテンツの高さ
  &--large {
    .contents {
      height: calc(56.7rem - 20.8rem);
      @include large-screen {
        height: calc(51.58334rem - 20.8rem);
      }
    }
  }
  &--small {
    .contents {
      height: calc(39.5rem - 20.8rem);
      @include large-screen {
        height: calc(30.33334rem - 20.8rem);
      }
    }
  }
  .button-container {
    display: flex;
    flex-direction: row;
  }
  .button-left {
    width: calc(50% - 1.2rem);
    margin-right: 1.2rem;
  }
  .button-right {
    width: calc(50% - 1.2rem);
    margin-left: 1.2rem;
  }
}
</style>
