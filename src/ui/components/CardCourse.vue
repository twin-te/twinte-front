<script lang="ts">
import { defineComponent, PropType } from "vue";
import { DisplayCourse } from "~/presentation/viewmodels/course";
import { getSyllabusUrl, openUrl } from "../url";
import Button from "./Button.vue";
import Checkbox from "./Checkbox.vue";
import CourseDetailMini from "./CourseDetailMini.vue";

export default defineComponent({
  components: { Button, CourseDetailMini, Checkbox },
  props: {
    isChecked: {
      type: Boolean,
      required: true,
    },
    isDetailed: {
      type: Boolean,
      default: true,
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
    course: {
      type: Object as PropType<DisplayCourse>,
      required: true,
    },
    width: {
      type: String,
      default: "100%",
    },
    withHr: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["click-card", "click-checkbox"],
  setup(props, { emit }) {
    const emitCardEvent = (e: MouseEvent) => {
      emit("click-card", e);
    };
    const emitCheckboxEvent = (e: MouseEvent) => {
      emit("click-checkbox", e);
    };
    const openSyllabus = () => {
      openUrl(getSyllabusUrl(props.course.year, props.course.code));
    };

    return { emitCardEvent, emitCheckboxEvent, openSyllabus };
  },
});
</script>

<template>
  <div :style="{ width }" @click="emitCardEvent">
    <div
      :class="{
        'card-course': true,
        '--detailed': isDetailed,
        '--expanded': isExpanded,
      }"
    >
      <div :class="{ 'card-course__checkbox': true, '--expanded': isExpanded }">
        <Checkbox
          :isChecked="isChecked"
          @clickCheckbox.stop="emitCheckboxEvent"
        ></Checkbox>
      </div>
      <div class="card-course__courseId">{{ course.code }}</div>
      <div class="card-course__courseName">{{ course.name }}</div>
      <div
        :class="{
          'card-course__detail': true,
          '--expanded': isExpanded || isDetailed,
        }"
      >
        <CourseDetailMini
          iconName="schedule"
          :text="course.schedule.full"
          :ellipsis="true"
        ></CourseDetailMini>
        <CourseDetailMini
          iconName="payments"
          :text="course.credit"
          :ellipsis="true"
        ></CourseDetailMini>
        <CourseDetailMini
          iconName="person"
          :text="course.instructor"
          :ellipsis="true"
        ></CourseDetailMini>
        <CourseDetailMini
          iconName="room"
          :text="course.room"
          :ellipsis="true"
        ></CourseDetailMini>
        <CourseDetailMini
          iconName="category"
          :text="course.method"
          :ellipsis="true"
        ></CourseDetailMini>
      </div>
      <div
        :class="{
          'card-course__overview': true,
          '--detailed': isDetailed,
          '--expanded': isExpanded,
        }"
      >
        {{ course.overview }}
      </div>
      <div
        :class="{ 'card-course__expand-icon': true, '--expanded': isExpanded }"
      >
        <span class="material-icons">expand_more</span>
      </div>
      <div
        :class="{
          'card-course__syllabus-link': true,
          '--expanded': isExpanded,
        }"
      >
        <Button
          size="small"
          layout="flexible"
          :icon="true"
          color="base"
          @click="openSyllabus"
          >シラバス</Button
        >
      </div>
    </div>
    <div v-if="withHr" class="hr" />
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

$grid-template-pc: "checkbox ... courseId   ... ...    ... link" auto
  "checkbox ... ...        ... detail ... link" 0.2rem
  "checkbox ... courseName ... detail ... link" auto
  "checkbox ... ...        ... detail ... link" $spacing-1
  "checkbox ... overview   ... detail ... link" 1fr / auto $spacing-5 1fr
  $spacing-7 20rem $spacing-7 auto;

.card-course {
  display: grid;
  grid-template:
    "checkbox ... courseId   courseId   ... ...    ..." auto
    "checkbox ... ...        ...        ... ...    ..." 0.2rem
    "checkbox ... courseName courseName ... expand ..." auto
    / auto $spacing-5 1fr auto 0 auto $spacing-1 auto $spacing-1;
  text-align: left;
  @include pc {
    grid-template: $grid-template-pc;
  }
  &.--detailed {
    grid-template:
      "checkbox ... courseId   courseId   ... ...    ..." auto
      "checkbox ... ...        ...        ... ...    ..." 0.2rem
      "checkbox ... courseName courseName ... expand ..." auto
      "checkbox ... ...        ...        ... expand ..." $spacing-1
      "checkbox ... detail     detail     ... expand ..." 1fr
      "checkbox ... overview   overview   ... expand ..." auto
      / auto $spacing-5 1fr auto 0 auto $spacing-1 auto $spacing-1;
    @include pc {
      grid-template: $grid-template-pc;
    }
  }
  &.--expanded {
    grid-template:
      "checkbox ... courseId   courseId    ...   " auto
      "checkbox ... ...        ...         ...   " 0.2rem
      "checkbox ... courseName courseName  expand" auto
      "checkbox ... ...        ...         expand" $spacing-1
      "checkbox ... detail     detail      expand" 1fr
      "checkbox ... overview   overview    expand" auto
      "checkbox ... ...        ...         ...   " $spacing-2
      "checkbox ... ...        link        ...   " auto
      / auto $spacing-5 1fr auto 0 auto;
    @include pc {
      grid-template: $grid-template-pc;
    }
  }
  &__checkbox {
    @include center-flex;
    grid-area: checkbox;
    padding-left: $spacing-2;
  }
  &__courseId {
    @include text-sub-discription;
    grid-area: courseId;
    line-height: $single-line;
  }
  &__courseName {
    @include text-main;
    grid-area: courseName;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__detail {
    grid-area: detail;
    display: none;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    gap: 0 $spacing-2;
    &.--expanded {
      display: flex;
    }
    @include pc {
      .course-detail-mini {
        flex: 0 0 calc(50% - #{$spacing-2 / 2});
        justify-content: flex-start;
      }
    }
  }
  &__overview {
    @include text-description-sub;
    grid-area: overview;
    display: none;
    line-height: $multi-line;
    transition: $transition-all;
    max-height: 2.2rem;
    &.--detailed {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      @include pc {
        max-height: none;
        overflow: visible;
        white-space: normal;
      }
    }
    &.--expanded {
      display: block;
      white-space: normal;
      max-height: 100%;
    }
  }
  &__expand-icon {
    @include button-cursor;
    grid-area: expand;
    display: flex;
    align-items: flex-end;
    padding-bottom: $spacing-1;
    width: 1.6rem;
    @include pc {
      display: none;
    }
    &.--expanded {
      display: none;
    }
  }
  &__syllabus-link {
    @include center-flex;
    grid-area: link;
    display: none;
    @include pc {
      display: flex;
    }
    &.--expanded {
      display: flex;
    }
  }
}

.hr {
  width: 100%;
  height: 0.4rem;
  margin-top: $spacing-3;
  background-color: getColor(--color-base);
  box-shadow: $shadow-input-concave;
  border-radius: $radius-1;
}
</style>
