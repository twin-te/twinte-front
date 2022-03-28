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
      <a :href="getLoginUrl('apple')">
        <img
          class="main__login-button"
          src="../assets/login-page/login-apple.png"
          alt="appleでログイン"
        />
      </a>
      <a :href="getLoginUrl('twitter')">
        <img
          class="main__login-button"
          src="../assets/login-page/login-twitter.svg"
          alt="twitterでログイン"
        />
      </a>
      <a :href="getLoginUrl('google')">
        <img
          class="main__login-button"
          src="../assets/login-page/login-google.svg"
          alt="googleでログイン"
        />
      </a>
      <div class="main__note">
        ※ ログインした場合、<a href="https://www.twinte.net/terms">利用規約</a
        >に同意したものとします。<br />
        ※Twin:teにログインしたことがない場合は、選択したログイン方法と紐づいたアカウントが自動で作成されます。
      </div>
      <img
        class="main__prev-button"
        v-if="isDark"
        @click="$router.back()"
        src="../assets/login-page/button-prev_dark.png"
        alt="元のページへ戻る"
      />
      <img
        class="main__prev-button"
        v-else
        @click="$router.back()"
        src="../assets/login-page/button-prev.svg"
        alt="元のページへ戻る"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useDark } from "@vueuse/core";
import { defineComponent } from "vue";
import { getLoginUrl } from "~/usecases/getLoginUrl";

export default defineComponent({
  setup: () => {
    const isDark = useDark({
      selector: "body",
    });
    return { isDark, getLoginUrl };
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
  &__login-button {
    @include button-cursor;
    width: 100%;
    margin-bottom: $spacing-5;
    box-shadow: $shadow-convex;
    border-radius: $radius-button;
    &:last-child {
      margin-bottom: $spacing-6;
    }
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
