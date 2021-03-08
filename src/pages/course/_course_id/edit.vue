<template>
  <PageHeader>
    <template #left-btn>
      <IconButton
        @click="modal = true"
        size="large"
        color="normal"
        icon-name="arrow_back"
      ></IconButton>
    </template>
    <template #title>授業情報の編集</template>
  </PageHeader>
  <div class="edit">
    <div class="edit__mask">
      <div class="edit__contents">
        <div class="edit__course-name">
          <LabeledTextField label="授業名" mandatory>
            <TextFieldSingleLine
              v-model="name"
              placeholder="例) ゼミ"
            ></TextFieldSingleLine>
          </LabeledTextField>
        </div>
        <div class="edit__period">
          <Label value="開講時限" mandatory></Label>
          <ScheduleEditer
            v-model:schedules="schedules"
            :onClickAddButton="addSchedule"
            :onClickRemoveButton="removeSchedule"
          ></ScheduleEditer>
        </div>
        <div class="edit__instructor">
          <LabeledTextField label="担当教員">
            <TextFieldSingleLine
              v-model="instructor"
              placeholder="例) 山田太郎"
            ></TextFieldSingleLine>
          </LabeledTextField>
        </div>
        <div class="edit__room">
          <LabeledTextField label="授業場所">
            <TextFieldSingleLine
              v-model="room"
              placeholder="例) 研究室"
            ></TextFieldSingleLine>
          </LabeledTextField>
        </div>
        <div class="edit__method">
          <LabeledTextField label="授業形式">
            <TextFieldSingleLine
              v-model="method"
              placeholder="例) 対面"
            ></TextFieldSingleLine>
          </LabeledTextField>
        </div>
      </div>
    </div>
    <section class="edit__footer">
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
        @click="$router.push(`/course/${$route.params.course_id}`)"
        size="medium"
        layout="fill"
        color="primary"
        >移動する</Button
      >
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "~/components/Button.vue";
import IconButton from "~/components/IconButton.vue";
import Label from "~/components/Label.vue";
import LabeledTextField from "~/components/LabeledTextField.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import ScheduleEditer, { Schedules } from "~/components/ScheduleEditer.vue";
import TextFieldSingleLine from "~/components/TextFieldSingleLine.vue";

export default defineComponent({
  components: {
    Button,
    IconButton,
    Modal,
    Label,
    LabeledTextField,
    PageHeader,
    ScheduleEditer,
    TextFieldSingleLine,
  },
  setup() {
    const route = useRoute();
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
    const save = () => {
      if (btnState.value == "disabled") return;
      router.push(`/course/${route.params.course_id}`);
    };

    /** modal */
    const modal = ref(false);

    return {
      schedules,
      addSchedule,
      removeSchedule,
      name,
      instructor,
      room,
      method,
      save,
      btnState,
      modal,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";

.header {
  max-width: 900px;
}
.edit {
  max-width: 900px;
  margin-top: $spacing-5;
  padding: $spacing-0 $spacing-4;
  @include landscape {
    padding: $spacing-0 $spacing-9;
  }
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
.leave-page-modal .modal {
  &__text {
    font-size: $font-medium;
    line-height: $multi-line;
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
</style>
