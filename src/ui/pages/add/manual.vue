<template>
  <div class="manual">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          size="large"
          color="normal"
          icon-name="arrow_back"
          @click="$router.back()"
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
      <section class="main__button">
        <Button
          size="large"
          layout="fill"
          color="primary"
          data-gtm-marker="manual-adding-course-button"
          :pauseActiveStyle="false"
          :state="buttonState"
          @click="addCourse()"
          >作成した授業を追加</Button
        >
      </section>
    </div>
    <Modal
      v-if="isDuplicateModalVisible"
      class="duplication-modal"
      @click="closeDuplicateModal"
    >
      <template #title>開講時限が重複しています</template>
      <template #contents>
        <p class="modal__text">
          以下の授業のコマには既に授業が登録されています。そのまま追加してよろしいですか？（当該のコマには複数の授業が登録されます。）
        </p>
        <div class="modal__courses">
          <div class="duplicated-course">
            <p class="duplicated-course__name">{{ name }}</p>
            <CourseDetailMini
              class="duplicated-course__detail"
              iconName="schedule"
              :text="duplicateScheduleText"
            ></CourseDetailMini>
          </div>
        </div>
      </template>
      <template #button>
        <Button
          size="medium"
          layout="fill"
          color="base"
          @click="closeDuplicateModal"
          >キャンセル</Button
        >
        <Button
          size="medium"
          layout="fill"
          color="primary"
          @click="addCourse(false)"
          >そのまま追加</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { usePorts } from "~/adapter";
import Usecase from "~/application/usecases";
import { methods } from "~/domain/method";
import { removeDuplicateSchedules, sortSchedules } from "~/domain/schedule";
import {
  displayToCredit,
  validateCredit,
} from "~/presentation/presenters/credit";
import { validateInstructors } from "~/presentation/presenters/instructor";
import { methodMap } from "~/presentation/presenters/method";
import { validateRooms } from "~/presentation/presenters/room";
import {
  displayToSchedules,
  isDisplaySchedule,
  schedulesToFullString,
} from "~/presentation/presenters/schedule";
import Button from "~/ui/components/Button.vue";
import CheckContent from "~/ui/components/CheckContent.vue";
import CourseDetailMini from "~/ui/components/CourseDetailMini.vue";
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
import { addCustomizedCourse } from "~/ui/store/course";
import { getApplicableYear, setApplicableYear } from "~/ui/store/year";
import type { RegisteredCourse } from "~/domain/course";
import type { Room } from "~/domain/room";

const ports = usePorts();
const router = useRouter();

/** year */
await setApplicableYear();
const year = getApplicableYear();

/** name */
const name = ref("");

/** credit */
const credit = ref("");

/** instructors */
const instructors = ref([]);

/** room */
const targetSchedules = computed(() =>
  sortSchedules(
    removeDuplicateSchedules(
      displayToSchedules(editableSchedules.filter(isDisplaySchedule))
    )
  )
);

const rooms = ref<Room[]>([]);

/** checkboxes */
const checkboxContents = reactive(
  methods.map((method) => ({
    key: method,
    label: methodMap[method],
    checked: false,
  }))
);

/** schedule editor */
const {
  schedules: editableSchedules,
  addSchedule,
  removeSchedule,
  updateSchedules,
} = useScheduleEditor();

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

const addCourse = async (warning = true) => {
  if (buttonState.value === "disabled") return;
  if (!editableSchedules.every(isDisplaySchedule)) return;

  const schedules = sortSchedules(
    removeDuplicateSchedules(displayToSchedules(editableSchedules))
  );
  const methods = checkboxContents
    .filter(({ checked }) => checked)
    .map(({ key }) => key);
  const course: Omit<RegisteredCourse, "id" | "code"> = {
    year: year.value,
    name: name.value,
    instructors: instructors.value,
    credit: displayToCredit(credit.value),
    methods,
    schedules,
    rooms: rooms.value,
    memo: "",
    attendance: 0,
    absence: 0,
    late: 0,
    tagIds: [],
  };

  if (
    warning &&
    !(await Usecase.checkScheduleDuplicate(ports)(year.value, schedules))
  ) {
    duplicateScheduleText.value = schedulesToFullString(schedules);
    openDuplicateModal();
  } else {
    await addCustomizedCourse(course);
    router.push("/");
  }
};

/** duplicate modal */
const [
  isDuplicateModalVisible,
  openDuplicateModal,
  closeDuplicateModal,
] = useSwitch(false);

const duplicateScheduleText = ref("");
</script>

<style scoped lang="scss">
@import "~/ui/styles";
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
