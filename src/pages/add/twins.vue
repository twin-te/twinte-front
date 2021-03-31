<template>
  <div class="twins">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          @click="$router.back()"
          size="large"
          color="normal"
          icon-name="arrow_back"
        ></IconButton>
      </template>
      <template #title>Twinsからインポート</template>
    </PageHeader>
    <div class="main">
      <div class="main__mask">
        <div class="main__description">
          Twinsに登録した授業を、モジュール単位でTwin:teの時間割にインポートします。データの取り扱いに関しては<a
            href="https://www.twinte.net/terms/"
            target="_blank"
            rel="noopener noreferrer"
            >利用規約</a
          >をご確認ください。
        </div>
        <p class="main__description-sub">
          ※Twin:te側がユーザーの学籍番号・パスワードを取得することはございません。
        </p>
        <div class="main__contents">
          <p>
            1.
            画面最下部の「Twinsへ移動」を押すとTwinsのページへ移動するので、ログインしてください。
          </p>
          <p>2. 「履修」から「履修登録・登録状況紹介」へ移動します。</p>
          <p>
            3.
            インポートしたい学期を表示し、「Twin:teへインポート」ボタンを押すと、その学期の時間割がインポートされます。
          </p>
        </div>
        <img src="../../assets/twins-to-twinte.png" alt="twins-to-twinte" />
      </div>
      <section class="main__button">
        <Button
          @click="openTwins"
          size="large"
          layout="fill"
          color="primary"
          :pauseActiveStyle="false"
          >Twinsに移動</Button
        >
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent } from "vue";
import Button from "~/components/Button.vue";
import IconButton from "~/components/IconButton.vue";
import PageHeader from "~/components/PageHeader.vue";
import { openUrl } from "~/usecases/openUrl";

export default defineComponent({
  components: {
    Button,
    IconButton,
    PageHeader,
  },
  setup: async () => {
    useHead({
      title: "Twin:te | Twinsからインポート",
    });

    const openTwins = () => {
      openUrl("https://twins.tsukuba.ac.jp");
    };
    return { openTwins };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";
.twins {
  @include max-width;
}

.main {
  margin-top: $spacing-5;
  &__mask {
    height: calc(100vh - 16.2rem);
    @include landscape {
      height: calc(100vh - 16.6rem);
    }
    @include scroll-mask;
    overflow-y: auto;
    padding: 0.9rem 0;
  }
  &__description {
    @include text-description;
  }
  &__description-sub {
    @include text-description-sub;
  }
  &__contents {
    display: grid;
    gap: 2.4rem;
    line-height: $multi-line;
    margin: 4.2rem 0 1.2rem;
    font-weight: 500;
  }
  &__button {
    text-align: center;
    margin: $spacing-3 $spacing-0 $spacing-6;
    @include landscape {
      margin-bottom: $spacing-7;
    }
  }
  .button {
    display: inline-block;
  }
}
</style>
