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
      <section class="main__footer">
        <Button
          @click="save"
          size="large"
          layout="fill"
          color="primary"
          :state="btnState"
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
import { defineComponent, ref, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "~/components/Button.vue";
import CheckContent from "~/components/CheckContent.vue";
import IconButton from "~/components/IconButton.vue";
import Label from "~/components/Label.vue";
import LabeledTextField from "~/components/LabeledTextField.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import ScheduleEditer from "~/components/ScheduleEditer.vue";
import TextFieldSingleLine from "~/components/TextFieldSingleLine.vue";
import { isValidCredit } from "~/entities/credit";
import { methodJaList } from "~/entities/method";
import { createBlankSchedule, isValidSchedules } from "~/entities/schedule";
import { displayToast } from "~/entities/toast";
import { usePorts } from "~/usecases";
import { extractMessageOrDefault } from "~/usecases/error";
import { getCourseById } from "~/usecases/getCourseById";
import { updateCourse } from "~/usecases/updateCourse";
import {
  apiToDisplayCourse,
  displayCourseToApi,
} from "~/usecases/useDisplayCourse";

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

    const registeredCourse = await getCourseById(ports)(id);
    const displayCourse = reactive(apiToDisplayCourse(registeredCourse, ""));

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

    /** 授業を更新する */
    const save = async () => {
      if (btnState.value === "disabled") return;
      displayCourse.methods = methodContents
        .filter((c) => c.checked)
        .map((c) => c.label);
      const course = displayCourseToApi(displayCourse, registeredCourse, [
        "name",
        "instructor",
        "credit",
        "methods",
        "schedules",
      ]);

      try {
        await updateCourse(ports)(id, course);
      } catch (error) {
        console.error(error);
        displayToast(ports)(extractMessageOrDefault(error));
        return;
      }
      router.push(`/course/${id}`);
    };

    /** modal */
    const modal = ref(false);

    return {
      displayCourse,
      addSchedule,
      removeSchedule,
      methodContents,
      btnState,
      save,
      modal,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/styles";
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
