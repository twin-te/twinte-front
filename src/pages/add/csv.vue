<template>
  <PageHeader>
    <template #left-button-icon>
      <IconButton
        @click="$router.push('/add')"
        size="large"
        color="normal"
        icon-name="arrow_back"
      ></IconButton>
    </template>
    <template #title>CSVファイルから追加</template>
  </PageHeader>
  <div class="main">
    <div class="main__csv csv">
      <p class="csv__header">CSVファイル</p>
      <InputButtonFile name="csv-file" @change-file="echo">
        アップロードする
      </InputButtonFile>
    </div>
    <div v-if="valid" class="main__courses courses">
      <div class="courses__contents">
        <CardCourse
          v-for="{ checked, course } in courseData"
          :key="course.id"
          @click-checkbox="checked.value = !checked.value"
          @click-syllabus-link="$router.push(course.url)"
          :isChecked="checked.value"
          :course="course"
        >
        </CardCourse>
      </div>
    </div>
    <div v-else class="main__error">
      授業を読み込めません。CSVファイルの内容をご確認ください。
    </div>
    <div class="main__button">
      <Button
        @click="addCourse"
        size="large"
        layout="fill"
        color="primary"
        :pauseActiveStyle="false"
        :state="btnState"
        >選択した授業を追加</Button
      >
    </div>
  </div>
  <Modal
    v-if="duplicationModal"
    class="duplication-modal"
    @click="closeDuplicationModal"
  >
    <template #title>開講時限が重複しています</template>
    <template #contents>
      <p class="modal__text">
        以下の授業のコマには既に授業が登録されています。そのまま追加してよろしいですか？（当該のコマには複数の授業が登録されます。）
      </p>
      <div class="modal__courses">
        <div
          class="duplicated-course"
          v-for="data in duplicatedCourses"
          :key="data.name"
        >
          <p class="duplicated-course__name">{{ data.name }}</p>
          <CourseDetailMini
            class="duplicated-course__detail"
            iconName="schedule"
            :text="data.period"
          ></CourseDetailMini>
        </div>
      </div>
    </template>
    <template #button>
      <Button
        @click="closeDuplicationModal"
        size="medium"
        layout="fill"
        color="base"
        >キャンセル</Button
      >
      <Button
        @click="addCourse(true)"
        size="medium"
        layout="fill"
        color="primary"
        >そのまま追加</Button
      >
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue";
import { useRouter } from "vue-router";
import Button from "~/components/Button.vue";
import CardCourse, { Course } from "~/components/CardCourse.vue";
import CourseDetailMini from "~/components/CourseDetailMini.vue";
import IconButton from "~/components/IconButton.vue";
import InputButtonFile from "~/components/InputButtonFile.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import { useSwitch } from "~/hooks/useSwitch";

export default defineComponent({
  name: "CSV",
  components: {
    Button,
    CardCourse,
    CourseDetailMini,
    IconButton,
    InputButtonFile,
    Modal,
    PageHeader,
  },
  setup() {
    const router = useRouter();

    const course1: Course = {
      id: "01EB512",
      name: "色彩計画論特講色彩計画論特講色彩計画論特講",
      period: "春A 水2",
      room: "6A203",
      url: "/syllabus/6A203",
    };
    const course2: Course = {
      id: "01EB512",
      name: "色彩計画演習",
      period: "春A 水2",
      room: "6A203",
      url: "/syllabus/6A203",
    };

    const courseData: {
      checked: Ref<boolean>;
      course: Course;
    }[] = [
      {
        checked: ref(true),
        course: course1,
      },
      {
        checked: ref(true),
        course: course2,
      },
      {
        checked: ref(true),
        course: course1,
      },
      {
        checked: ref(true),
        course: course2,
      },
    ];

    const upload = () => {
      console.log("upload");
    };

    // ここを変更すると画面が変わります。
    const fileName = "RSReferCsvaaaaaaaaaaaaaaaaaaaaaaa";
    const valid = true;
    const duplicated = ref(true);

    /** button */
    const btnState = computed(() => {
      if (
        courseData.every((data) => !data.checked.value) ||
        !valid ||
        !fileName
      )
        return "disabled";
      else return "default";
    });

    /** modal */
    const [
      duplicationModal,
      openDuplicationModal,
      closeDuplicationModal,
    ] = useSwitch();
    const duplicatedCourses = [
      { name: "色彩計画演習", period: "春A 水2" },
      { name: "色彩学", period: "春B 水2" },
    ];

    const addCourse = (force = false) => {
      if (btnState.value === "disabled") return;
      if (!duplicated.value || force) router.push("/");
      else openDuplicationModal();
    };

    return {
      courseData,
      upload,
      addCourse,
      fileName,
      valid,
      btnState,
      duplicationModal,
      openDuplicationModal,
      closeDuplicationModal,
      duplicatedCourses,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";

.header {
  max-width: 900px;
}
.main {
  max-width: 900px;
  &__csv {
    margin-top: $spacing-8;
  }
  &__courses {
    margin-top: $spacing-5;
  }
  &__error {
    margin-top: $spacing-6;
    height: calc(100vh - 26.1rem);
    @include landscape {
      height: calc(100vh - 26.5rem);
    }
    color: $danger;
    line-height: 2rem;
  }
  &__button {
    margin: $spacing-3 $spacing-0 $spacing-6;
    @include center-flex;
    @include landscape {
      margin-bottom: $spacing-7;
    }
  }
}
.csv {
  &__header {
    font-weight: 500;
    line-height: $single-line;
    margin-bottom: $spacing-4;
  }
}
.courses {
  height: calc(100vh - 25.7rem);
  @include landscape {
    height: calc(100vh - 26.1rem);
  }
  overflow-y: scroll;
  margin-right: -($spacing-4);
  padding-right: $spacing-4;
  @include scroll-mask;
  &__contents {
    display: grid;
    gap: $spacing-3;
    margin: $spacing-3 $spacing-0 $spacing-14;
  }
}
.duplication-modal .modal {
  &__text {
    line-height: $multi-line;
    margin-bottom: 3rem;
  }
  &__courses {
    display: grid;
    gap: $spacing-4;
  }
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
.duplicated-course {
  @include center-flex(column);
  align-items: flex-start;
  &__name {
    font-weight: 500;
    line-height: $single-line;
    margin-bottom: $spacing-1;
  }
}
</style>
