<template>
  <div class="manual">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          @click="$router.push('/add')"
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
          <div class="main__course-name">
            <LabeledTextField label="授業名" mandatory>
              <TextFieldSingleLine
                v-model="name"
                placeholder="例) ゼミ"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </div>
          <div class="main__period">
            <Label value="開講時限" mandatory></Label>
            <ScheduleEditer
              v-model:schedules="schedules"
              :onClickAddButton="addSchedule"
              :onClickRemoveButton="removeSchedule"
            ></ScheduleEditer>
          </div>
          <div class="main__instructor">
            <LabeledTextField label="担当教員">
              <TextFieldSingleLine
                v-model="instructor"
                placeholder="例) 山田太郎"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </div>
          <div class="main__room">
            <LabeledTextField label="授業場所">
              <TextFieldSingleLine
                v-model="room"
                placeholder="例) 研究室"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </div>
          <div class="main__method">
            <LabeledTextField label="授業形式">
              <TextFieldSingleLine
                v-model="method"
                placeholder="例) 対面"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </div>
        </div>
      </div>
      <section class="main__button">
        <Button
          @click="addCourse"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import Button from "~/components/Button.vue";
import CourseDetailMini from "~/components/CourseDetailMini.vue";
import IconButton from "~/components/IconButton.vue";
import Label from "~/components/Label.vue";
import LabeledTextField from "~/components/LabeledTextField.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import ScheduleEditer, { Schedules } from "~/components/ScheduleEditer.vue";
import TextFieldSingleLine from "~/components/TextFieldSingleLine.vue";
import { useSwitch } from "~/hooks/useSwitch";

export default defineComponent({
  components: {
    Button,
    CourseDetailMini,
    IconButton,
    Modal,
    Label,
    LabeledTextField,
    PageHeader,
    ScheduleEditer,
    TextFieldSingleLine,
  },
  setup() {
    const router = useRouter();

    /** schedule-editor */
    const schedules = ref<Schedules>([
      { semester: "指定なし", date: "指定なし", period: "指定なし" },
    ]);
    const scheduleMax = 4;
    const scheduleMin = 1;
    const addSchedule = () => {
      if (schedules.value.length >= scheduleMax) return;
      schedules.value.push({
        semester: "指定なし",
        date: "指定なし",
        period: "指定なし",
      });
    };
    const removeSchedule = (index: number) => {
      if (schedules.value.length <= scheduleMin) return;
      schedules.value.splice(index, 1);
    };

    const name = ref("");
    const instructor = ref("");
    const room = ref("");
    const method = ref("");

    /** button */
    const btnState = computed(() => {
      if (
        !name.value ||
        schedules.value.every((obj) =>
          Object.keys(obj).every((key) => obj[key] == "指定なし")
        )
      )
        return "disabled";
      else return "default";
    });

    const [
      duplicationModal,
      openDuplicationModal,
      closeDuplicationModal,
    ] = useSwitch();
    const duplicated = ref(true);
    const addCourse = (force: boolean = false) => {
      if (btnState.value == "disabled") return;
      if (!duplicated.value || force) {
        router.push("/");
      } else {
        openDuplicationModal();
      }
    };
    const duplicatedCourses = [
      { name: "色彩計画演習", period: "春A 水2" },
      { name: "色彩学", period: "春B 水2" },
    ];

    return {
      schedules,
      addSchedule,
      removeSchedule,
      name,
      instructor,
      room,
      method,
      addCourse,
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
.manual {
  @include max-width;
}

.main {
  margin-top: $spacing-5;
  &__mask {
    height: calc(100vh - 16.2rem);
    @include scroll-mask;
    overflow-y: auto;
  }
  &__contents {
    display: grid;
    gap: 3.2rem;
    padding: $spacing-3 $spacing-0 5.6rem;
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
