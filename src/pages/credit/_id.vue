<template>
  <div class="courses">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          @click="router.push('/credit')"
          size="large"
          color="normal"
          icon-name="arrow_back"
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
            v-for="(course, i) in creditCourseWithStateList"
            :key="course.id"
            @click="
              course.state =
                course.state === 'selected' ? 'default' : 'selected'
            "
            @create-tag="(tagName) => onCreateTag(course, tagName)"
            @click-tag="(tag) => onClickTag(course, tag, i)"
            :state="course.state"
            :code="course.code"
            :name="course.name"
            :credit="course.credit"
            :tags="course.tags"
          ></CreditCourseListContent>
          <div
            v-if="creditCourseWithStateList.length === 0"
            class="main__no-course"
          >
            {{ noCourseMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { RegisteredCourse, Tag, TagIdOnly } from "~/api/@types";
import CreditCourseListContent from "~/components/CreditCourseListContent.vue";
import IconButton from "~/components/IconButton.vue";
import PageHeader from "~/components/PageHeader.vue";
import { CreditCourseWithState } from "~/entities/course";
import { DisplayTag, ALL_COURSES_ID, NEW_TAG_ID } from "~/entities/tag";
import { displayToast } from "~/entities/toast";
import { usePorts } from "~/usecases";
import { createTag } from "~/usecases/createTag";
import {
  ApiCourseForCredit,
  ApiTag,
  apiToCreditCourseWithStateList,
  updateCreditCourseWithStateList,
} from "~/usecases/creditPageFunctions";
import { extractMessageOrDefault } from "~/usecases/error";
import { getCourseListByYear } from "~/usecases/getCourseListByYear";
import { getTagById } from "~/usecases/getTagById";
import { getTags } from "~/usecases/getTags";
import { updateCourseTags } from "~/usecases/updateCourseTags";

export default defineComponent({
  name: "Courses",
  components: {
    CreditCourseListContent,
    IconButton,
    PageHeader,
  },
  async setup() {
    const ports = usePorts();
    const route = useRoute();
    const router = useRouter();

    /**
     * year === 0 の場合は すべての年度
     * tag === 'all' の場合は すべての授業
     */
    const year = Number(route.query.year ?? 0);
    const tagId = route.params.id as string;
    const selectedTag: Tag | undefined =
      tagId === ALL_COURSES_ID ? undefined : await getTagById(ports)(tagId);
    if (tagId !== ALL_COURSES_ID && selectedTag === undefined)
      await router.push("/credit");

    const getRegisteredCourses = async (): Promise<RegisteredCourse[]> => {
      const years = year === 0 ? [2019, 2020, 2021, 2022] : [year];
      const registeredCourses: RegisteredCourse[] = [];
      for (const y of years) {
        registeredCourses.push(...(await getCourseListByYear(ports)(y)));
      }
      registeredCourses.sort((a, b) =>
        a.year === b.year
          ? a.course?.code && b.course?.code
            ? a.course.code.localeCompare(b.course.code)
            : (a.name ?? a.course?.name ?? "").localeCompare(
                b.name ?? b.course?.name ?? ""
              )
          : a.year - b.year
      );
      return tagId === ALL_COURSES_ID
        ? registeredCourses
        : registeredCourses.filter(({ tags }) =>
            tags.some(({ id }) => id === tagId)
          );
    };

    const apiCourses = ref<ApiCourseForCredit[]>([]);
    const updateApiCourses = async () => {
      apiCourses.value = (await getRegisteredCourses()).map((course) => ({
        id: course.id,
        name: course.name ?? course.course?.name ?? "-",
        code: course.course?.code ?? "-",
        credit: course.credit ?? course.course?.credit ?? 0,
        tags: course.tags.map(({ id }) => id),
      }));

      // console.log("update api courses", apiCourses.value);
    };

    const apiTags = ref<ApiTag[]>([]);
    const updateApiTags = async () => {
      apiTags.value = (await getTags(ports))
        .map(({ id, name, position }) => ({
          id,
          name,
          order: position ?? 0,
        }))
        .sort((a, b) => a.order - b.order);

      // console.log("update api tags", apiTags.value);
    };

    // initialize
    await updateApiCourses();
    await updateApiTags();

    /** credit-course-list-content */
    const creditCourseWithStateList: CreditCourseWithState[] = reactive(
      apiToCreditCourseWithStateList(apiCourses.value, apiTags.value)
    );
    const updateView = () => {
      const newCreditCourseWithStateList = apiToCreditCourseWithStateList(
        apiCourses.value,
        apiTags.value
      );
      updateCreditCourseWithStateList(
        creditCourseWithStateList,
        newCreditCourseWithStateList
      );

      // console.log("creditCourseWithStateList", creditCourseWithStateList);
    };

    const onCreateTag = async (
      course: CreditCourseWithState,
      tagName: string
    ) => {
      let newTag: Tag | undefined = undefined;
      const assignedTagIds: TagIdOnly[] = course.tags
        .filter((tag) => tag.assign)
        .map(({ id }) => ({ id }));

      // api を叩く前に View を変更する
      creditCourseWithStateList.forEach(({ id, tags }) => {
        tags.push({ id: NEW_TAG_ID, name: tagName, assign: id === course.id });
      });

      try {
        newTag = await createTag(ports)(tagName);
      } catch (error) {
        displayToast(ports)(extractMessageOrDefault(error));
        updateView();
        return;
      }

      if (newTag === undefined) return;

      assignedTagIds.push({ id: newTag.id });

      await updateApiTags();

      try {
        await updateCourseTags(ports)({
          courseId: course.id,
          assignedTags: assignedTagIds,
        });
      } catch (error) {
        displayToast(ports)(extractMessageOrDefault(error));
        updateView();
        return;
      }

      await updateApiCourses();
      updateView();
    };

    const onClickTag = async (
      course: CreditCourseWithState,
      clickedTag: DisplayTag,
      idx: number
    ) => {
      const assignedTags: TagIdOnly[] = course.tags
        .filter((tag) => tag.id !== clickedTag.id && tag.assign)
        .map(({ id }) => ({ id }));

      if (!clickedTag.assign) assignedTags.push({ id: clickedTag.id });

      // api を叩く前に View を変更する
      clickedTag.assign = !clickedTag.assign;
      if (clickedTag.id === tagId && !clickedTag.assign)
        creditCourseWithStateList.splice(idx, 1);

      try {
        await updateCourseTags(ports)({ courseId: course.id, assignedTags });
      } catch (error) {
        displayToast(ports)(extractMessageOrDefault(error));
      }

      await updateApiCourses();
      updateView();
    };

    const noCourseMessage = computed(() =>
      creditCourseWithStateList.length == 0
        ? "登録済みの授業がありません。"
        : "該当する授業がありません。"
    );

    /** info */
    const totalCredit = computed(() =>
      creditCourseWithStateList
        .reduce<number>((total, { credit }) => total + Number(credit), 0)
        .toFixed(1)
    );
    const info = computed(() => ({
      year: year === 0 ? "すべての年度" : `${year}年度`,
      tag:
        tagId === ALL_COURSES_ID
          ? "すべての授業 "
          : `タグ「${selectedTag?.name}」`,
      credit: `${totalCredit.value}単位`,
    }));

    return {
      router,
      creditCourseWithStateList,
      onCreateTag,
      onClickTag,
      noCourseMessage,
      info,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~/styles";

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
