<template>
  <div class="credit">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          @click="$router.back()"
          size="large"
          color="normal"
          icon-name="arrow_back"
        ></IconButton>
      </template>
      <template #title>単位数</template>
    </PageHeader>
    <section class="main">
      <CreditFilter
        @create-tag="onCreditFilterCreateTag"
        @update-tag-name="onCreditFilterUpdateTagName"
        @delete-tag="onCreditFilterDeleteTag"
        v-model:mode="mode"
        :year-options="yearOptions"
        v-model:selected-year="selectedYear"
        :total-credit="totalCredit"
        v-model:selected-tag-id="selectedTagId"
        :tags="creditTags"
      >
      </CreditFilter>
      <div :class="{ main__mask: true, '--disabled': mode === 'edit' }">
        <CreditCourseListContent
          v-for="ccws in displayCreditCourseWithStateList"
          :key="ccws.id"
          @click="
            ccws.state =
              mode === 'edit' || ccws.state === 'selected'
                ? 'default'
                : 'selected'
          "
          @create-tag="
            (tagName) => onCreditCourseListContentCreateTag(ccws, tagName)
          "
          @click-tag="(tag) => onCreditCourseListContentClickTag(ccws, tag)"
          :state="ccws.state"
          :code="ccws.code"
          :name="ccws.name"
          :credit="ccws.credit"
          :tags="ccws.tags"
        ></CreditCourseListContent>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import CreditCourseListContent from "~/components/CreditCourseListContent.vue";
import CreditFilter, { CreditFilterMode } from "~/components/CreditFilter.vue";
import IconButton from "~/components/IconButton.vue";
import PageHeader from "~/components/PageHeader.vue";
import { CreditCourseWithState } from "~/entities/course";
import { CreditTag, DisplayTag } from "~/entities/tag";
import {
  apiToCreditCourseWithStateList,
  apiToCreditTags,
  getTotalCredit,
  updateCreditCourseWithStateList,
  updateReactiveTags,
} from "~/usecases/creditPageFunctions";
import {
  ApiCourseForCredit,
  ApiTag,
  CourseRepositoryInMemory,
  TagRepositoryInMemory,
} from "~/usecases/dummyRepo";

export default defineComponent({
  name: "Credit",
  components: {
    CreditCourseListContent,
    CreditFilter,
    IconButton,
    PageHeader,
  },
  setup() {
    // api とか usecase の代わりです。
    // 後で消します
    const courseRepo: CourseRepositoryInMemory = new CourseRepositoryInMemory();
    const tagRepo: TagRepositoryInMemory = new TagRepositoryInMemory();

    const sortApiTagsInPlace = (apiTags: ApiTag[]): ApiTag[] => {
      return apiTags.sort((a, b) => a.order - b.order);
    };

    /**
     * - view は主に `creditTags` と `creditCourseWithStateList` に依存しています。
     * - これらの値が変更されると、view が更新されます。
     *
     * 処理の流れ
     * 1. `apiCourses` または `apiTags` が変更される
     * 2. `updateView` によって `creditTags` と `creditCourseWithStateList` を更新する。
     * 3. view が更新される
     * 4. 1 ~ 3 の繰り返し
     */

    // これらの値が変更されたら updateView を実行する
    const apiCourses = ref<ApiCourseForCredit[]>([]);
    const apiTags = ref<ApiTag[]>([]);

    const updateApiCourses = () => {
      console.log("update api courses");

      // TODO: api につなぐ
      apiCourses.value = courseRepo.getCourses();
    };
    const updateApiTags = () => {
      console.log("update api tags");

      // TODO: api につなぐ
      apiTags.value = sortApiTagsInPlace(tagRepo.getTags());
    };

    // initialize
    updateApiCourses();
    updateApiTags();

    /**
     * - view を更新する。
     * - view は主に `creditTags` と `creditCourseWithStateList` に依存している。
     * - `creditTags` を更新するために `updateReactiveTags` を実行する。
     * - `creditCourseWithStateList` を更新するために `updateCreditCourseWithStateList` を実行する。
     */
    const updateView = () => {
      // update creditTags
      const newCreditTags = apiToCreditTags(apiCourses.value, apiTags.value);
      updateReactiveTags(creditTags, newCreditTags);

      // update creditCourseWithStateList
      updateCreditCourseWithStateList(
        creditCourseWithStateList,
        apiCourses.value,
        apiTags.value
      );

      console.log("creditTags", creditTags);
      console.log("creditCourseWithStateList", creditCourseWithStateList);
    };

    /** credit-filter */
    const mode = ref<CreditFilterMode>("filtering");
    const yearOptions: string[] = [
      "すべての年度",
      "2022年度",
      "2021年度",
      "2020年度",
      "2019年度",
    ];
    const selectedYear = ref(yearOptions[0]);
    const totalCredit = ref(getTotalCredit(apiCourses.value));
    const selectedTagId = ref<string | undefined>(undefined);
    const creditTags = reactive<CreditTag[]>(
      apiToCreditTags(apiCourses.value, apiTags.value)
    );

    const onCreditFilterCreateTag = (name: string) => {
      // TODO: api につなぐ
      tagRepo.createTag({ name, order: creditTags.length });

      updateApiTags();
      updateView();
    };
    const onCreditFilterUpdateTagName = (id: string, name: string) => {
      // TODO: api につなぐ
      tagRepo.updateTag(id, { name });

      updateApiTags();
      updateView();
    };
    const onCreditFilterDeleteTag = (id: string) => {
      // TODO: api につなぐ
      tagRepo.deleteTag(id);
      courseRepo.deleteTag(id);

      const tags = creditTags
        .filter((tag) => tag.id !== id)
        .map((tag, i) => ({ id: tag.id, order: i }));

      // TODO: api につなぐ
      tagRepo.changeOrders(tags);

      updateApiTags();
      updateView();
    };

    /** credit-course-list-content */
    const creditCourseWithStateList: CreditCourseWithState[] = reactive(
      apiToCreditCourseWithStateList(apiCourses.value, apiTags.value)
    );
    const displayCreditCourseWithStateList = computed(() => {
      return selectedTagId.value == undefined
        ? creditCourseWithStateList
        : creditCourseWithStateList.filter((ccws) => {
            const tag = ccws.tags.find((tag) => tag.id === selectedTagId.value);
            return tag != undefined && tag.assign;
          });
    });

    const onCreditCourseListContentCreateTag = (
      ccws: CreditCourseWithState,
      tagName: string
    ) => {
      // TODO: api につなぐ
      const newTag = tagRepo.createTag({
        name: tagName,
        order: creditTags.length,
      });

      const assignedTagIds = ccws.tags
        .filter((tag) => tag.assign)
        .map(({ id }) => id);
      assignedTagIds.push(newTag.id);

      // TODO: api につなぐ
      courseRepo.updateTags(ccws.id, assignedTagIds);

      updateApiCourses();
      updateApiTags();
      updateView();
    };

    const onCreditCourseListContentClickTag = (
      ccws: CreditCourseWithState,
      clickedTag: DisplayTag
    ) => {
      if (mode.value === "edit") return;
      const assignedTagIds = ccws.tags
        .filter((tag) => tag.id !== clickedTag.id && tag.assign)
        .map(({ id }) => id);
      if (!clickedTag.assign) assignedTagIds.push(clickedTag.id);

      // TODO: api につなぐ
      courseRepo.updateTags(ccws.id, assignedTagIds);

      updateApiCourses();
      updateView();
    };

    watch(
      () => mode.value,
      () => {
        creditCourseWithStateList.forEach((ccws) => (ccws.state = "default"));
      }
    );

    return {
      mode,
      yearOptions,
      selectedYear,
      totalCredit,
      selectedTagId,
      creditTags,
      onCreditFilterCreateTag,
      onCreditFilterUpdateTagName,
      onCreditFilterDeleteTag,
      displayCreditCourseWithStateList,
      onCreditCourseListContentCreateTag,
      onCreditCourseListContentClickTag,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";

.main {
  height: calc(100vh - 6rem);
  padding: 2.4rem 0 1.6rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  &__mask {
    flex-grow: 1;
    padding: $spacing-3 $spacing-0;

    overflow-y: auto;
    @include scroll-mask;

    border-radius: $radius-2;

    &.--disabled {
      opacity: 0.2;
      background: var(--base-liner);
      box-shadow: $shadow-base;
    }
  }
}
</style>
