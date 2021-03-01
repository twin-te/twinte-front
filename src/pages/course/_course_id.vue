<template>
  <PageHeader :atHome="false">
    <template #left-btn>
      <IconButton
        @click="clickHandler"
        size="large"
        color="normal"
        iconName="arrow_back"
      ></IconButton>
    </template>
    <template #title>授業詳細</template>
    <template #right-btn>
      <ToggleIconButton
        class="header__right-btn"
        @click="showPopup = !showPopup"
        size="large"
        color="normal"
        iconName="more_vert"
        :isActive="showPopup"
      ></ToggleIconButton>
      <Popup v-if="showPopup">
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
    <p class="course__code">1E06001</p>
    <h1 class="course__name">色彩学</h1>
    <div class="course__details">
      <CourseDetail item="開講時限" value="春AB 木2">
        <DecoratedIcon iconName="schedule"></DecoratedIcon>
      </CourseDetail>
      <CourseDetail item="担当教員" value="山本早里">
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

    // delete-course-modal
    const deleteCourseModal = ref(false);
    const openDeleteCourseModal = () => {
      deleteCourseModal.value = true;
    };
    const closeDeleteCourseModal = () => {
      deleteCourseModal.value = false;
    };

    // popup
    const showPopup = ref(false);
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
        onClick: popupClickHandler,
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
  max-width: 900px;
  &__right-btn {
    margin: 0 0 0.8rem auto;
  }
}
.course {
  padding: 2.4rem 1.6rem 0;
  overflow: scroll;
  max-width: 900px;
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
    gap: 1.6rem;
    margin-top: 2rem;
  }
  &__memo {
    margin: 3.2rem 0;
  }
  &__attendance {
    margin-bottom: 4.1rem;
  }
  .attendance {
    display: grid;
    gap: 2rem;
    padding: 1.6rem 2.4rem;
    background: $base;
    border: 0.1rem solid $base;
    box-shadow: $shadow-base;
    border-radius: $radius-3;
    &__item {
      display: grid;
      grid-template:
        "state ... minus-btn count plus-btn" 2.8rem
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
  &__text {
    font-size: $font-large;
    line-height: $multi-line;
    color: $text-main;
  }
  &__details {
    display: grid;
    gap: 1.6rem;
    margin-top: 2rem;
  }
  &__memo {
    margin: 3.2rem 0;
  }
  &__attendance {
    margin-bottom: 4.1rem;
  }
  .attendance {
    display: grid;
    gap: 2rem;
    padding: 1.6rem 2.4rem;
    background: $base;
    border: 0.1rem solid $base;
    box-shadow: $shadow-base;
    border-radius: $radius-3;
    &__item {
      display: grid;
      grid-template:
        "state ... minus-btn count plus-btn" 2.8rem
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
  &__text {
    font-size: $font-large;
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
</style>
