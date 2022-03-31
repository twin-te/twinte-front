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
            deletedTag = tag;
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
        <div class="main__courses">
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
          <div
            v-if="displayCreditCourseWithStateList.length === 0"
            class="main__no-course"
          >
            {{ noCourseMessage }}
          </div>
        </div>
      </div>
    </section>
    <Modal
      v-if="deletedTag != undefined"
      class="delete-tag-modal"
      @click="deletedTag = undefined"
      size="small"
    >
      <template #title>タグを削除しますか？</template>
      <template #contents>
        タグ「{{ deletedTag.name }}」を削除しますか？<br />
        現在このタグを{{
          numberOfCourseAssignedDeletedTag
        }}件の授業に割り当てています。<br />
        タグを削除すると、割り当てた全ての授業との紐付けが解除されます。
      </template>
      <template #button>
        <Button
          @click="deletedTag = undefined"
          size="medium"
          layout="fill"
          color="base"
        >
          キャンセル
        </Button>
        <Button
          @click="() => onClickDeleteModal(deletedTag?.id ?? '')"
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
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { RegisteredCourse, TagIdOnly, TagPositionOnly } from "~/api/@types";
import Button from "~/components/Button.vue";
import CreditCourseListContent from "~/components/CreditCourseListContent.vue";
import CreditFilter, { CreditFilterMode } from "~/components/CreditFilter.vue";
import IconButton from "~/components/IconButton.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import { CreditCourseWithState } from "~/entities/course";
import { CreditTag, DisplayTag } from "~/entities/tag";
import { usePorts } from "~/usecases";
import { changeTagOrders } from "~/usecases/changeTagOrders";
import { createTag } from "~/usecases/createTag";
import {
  apiToCreditCourseWithStateList,
  apiToCreditTags,
  getTotalCredit,
  ApiTag,
  ApiCourseForCredit,
  updateReactiveTags,
  updateCreditCourseWithStateList,
} from "~/usecases/creditPageFunctions";
import { deleteTag } from "~/usecases/deleteTag";
import { getCourseListByYear } from "~/usecases/getCourseListByYear";
import { getTags } from "~/usecases/getTags";
import { updateCourseTags } from "~/usecases/updateCourseTags";
import { updateTagName } from "~/usecases/updateTagName";

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
  async setup() {
    const ports = usePorts();
    // TODO: 消したい
    const router = useRouter();

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

    const yearOptions: string[] = [
      "すべての年度",
      "2022年度",
      "2021年度",
      "2020年度",
      "2019年度",
    ];
    const selectedYear = ref(yearOptions[0]);
    watch(selectedYear, async () => {
      await updateApiCourses();
      updateView();
    });
    const years = [2019, 2020, 2021, 2022];

    const updateApiCourses = async () => {
      const registerdCourses: RegisteredCourse[] = [];
      if (selectedYear.value === "すべての年度") {
        for (const year of years)
          registerdCourses.push(...(await getCourseListByYear(ports)(year)));
      } else {
        registerdCourses.push(
          ...(await getCourseListByYear(ports)(
            Number(selectedYear.value.slice(0, 4))
          ))
        );
      }

      apiCourses.value = registerdCourses.map((course) => ({
        id: course.id,
        name: course.name ?? course.course?.name ?? "-",
        code: course.course?.code ?? "-",
        credit: course.credit ?? course.course?.credit ?? 0,
        tags: course.tags.map(({ id }) => id),
      }));
    };
    const updateApiTags = async () => {
      console.log("update api tags");

      apiTags.value = sortApiTagsInPlace(
        (await getTags(ports)).map((tag) => ({
          id: tag.id,
          name: tag.name,
          order: tag.position ?? 0,
        }))
      );
    };

    // initialize
    await updateApiCourses();
    await updateApiTags();

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

      // // update creditCourseWithStateList
      const newCreditCourseWithStateList = apiToCreditCourseWithStateList(
        apiCourses.value,
        apiTags.value
      );
      updateCreditCourseWithStateList(
        creditCourseWithStateList,
        newCreditCourseWithStateList
      );

      console.log("creditTags", creditTags);
      console.log("creditCourseWithStateList", creditCourseWithStateList);
    };

    /** credit-filter */
    const mode = ref<CreditFilterMode>("filtering");
    const totalCredit = computed(() => getTotalCredit(apiCourses.value));
    const selectedTagId = ref<string | undefined>(undefined);
    const creditTags: CreditTag[] = reactive(
      apiToCreditTags(apiCourses.value, apiTags.value)
    );
    const onCreditFilterCreateTag = async (name: string) => {
      await createTag(ports)(name);

      await updateApiTags();
      updateView();
    };
    const onCreditFilterUpdateTagName = async (id: string, name: string) => {
      await updateTagName(ports)({ id, name });

      await updateApiTags();
      updateView();
    };
    const onCreditFilterChangeTagOrder = async (ids: string[]) => {
      const tags: TagPositionOnly[] = ids.map((id, i) => ({ id, position: i }));
      await changeTagOrders(ports)(tags);

      await updateApiTags();
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

    const onCreditCourseListContentCreateTag = async (
      course: CreditCourseWithState,
      tagName: string
    ) => {
      const newTag = await createTag(ports)(tagName);

      const assignedTagIds: TagIdOnly[] = course.tags
        .filter((tag) => tag.assign)
        .map(({ id }) => ({ id }));
      assignedTagIds.push({ id: newTag.id });

      await updateCourseTags(ports)({
        courseId: course.id,
        assignedTags: assignedTagIds,
      });

      await updateApiCourses();
      await updateApiTags();
      updateView();
    };

    const onCreditCourseListContentClickTag = async (
      course: CreditCourseWithState,
      clickedTag: DisplayTag
    ) => {
      if (mode.value === "edit") return;
      const assignedTags: TagIdOnly[] = course.tags
        .filter((tag) => tag.id !== clickedTag.id && tag.assign)
        .map(({ id }) => ({ id }));

      if (!clickedTag.assign) assignedTags.push({ id: clickedTag.id });

      await updateCourseTags(ports)({ courseId: course.id, assignedTags });

      await updateApiCourses();
      updateView();
    };

    const noCourseMessage = computed(() =>
      creditCourseWithStateList.length == 0
        ? "登録済みの授業がありません。"
        : "該当する授業がありません。"
    );

    /** delete tag modal */
    const deletedTag = ref<CreditTag | undefined>(undefined);
    // TODO: 表示している年度以外の授業も考慮する
    const numberOfCourseAssignedDeletedTag = computed(
      () =>
        creditCourseWithStateList.filter(({ tags }) =>
          tags.some(
            (tag) => tag.id === (deletedTag.value?.id ?? "") && tag.assign
          )
        ).length
    );
    const onClickDeleteModal = async (id: string) => {
      await deleteTag(ports)(id);

      // 選択されているタグが削除された場合
      if (selectedTagId.value == deletedTag.value?.id)
        selectedTagId.value = undefined;

      deletedTag.value = undefined;

      await updateApiTags();
      await updateApiCourses();
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
      noCourseMessage,
      deletedTag,
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
  height: calc(100vh - 6rem); // header 部分を差し引いた値
  padding: 2.4rem 0 1.6rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  &__mask {
    flex-grow: 1;
    padding: $spacing-3 $spacing-2;

    overflow-y: auto;
    @include scroll-mask;

    &.--disabled {
      opacity: 0.2;
      background: var(--base-liner);
    }
  }

  &__courses {
    padding: $spacing-2;
    box-shadow: $shadow-base;
    border-radius: $radius-2;
  }

  &__no-course {
    color: getColor(--color-text-sub);
    font-size: $font-small;
    line-height: $single-line;
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
