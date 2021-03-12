<template>
  <PageHeader :atHome="false">
    <template #left-button-icon>
      <IconButton
        @click="$router.push('/')"
        size="large"
        color="normal"
        iconName="arrow_back"
      ></IconButton>
    </template>
    <template #title>授業詳細</template>
    <template #right-button-icon>
      <ToggleIconButton
        ref="btnRef"
        class="header__right-button-icon"
        @click="showPopup = !showPopup"
        size="large"
        color="normal"
        iconName="more_vert"
        :isActive="showPopup"
      ></ToggleIconButton>
      <Popup v-show="showPopup" v-click-away="clickOutside">
        <PopupContent
          v-for="data in popupData"
          :key="data.value"
          @click="data.onClick"
          :link="data.link"
          :value="data.value"
          :color="data.color"
        ></PopupContent>
      </Popup>
    </template>
  </PageHeader>
  <article class="course">
    <div class="course__contents">
      <p class="course__code">1E06001</p>
      <h1 class="course__name">メディアアート・フィジカルコンピューティング</h1>
      <div class="course__details">
        <CourseDetail item="開講時限" value="春AB 木2">
          <DecoratedIcon iconName="schedule"></DecoratedIcon>
        </CourseDetail>
        <CourseDetail
          item="担当教員"
          value="齋藤敏寿、齋藤敏寿、齋藤敏寿、齋藤敏寿、齋藤敏寿、齋藤敏寿、齋藤敏寿、齋藤敏寿"
        >
          <DecoratedIcon iconName="person"></DecoratedIcon>
        </CourseDetail>
        <CourseDetail item="授業場所" value="6A508">
          <DecoratedIcon iconName="room"></DecoratedIcon>
        </CourseDetail>
        <CourseDetail item="授業形式" value="対面">
          <DecoratedIcon iconName="category"></DecoratedIcon>
        </CourseDetail>
      </div>
      <TextFieldMultilines
        class="course__memo"
        v-model="memo"
        placeholder="メモを入力"
        :height="10.3"
        style="width: 100%"
      ></TextFieldMultilines>
      <div class="course__attendance attendance">
        <div class="attendance__item">
          <p class="attendance__state">出席</p>
          <IconButton
            class="attendance__minus-btn"
            @click="clickHandler"
            size="small"
            color="normal"
            iconName="remove"
          ></IconButton>
          <p class="attendance__count">5</p>
          <IconButton
            class="attendance__plus-btn"
            @click="clickHandler"
            size="small"
            color="normal"
            iconName="add"
          ></IconButton>
        </div>
        <div class="attendance__item">
          <p class="attendance__state">欠席</p>
          <IconButton
            class="attendance__minus-btn"
            @click="clickHandler"
            size="small"
            color="normal"
            iconName="remove"
          ></IconButton>
          <p class="attendance__count">3</p>
          <IconButton
            class="attendance__plus-btn"
            @click="clickHandler"
            size="small"
            color="normal"
            iconName="add"
          ></IconButton>
        </div>
        <div class="attendance__item">
          <p class="attendance__state">遅刻</p>
          <IconButton
            class="attendance__minus-btn"
            @click="clickHandler"
            size="small"
            color="normal"
            iconName="remove"
          ></IconButton>
          <p class="attendance__count">1</p>
          <IconButton
            class="attendance__plus-btn"
            @click="clickHandler"
            size="small"
            color="normal"
            iconName="add"
          ></IconButton>
        </div>
      </div>
    </div>
  </article>
  <Modal
    v-if="deleteCourseModal"
    class="delete-course-modal"
    @click="closeDeleteCourseModal"
    size="small"
  >
    <template #title>授業の削除</template>
    <template #contents>
      <p class="modal__text">
        「色彩学」を削除しますか？(編集した情報や記録したメモ、出欠記録も削除されます。)
      </p>
    </template>
    <template #button>
      <Button
        @click="closeDeleteCourseModal"
        size="medium"
        layout="fill"
        color="base"
        >キャンセル</Button
      >
      <Button @click="clickHandler" size="medium" layout="fill" color="danger"
        >削除</Button
      >
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Button from "~/components/Button.vue";
import CourseDetail from "~/components/CourseDetail.vue";
import DecoratedIcon from "~/components/DecoratedIcon.vue";
import IconButton from "~/components/IconButton.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import Popup from "~/components/Popup.vue";
import PopupContent, {
  Color as popupContentColor,
} from "~/components/PopupContent.vue";
import TextFieldMultilines from "~/components/TextFieldMultilines.vue";
import ToggleIconButton from "~/components/ToggleIconButton.vue";

export default defineComponent({
  name: "Details",
  components: {
    Button,
    CourseDetail,
    DecoratedIcon,
    IconButton,
    Modal,
    PageHeader,
    Popup,
    PopupContent,
    TextFieldMultilines,
    ToggleIconButton,
  },
  setup: () => {
    const clickHandler = () => {
      console.log("click");
    };

    const router = useRouter();
    const route = useRoute();
    const { course_id: courseId } = route.params;

    // delete-course-modal
    const deleteCourseModal = ref(false);
    const openDeleteCourseModal = () => {
      deleteCourseModal.value = true;
    };
    const closeDeleteCourseModal = () => {
      deleteCourseModal.value = false;
    };

    // popup
    const btnRef = ref();
    const showPopup = ref(false);
    const clickOutside = (e: any) => {
      if (deleteCourseModal.value) return;
      // icon-buttonをクリックした時
      if (Object.keys(e.path).some((key) => e.path[key] === btnRef.value.$el))
        return;
      showPopup.value = false;
    };
    const popupClickHandler = (value: string) => {
      console.log(value);
    };
    const popupData: {
      onClick: Function;
      link: boolean;
      value: string;
      color: popupContentColor;
    }[] = [
      {
        onClick: () => router.push(`/course/${courseId}/edit`),
        link: false,
        value: "編集する",
        color: "normal",
      },
      {
        onClick: popupClickHandler,
        link: true,
        value: "シラバス",
        color: "normal",
      },
      {
        onClick: popupClickHandler,
        link: true,
        value: "出席(respon)",
        color: "normal",
      },
      {
        onClick: popupClickHandler,
        link: true,
        value: "地図",
        color: "normal",
      },
      {
        onClick: openDeleteCourseModal,
        link: false,
        value: "削除する",
        color: "danger",
      },
    ];

    // memo
    const memo = ref("");

    return {
      clickHandler,
      btnRef,
      clickOutside,
      showPopup,
      memo,
      popupData,
      deleteCourseModal,
      openDeleteCourseModal,
      closeDeleteCourseModal,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";

.header {
  @include max-width;
  &__right-button-icon {
    margin: $spacing-0 $spacing-0 $spacing-2 auto;
  }
}
@include header-left-button-delete;

.course {
  display: block;
  height: calc(100vh - 8rem /*Headerとmargin-top*/);
  margin-top: $spacing-5;
  padding: $spacing-0 $spacing-4 $spacing-0;
  overflow-y: auto;
  @include max-width;
  @include scroll-mask;
  &__contents {
    padding-top: $spacing-3;
    overflow-y: scroll;
  }
  &__code {
    font-size: $font-small;
    font-weight: normal;
    line-height: $fit;
    color: $text-sub;
  }
  &__name {
    font-size: $font-maximum;
    font-weight: 500;
    line-height: $multi-line;
    color: $text-main;
  }
  &__details {
    display: grid;
    gap: $spacing-4;
    margin-top: $spacing-5;
  }
  &__memo {
    margin: $spacing-8 $spacing-0;
  }
  &__attendance {
    margin-bottom: 4.1rem;
  }
  .attendance {
    display: grid;
    gap: $spacing-5;
    padding: $spacing-4 $spacing-6;
    background: $base;
    box-shadow: $shadow-base;
    border-radius: $radius-3;
    &__item {
      display: grid;
      grid-template:
        "state ... minus-btn count plus-btn" $spacing-7
        / auto 1fr auto 5.9rem auto;
      justify-items: center;
      align-items: center;
    }
    &__state {
      grid-area: state;
      font-size: $font-medium;
      font-weight: 500;
      color: $text-main;
    }
    &__plus-btn {
      grid-area: plus-btn;
      @include text-liner;
      &:active {
        color: $white;
        background: $primary-liner;
        @include void-text-liner;
      }
    }
    &__count {
      grid-area: count;
      font-size: $font-maximum;
      font-weight: 500;
      @include text-liner;
    }
    &__minus-btn {
      grid-area: minus-btn;
      @include text-liner;
      &:active {
        color: $white;
        background: $primary-liner;
        @include void-text-liner;
      }
    }
  }
}

.delete-course-modal .modal {
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
