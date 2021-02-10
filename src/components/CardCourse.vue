<script lang="ts">
import { defineComponent, PropType } from "vue";
import Card from "./Card.vue";
import Button from "./Button.vue";
import Checkbox from "./Checkbox.vue";
import CourseDetailMini from "./CourseDetailMini.vue";

// 一時的にコースの型をここで定義する。
export type Course = {
  id: string;
  name: string;
  period: string;
  room: string;
  url: string;
};

export default defineComponent({
  components: { Card, Button, CourseDetailMini, Checkbox },
  props: {
    onClickCheckbox: {
      type: Function,
      required: true,
    },
    onClickSyllabusLink: {
      type: Function,
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: true,
    },
    course: {
      type: Object as PropType<Course>,
      required: true,
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  emits: ["click-checkbox", "click-syllabus-link"],
  setup(_, { emit }) {
    const emitCheckboxEvent = (e: MouseEvent) => {
      emit("click-checkbox", e);
    };

    const emitSyllabusLinkEvent = (e: MouseEvent) => {
      emit("click-syllabus-link", e);
    };

    return { emitCheckboxEvent, emitSyllabusLinkEvent };
  },
});
</script>

<template>
  <Card :width="width">
    <div class="card-course">
      <div class="card-course__checkbox">
        <Checkbox
          @clickCheckbox="emitCheckboxEvent"
          :isChecked="isChecked"
        ></Checkbox>
      </div>
      <div class="card-course__courseId">{{ course.id }}</div>
      <div class="card-course__courseName">{{ course.name }}</div>
      <div class="card-course__detail">
        <CourseDetailMini
          iconName="schedule"
          :text="course.period"
        ></CourseDetailMini>
        <CourseDetailMini
          iconName="room"
          :text="course.room"
        ></CourseDetailMini>
      </div>
      <div class="card-course__syllabus-link">
        <Button
          @click="emitSyllabusLinkEvent"
          size="small"
          layout="flexible"
          :icon="true"
          color="base"
          >シラバス</Button
        >
      </div>
    </div>
  </Card>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.card-course {
  display: grid;
  grid-template:
    "checkbox ... courseId   courseId  " auto
    "checkbox ... ...        ...       " $spacing-1
    "checkbox ... courseName courseName" auto
    "checkbox ... ...        ...       " $spacing-1
    "checkbox ... detail     ...       " 1fr
    "checkbox ... detail     link      " auto
    / auto $spacing-5 1fr auto;
  text-align: left;
  &__checkbox {
    @include center-flex;
    grid-area: checkbox;
  }
  &__courseId {
    @include text-sub-discription;
    grid-area: courseId;
  }
  &__courseName {
    @include text-main;
    grid-area: courseName;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__detail {
    @include center-flex(column);
    grid-area: detail;
    align-items: start;
  }
  &__syllabus-link {
    @include center-flex;
    grid-area: link;
  }
}
</style>