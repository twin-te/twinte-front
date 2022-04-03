<template>
  <div class="feedback">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          @click="$router.back()"
          size="large"
          color="normal"
          icon-name="arrow_back"
        ></IconButton>
      </template>
      <template #title>フィードバック</template>
    </PageHeader>
    <div class="main">
      <div class="main__feedback">
        <section class="feedback__row">
          <Label value="フィードバックのカテゴリー" :mandatory="true"></Label>
          <div class="feedback__note"></div>
          <Dropdown
            :options="['バグの報告', '新機能の要望', 'お問い合わせ', 'その他']"
            v-model:selectedOption="feedbackType"
          ></Dropdown>
        </section>
        <section class="feedback__row">
          <Label value="スクリーンショットの添付"></Label>
          <div class="feedback__note">
            バグ報告の場合は不具合のある画面のスクリーンショットをいただけると幸いです。
          </div>
          <InputButtonFile
            name="csv-file"
            @change-file="screenShot = $event"
            accept="image/*"
          >
            画像をアップロードする
          </InputButtonFile>
        </section>
        <section class="feedback__row">
          <Label value="内容" :mandatory="true"></Label>
          <div class="feedback__note"></div>
          <TextFieldMultilines
            v-model="feedbackContent"
            :placeholder="placeholder[feedbackType]"
            height="20rem"
          ></TextFieldMultilines>
        </section>
        <section
          class="feedback__row"
          v-if="['バグの報告', 'お問い合わせ'].includes(feedbackType)"
        >
          <Label
            value="連絡先メールアドレス or Twitterアカウント"
            :mandatory="feedbackType === 'お問い合わせ'"
          ></Label>
          <div class="feedback__note">{{ emailNote[feedbackType] }}</div>
          <TextFieldSingleLine
            v-model="email"
            placeholder="xxx@example.com / @te_twin"
          ></TextFieldSingleLine>
        </section>
      </div>
      <section class="main__footer">
        <Button
          @click="sendFeedback()"
          size="large"
          layout="fill"
          color="primary"
          :pauseActiveStyle="false"
          :state="btnStatus"
          >フィードバックを送信</Button
        >
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { displayToast } from "~/entities/toast";
import { postScreenshot } from "~/usecases/sendFeedback";
import { useHead } from "@vueuse/head";
import { usePorts } from "~/usecases";
import { useRouter } from "vue-router";
import { useStore } from "~/store";
import axios, { AxiosError } from "axios";
import Button from "~/components/Button.vue";
import Dropdown from "~/components/Dropdown.vue";
import IconButton from "~/components/IconButton.vue";
import InputButtonFile from "~/components/InputButtonFile.vue";
import Label from "~/components/Label.vue";
import PageHeader from "~/components/PageHeader.vue";
import TextFieldMultilines from "~/components/TextFieldMultilines.vue";
import TextFieldSingleLine from "~/components/TextFieldSingleLine.vue";

export default defineComponent({
  components: {
    Button,
    Dropdown,
    IconButton,
    InputButtonFile,
    Label,
    PageHeader,
    TextFieldMultilines,
    TextFieldSingleLine,
  },
  setup: () => {
    const store = useStore();
    const ports = usePorts();
    const router = useRouter();

    useHead({
      title: "Twin:te | フィードバック",
    });

    const feedbackType = ref<
      "バグの報告" | "新機能の要望" | "お問い合わせ" | "その他"
    >("バグの報告");
    const screenShot = ref<File>();
    const feedbackContent = ref("");
    const email = ref("");

    const placeholder = {
      バグの報告:
        "例）授業の検索ページで「XXXX」という授業を追加しようとしたら、「OOOO」というエラーメッセージが出てきて追加できませんでした。Pixel4a、Android11です。",
      新機能の要望:
        "例）学部生ですが、検索で大学院の授業ばかりでてきてしまうので大学院の授業を除外して検索する機能がほしいです。",
      お問い合わせ: "例）Twin:te の発音はツインテですか？トゥインテですか？",
      その他: "",
    };
    const emailNote = {
      バグの報告:
        "より詳しい原因解明のため開発チームから連絡を差し上げる場合がございます。ご協力いただける場合はメールアドレスまたはTwitterアカウントをご記入ください。",
      新機能の要望: "",
      お問い合わせ:
        "返信用のメールアドレスまたはTwitterアカウントをご記入下さい。",
      その他: "",
    };

    const btnStatus = computed(() => {
      if (
        feedbackContent.value === "" ||
        (feedbackType.value === "お問い合わせ" && email.value === "")
      )
        return "disabled";
      return "default";
    });

    const sendFeedback = async () => {
      displayToast(ports)("フィードバックを送信中…", {
        type: "primary",
      });
      const formData = new FormData();
      formData.append("entry.1670691903", store.getters.user.id);
      formData.append("entry.1912135146", feedbackType.value);
      formData.append("entry.240515057", feedbackContent.value);
      formData.append("entry.1261834897", email.value);
      let screenshotUrl = "";
      try {
        screenshotUrl = await postScreenshot(
          screenShot.value,
          store.getters.user.id
        );
      } catch (error) {
        console.error(error);
        displayToast(ports)(
          "申し訳ございません。スクリーンショットの送信に失敗しました。ネットワーク環境をご確認ください。"
        );
        return;
      }
      formData.append("entry.1457360447", screenshotUrl);
      try {
        await axios.post(
          "https://docs.google.com/forms/u/0/d/e/1FAIpQLSecBhx7GHm870_BHEjm94NAKOoxJPzbTL-pxpvy6BqxQQh6ag/formResponse",
          formData
        );
      } catch (error) {
        // HACK: google form に POST する方法は確定で CORS エラーが出るが成功する
        //       CORS エラーのときは status が undefined になるため無視する
        if ((error as AxiosError).response?.status !== undefined) {
          displayToast(ports)(
            "申し訳ございません。フィードバックの送信に失敗しました。ネットワーク環境をご確認ください。"
          );
          return;
        }
      }
      displayToast(ports)(
        "フィードバックを送信しました。ありがとうございます。",
        {
          type: "primary",
        }
      );
      router.push("/");
    };

    return {
      btnStatus,
      email,
      emailNote,
      feedbackContent,
      feedbackType,
      placeholder,
      screenShot,
      sendFeedback,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/styles";
.feedback {
  @include max-width;
}

.main {
  margin-top: $spacing-5;
  &__feedback {
    @include scroll-mask-large;
    height: calc(#{$vh} - 16rem);
    padding-top: $spacing-3;
    overflow-y: auto;
  }
  &__footer {
    text-align: center;
    margin: $spacing-3 $spacing-0 $spacing-6;
    @include landscape {
      margin-bottom: $spacing-7;
    }
    button {
      margin: auto;
    }
  }
}
.feedback {
  &__row {
    margin-bottom: 3rem;
  }
  &__note {
    @include text-description-sub;
    margin: 1rem 0;
  }
}
</style>
