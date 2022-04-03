<template>
  <div class="credit">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          @click="router.push('/')"
          size="large"
          color="normal"
          icon-name="arrow_back"
        ></IconButton>
      </template>
      <template #title>単位数</template>
    </PageHeader>
    <Dropdown
      :options="yearOptions"
      v-model:selectedOption="selectedYear"
      label="対象年度"
      :state="mode === 'default' ? 'default' : 'disabled'"
    ></Dropdown>
    <section class="tags">
      <div class="tags__header">
        <div class="tags__label">分類</div>
        <Button
          @click="mode = mode === 'default' ? 'edit' : 'default'"
          size="small"
          :state="editingTagId || dragging ? 'disabled' : 'default'"
          >{{
            mode === "default" ? "タグの作成・編集" : "タグの作成・編集を終わる"
          }}
        </Button>
      </div>
      <div class="tags__mask">
        <div class="tags__contents">
          <TagListContent
            v-show="mode === 'default'"
            :name="allCourseTag.name"
            :credit="allCourseTag.credit"
          >
            <template #btns>
              <IconButton
                @click="() => onClickTransitionBtn(allCourseTag)"
                v-show="mode === 'default'"
                size="small"
                color="normal"
                icon-name="chevron_right"
              ></IconButton>
            </template>
          </TagListContent>
          <draggable
            @update:model-value="onChangeOrder"
            :model-value="tags"
            item-key="id"
            :animation="250"
            handle=".tag-list-content__drag-icon"
            :disabled="editingTagId"
            @start="dragging = true"
            @end="dragging = false"
          >
            <template #item="{ element }">
              <TagListContent
                :name="`タグ「${element.name}」`"
                :credit="element.credit"
                :mode="mode"
                :textfield="editingTagId === element.id"
                :drag-handle="editingTagId ? 'disabled' : 'show'"
              >
                <template #textfiled>
                  <TextFieldSingleLine
                    @enter-text-field="() => onClickNormalBtn(element)"
                    v-model.trim="element.name"
                    placeholder="タグ名"
                  ></TextFieldSingleLine>
                </template>
                <template #btns>
                  <IconButton
                    @click="() => onClickTransitionBtn(element)"
                    v-show="mode === 'default'"
                    size="small"
                    color="normal"
                    icon-name="chevron_right"
                  ></IconButton>
                  <IconButton
                    @click="() => onClickNormalBtn(element)"
                    v-show="mode === 'edit'"
                    size="small"
                    color="normal"
                    :icon-name="editingTagId === element.id ? 'check' : 'edit'"
                    :state="
                      !editingTagId ||
                      (editingTagId === element.id && element.name !== '')
                        ? 'default'
                        : 'disabled'
                    "
                  ></IconButton>
                  <IconButton
                    @click="() => onClickDangerBtn(element)"
                    v-show="mode === 'edit'"
                    size="small"
                    color="danger"
                    :icon-name="element.id === NEW_TAG_ID ? ' clear' : 'delete'"
                    :state="
                      editingTagId && element.id !== NEW_TAG_ID
                        ? 'disabled'
                        : 'default'
                    "
                  ></IconButton>
                </template>
              </TagListContent>
            </template>
          </draggable>
          <div v-if="tags.length === 0" class="tags__no-tag">
            作成済みのタグがありません。<br />
            タグを作成すると授業を分類することができます。
          </div>
        </div>
      </div>
      <div
        v-show="mode === 'edit'"
        @click="onClickAddBtn"
        :class="{
          'tags__add-btn': true,
          'add-btn': true,
          '--disabled': editingTagId || dragging,
        }"
      >
        <div class="add-btn__icon material-icons">add</div>
        <div class="add-btn__value">タグを新たに作成する</div>
      </div>
    </section>
    <Modal
      v-if="deletedTag"
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
import draggable from "vuedraggable";
import { useRouter } from "vue-router";
import Button from "~/components/Button.vue";
import Dropdown from "~/components/Dropdown.vue";
import IconButton from "~/components/IconButton.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import TagListContent from "~/components/TagListContent.vue";
import TextFieldSingleLine from "~/components/TextFieldSingleLine.vue";
import { CreditTag } from "~/entities/tag";
import { usePorts } from "~/usecases";
import {
  ApiCourseForCredit,
  ApiTag,
  apiToCreditTags,
} from "~/usecases/creditPageFunctions";
import { getTags } from "~/usecases/getTags";
import { getCourseListByYear } from "~/usecases/getCourseListByYear";
import { RegisteredCourse, TagPositionOnly } from "~/api/@types";
import { createTag } from "~/usecases/createTag";
import { ALL_COURSES_ID, NEW_TAG_ID } from "~/entities/tag";
import { displayToast } from "~/entities/toast";
import { extractMessageOrDefault } from "~/usecases/error";
import { updateTagName } from "~/usecases/updateTagName";
import { deleteTag } from "~/usecases/deleteTag";
import { changeTagOrders } from "~/usecases/changeTagOrders";

export default defineComponent({
  name: "Credit",
  components: {
    draggable,
    Button,
    Dropdown,
    IconButton,
    Modal,
    PageHeader,
    TagListContent,
    TextFieldSingleLine,
  },
  async setup() {
    const ports = usePorts();
    const router = useRouter();

    /** dropdown */
    const yearOptions: string[] = [
      "すべての年度",
      "2022年度",
      "2021年度",
      "2020年度",
      "2019年度",
    ];
    const selectedYear = ref<string>(yearOptions[0]);

    watch(selectedYear, async () => {
      await updateApiCourses();
      updateTags();
    });

    const getAllRegisteredCourses = async () => {
      const registeredCourses: RegisteredCourse[] = [];
      for (const year of [2019, 2020, 2021, 2022]) {
        registeredCourses.push(...(await getCourseListByYear(ports)(year)));
      }
      return registeredCourses;
    };

    const apiCourses = ref<ApiCourseForCredit[]>([]);
    const updateApiCourses = async () => {
      const years =
        selectedYear.value === "すべての年度"
          ? [2019, 2020, 2021, 2022]
          : [Number(selectedYear.value.slice(0, 4))];

      apiCourses.value = (await getAllRegisteredCourses())
        .filter(({ year }) => years.includes(year))
        .map((course) => ({
          id: course.id,
          name: course.name ?? course?.name ?? "-",
          code: course.course?.code ?? "-",
          credit: course.credit ?? course.course?.credit ?? 0,
          tags: course.tags.map(({ id }) => id),
        }));
    };
    const totalCredit = computed(() => {
      return apiCourses.value
        .reduce<number>((total, { credit }) => total + Number(credit), 0)
        .toFixed(1);
    });

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

    /** tags */
    const mode = ref<"default" | "edit">("default");
    const editingTagId = ref<string | undefined>(undefined);
    const dragging = ref(false);

    /**
     * - View は主に `tags` に依存しています。
     * - `updateTags` は `apiCourses` と `apiTags` をもとに実行されます。
     *
     * - api 成功時は `updateApiCourse` -> `updateApiTags` -> `updateTags`
     * - api 失敗時は `updateTags`
     * - を実行すれば良いです。
     */
    const tags = ref<CreditTag[]>([]);
    const updateTags = () => {
      tags.value = reactive([
        ...apiToCreditTags(apiCourses.value, apiTags.value),
      ]);
    };

    const allCourseTag = computed<CreditTag>(() => ({
      id: ALL_COURSES_ID,
      name: "すべての授業",
      credit: totalCredit.value,
    }));

    const onClickNormalBtn = async (tag: CreditTag) => {
      if (editingTagId.value === tag.id) {
        // タグ名が "" のとき
        if (tag.name === "") return;

        editingTagId.value = undefined;
        if (tag.id === NEW_TAG_ID) {
          // console.log("create new tag");
          try {
            await createTag(ports)(tag.name);
            await updateApiTags();
          } catch (error) {
            displayToast(ports)(extractMessageOrDefault(error));
          }
          updateApiTags();
        } else {
          // console.log("update tag name");
          try {
            await updateTagName(ports)({ id: tag.id, name: tag.name });
            await updateApiTags();
          } catch (error) {
            displayToast(ports)(extractMessageOrDefault(error));
          }
        }
        updateTags();
      } else {
        // textfield を表示する
        editingTagId.value = tag.id;
      }
    };
    const onClickDangerBtn = async (tag: CreditTag) => {
      if (tag.id === NEW_TAG_ID) {
        // console.log("clear new tag");
        updateTags();
        editingTagId.value = undefined;
      } else {
        // console.log("open delete modal");
        numberOfCourseAssignedDeletedTag.value = (
          await getAllRegisteredCourses()
        ).filter(({ tags }) => tags.some(({ id }) => id === tag.id)).length;
        deletedTag.value = tag;
      }
    };
    const onClickTransitionBtn = (tag: CreditTag) => {
      router.push({
        path: `/credit/${tag.id}`,
        query: {
          year:
            selectedYear.value === "すべての年度"
              ? 0
              : Number(selectedYear.value.slice(0, 4)),
        },
      });
    };
    const onClickAddBtn = () => {
      tags.value.push({ id: NEW_TAG_ID, name: "", credit: "0.0" });
      editingTagId.value = NEW_TAG_ID;
    };
    const onChangeOrder = async (newTags: CreditTag[]) => {
      // console.log("change tag order");
      tags.value = reactive(newTags);
      const tagPositionOnly: TagPositionOnly[] = newTags.map(({ id }, i) => ({
        id,
        position: i,
      }));
      try {
        await changeTagOrders(ports)(tagPositionOnly);
        await updateApiCourses();
        await updateApiTags();
      } catch (error) {
        displayToast(ports)(extractMessageOrDefault(error));
      }
      updateTags();
    };

    /** delete tag modal */
    const deletedTag = ref<CreditTag | undefined>(undefined);
    const numberOfCourseAssignedDeletedTag = ref(0);
    const onClickDeleteModal = async (id: string) => {
      // console.log("delete tag");
      const idx = tags.value.findIndex((tag) => tag.id === id);
      if (idx === -1) return;
      tags.value.splice(idx, 1);
      deletedTag.value = undefined;
      try {
        await deleteTag(ports)(id);
        await updateApiTags();
        await updateApiCourses();
      } catch (error) {
        displayToast(ports)(extractMessageOrDefault(error));
      }
      updateTags();
    };

    // initilization
    await updateApiTags();
    await updateApiCourses();
    updateTags();

    return {
      router,
      yearOptions,
      selectedYear,
      mode,
      editingTagId,
      dragging,
      NEW_TAG_ID,
      tags,
      allCourseTag,
      onClickTransitionBtn,
      onClickNormalBtn,
      onClickDangerBtn,
      onClickAddBtn,
      onChangeOrder,
      deletedTag,
      numberOfCourseAssignedDeletedTag,
      onClickDeleteModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~/styles";

.credit {
  @include max-width;

  display: flex;
  flex-direction: column;
  gap: $spacing-6;

  padding-bottom: $spacing-6; // spacing at the bottom of the page
}

.tags {
  height: calc(100vh - 19.6rem); // 100vh から tags 以外の height を引いた分

  display: flex;
  flex-direction: column;
  gap: $spacing-2;

  &__header {
    flex: none;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__label {
    font-weight: 500;
  }

  &__mask {
    flex: initial;

    overflow-y: auto;
    @include scroll-mask;
  }

  &__contents {
    padding: $spacing-3 $spacing-2 $spacing-3 $spacing-0; // padding of scrollable element
  }

  &__no-tag {
    padding: $spacing-2 $spacing-0 $spacing-0 $spacing-2;

    font-size: $font-small;
    color: getColor(--color-disabled);
    line-height: $multi-line;
  }

  &__add-btn {
    flex: none;
  }
}

.add-btn {
  width: max-content;

  display: flex;
  gap: $spacing-1;

  padding: $spacing-2 $spacing-1;

  @include button-cursor;

  font-size: $font-small;
  color: getColor(--color-button-gray);

  &.--disabled {
    opacity: 0.3;
  }

  &__value {
    font-weight: 500;
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
