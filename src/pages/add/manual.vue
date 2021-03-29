<template>
  <div class="manual">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          @click="$router.back()"
          size="large"
          color="normal"
          icon-name="arrow_back"
        ></IconButton>
      </template>
      <template #title>手動で授業を作成</template>
    </PageHeader>
    <div class="main">
      <div class="main__mask">
        <div class="main__contents">
          <section class="main__course-name">
            <LabeledTextField label="授業名" mandatory>
              <TextFieldSingleLine
                v-model="course.name"
                placeholder="例) ゼミ"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </section>
          <section class="main__period">
            <Label value="開講時限" mandatory></Label>
            <ScheduleEditer
              v-model:schedules="schedules"
              :onClickAddButton="addSchedule"
              :onClickRemoveButton="removeSchedule"
            ></ScheduleEditer>
          </section>
          <section class="main__instructor">
            <LabeledTextField label="担当教員">
              <TextFieldSingleLine
                v-model="course.instructor"
                placeholder="例) 山田太郎"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </section>
          <section class="main__room">
            <LabeledTextField label="授業場所">
              <TextFieldSingleLine
                v-model="room"
                placeholder="例) 研究室"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </section>
          <section class="main__method method">
            <Label value="授業形式"></Label>
            <div class="method__checkboxes">
              <CheckContent
                v-for="method in methods"
                :key="method.value"
                v-model:checked="method.checked"
                >{{ method.lavel }}</CheckContent
              >
            </div>
          </section>
        </div>
      </div>
      <section class="main__button">
        <Button
          @click="addCourse()"
          size="large"
          layout="fill"
          color="primary"
          :pauseActiveStyle="false"
          :state="btnState"
          >変更を保存</Button
        >
      </section>
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
            v-for="duplicatedCourse in duplicatedCourses"
            :key="duplicatedCourse.name"
          >
            <p class="duplicated-course__name">{{ duplicatedCourse.name }}</p>
            <!-- TODO: scheduleToString の実装をまつ -->
            <CourseDetailMini
              class="duplicated-course__detail"
              iconName="schedule"
              :text="duplicatedCourse.schedules.toString()"
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
          @click="addCourse(false)"
          size="medium"
          layout="fill"
          color="primary"
          >そのまま追加</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { addCourseByManual } from "~/usecases/addCourseByManual";
import { CourseMethod, RegisteredCourseWithoutID } from "~/api/@types";
import { defineComponent, ref, computed, reactive } from "vue";
import { formatSchedule } from "~/entities/course";
import { isCourseDuplicated } from "~/usecases/getDuplicatedCourses";
import { MethodJa } from "~/entities/method";
import { Schedule } from "~/entities/schedule";
import { usePorts } from "~/usecases/index";
import { useRouter } from "vue-router";
import { useSwitch } from "~/hooks/useSwitch";
import Button from "~/components/Button.vue";
import CheckContent from "~/components/CheckContent.vue";
import CourseDetailMini from "~/components/CourseDetailMini.vue";
import IconButton from "~/components/IconButton.vue";
import Label from "~/components/Label.vue";
import LabeledTextField from "~/components/LabeledTextField.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import ScheduleEditer from "~/components/ScheduleEditer.vue";
import TextFieldSingleLine from "~/components/TextFieldSingleLine.vue";
import { getYear } from "~/usecases/getYear";

export default defineComponent({
  components: {
    Button,
    CheckContent,
    CourseDetailMini,
    IconButton,
    Modal,
    Label,
    LabeledTextField,
    PageHeader,
    ScheduleEditer,
    TextFieldSingleLine,
  },
  setup: async () => {
    const router = useRouter();
    const ports = usePorts();
    const course = reactive<Required<RegisteredCourseWithoutID>>({
      absence: 0,
      attendance: 0,
      credit: 0,
      instructor: "",
      late: 0,
      memo: "",
      methods: [],
      name: "",
      schedules: [],
      tags: [],
      year: await getYear(ports),
    });
    const room = ref("");

    /** schedule-editor */
    const schedules = ref<Schedule[]>([
      { module: "指定なし", day: "指定なし", period: "指定なし" },
    ]);
    const addSchedule = () => {
      schedules.value.push({
        module: "指定なし",
        day: "指定なし",
        period: "指定なし",
      });
    };
    const removeSchedule = (index: number) => {
      schedules.value.splice(index, 1);
    };

    /** checkbox */
    const methods = reactive<
      {
        checked: boolean;
        value: CourseMethod;
        lavel: MethodJa;
      }[]
    >([
      { checked: false, value: "FaceToFace", lavel: "対面" },
      { checked: false, value: "Synchronous", lavel: "同時双方向" },
      { checked: false, value: "Asynchronous", lavel: "オンデマンド" },
      { checked: false, value: "Others", lavel: "その他" },
    ]);

    /** button */
    const btnState = computed(() => {
      if (
        course.name === "" ||
        schedules.value.some((obj) =>
          Object.keys(obj).some((key) => obj[key] === "指定なし")
        )
      )
        return "disabled";
      else return "default";
    });

    /** deulpication modal */
    const [
      duplicationModal,
      openDuplicationModal,
      closeDuplicationModal,
    ] = useSwitch();
    const duplicatedCourses = ref<Required<RegisteredCourseWithoutID>[]>([]);

    const addCourse = async (showWarning = true) => {
      if (btnState.value === "disabled") return;
      course.schedules = formatSchedule(schedules.value);
      course.schedules = course.schedules.map((v) => ({
        ...v,
        room: room.value,
      }));
      if (showWarning && isCourseDuplicated(ports)(course)) {
        duplicatedCourses.value[0] = course;
        openDuplicationModal();
        return;
      }
      try {
        await addCourseByManual(ports)(course);
      } catch (error) {
        console.error(error);
        return;
      }
      router.push("/");
    };

    return {
      addCourse,
      addSchedule,
      btnState,
      closeDuplicationModal,
      course,
      duplicatedCourses,
      duplicationModal,
      methods,
      openDuplicationModal,
      removeSchedule,
      room,
      schedules,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";
.manual {
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
  }
  &__contents {
    display: grid;
    gap: $spacing-8;
    padding: $spacing-3 $spacing-0 $spacing-14;
  }
  &__period {
    display: grid;
    gap: 1.4rem;
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
.method {
  &__checkboxes {
    display: grid;
    gap: $spacing-5;
    margin-top: 1.4rem;
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
