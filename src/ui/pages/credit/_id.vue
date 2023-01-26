<template>
  <div class="courses">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          size="large"
          color="normal"
          icon-name="arrow_back"
          @click="$router.push('/credit')"
        ></IconButton>
      </template>
      <template #title>単位数</template>
    </PageHeader>
    <div class="main">
      <div class="main__info info">
        <div class="info__year">{{ info.year }}</div>
        <div class="info__tag">{{ info.tag }}</div>
        <div class="info__credit">{{ info.credit }}</div>
      </div>
      <div class="main__mask">
        <div class="main__courses">
          <CreditCourseListContent
            v-for="course in displayCourses"
            :key="course.id"
            :state="courseIdToState[course.id]"
            :code="course.code"
            :name="course.name"
            :credit="course.credit"
            :tags="course.tags"
            @click="toggleState(course.id)"
            @create-tag="(tagName) => onCreateTag(course, tagName)"
            @click-tag="(tag) => onClickTag(course, tag)"
          ></CreditCourseListContent>
          <div v-if="courses.length === 0" class="main__no-course">
            {{ noCourseMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { registeredCourseToDisplay } from "~/presentation/presenters/course";
import { creditToDisplay } from "~/presentation/presenters/credit";
import CreditCourseListContent from "~/ui/components/CreditCourseListContent.vue";
import IconButton from "~/ui/components/IconButton.vue";
import PageHeader from "~/ui/components/PageHeader.vue";
import { createNewTagId } from "~/ui/shared";
import {
  getAllCourses,
  getCoursesByYear,
  setAllCourses,
  updateCourse,
} from "~/ui/store/course";
import { getCreditYear } from "~/ui/store/creditYear";
import { createTag, getAllTags, getTagById } from "~/ui/store/tag";
import { initializeObject } from "~/utils";
import type { DisplayRegisteredCourse } from "~/presentation/viewmodels/course";
import type { DisplayCourseTag } from "~/presentation/viewmodels/tag";
import type { CreditCourseListContentState } from "~/ui/components/CreditCourseListContent.vue";

const route = useRoute();

const { id } = route.params as { id: string };
const year = getCreditYear();

/** tag */
const tags = getAllTags();
const selectedTag = getTagById(id);

/** course */
await setAllCourses();
const courses = computed(() =>
  (year.value === 0
    ? getAllCourses().value
    : getCoursesByYear(year.value).value
  ).filter(
    ({ tagIds }) =>
      selectedTag.value == undefined || tagIds.includes(selectedTag.value.id)
  )
);

/** info */
const totalCredit = computed(() =>
  creditToDisplay(
    courses.value.reduce((credit, course) => credit + course.credit, 0)
  )
);

const info = computed(() => ({
  year: year.value === 0 ? "すべての年度" : `${year.value}年度`,
  tag: selectedTag.value
    ? `タグ「${selectedTag.value.name}」`
    : "すべての授業 ",
  credit: `${totalCredit.value}単位`,
}));

/** display course */
const displayCourses = computed(() =>
  reactive(
    courses.value
      .map((course) => registeredCourseToDisplay(course, tags.value))
      .sort((courseA, courseB) => (courseA.code < courseB.code ? -1 : 1))
  )
);

const courseIdToState = reactive<Record<string, CreditCourseListContentState>>(
  initializeObject(
    courses.value.map(({ id }) => id),
    "default"
  )
);

const toggleState = (id: string) => {
  courseIdToState[id] =
    courseIdToState[id] === "default" ? "selected" : "default";
};

const onCreateTag = async (
  course: DisplayRegisteredCourse,
  tagName: string
) => {
  const tagIds = course.tags.filter(({ assign }) => assign).map(({ id }) => id);
  course.tags.push({ id: createNewTagId(), name: tagName, assign: true });
  const newTag = await createTag(tagName);
  await updateCourse(course.id, { tagIds: [...tagIds, newTag.id] });
};

const onClickTag = async (
  course: DisplayRegisteredCourse,
  tag: DisplayCourseTag
) => {
  tag.assign = !tag.assign;
  await updateCourse(course.id, {
    tagIds: course.tags.filter(({ assign }) => assign).map(({ id }) => id),
  });
};

/** no course */
const noCourseMessage = computed(() => {
  return getAllCourses().value.length === 0
    ? "登録済みの授業がありません。"
    : "該当する授業がありません。";
});
</script>

<style lang="scss" scoped>
@import "~/ui/styles";

.courses {
  @include max-width;
  height: 100vh;

  display: flex;
  flex-direction: column;
  gap: $spacing-6;

  padding-bottom: $spacing-4;
}

.main {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  gap: $spacing-5;

  &__mask {
    flex: 1 1 0px;

    overflow-y: auto;
    @include scroll-mask;
  }

  &__courses {
    padding: $spacing-3 $spacing-2 $spacing-3 $spacing-0; // padding of scrollable element
  }

  &__no-course {
    color: getColor(--color-text-sub);
    font-size: $font-small;
    line-height: $single-line;
  }
}

.info {
  display: flex;
  justify-content: left;
  gap: $spacing-3;

  user-select: none;
}
</style>
