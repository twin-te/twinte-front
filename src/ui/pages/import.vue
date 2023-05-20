<template>
  <div class="import">
    <PageHeader>
      <template #left-button-icon>
        <div class="header__left-button-icon">
          <IconButton
            size="large"
            color="normal"
            iconName="menu"
            @click="toggleSidebar"
          ></IconButton>
        </div>
      </template>
      <template #title>授業のインポート</template>
    </PageHeader>
    <div class="main">
      <section key="result" class="main__result">
        <Card v-show="courseResults.length > 0">
          <div
            v-for="(courseResult, i) in courseResults"
            :key="courseResult.course.id"
            class="result__row"
          >
            <CardCourse
              :course="courseResult.course"
              :isChecked="courseResult.selected"
              :isDetailed="false"
              :isExpanded="courseResult.expanded"
              :withHr="i < courseResults.length - 1"
              @click-checkbox="
                courseResults[i].selected = !courseResult.selected
              "
              @click-card="courseResults[i].expanded = !courseResult.expanded"
            />
          </div>
        </Card>
      </section>
    </div>
    <section class="import__bottom">
      <Button
        size="large"
        layout="fill"
        color="primary"
        :pauseActiveStyle="false"
        :state="buttonState"
        @click="addCourses()"
        >選択した授業を追加</Button
      >
    </section>
    <Modal
      v-if="duplicateCourses && duplicateCourses.length > 0"
      class="duplication-modal"
      @click="duplicateCourses = []"
    >
      <template #title>開講時限が重複しています</template>
      <template #contents>
        <p class="modal__text">
          以下の授業のコマには既に授業が登録されています。そのまま追加してよろしいですか？（当該のコマには複数の授業が登録されます。）
        </p>
        <div class="modal__courses">
          <div
            v-for="course in duplicateCourses"
            :key="course.id"
            class="duplicated-course"
          >
            <p class="duplicated-course__name">{{ course.name }}</p>
            <CourseDetailMini
              class="duplicated-course__detail"
              iconName="schedule"
              :text="course.schedule.full"
            />
          </div>
        </div>
      </template>
      <template #button>
        <Button
          size="medium"
          layout="fill"
          color="base"
          @click="duplicateCourses = []"
          >キャンセル</Button
        >
        <Button
          size="medium"
          layout="fill"
          color="primary"
          @click="addCourses(false)"
          >そのまま追加</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePorts } from "~/adapter";
import Usecase from "~/application/usecases";
import { isResultError, ValueError } from "~/domain/error";
import { courseToDisplay } from "~/presentation/presenters/course";
import Button from "~/ui/components/Button.vue";
import Card from "~/ui/components/Card.vue";
import CardCourse from "~/ui/components/CardCourse.vue";
import CourseDetailMini from "~/ui/components/CourseDetailMini.vue";
import IconButton from "~/ui/components/IconButton.vue";
import Modal from "~/ui/components/Modal.vue";
import PageHeader from "~/ui/components/PageHeader.vue";
import { toggleSidebar } from "~/ui/store/sidebar";
import { addCoursesByCodes } from "../store/course";
import { displayToast } from "../store/toast";
import { getApplicableYear, setApplicableYear } from "../store/year";
import type { DisplayCourse } from "~/presentation/viewmodels/course";

const ports = usePorts();
const route = useRoute();
const router = useRouter();

await setApplicableYear();
const year = getApplicableYear();

if (typeof route.query.codes !== "string") {
  displayToast("授業のインポートに失敗しました。");
  router.push("/");
  throw new ValueError("Invalid query.");
}

const codes: string[] = route.query.codes.split(",");

/** result */
const result = await Usecase.getCourses(ports)(
  codes.map((code) => ({ year: year.value, code }))
);
if (isResultError(result)) throw result;

const registered = await Usecase.getRegisteredCoursesByYear(ports)(year.value);
if (isResultError(registered)) throw registered;

const registeredSet = new Set(
  registered.map((course) => `${course.year}_${course.code}`)
);

const courseResults = reactive(
  result.map((course) => ({
    course: courseToDisplay(course),
    schedules: course.schedules,
    selected: !registeredSet.has(`${course.year}_${course.code}`),
    expanded: false,
  }))
);

const selectedCourseResults = computed(() =>
  courseResults.filter(({ selected }) => selected)
);

const missingCodes = codes.filter(
  (code) => result.find((course) => course.code === code) == undefined
);
if (missingCodes.length > 0) {
  displayToast(
    `以下の科目番号はシラバスに存在しませんでした。存在する講義のみを表示しています。\n${missingCodes.join(
      "  "
    )}`,
    { displayPeriod: 0 }
  );
}

const addCourses = async (warning = true) => {
  if (buttonState.value === "disabled") return;

  duplicateCourses.value = (
    await Promise.all(
      selectedCourseResults.value.map(async ({ course, schedules }) => ({
        course,
        result: await Usecase.checkScheduleDuplicate(ports)(
          year.value,
          schedules,
          registered
        ),
      }))
    )
  ).reduce<DisplayCourse[]>((ret, { course, result }) => {
    if (isResultError(result)) throw result;
    if (!result) ret.push(course);
    return ret;
  }, []);

  if (warning && duplicateCourses.value.length > 0) return;
  await addCoursesByCodes(
    selectedCourseResults.value.map(({ course }) => ({
      year: year.value,
      code: course.code,
    }))
  );
  router.push("/");
};

/** duplicate modal */
const duplicateCourses = ref<DisplayCourse[]>();

const buttonState = computed(() => {
  if (selectedCourseResults.value.length > 0) return "default";
  return "disabled";
});
</script>

<style scoped lang="scss">
@import "~/ui/styles";
@include header-left-button-delete;

.import {
  display: flex;
  flex-direction: column;
  height: $vh;
  &__bottom {
    margin: $spacing-3 $spacing-0 $spacing-6;
    @include landscape {
      margin-bottom: $spacing-7;
    }
    .button {
      margin: 0 auto;
    }
  }
}

.main {
  margin-top: $spacing-3;
  flex-grow: 1;
  &__result {
    @include scroll-mask;
    height: calc(#{$vh} - 26.6rem);
    overflow-y: auto;
    padding: $spacing-2;
    .card {
      padding: $spacing-4 $spacing-2;
      background: getColor(--color-base);
    }
  }
}

.result {
  &__description {
    line-height: $multi-line;
    color: getColor(--color-text-sub);
    p {
      margin-bottom: $spacing-1;
    }
  }
  &__row {
    margin-bottom: $spacing-3;
  }
  &__not-found {
    color: getColor(--color-disabled);
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
