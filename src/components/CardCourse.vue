<script lang="ts">
import { CourseCard } from "~/entities/courseCard";
import { defineComponent, PropType } from "vue";
import Button from "./Button.vue";
import Checkbox from "./Checkbox.vue";
import CourseDetailMini from "./CourseDetailMini.vue";
import { openUrl } from "~/usecases/openUrl";

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
      type: Object as PropType<CourseCard>,
      required: true,
    },
    width: {
      type: String,
      default: "100%",
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
      openUrl(props.course.url);
    };

    return { emitCardEvent, emitCheckboxEvent, openSyllabus };
  },
});
</script>

<template>
  <div @click="emitCardEvent" :style="{ width }">
    <div
      :class="{
        'card-course': true,
        '--detailed': isDetailed,
        '--expanded': isExpanded,
      }"
    >
      <div :class="{ 'card-course__checkbox': true, '--expanded': isExpanded }">
        <Checkbox
          @clickCheckbox.stop="emitCheckboxEvent"
          :isChecked="isChecked"
        ></Checkbox>
      </div>
      <div class="card-course__courseId">{{ course.id }}</div>
      <div class="card-course__courseName">{{ course.name }}</div>
      <div
        :class="{
          'card-course__detail': true,
          '--expanded': isExpanded || isDetailed,
        }"
      >
        <CourseDetailMini
          iconName="schedule"
          :text="course.period"
        ></CourseDetailMini>
        <CourseDetailMini
          iconName="payments"
          :text="`${course.credit.toFixed(1)}`"
        ></CourseDetailMini>
        <CourseDetailMini
          iconName="person"
          :text="course.instructor"
        ></CourseDetailMini>
        <CourseDetailMini
          iconName="room"
          :text="course.location"
        ></CourseDetailMini>
        <CourseDetailMini
          iconName="category"
          :text="course.methods"
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
          @click="openSyllabus"
          size="small"
          layout="flexible"
          :icon="true"
          color="base"
          >シラバス</Button
        >
      </div>
    </div>
    <div class="hr" />
  </div>
</template>

<style scoped lang="scss">
@import "~/styles";

.card-course {
  display: grid;
  grid-template:
    "checkbox ... courseId   courseId   ... ...    ..." auto
    "checkbox ... ...        ...        ... ...    ..." $spacing-1
    "checkbox ... courseName courseName ... expand ..." auto
    / auto $spacing-5 1fr auto 0 auto $spacing-1 auto $spacing-1;
  &.--detailed {
    grid-template:
      "checkbox ... courseId   courseId   ... ...    ..." auto
      "checkbox ... ...        ...        ... ...    ..." $spacing-1
      "checkbox ... courseName courseName ... expand ..." auto
      "checkbox ... ...        ...        ... expand ..." $spacing-1
      "checkbox ... detail     detail     ... expand ..." 1fr
      "checkbox ... overview   overview   ... expand ..." auto
      "checkbox ... ...        ...        ... ...    ..." $spacing-2
      "checkbox ... ...        link       ... ...    ..." auto
      / auto $spacing-5 1fr auto 0 auto $spacing-1 auto $spacing-1;
  }
  &.--expanded {
    grid-template:
      "checkbox ... courseId   courseId    ...   " auto
      "checkbox ... ...        ...         ...   " $spacing-1
      "checkbox ... courseName courseName  expand" auto
      "checkbox ... ...        ...         expand" $spacing-1
      "checkbox ... detail     detail      expand" 1fr
      "checkbox ... overview   overview    expand" auto
      "checkbox ... ...        ...         ...   " $spacing-2
      "checkbox ... ...        link        ...   " auto
      / auto $spacing-5 1fr auto 0 auto;
  }
  text-align: left;
  @include pc {
    grid-template:
      "checkbox ... courseId   ... ...    ... link" auto
      "checkbox ... ...        ... detail ... link" $spacing-1
      "checkbox ... courseName ... detail ... link" 1fr
      "checkbox ... ...        ... detail ... link" $spacing-1
      "checkbox ... overview   ... detail ... link" auto
      / auto $spacing-5 1fr $spacing-7 20rem $spacing-7 auto;
  }
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
}
</style>
