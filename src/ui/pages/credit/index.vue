<template>
  <div class="credit">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          size="large"
          color="normal"
          icon-name="arrow_back"
          @click="$router.push('/')"
        ></IconButton>
      </template>
      <template #title>単位数</template>
    </PageHeader>
    <Dropdown
      :selectedOption="selectedYearOption"
      :options="yearOptions"
      label="対象年度"
      :state="mode === 'default' ? 'default' : 'disabled'"
      @update:selected-option="updateCreditYearOption"
    ></Dropdown>
    <section class="tags">
      <div class="tags__header">
        <div class="tags__label">分類</div>
        <Button
          size="small"
          :state="editingTagId || dragging ? 'disabled' : 'default'"
          @click="toggleMode"
          >{{
            mode === "default" ? "タグの作成・編集" : "タグの作成・編集を終わる"
          }}
        </Button>
      </div>
      <div class="tags__mask">
        <div ref="tagsContentsRef" class="tags__contents">
          <TagListContent
            v-show="mode === 'default'"
            name="すべての授業"
            :credit="totalCredit"
          >
            <template #btns>
              <IconButton
                v-show="mode === 'default'"
                size="small"
                color="normal"
                icon-name="chevron_right"
                @click="$router.push('/credit/all-courses')"
              ></IconButton>
            </template>
          </TagListContent>
          <draggable
            :model-value="displayCreditTags"
            item-key="id"
            :animation="250"
            handle=".tag-list-content__drag-icon"
            :disabled="editingTagId != undefined"
            @update:model-value="onChangeOrder"
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
                    :id="`text-field-single-line--${element.id}`"
                    v-model.trim="element.name"
                    placeholder="タグ名"
                    @enter-text-field="() => onClickNormalBtn(element)"
                  ></TextFieldSingleLine>
                </template>
                <template #btns>
                  <IconButton
                    v-show="mode === 'default'"
                    size="small"
                    color="normal"
                    icon-name="chevron_right"
                    @click="$router.push(`/credit/${element.id}`)"
                  ></IconButton>
                  <IconButton
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
                    @click="() => onClickNormalBtn(element)"
                  ></IconButton>
                  <IconButton
                    v-show="mode === 'edit'"
                    size="small"
                    color="danger"
                    :icon-name="isNewTagId(element.id) ? ' clear' : 'delete'"
                    :state="
                      editingTagId && !isNewTagId(element.id)
                        ? 'disabled'
                        : 'default'
                    "
                    @click="() => onClickDangerBtn(element)"
                  ></IconButton>
                </template>
              </TagListContent>
            </template>
          </draggable>
          <div v-if="displayCreditTags.length === 0" class="tags__no-tag">
            作成済みのタグがありません。<br />
            タグを作成すると授業を分類することができます。
          </div>
        </div>
      </div>
      <div
        v-show="mode === 'edit'"
        :class="{
          'tags__add-btn': true,
          'add-btn': true,
          '--disabled': editingTagId || dragging,
        }"
        @click="onClickAddBtn"
      >
        <div class="add-btn__icon material-icons">add</div>
        <div class="add-btn__value">タグを新たに作成する</div>
      </div>
    </section>
    <Modal
      v-if="tagToDelete"
      class="delete-tag-modal"
      size="small"
      @click="tagToDelete = undefined"
    >
      <template #title>タグを削除しますか？</template>
      <template #contents>
        タグ「{{ tagToDelete.name }}」を削除しますか？<br />
        現在このタグを{{
          numberOfCourseAssignedTagToDelete
        }}件の授業に割り当てています。<br />
        タグを削除すると、割り当てた全ての授業との紐付けが解除されます。
      </template>
      <template #button>
        <Button
          size="medium"
          layout="fill"
          color="base"
          @click="tagToDelete = undefined"
        >
          キャンセル
        </Button>
        <Button
          size="medium"
          layout="fill"
          color="danger"
          @click="onClickDeleteModal"
        >
          削除
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { computed, reactive, ref, watch } from "vue";
import draggable from "vuedraggable";
import { academicYears } from "~/domain/year";
import { creditToDisplay } from "~/presentation/presenters/credit";
import { getDisplayCreditTags } from "~/presentation/presenters/tag";
import Button from "~/ui/components/Button.vue";
import Dropdown from "~/ui/components/Dropdown.vue";
import IconButton from "~/ui/components/IconButton.vue";
import Modal from "~/ui/components/Modal.vue";
import PageHeader from "~/ui/components/PageHeader.vue";
import TagListContent from "~/ui/components/TagListContent.vue";
import TextFieldSingleLine from "~/ui/components/TextFieldSingleLine.vue";
import { useFocus } from "~/ui/hooks/useFocus";
import { useStringToggle } from "~/ui/hooks/useStringToggle";
import { isNewTagId, createNewTagId } from "~/ui/shared";
import {
  getAllCourses,
  getCoursesByYear,
  setAllCourses,
} from "~/ui/store/course";
import { getCreditYear, updateCreditYear } from "~/ui/store/creditYear";
import {
  createTag,
  deleteTag,
  getAllTags,
  setAllTags,
  updateTagName,
  updateTagOrders,
} from "~/ui/store/tag";
import type { DisplayCreditTag } from "~/presentation/viewmodels/tag";

useHead({
  title: "Twin:te | 単位数",
});

/** year */
const year = getCreditYear();

/** course */
await setAllCourses();
const courses = computed(() =>
  year.value === 0 ? getAllCourses().value : getCoursesByYear(year.value).value
);

/** tags */
await setAllTags();
const tags = getAllTags();

/** mode */
const [mode, toggleMode] = useStringToggle("default", "edit");

/** year dropdown */
const allYearOption = "すべての年度";
const selectedYearOption = computed(() =>
  year.value === 0 ? allYearOption : `${year.value}年度`
);
const yearOptions: string[] = [
  allYearOption,
  ...academicYears.reverse().map((year) => `${year}年度`),
];
const updateCreditYearOption = (option: string) => {
  updateCreditYear(option === allYearOption ? 0 : Number(option.slice(0, 4)));
};

/** focus */
const { targetRef: tagsContentsRef, focus } = useFocus();

/** display credit tag */
const displayCreditTags = ref<DisplayCreditTag[]>([]);
const editingTagId = ref<string>();
const dragging = ref(false);
const totalCredit = computed(() =>
  creditToDisplay(
    courses.value.reduce((credit, course) => (credit += course.credit), 0)
  )
);

const updateDisplayCreditTags = () => {
  displayCreditTags.value = reactive(
    getDisplayCreditTags(
      courses.value,
      tags.value.sort((tagA, tagB) => tagA.order - tagB.order),
      year.value === 0 ? academicYears : [year.value]
    )
  );
};

watch([courses, tags, year], () => updateDisplayCreditTags(), {
  immediate: true,
});

const onClickNormalBtn = async (tag: DisplayCreditTag) => {
  if (editingTagId.value === tag.id) {
    editingTagId.value = undefined;
    try {
      if (isNewTagId(tag.id)) await createTag(tag.name);
      else await updateTagName(tag.id, tag.name);
    } catch (error) {
      updateDisplayCreditTags();
      throw error;
    }
  } else {
    editingTagId.value = tag.id;
    focus([`#text-field-single-line--${tag.id}`, "input"]);
  }
};

const onClickDangerBtn = async (tag: DisplayCreditTag) => {
  if (isNewTagId(tag.id)) {
    updateDisplayCreditTags();
    editingTagId.value = undefined;
  } else tagToDelete.value = tag;
};

const onChangeOrder = async (newTags: DisplayCreditTag[]) => {
  displayCreditTags.value = reactive(newTags);
  await updateTagOrders(displayCreditTags.value.map(({ id }) => id));
  updateDisplayCreditTags();
};

const onClickAddBtn = () => {
  const id = createNewTagId();
  displayCreditTags.value.push({ id, name: "", credit: "0.0" });
  editingTagId.value = id;
  focus([`#text-field-single-line--${id}`, "input"]);
};

/** delete tag modal */
const tagToDelete = ref<DisplayCreditTag>();

const numberOfCourseAssignedTagToDelete = computed(() => {
  if (tagToDelete.value == undefined) return 0;
  const targetId = tagToDelete.value.id;
  return getAllCourses().value.filter(({ tagIds }) => tagIds.includes(targetId))
    .length;
});

const onClickDeleteModal = async () => {
  if (tagToDelete.value == undefined) return;
  await deleteTag(tagToDelete.value.id);
  tagToDelete.value = undefined;
  updateDisplayCreditTags();
};
</script>

<style lang="scss" scoped>
@import "~/ui/styles";

.credit {
  @include max-width;

  display: flex;
  flex-direction: column;
  gap: $spacing-6;

  padding-bottom: $spacing-6; // spacing at the bottom of the page
}

.tags {
  height: calc(
    100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 19.6rem
  ); // tags 以外の height を引いた分

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
