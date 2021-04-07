<template>
  <div class="detail">
    <PageHeader>
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
        <div v-click-away="closePopup">
          <ToggleIconButton
            ref="btnRef"
            class="header__right-button-icon"
            @click="toggleShowPopup"
            size="large"
            color="normal"
            iconName="more_vert"
            :isActive="showPopup"
          ></ToggleIconButton>
          <Popup v-show="showPopup">
            <PopupContent
              v-for="data in popupData"
              :key="data.value"
              @click="data.onClick"
              :link="data.link"
              :value="data.value"
              :color="data.color"
            ></PopupContent>
          </Popup>
        </div>
      </template>
    </PageHeader>
    <article class="main">
      <div class="main__contents">
        <p class="main__code">{{ code }}</p>
        <h1 class="main__name">{{ name }}</h1>
        <section class="main__details">
          <CourseDetail item="開講時限" :value="date">
            <DecoratedIcon iconName="schedule"></DecoratedIcon>
          </CourseDetail>
          <CourseDetail item="担当教員" :value="instructor">
            <DecoratedIcon iconName="person"></DecoratedIcon>
          </CourseDetail>
          <CourseDetail item="授業場所" :value="room">
            <DecoratedIcon iconName="room"></DecoratedIcon>
          </CourseDetail>
          <CourseDetail item="授業形式" :value="method">
            <DecoratedIcon iconName="category"></DecoratedIcon>
          </CourseDetail>
        </section>
        <TextFieldMultilines
          class="main__memo"
          v-model="memo"
          @update:modelValue="update"
          placeholder="メモを入力"
          height="10.3rem"
          style="width: 100%"
        ></TextFieldMultilines>
        <section class="main__attendance attendance">
          <div class="attendance__item">
            <p class="attendance__state">出席</p>
            <IconButton
              class="attendance__minus-btn"
              @click="updateCounter('attendance', -1)"
              size="small"
              color="primary"
              iconName="remove"
            ></IconButton>
            <p class="attendance__count">{{ attendance }}</p>
            <IconButton
              class="attendance__plus-btn"
              @click="updateCounter('attendance', 1)"
              size="small"
              color="primary"
              iconName="add"
            ></IconButton>
          </div>
          <div class="attendance__item">
            <p class="attendance__state">欠席</p>
            <IconButton
              class="attendance__minus-btn"
              @click="updateCounter('absence', -1)"
              size="small"
              color="primary"
              iconName="remove"
            ></IconButton>
            <p class="attendance__count">{{ absence }}</p>
            <IconButton
              class="attendance__plus-btn"
              @click="updateCounter('absence', 1)"
              size="small"
              color="primary"
              iconName="add"
            ></IconButton>
          </div>
          <div class="attendance__item">
            <p class="attendance__state">遅刻</p>
            <IconButton
              class="attendance__minus-btn"
              @click="updateCounter('late', -1)"
              size="small"
              color="primary"
              iconName="remove"
            ></IconButton>
            <p class="attendance__count">{{ late }}</p>
            <IconButton
              class="attendance__plus-btn"
              @click="updateCounter('late', 1)"
              size="small"
              color="primary"
              iconName="add"
            ></IconButton>
          </div>
        </section>
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
          「{{
            name
          }}」を削除しますか？(編集した情報や記録したメモ、出欠記録も削除されます。)
        </p>
      </template>
      <template #button>
        <Button
          @click="closeDeleteCourseModal"
          size="medium"
          layout="fill"
          color="base"
        >
          キャンセル
        </Button>
        <Button
          @click="deleteCourse"
          size="medium"
          layout="fill"
          color="danger"
        >
          削除
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { RegisteredCourse } from "~/api/@types";
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
import { displayCourseToApi } from "~/entities/course";
import { displayToast } from "~/entities/toast";
import { getSyllbusUrl } from "~/entities/courseCard";
import { useSwitch } from "~/hooks/useSwitch";
import { usePorts } from "~/usecases";
import { deleteCourse as apiDeleteCourse } from "~/usecases/deleteCourse";
import { useDisplayCourse } from "~/usecases/getCourseById";
import { openUrl } from "~/usecases/openUrl";
import { updateCourse } from "~/usecases/updateCourse";

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
  setup: async () => {
    const ports = usePorts();
    const route = useRoute();
    const router = useRouter();
    const { id } = route.params as { id: string };

    const {
      absence,
      attendance,
      code,
      courseId,
      date,
      instructor,
      late,
      memo,
      method,
      name,
      registeredCourse,
      room,
      schedules,
    } = await useDisplayCourse(ports)(id, "-");

    const updateCounter = (
      tag: "attendance" | "late" | "absence",
      value: number
    ) => {
      ({
        attendance,
        late,
        absence,
      }[tag].value += value);
      update();
    };

    /** delete-course-modal */
    const [
      deleteCourseModal,
      openDeleteCourseModal,
      closeDeleteCourseModal,
    ] = useSwitch();
    const deleteCourse = async () => {
      try {
        await apiDeleteCourse(ports)(id);
      } catch (error) {
        console.error(error);
        displayToast(error)(error.message);
        return;
      }
      closeDeleteCourseModal();
      router.push("/");
    };

    /** popup */
    const [showPopup, , closePopup, toggleShowPopup] = useSwitch(false);
    const popupData: {
      onClick: Function;
      link: boolean;
      value: string;
      color: popupContentColor;
    }[] = [
      {
        onClick: () => router.push(`/course/${id}/edit`),
        link: false,
        value: "編集する",
        color: "normal",
      },
      {
        onClick: () => openUrl(getSyllbusUrl(code.value)),
        link: true,
        value: "シラバス",
        color: "normal",
      },
      {
        onClick: () => openUrl("https://atmnb.tsukuba.ac.jp"),
        link: true,
        value: "出席(respon)",
        color: "normal",
      },
      {
        onClick: () =>
          openUrl(`https://www.google.com/maps/search/筑波大学+${room.value}`),
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

    const update = async () => {
      const course = displayCourseToApi({
        code: code.value,
        courseId: courseId.value,
        date: date.value,
        instructor: instructor.value,
        method: method.value,
        name: name.value,
        room: room.value,
        attendance: attendance.value,
        absence: absence.value,
        late: late.value,
        memo: memo.value,
        schedules: schedules.value,
        registeredCourse: registeredCourse.value,
      });
      // TODO: as を使わない実装
      try {
        await updateCourse(ports)(course as Required<RegisteredCourse>);
      } catch (error) {
        console.error(error);
        displayToast(error)(error.message);
        return;
      }
    };

    return {
      absence,
      attendance,
      code,
      courseId,
      date,
      instructor,
      late,
      memo,
      method,
      name,
      registeredCourse,
      room,
      updateCounter,
      showPopup,
      closePopup,
      toggleShowPopup,
      popupData,
      deleteCourseModal,
      openDeleteCourseModal,
      closeDeleteCourseModal,
      update,
      deleteCourse,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";

.detail {
  height: 100%;
  display: grid;
  grid-auto-rows: auto 1fr;
  gap: $spacing-5;
  @include max-width;
}

@include header-left-button-delete;
.header {
  &__right-button-icon {
    margin: $spacing-0 $spacing-0 $spacing-2 auto;
  }
}

.main {
  overflow-y: auto;
  @include height-without-header;
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
    }
    &__count {
      grid-area: count;
      font-size: $font-maximum;
      font-weight: 500;
      @include text-liner;
    }
    &__minus-btn {
      grid-area: minus-btn;
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
