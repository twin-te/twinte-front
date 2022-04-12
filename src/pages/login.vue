<template>
  <div class="login">
    <div class="login__rectangle-logo">
      <img v-if="isDark" src="../assets//twintelogo-darkmode.svg" />
      <img v-else src="../assets/twintelogo-color.svg" />
    </div>
    <div class="login__main">
      <div class="main__square-logo">
        <img v-if="isDark" src="../assets/twintelogo-darkmode-b.svg" />
        <img v-else src="../assets/twintelogo-color-b.svg" />
      </div>
      <div class="main__head">ログイン方法を選択</div>
      <div class="main__provider">
        <button @click="goto(getLoginUrl('apple', redirectUrl))">
          <img
            class="main__login-button"
            src="../assets/login-page/login-apple.png"
            alt="appleでログイン"
          />
        </button>
        <button @click="goto(getLoginUrl('twitter', redirectUrl))">
          <img
            class="main__login-button"
            src="../assets/login-page/login-twitter.svg"
            alt="twitterでログイン"
          />
        </button>
        <button @click="goto(getLoginUrl('google', redirectUrl))">
          <img
            class="main__login-button"
            src="../assets/login-page/login-google.svg"
            alt="googleでログイン"
          />
        </button>
      </div>
      <div class="main__note">
        ※ ログインした場合、<a href="https://www.twinte.net/terms">利用規約</a
        >に同意したものとします。<br />
        ※Twin:teにログインしたことがない場合は、選択したログイン方法と紐づいたアカウントが自動で作成されます。
      </div>
      <img
        v-if="isDark"
        class="main__prev-button"
        src="../assets/login-page/button-prev_dark.png"
        alt="元のページへ戻る"
        @click="$router.back()"
      />
      <img
        v-else
        class="main__prev-button"
        src="../assets/login-page/button-prev.svg"
        alt="元のページへ戻る"
        @click="$router.back()"
      />
    </div>
  </div>
  <GrayFilter
    v-show="clicked"
    class="layout__grayfilter"
    @click="() => {}"
  ></GrayFilter>
</template>

<script lang="ts">
import { useDark } from "@vueuse/core";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import GrayFilter from "~/components/GrayFilter.vue";
import { getLoginUrl } from "~/usecases/getLoginUrl";

export default defineComponent({
  components: { GrayFilter },
  setup: () => {
    const router = useRouter();
    const route = useRoute();
    const redirectUrl = "https://app.twinte.net" + route.query.redirectUrl;

    const isDark = useDark({
      selector: "body",
    });
    const clicked = ref(false);
    const goto = (url: string) => {
      clicked.value = true;
      location.href = url;
    };
    return { router, isDark, clicked, goto, redirectUrl, getLoginUrl };
  },
});
</script>

<style lang="scss" scoped>
@import "~/styles";

.login {
  @include center-flex(column);
  padding-top: $safe-area-top;
  width: 100%;
  height: 100vh;
  &__rectangle-logo {
    display: none;
    position: absolute;
    top: $spacing-9;
    left: $spacing-9;
    @include landscape {
      display: block;
    }
    img {
      height: 36px;
    }
  }
  &__main {
    width: 287px;
    @include center-flex(column);
    @include landscape {
      align-items: flex-start;
    }
  }
}

.main {
  &__square-logo {
    display: block;
    margin-bottom: $spacing-12;
    img {
      height: 85px;
    }
    @include landscape {
      display: none;
    }
  }
  &__head {
    @include text-main;
    margin-bottom: $spacing-10;
    text-align: center;
    font-size: $font-maximum;
  }
  &__provider {
    display: flex;
    flex-direction: column;
    gap: $spacing-5;
    margin-bottom: $spacing-6;
  }
  &__login-button {
    @include button-cursor;
    width: 100%;
    box-shadow: $shadow-convex;
    border-radius: $radius-button;
  }
  &__note {
    @include text-sub-discription;
    margin-bottom: $spacing-5;
    a {
      color: getColor(--color-text-link);
    }
  }
  &__prev-button {
    @include button-cursor;
    display: block;
    height: 70px;
    @include landscape {
      margin-left: -12px;
    }
  }
}
</style>
