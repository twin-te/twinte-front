<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import IconButton from "./IconButton.vue";
import TextFieldSingleLine from "./TextFieldSingleLine.vue";
import TagListContent from "./TagListContent.vue";

export default defineComponent({
  name: "TagEditor",
  components: {
    IconButton,
    TextFieldSingleLine,
    TagListContent,
  },
  props: {
    add: {
      type: Boolean,
      required: true,
    },
    heading: {
      // タグ表示欄のタイトル
      type: String,
      required: true,
    },
  },
  emits: ["update:add", "create-tag"],
  setup(props, { emit }) {
    const tagName = ref("");

    const disabled = computed(() => {
      return tagName.value == "";
    });

    const handleClick = () => {
      tagName.value = "";
      emit("update:add", !props.add);
    };

    const handleCheck = () => {
      if (disabled.value) return;
      emit("create-tag", tagName.value);
      emit("update:add", false);
    };

    const handleClear = () => {
      emit("update:add", false);
    };

    return {
      tagName,
      disabled,
      handleClick,
      handleCheck,
      handleClear,
    };
  },
});
</script>

<template>
  <div class="tag-editor">
    <p class="tag-editor__heading">{{ heading }}</p>
    <section class="tag-editor__contents">
      <div class="tag-editor__tags">
        <slot name="tags" />
      </div>
      <TagListContent
        v-show="add"
        class="tag-editor__tag-list-content"
        mode="edit"
        :selected="false"
        :textfield="true"
        drag-handle="hide"
      >
        <template #textfiled>
          <TextFieldSingleLine
            @enter-text-field="handleCheck"
            v-model.trim="tagName"
            placeholder="タグ名"
          ></TextFieldSingleLine>
        </template>
        <template #btns>
          <IconButton
            @click="handleCheck"
            size="small"
            color="normal"
            icon-name="check"
            :state="disabled ? 'disabled' : 'default'"
          ></IconButton>
          <IconButton
            @click="handleClear"
            size="small"
            color="danger"
            icon-name="clear"
          ></IconButton>
        </template>
      </TagListContent>
      <div v-show="!add" @click="handleClick" class="tag-editor__button button">
        <div class="button__icon material-icons">add</div>
        <div class="button__value">
          <slot name="btn" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "~/styles";

.tag-editor {
  width: 100%;
  display: grid;
  row-gap: $spacing-3;

  padding: $spacing-2;

  &__heading {
    font-size: $font-small;
    color: getColor(--color-text-sub);
  }
  &__contents {
    display: flex;
    flex-direction: column;
    gap: $spacing-2;
  }
  &__tags {
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: $spacing-3 $spacing-2;

    color: getColor(--color-disabled);
    font-size: $font-small;
    line-height: $multi-line;
  }
}

.button {
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
</style>
