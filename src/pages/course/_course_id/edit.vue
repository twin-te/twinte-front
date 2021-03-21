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
          @click="$router.push(`/course/${courseId}`)"
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
import { CourseMethod } from "~/api/@types";
import Button from "~/components/Button.vue";
import CheckContent from "~/components/CheckContent.vue";
import IconButton from "~/components/IconButton.vue";
import Label from "~/components/Label.vue";
import LabeledTextField from "~/components/LabeledTextField.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import ScheduleEditer, { Schedules } from "~/components/ScheduleEditer.vue";
import TextFieldSingleLine from "~/components/TextFieldSingleLine.vue";
import { MethodJa } from "~/entities/method";

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
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { course_id: courseId } = route.params;

    /** schedule-editor */
    const schedules = ref<Schedules>([
      { module: "指定なし", date: "指定なし", period: "指定なし" },
    ]);
    const scheduleMax = 4;
    const scheduleMin = 1;
    const addSchedule = () => {
      if (schedules.value.length >= scheduleMax) return;
      schedules.value.push({
        module: "指定なし",
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
    const methodData: {
      checked: Ref<boolean>;
      name: CourseMethod;
      value: MethodJa;
    }[] = [
      { checked: ref(false), name: "FaceToFace", value: "対面" },
      { checked: ref(false), name: "Synchronous", value: "同時双方向" },
      { checked: ref(false), name: "Asynchronous", value: "オンデマンド" },
      { checked: ref(false), name: "Others", value: "その他" },
    ];

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
      router.push(`/course/${courseId}`);
    };

    /** modal */
    const modal = ref(false);

    return {
      courseId,
      schedules,
      addSchedule,
      removeSchedule,
      name,
      instructor,
      room,
      methodData,
      save,
      btnState,
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
