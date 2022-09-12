<template>
  <div class="twins">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          size="large"
          color="normal"
          icon-name="arrow_back"
          @click="$router.back()"
        ></IconButton>
      </template>
      <template #title>TWINSからインポート</template>
    </PageHeader>
    <div class="main">
      <div class="main__mask">
        <div class="main__description">
          TWINSに登録した授業を、モジュール単位でTwin:teの時間割にインポートします。
          この機能は筑波大学非公式の機能であり、認可されたものではありません。
          動作の仕組みは<a
            href="https://twinte.hatenablog.com/entry/2019/12/20/200652"
            target="_blank"
            rel="noopener noreferrer"
            >こちら</a
          >をご覧の上、自己責任でご利用ください。 データの取り扱いに関しては<a
            href="https://www.twinte.net/policy"
            target="_blank"
            rel="noopener noreferrer"
            >プライバシーポリシー</a
          >をご確認ください。
        </div>
        <p class="main__description-sub">
          ※Twin:teがユーザーの学籍番号・パスワードなど、履修している授業番号以外の情報を取得することはございません。
        </p>
        <div class="main__contents">
          <p>
            1.
            画面最下部の「TWINSへ移動」を押すとTWINSのページへ移動するので、ログインしてください。
          </p>
          <p>2. 「履修」から「履修登録・登録状況照会」へ移動します。</p>
          <p>
            3.
            インポートしたい学期を表示し、「Twin:teにインポート」ボタンを押すと、その学期の時間割がインポートされます。
          </p>
        </div>
        <img src="../../assets/twins-to-twinte.png" alt="twins-to-twinte" />
      </div>
      <section class="main__button">
        <Button
          size="large"
          layout="fill"
          color="primary"
          :pauseActiveStyle="false"
          @click="openTwins"
          >TWINSに移動</Button
        >
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent } from "vue";
import Button from "~/ui/components/Button.vue";
import IconButton from "~/ui/components/IconButton.vue";
import PageHeader from "~/ui/components/PageHeader.vue";
import { openUrl } from "~/ui/url";

export default defineComponent({
  components: {
    Button,
    IconButton,
    PageHeader,
  },
  setup: async () => {
    useHead({
      title: "Twin:te | TWINSからインポート",
    });

    const openTwins = () => {
      openUrl("https://twins.tsukuba.ac.jp");
    };
    return { openTwins };
  },
});
</script>

<style scoped lang="scss">
@import "~/ui/styles";
.twins {
  @include max-width;
}

.main {
  margin-top: $spacing-5;
  &__mask {
    height: calc(#{$vh} - 16.2rem);
    @include landscape {
      height: calc(#{$vh} - 16.6rem);
    }
    @include scroll-mask;
    overflow-y: auto;
    padding: 0.9rem 0;
  }
  &__description {
    @include text-description;
    a {
      color: getColor(--color-text-link);
    }
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
