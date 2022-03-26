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
        @delete-tag="
          (tag) => {
            deleteTag = tag;
          }
        "
        @change-tag-order="onCreditFilterChangeTagOrder"
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
          v-for="course in displayCreditCourseWithStateList"
          :key="course.id"
          @click="
            course.state =
              mode === 'edit' || course.state === 'selected'
                ? 'default'
                : 'selected'
          "
          @create-tag="
            (tagName) => onCreditCourseListContentCreateTag(course, tagName)
          "
          @click-tag="(tag) => onCreditCourseListContentClickTag(course, tag)"
          :state="course.state"
          :code="course.code"
          :name="course.name"
          :credit="course.credit"
          :tags="course.tags"
        ></CreditCourseListContent>
      </div>
    </section>
    <Modal
      v-if="deleteTag != undefined"
      class="delete-tag-modal"
      @click="deleteTag = undefined"
      size="small"
    >
      <template #title>タグを削除しますか？</template>
      <template #contents>
        タグ「{{ deleteTag.name }}」を削除しますか？<br />
        現在このタグを{{
          numberOfCourseAssignedDeletedTag
        }}件の授業に割り当てています。<br />
        タグを削除すると、割り当てた全ての授業との紐付けが解除されます。
      </template>
      <template #button>
        <Button
          @click="deleteTag = undefined"
          size="medium"
          layout="fill"
          color="base"
        >
          キャンセル
        </Button>
        <Button
          @click="() => onClickDeleteModal(deleteTag?.id ?? '')"
          size="medium"
          layout="fill"
          color="danger"
        >
          削除
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "~/components/Button.vue";
import CreditCourseListContent from "~/components/CreditCourseListContent.vue";
import CreditFilter, { CreditFilterMode } from "~/components/CreditFilter.vue";
import IconButton from "~/components/IconButton.vue";
import Modal from "~/components/Modal.vue";
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
    Button,
    CreditCourseListContent,
    CreditFilter,
    IconButton,
    Modal,
    PageHeader,
  },
  setup() {
    // TODO: 消したい
    const router = useRouter();

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
    const onCreditFilterChangeTagOrder = (ids: string[]) => {
      const tags = ids.map((id, i) => ({ id, order: i }));
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
        : creditCourseWithStateList.filter((course) => {
            const tag = course.tags.find(
              (tag) => tag.id === selectedTagId.value
            );
            return tag != undefined && tag.assign;
          });
    });

    const onCreditCourseListContentCreateTag = (
      course: CreditCourseWithState,
      tagName: string
    ) => {
      // TODO: api につなぐ
      const newTag = tagRepo.createTag({
        name: tagName,
        order: creditTags.length,
      });

      const assignedTagIds = course.tags
        .filter((tag) => tag.assign)
        .map(({ id }) => id);
      assignedTagIds.push(newTag.id);

      // TODO: api につなぐ
      courseRepo.updateTags(course.id, assignedTagIds);

      updateApiCourses();
      updateApiTags();
      updateView();
    };

    const onCreditCourseListContentClickTag = (
      course: CreditCourseWithState,
      clickedTag: DisplayTag
    ) => {
      if (mode.value === "edit") return;
      const assignedTagIds = course.tags
        .filter((tag) => tag.id !== clickedTag.id && tag.assign)
        .map(({ id }) => id);
      if (!clickedTag.assign) assignedTagIds.push(clickedTag.id);

      // TODO: api につなぐ
      courseRepo.updateTags(course.id, assignedTagIds);

      updateApiCourses();
      updateView();
    };

    /** delete tag modal */
    const deleteTag = ref<CreditTag | undefined>(undefined);
    // TODO: 表示している年度以外の授業も考慮する
    const numberOfCourseAssignedDeletedTag = computed(
      () =>
        creditCourseWithStateList.filter(({ tags }) =>
          tags.some(
            (tag) => tag.id === (deleteTag.value?.id ?? "") && tag.assign
          )
        ).length
    );
    const onClickDeleteModal = (id: string) => {
      // TODO: api につなぐ
      tagRepo.deleteTag(id);
      courseRepo.deleteTag(id);

      const tags = creditTags
        .filter((tag) => tag.id !== id)
        .map((tag, i) => ({ id: tag.id, order: i }));

      // TODO: api につなぐ
      tagRepo.changeOrders(tags);

      deleteTag.value = undefined;

      updateApiTags();
      updateView();
    };

    return {
      router,
      mode,
      yearOptions,
      selectedYear,
      totalCredit,
      selectedTagId,
      creditTags,
      onCreditFilterCreateTag,
      onCreditFilterUpdateTagName,
      onCreditFilterChangeTagOrder,
      displayCreditCourseWithStateList,
      onCreditCourseListContentCreateTag,
      onCreditCourseListContentClickTag,
      deleteTag,
      numberOfCourseAssignedDeletedTag,
      onClickDeleteModal,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";

.credit {
  @include max-width;
}

.main {
  height: calc(100vh - 6rem);
  padding: 2.4rem 0 1.6rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  &__mask {
    flex-grow: 1;
    padding: $spacing-3 $spacing-2;

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

.delete-tag-modal {
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
