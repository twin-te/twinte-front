<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import draggable from "vuedraggable";
import { CreditTag } from "~/entities/tag";
import Button from "./Button.vue";
import Dropdown from "./Dropdown.vue";
import IconButton from "./IconButton.vue";
import TagListContent from "./TagListContent.vue";
import TextFieldSingleLine from "./TextFieldSingleLine.vue";

export type CreditFilterMode = "filtering" | "edit";

export default defineComponent({
  name: "CreditFilter",
  components: {
    draggable,
    Button,
    Dropdown,
    IconButton,
    TagListContent,
    TextFieldSingleLine,
  },
  props: {
    mode: {
      type: String as PropType<CreditFilterMode>,
      required: true,
    },
    yearOptions: {
      type: Object as PropType<string[]>,
      required: true,
    },
    selectedYear: {
      type: String,
      required: true,
    },
    totalCredit: {
      type: String,
      required: true,
    },
    selectedTagId: {
      type: String,
      default: undefined,
    },
    tags: {
      type: Object as PropType<CreditTag[]>,
      required: true,
    },
  },
  emits: [
    "create-tag",
    "update-tag-name",
    "delete-tag",
    "change-tag-order",
    "update:mode",
    "update:selected-year",
    "update:selected-tag-id",
  ],
  setup(props, { emit }) {
    const opened = ref(true);
    const textfieldValue = ref<string>("");
    const edittingTagId = ref<string>("");
    const dragging = ref(false);
    const innerTags = computed<CreditTag[]>(() => reactive(props.tags));
    const NEW_TAG_ID = "new-tag";

    const onClickNormalBtn = (tag: CreditTag) => {
      if (edittingTagId.value === "") {
        edittingTagId.value = tag.id;
        textfieldValue.value = tag.name;
      } else if (edittingTagId.value === NEW_TAG_ID) {
        emit("create-tag", textfieldValue.value);
        edittingTagId.value = "";
      } else {
        emit("update-tag-name", tag.id, textfieldValue.value);
        edittingTagId.value = "";
      }
    };

    const onClickDangerBtn = (tag: CreditTag) => {
      if (edittingTagId.value === NEW_TAG_ID) {
        innerTags.value.splice(innerTags.value.length - 1, 1);
        edittingTagId.value = "";
      } else {
        emit("delete-tag", tag);
      }
    };

    const onChangeOrder = (tags: CreditTag[]) => {
      const tagIds = tags.map(({ id }) => id);
      emit("change-tag-order", tagIds);
    };

    const addNewCreditTag = () => {
      if (edittingTagId.value !== "") return;
      const tag: CreditTag = {
        id: NEW_TAG_ID,
        name: "",
        credit: "0.0",
      };
      innerTags.value.push(tag);
      edittingTagId.value = NEW_TAG_ID;
      textfieldValue.value = "";
    };

    const info = computed<{ year: string; tag: string; credit: string }>(() => {
      const info: { year: string; tag: string; credit: string } = {
        year: props.selectedYear,
        tag: "",
        credit: "",
      };

      if (props.selectedTagId == undefined) {
        info.tag = "すべての授業";
        info.credit = props.totalCredit;
      } else {
        const tag = props.tags.find((tag) => tag.id === props.selectedTagId);
        info.tag = tag == undefined ? "すべての授業" : `タグ 「${tag.name}」`;
        info.credit =
          (tag == undefined ? props.totalCredit : tag.credit) + "単位";
      }

      return info;
    });

    return {
      opened,
      textfieldValue,
      edittingTagId,
      dragging,
      innerTags,
      NEW_TAG_ID,
      onClickNormalBtn,
      onClickDangerBtn,
      onChangeOrder,
      addNewCreditTag,
      info,
    };
  },
});
</script>

<template>
  <div class="credit-filter">
    <transition name="spread-down" mode="out-in">
      <div v-if="opened" class="credit-filter__filters">
        <Dropdown
          @update:selected-option="
            (year) => $emit('update:selected-year', year)
          "
          :options="yearOptions"
          :selectedOption="selectedYear"
          :label="mode === 'filtering' ? '対象年度' : '年度'"
          :state="mode === 'filtering' ? 'default' : 'disabled'"
          :class="{
            'credit-filter__filter-year': true,
            '--edit': mode === 'edit',
          }"
        ></Dropdown>
        <div
          v-show="mode === 'filtering'"
          class="credit-filter__filter-all filter-all"
        >
          <div class="filter-all__label">時間割に登録済みの単位数</div>
          <TagListContent
            @click="$emit('update:selected-tag-id', undefined)"
            name="合計"
            :credit="totalCredit"
            :selected="selectedTagId == undefined"
            :textfield="false"
            drag-handle="hide"
            class="filter-all__tag-list-content"
          ></TagListContent>
        </div>
        <div class="credit-filter__filter-tag filter-tag">
          <div class="filter-tag__label">
            {{ mode === "filtering" ? "タグごとの単位数" : "タグの作成・編集" }}
          </div>
          <div
            v-if="mode === 'filtering' && tags.length === 0"
            class="filter-tag__no-tag"
          >
            作成済みのタグがありません。<br />
            タグを作成すると授業を分類することができます。
          </div>
          <div
            v-if="mode === 'edit' || tags.length > 0"
            class="filter-tag__mask"
          >
            <draggable
              @update:model-value="onChangeOrder"
              :model-value="innerTags"
              item-key="id"
              :animation="250"
              handle=".tag-list-content__drag-icon"
              :disabled="edittingTagId !== ''"
              @start="dragging = true"
              @end="dragging = false"
            >
              <template #item="{ element }">
                <TagListContent
                  @click="$emit('update:selected-tag-id', element.id)"
                  :name="element.name"
                  :credit="element.credit"
                  :selected="selectedTagId === element.id"
                  :textfield="edittingTagId === element.id"
                  :drag-handle="edittingTagId === '' ? 'show' : 'disabled'"
                >
                  <template #textfiled>
                    <TextFieldSingleLine
                      @enter-text-field="() => onClickNormalBtn(element)"
                      v-model.trim="textfieldValue"
                      placeholder="タグ名"
                    ></TextFieldSingleLine>
                  </template>
                  <template #btns>
                    <IconButton
                      @click="() => onClickNormalBtn(element)"
                      size="small"
                      color="normal"
                      :icon-name="
                        edittingTagId === element.id ? 'check' : 'edit'
                      "
                      :state="
                        edittingTagId === '' ||
                        (edittingTagId === element.id && textfieldValue !== '')
                          ? 'default'
                          : 'disabled'
                      "
                    ></IconButton>
                    <IconButton
                      @click="() => onClickDangerBtn(element)"
                      size="small"
                      color="danger"
                      :icon-name="
                        element.id === NEW_TAG_ID ? 'clear' : 'delete'
                      "
                      :state="
                        element.id === NEW_TAG_ID || edittingTagId === ''
                          ? 'default'
                          : 'disabled'
                      "
                    ></IconButton>
                  </template>
                </TagListContent>
              </template>
            </draggable>
            <div
              v-show="mode === 'edit'"
              @click="addNewCreditTag"
              :class="{
                'filter-tag__add-btn': true,
                'add-btn': true,
                '--disabled': dragging || edittingTagId !== '',
              }"
            >
              <div class="add-btn__icon material-icons">add</div>
              <div class="add-btn__value">タグを新たに作成する</div>
            </div>
          </div>
        </div>
        <Button
          @click="
            $emit('update:mode', mode === 'filtering' ? 'edit' : 'filtering')
          "
          size="small"
          :state="edittingTagId !== '' || dragging ? 'disabled' : 'default'"
          class="credit-filter__edit-btn"
          >{{
            mode === "filtering"
              ? "タグの作成・編集"
              : "タグの作成・編集を終わる"
          }}</Button
        >
      </div>
      <div v-else class="credit-filter__info info">
        <div class="info__header">表示中の授業</div>
        <div class="info__text">
          <div v-for="(v, k) in info" :key="k" class="info__text-element">
            {{ v }}
          </div>
        </div>
      </div>
    </transition>
    <div
      v-show="mode === 'filtering'"
      @click="opened = !opened"
      :class="{
        'credit-filter__open-btn': true,
        'open-btn': true,
        '--closed': !opened,
      }"
    >
      <div class="open-btn__value">{{ opened ? "閉じる" : "開く" }}</div>
      <div
        :class="{
          'open-btn__icon': true,
          'material-icons': true,
          '--turned': !opened,
        }"
      >
        expand_less
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/styles";

.credit-filter {
  width: 100%;

  &__filter-year {
    margin-bottom: $spacing-8;

    &.--edit {
      margin-bottom: $spacing-7;
    }
  }

  &__filter-all {
    margin-bottom: $spacing-4;
  }

  &__edit-btn {
    margin: $spacing-4 $spacing-0 $spacing-5;
  }

  &__open-btn {
    margin: $spacing-0 auto;
  }

  &__info {
    margin-bottom: $spacing-3;
  }
}

.filter-all {
  &__label {
    margin-bottom: $spacing-2;
    font-weight: 500;
    user-select: none;
  }
}

.filter-tag {
  &__label {
    margin-bottom: $spacing-2;
    font-weight: 500;
    user-select: none;
  }

  &__mask {
    max-height: calc(3.4rem * 6.5 + 0.8rem); // タグ6個半 + padding
    padding: $spacing-2 $spacing-2 $spacing-2 $spacing-0;

    overflow-y: auto;
    @include scroll-mask;
  }

  &__no-tag {
    padding: $spacing-2 $spacing-0;
    color: getColor(--color-disabled);
    user-select: none;
    line-height: $multi-line;
    font-size: $font-small;
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

.open-btn {
  width: max-content;

  display: flex;
  align-items: center;
  gap: $spacing-1;

  color: getColor(--color-button-gray);

  @include button-cursor;

  &__value {
    font-size: $font-small;
  }
  &__icon {
    font-size: 2.4rem;
    transition: $transition-transform;

    &.--turned {
      transform: rotate(180deg);
    }
  }
}

.info {
  &__header {
    user-select: none;

    margin-bottom: $spacing-3;
    font-weight: 500;
  }

  &__text {
    display: flex;
    gap: $spacing-3;

    user-select: none;
  }
}
</style>
