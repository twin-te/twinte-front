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
                v-model="displayCourse.name"
                placeholder="例) ゼミ"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </section>
          <section class="main__period">
            <Label value="開講時限" mandatory></Label>
            <ScheduleEditer
              v-model:schedules="displayCourse.schedules"
              :onClickAddButton="addSchedule"
              :onClickRemoveButton="removeSchedule"
            ></ScheduleEditer>
          </section>
          <section class="main__credit">
            <LabeledTextField label="単位数">
              <TextFieldSingleLine
                v-model.trim="displayCourse.credit"
                placeholder="例) 1.0"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </section>
          <section class="main__instructor">
            <LabeledTextField label="担当教員">
              <TextFieldSingleLine
                v-model="displayCourse.instructor"
                placeholder="例) 筑波 太郎"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </section>
          <section class="main__room">
            <LabeledTextField label="授業場所">
              <TextFieldSingleLine
                v-model="displayCourse.room"
                placeholder="例) 研究室"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </section>
          <section class="main__method method">
            <Label value="授業形式"></Label>
            <div class="method__checkboxes">
              <CheckContent
                v-for="content in methodContents"
                :key="content.label"
                v-model:checked="content.checked"
                >{{ content.label }}</CheckContent
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
            <CourseDetailMini
              class="duplicated-course__detail"
              iconName="schedule"
              :text="periodToString(duplicatedCourse.schedules)"
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
import { RegisteredCourseWithoutID } from "~/api/@types";
import { defineComponent, ref, computed, reactive } from "vue";
import { displayToast } from "~/entities/toast";
import { extractMessageOrDefault } from "~/usecases/error";
import { getYear } from "~/usecases/getYear";
import { isCourseDuplicated } from "~/usecases/getDuplicatedCourses";
import { methodJaList } from "~/entities/method";
import { periodToString } from "~/usecases/periodToString";
import { createBlankSchedule, isValidSchedules } from "~/entities/schedule";
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
import { isValidCredit } from "~/entities/credit";
import {
  apiToDisplayCourse,
  displayCourseToApi,
} from "~/usecases/useDisplayCourse";

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

    const baseCourse: Required<RegisteredCourseWithoutID> = {
      year: await getYear(ports),
      name: "",
      instructor: "",
      credit: 0,
      methods: [],
      schedules: [],
      memo: "",
      attendance: 0,
      absence: 0,
      late: 0,
      tags: [],
    };
    const displayCourse = reactive(apiToDisplayCourse(baseCourse, ""));

    /** schedule-editor */
    if (displayCourse.schedules.length === 0)
      displayCourse.schedules.push(createBlankSchedule());
    const addSchedule = () => {
      displayCourse.schedules.push(createBlankSchedule());
    };
    const removeSchedule = (index: number) => {
      displayCourse.schedules.splice(index, 1);
    };

    /** method checkbox */
    const methodContents = reactive(
      methodJaList.map((m) => ({
        label: m,
        checked: displayCourse.methods.includes(m),
      }))
    );

    /** save button */
    const btnState = computed(() =>
      displayCourse.name === "" ||
      !isValidSchedules(displayCourse.schedules) ||
      !isValidCredit(displayCourse.credit)
        ? "disabled"
        : "default"
    );

    /** duplication modal */
    const [
      duplicationModal,
      openDuplicationModal,
      closeDuplicationModal,
    ] = useSwitch();
    const duplicatedCourses = ref<Required<RegisteredCourseWithoutID>[]>([]);

    const addCourse = async (showWarning = true) => {
      if (btnState.value === "disabled") return;
      displayCourse.methods = methodContents
        .filter((c) => c.checked)
        .map((c) => c.label);
      const course = displayCourseToApi(displayCourse, baseCourse, [
        "name",
        "instructor",
        "credit",
        "methods",
        "schedules",
      ]) as Required<RegisteredCourseWithoutID>;

      // 開講時限が重複しているかどうか？
      if (showWarning && isCourseDuplicated(ports)(course)) {
        duplicatedCourses.value[0] = course;
        openDuplicationModal();
        return;
      }

      // 授業を追加する
      try {
        await addCourseByManual(ports)(course);
      } catch (error) {
        console.error(error);
        displayToast(ports)(extractMessageOrDefault(error));
        return;
      }
      router.push("/");
    };

    return {
      addCourse,
      addSchedule,
      btnState,
      closeDuplicationModal,
      displayCourse,
      duplicatedCourses,
      duplicationModal,
      methodContents,
      openDuplicationModal,
      periodToString,
      removeSchedule,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/styles";
.manual {
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
    position: relative;
    padding-left: 2rem;
    margin-left: -2rem;
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
