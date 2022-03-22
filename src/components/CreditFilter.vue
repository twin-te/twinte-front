<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue";
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

    type TagListContent = CreditTag & {
      textfieldValue: string;
      normalBtn: "edit" | "check";
      dangerBtn: "delete" | "clear";
    };

    const tagListContents = computed<TagListContent[]>(() =>
      reactive(
        props.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          credit: tag.credit,
          textfieldValue: tag.name,
          normalBtn: "edit",
          dangerBtn: "delete",
        }))
      )
    );

    const btnDisabled = computed(() =>
      tagListContents.value.some(({ normalBtn }) => normalBtn === "check")
    );

    const isNewTag = (id: string) => id.slice(0, 7) === "new-tag";

    const handleNormalBtnClick = (content: TagListContent) => {
      if (content.normalBtn === "edit") {
        content.normalBtn = "check";
      } else if (content.textfieldValue !== "") {
        if (isNewTag(content.id)) emit("create-tag", content.textfieldValue);
        else emit("update-tag-name", content.id, content.textfieldValue);
        content.normalBtn = "edit";
      }
    };

    const handleDangerBtnClick = (content: TagListContent) => {
      if (content.dangerBtn === "clear") {
        const idx = tagListContents.value.findIndex(
          (tag) => tag.id === content.id
        );
        if (idx == -1) return;
        tagListContents.value.splice(idx, 1);
      } else {
        emit("delete-tag", content.id);
      }
    };

    const newTagCount = ref(0);

    const addBlankTagListContent = () => {
      const content: TagListContent = {
        id: `new-tag-${(newTagCount.value += 1)}`,
        name: "",
        credit: "0.0",
        textfieldValue: "",
        normalBtn: "check",
        dangerBtn: "clear",
      };
      tagListContents.value.push(content);
    };

    const changeMode = () => {
      emit("update:mode", props.mode === "filtering" ? "edit" : "filtering");
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
      tagListContents,
      handleNormalBtnClick,
      handleDangerBtnClick,
      btnDisabled,
      addBlankTagListContent,
      changeMode,
      info,
    };
  },
});
</script>

<template>
  <div class="credit-filter">
    <div v-show="opened" class="credit-filter__filters">
      <Dropdown
        @update:selected-option="(year) => $emit('update:selected-year', year)"
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
          mode="filtering"
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
          作成されたタグがありません
        </div>
        <div v-if="mode === 'edit' || tags.length > 0" class="filter-tag__mask">
          <TagListContent
            v-for="content in tagListContents"
            :key="content.id"
            @click="$emit('update:selected-tag-id', content.id)"
            :name="content.name"
            :credit="content.credit"
            :mode="mode"
            :selected="selectedTagId === content.id"
            :textfield="mode === 'edit' && content.normalBtn === 'check'"
            drag-handle="show"
          >
            <template #textfiled>
              <TextFieldSingleLine
                @enter-text-field="() => handleNormalBtnClick(content)"
                v-model.trim="content.textfieldValue"
                placeholder="タグ名"
              ></TextFieldSingleLine>
            </template>
            <template #btns>
              <IconButton
                @click="() => handleNormalBtnClick(content)"
                size="small"
                color="normal"
                :icon-name="content.normalBtn"
                :state="
                  content.normalBtn === 'check' && content.textfieldValue === ''
                    ? 'disabled'
                    : 'default'
                "
              ></IconButton>
              <IconButton
                @click="() => handleDangerBtnClick(content)"
                size="small"
                color="danger"
                :icon-name="content.dangerBtn"
              ></IconButton>
            </template>
          </TagListContent>
          <div
            v-show="mode === 'edit'"
            @click="addBlankTagListContent"
            class="filter-tag__add-btn add-btn"
          >
            <div class="add-btn__icon material-icons">add</div>
            <div class="add-btn__value">タグを新たに作成する</div>
          </div>
        </div>
      </div>
      <Button
        @click="changeMode"
        size="small"
        :state="btnDisabled ? 'disabled' : 'default'"
        class="credit-filter__edit-btn"
        >{{
          mode === "filtering" ? "タグの作成・編集" : "タグの作成・編集を終わる"
        }}</Button
      >
    </div>
    <div v-show="!opened" class="credit-filter__info info">
      <div class="info__header">表示中の授業</div>
      <div class="info__text">
        <div v-for="(v, k) in info" :key="k" class="info__text-element">
          {{ v }}
        </div>
      </div>
    </div>

    <div
      v-show="mode === 'filtering'"
      @click="opened = !opened"
      :class="{
        'credit-filter__open-btn': true,
        'open-btn': true,
        '--closed': !opened,
      }"
    >
      <div class="open-btn__value">{{ opened ? "折りたたむ" : "開く" }}</div>
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
@import "~/scss/main.scss";

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
    margin-top: $spacing-4;
  }

  &__open-btn {
    margin: $spacing-5 auto 0;

    &.--closed {
      margin-top: $spacing-3;
    }
  }
}

.filter-all {
  &__label {
    margin-bottom: $spacing-2;
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
    padding: $spacing-2 $spacing-0;

    overflow-y: auto;
    @include scroll-mask;
  }

  &__no-tag {
    padding: $spacing-2 $spacing-0;
    color: getColor(--color-text-sub);
    user-select: none;
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

    &.--turned {
      transform: rotate(180deg);
      transition: $transition-transform;
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
