<template>
  <div class="edit">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          size="large"
          color="normal"
          icon-name="arrow_back"
          @click="onClickIconButton"
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
              :schedules="editableSchedules"
              :onClickAddButton="addSchedule"
              :onClickRemoveButton="removeSchedule"
              @update:schedules="updateSchedules"
            ></ScheduleEditer>
          </section>
          <section class="main__credit">
            <LabeledTextField label="単位数" mandatory>
              <TextFieldSingleLine
                v-model.trim="credit"
                placeholder="例) 1.0"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </section>
          <section class="main__instructors">
            <MultiTextFieldEditor
              v-model:elements="instructors"
              placeholder="例) 筑波 太郎"
              label="担当教員"
            ></MultiTextFieldEditor>
          </section>
          <section class="main__room">
            <RoomEditor
              v-model:rooms="rooms"
              :schedules="targetSchedules"
              placeholder="例) 研究室"
              label="授業場所"
            ></RoomEditor>
          </section>
          <section class="main__method method">
            <Label value="授業形式"></Label>
            <div class="method__checkboxes">
              <CheckContent
                v-for="content in checkboxContents"
                :key="content.key"
                v-model:checked="content.checked"
                >{{ content.label }}</CheckContent
              >
            </div>
          </section>
        </div>
      </div>
      <section class="main__footer">
        <Button
          size="large"
          layout="fill"
          color="primary"
          :state="buttonState"
          @click="save"
          >変更を保存</Button
        >
      </section>
    </div>
    <Modal
      v-if="isVisibleModal"
      class="leave-page-modal"
      size="small"
      @click="closeModal"
    >
      <template #title>ページから移動しますか？</template>
      <template #contents>
        <p class="modal__text">
          「授業情報の編集」ページから移動してよろしいですか？<br />
          未保存の変更内容は失われます。
        </p>
      </template>
      <template #button>
        <Button size="medium" layout="fill" color="base" @click="closeModal"
          >キャンセル</Button
        >
        <Button
          size="medium"
          layout="fill"
          color="primary"
          @click="$router.back()"
          >移動する</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NotFoundError } from "~/domain/error";
import { methods } from "~/domain/method";
import { sortSchedules, removeDuplicateSchedules } from "~/domain/schedule";
import {
  creditToDisplay,
  displayToCredit,
  validateCredit,
} from "~/presentation/presenters/credit";
import { validateInstructors } from "~/presentation/presenters/instructor";
import { methodMap } from "~/presentation/presenters/method";
import { validateRooms } from "~/presentation/presenters/room";
import {
  schedulesToDisplay,
  displayToSchedules,
  isDisplaySchedule,
} from "~/presentation/presenters/schedule";
import Button from "~/ui/components/Button.vue";
import CheckContent from "~/ui/components/CheckContent.vue";
import IconButton from "~/ui/components/IconButton.vue";
import Label from "~/ui/components/Label.vue";
import LabeledTextField from "~/ui/components/LabeledTextField.vue";
import Modal from "~/ui/components/Modal.vue";
import MultiTextFieldEditor from "~/ui/components/MultiTextFieldEditor.vue";
import PageHeader from "~/ui/components/PageHeader.vue";
import RoomEditor from "~/ui/components/RoomEditor.vue";
import ScheduleEditer, {
  useScheduleEditor,
} from "~/ui/components/ScheduleEditer.vue";
import TextFieldSingleLine from "~/ui/components/TextFieldSingleLine.vue";
import { useSwitch } from "~/ui/hooks/useSwitch";
import { getCourseById, setCourseById, updateCourse } from "~/ui/store/course";
import type { RegisteredCourse } from "~/domain/course";

const route = useRoute();
const router = useRouter();

/** course */
const { id } = route.params as { id: string };
try {
  await setCourseById(id);
} catch (error) {
  if (error instanceof NotFoundError) router.push("/404");
  else throw error;
}
const course = getCourseById(id) as ComputedRef<RegisteredCourse>;

/** name */
const name = ref(course.value.name);

/** schedule editor */
const {
  schedules: editableSchedules,
  addSchedule,
  removeSchedule,
  updateSchedules,
} = useScheduleEditor(schedulesToDisplay(course.value.schedules));

/** credit */
const credit = ref(creditToDisplay(course.value.credit));

/** instructors */
const instructors = ref([...course.value.instructors]);

/** room */
const targetSchedules = computed(() =>
  sortSchedules(
    removeDuplicateSchedules(
      displayToSchedules(editableSchedules.filter(isDisplaySchedule))
    )
  )
);

const rooms = ref([...course.value.rooms]);

/** checkboxes */
const checkboxContents = reactive(
  methods.map((method) => ({
    key: method,
    label: methodMap[method],
    checked: course.value.methods.includes(method),
  }))
);

/** save button */
const buttonState = computed(() => {
  return name.value !== "" &&
    validateInstructors(instructors.value) &&
    validateCredit(credit.value) &&
    validateRooms(rooms.value) &&
    editableSchedules.every(isDisplaySchedule)
    ? "default"
    : "disabled";
});

const save = async () => {
  if (buttonState.value === "disabled") return;
  if (!editableSchedules.every(isDisplaySchedule)) return;

  const schedules = sortSchedules(
    removeDuplicateSchedules(displayToSchedules(editableSchedules))
  );
  const methods = checkboxContents
    .filter(({ checked }) => checked)
    .map(({ key }) => key);

  await updateCourse(id, {
    name: name.value,
    credit: displayToCredit(credit.value),
    instructors: instructors.value,
    schedules,
    methods,
    rooms: rooms.value,
  });
  router.push(`/course/${id}`);
};

/** modal */
const [isVisibleModal, openModal, closeModal] = useSwitch(false);

/** header */
const onClickIconButton = () => {
  // TODO:変更していない時はモーダルを表示しない
  // if (course.value.name === name.value && course.value.credit === Number(credit.value) && ) {
  //   return;
  // }
  openModal();
};
</script>

<style scoped lang="scss">
@import "~/ui/styles";

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
