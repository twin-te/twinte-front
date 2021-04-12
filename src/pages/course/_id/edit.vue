<template>
  <div class="edit">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          @click="modal = true"
          size="large"
          color="normal"
          icon-name="arrow_back"
        ></IconButton>
      </template>
      <template #title>授業情報の編集</template>
    </PageHeader>
    <div class="main">
      <div class="main__mask">
        <div class="main__contents">
          <section class="main__course-name">
            <LabeledTextField label="授業名" mandatory>
              <TextFieldSingleLine
                v-model="name"
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
                v-model="instructor"
                placeholder="例) 山田太郎"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </section>
          <section class="main__method method">
            <Label value="授業形式"></Label>
            <div class="method__checkboxes">
              <CheckContent
                v-for="data in methodData"
                :key="data.value"
                v-model:checked="data.checked.value"
                >{{ data.value }}</CheckContent
              >
            </div>
          </section>
        </div>
      </div>
      <section class="main__footer">
        <Button
          @click="save"
          size="large"
          layout="fill"
          color="primary"
          :state="submitButton"
          >変更を保存</Button
        >
      </section>
    </div>
    <Modal
      class="leave-page-modal"
      v-if="modal"
      @click="modal = false"
      size="small"
    >
      <template #title>ページから移動しますか？</template>
      <template #contents>
        <p class="modal__text">
          「授業情報の編集」ページから移動してよろしいですか？<br />
          未保存の変更内容は失われます。
        </p>
      </template>
      <template #button>
        <Button @click="modal = false" size="medium" layout="fill" color="base"
          >キャンセル</Button
        >
        <Button
          @click="$router.back()"
          size="medium"
          layout="fill"
          color="primary"
          >移動する</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CourseMethod, RegisteredCourse } from "~/api/@types";
import Button from "~/components/Button.vue";
import CheckContent from "~/components/CheckContent.vue";
import IconButton from "~/components/IconButton.vue";
import Label from "~/components/Label.vue";
import LabeledTextField from "~/components/LabeledTextField.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import ScheduleEditer from "~/components/ScheduleEditer.vue";
import TextFieldSingleLine from "~/components/TextFieldSingleLine.vue";
import { displayCourseToApi } from "~/entities/course";
import { MethodJa } from "~/entities/method";
import { Schedule } from "~/entities/schedule";
import { usePorts } from "~/usecases";
import { useDisplayCourse } from "~/usecases/getCourseById";
import { updateCourse } from "~/usecases/updateCourse";

export default defineComponent({
  components: {
    Button,
    CheckContent,
    IconButton,
    Modal,
    Label,
    LabeledTextField,
    PageHeader,
    ScheduleEditer,
    TextFieldSingleLine,
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
      name,
      room,
      schedules: apiSchedules,
      registeredCourse,
    } = await useDisplayCourse(ports)(id, "").catch((error) => {
      // TODO: エラー表示処理を追加
      throw error;
    });

    /** schedule-editor */
    const blankSchedule: Schedule = {
      module: "指定なし",
      day: "指定なし",
      period: "指定なし",
    };
    const schedules = ref<Schedule[]>(apiSchedules.value);
    const scheduleMin = 1;
    const addSchedule = () => {
      schedules.value.push(blankSchedule);
    };
    const removeSchedule = (index: number) => {
      if (schedules.value.length <= scheduleMin) return;
      schedules.value.splice(index, 1);
    };

    const methods =
      registeredCourse.value.methods ??
      registeredCourse.value.course?.methods ??
      [];

    const methodData: {
      checked: Ref<boolean>;
      name: CourseMethod;
      value: MethodJa;
    }[] = [
      {
        checked: ref(methods.includes("FaceToFace")),
        name: "FaceToFace",
        value: "対面",
      },
      {
        checked: ref(methods.includes("Synchronous")),
        name: "Synchronous",
        value: "同時双方向",
      },
      {
        checked: ref(methods.includes("Asynchronous")),
        name: "Asynchronous",
        value: "オンデマンド",
      },
      {
        checked: ref(methods.includes("Others")),
        name: "Others",
        value: "その他",
      },
    ];

    /** submit button */
    const submitButton = computed(() => {
      return !name.value ||
        schedules.value.every((obj) =>
          Object.keys(obj).every((key) => obj[key] === "指定なし")
        )
        ? "disabled"
        : "default";
    });
    const save = async () => {
      if (submitButton.value === "disabled") return;
      const course = displayCourseToApi(
        {
          code: code.value,
          courseId: courseId.value,
          date: date.value,
          instructor: instructor.value,
          name: name.value,
          room: room.value,
          attendance: attendance.value,
          absence: absence.value,
          late: late.value,
          memo: memo.value,
          schedules: apiSchedules.value,
          registeredCourse: registeredCourse.value,
        },
        methodData.filter((m) => m.checked.value).map((v) => v.value)
      );
      await updateCourse(ports)(course as Required<RegisteredCourse>);
      router.push(`/course/${id}`);
    };

    /** modal */
    const modal = ref(false);

    return {
      instructor,
      methods,
      name,
      schedules,
      addSchedule,
      removeSchedule,
      methodData,
      save,
      submitButton,
      modal,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";
.edit {
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
  &__footer {
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
.leave-page-modal .modal {
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
