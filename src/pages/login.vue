<template>
  <div class="container">
    <h1 class="title">ログインページ</h1>
    <h2>どのアカウントでログインしますか?</h2>
    <p>
      Twin:teにログインしたことがない場合は自動的にアカウントが作成されます。
      <br />ログインをした場合、
      <a href="https://www.twinte.net/terms">利用規約</a>に同意したものとします。
    </p>

    <img
      @click="login('google')"
      width="200"
      src="~/assets/img/auth/google/btn_google_signin_light_normal_web@2x.png"
      alt="sign in with google"
    />

    <br />
    <img
      @click="login('apple')"
      width="200"
      src="~/assets/img/auth/apple/botan.png"
      alt="りんご"
    />

    <br />
    <img
      @click="login('twitter')"
      width="200"
      src="~/assets/img/auth/twitter/sign-in-with-twitter-gray.png"
      alt="とり"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { BASE_URL } from "../store/api/config";

type inputOptions = "twitter" | "google" | "apple";

@Component({})
export default class Index extends Vue {
  login(input: inputOptions) {
    location.href = `${BASE_URL}/auth/${input}`;
  }
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 550px;
}
.title {
  font-size: 3vh;
}
.sub-title {
  font-size: 2vh;
}
img {
  padding: 16px;
}
</style>
