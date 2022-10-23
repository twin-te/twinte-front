<template>
  <div class="feedback">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          size="large"
          color="normal"
          icon-name="arrow_back"
          @click="$router.back()"
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
            :selectedOption="feedbackTypeMap[feedbackType]"
            :options="displayFeedbackTypes"
            @update:selected-option="updateSelectedOption"
          ></Dropdown>
        </section>
        <section class="feedback__row">
          <Label value="スクリーンショットの添付"></Label>
          <div class="feedback__note">
            バグ報告の場合は不具合のある画面のスクリーンショットをいただけると幸いです。
          </div>
          <InputButtonFile
            name="csv-file"
            accept="image/*"
            @change-file="screenShot = $event"
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
        <section class="feedback__row">
          <Label value="連絡先メールアドレス" mandatory></Label>
          <div class="feedback__note">
            より快適なサービスを提供するため開発チームより連絡をさせていただくことがあります。
          </div>
          <div class="feedback__checkbox">
            <CheckContent v-model:checked="allowReplies"
              >運営からの返信を許可する</CheckContent
            >
          </div>
          <TextFieldSingleLine
            v-model="email"
            placeholder="xxx@example.com"
            :disabled="!allowReplies"
          ></TextFieldSingleLine>
        </section>
      </div>
      <section class="main__footer">
        <Button
          size="large"
          layout="fill"
          color="primary"
          :pauseActiveStyle="false"
          :state="ButtonState"
          @click="onClickButton"
          >フィードバックを送信</Button
        >
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usePorts } from "~/adapter";
import Usecase from "~/application/usecases";
import {
  feedbackTypeMap,
  displayToFeedbackType,
  displayFeedbackTypes,
} from "~/presentation/presenters/feedback";
import Button from "~/ui/components/Button.vue";
import CheckContent from "~/ui/components/CheckContent.vue";
import Dropdown from "~/ui/components/Dropdown.vue";
import IconButton from "~/ui/components/IconButton.vue";
import InputButtonFile from "~/ui/components/InputButtonFile.vue";
import Label from "~/ui/components/Label.vue";
import PageHeader from "~/ui/components/PageHeader.vue";
import TextFieldMultilines from "~/ui/components/TextFieldMultilines.vue";
import TextFieldSingleLine from "~/ui/components/TextFieldSingleLine.vue";
import { displayToast } from "../store/toast";
import type { FeedbackType } from "~/domain/feedback";
import type { DisplayFeedbackType } from "~/presentation/viewmodels/feedback";

useHead({
  title: "Twin:te | フィードバック",
});

const ports = usePorts();
const router = useRouter();

/** feedback */
const feedbackType = ref<FeedbackType>("Bug");
const screenShot = ref<File>();
const feedbackContent = ref("");
const allowReplies = ref(true);
const email = ref("");

const updateSelectedOption = (option: DisplayFeedbackType) => {
  feedbackType.value = displayToFeedbackType(option);
};

const placeholder: Record<FeedbackType, string> = {
  Bug:
    "例）授業の検索ページで「XXXX」という授業を追加しようとしたら、「OOOO」というエラーメッセージが出てきて追加できませんでした。Pixel4a、Android11です。",
  NewFeature:
    "例）学部生ですが、検索で大学院の授業ばかりでてきてしまうので大学院の授業を除外して検索する機能がほしいです。",
  Contact: "例）Twin:te の発音はツインテですか？トゥインテですか？",
  Other: "",
};

const ButtonState = computed(() => {
  if (
    feedbackContent.value === "" ||
    (feedbackType.value === "Contact" &&
      (email.value === "" || !allowReplies.value))
  )
    return "disabled";
  return "default";
});

const onClickButton = async () => {
  Usecase.sendFeedback(ports)({
    type: feedbackType.value,
    screenShots: screenShot.value ? [screenShot.value] : [],
    content: feedbackContent.value,
    email: allowReplies.value ? email.value : "",
  })
    .then(() => {
      displayToast("フィードバックを送信しました。ありがとうございます。", {
        type: "primary",
      });
      router.push("/");
    })
    .catch(() => {
      displayToast(
        "申し訳ございません。フィードバックの送信に失敗しました。ネットワーク環境をご確認ください。"
      );
    });
};
</script>

<style scoped lang="scss">
@import "~/ui/styles";
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
  &__checkbox {
    margin: $spacing-2 0;
  }
}
</style>
