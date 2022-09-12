<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { DisplayCourseTag } from "~/presentation/viewmodels/tag";
import Tag from "./Tag.vue";
import TagEditor from "./TagEditor.vue";

export type CreditCourseListContentState = "default" | "selected";

export default defineComponent({
  name: "CreditCourseListContent",
  components: {
    Tag,
    TagEditor,
  },
  props: {
    state: {
      type: String as PropType<"default" | "selected">,
      default: "default",
    },
    code: {
      // 科目番号
      type: String,
      required: true,
    },
    name: {
      // 授業名
      type: String,
      required: true,
    },
    credit: {
      // 単位数
      type: String,
      required: true,
    },
    tags: {
      type: Object as PropType<DisplayCourseTag[]>,
      required: true,
    },
  },
  emits: ["click", "click-tag", "create-tag"],
  setup(props, { emit }) {
    const assignedTags = computed(() => props.tags.filter((tag) => tag.assign));

    const onClick = () => {
      add.value = false;
      emit("click");
    };

    /** tag-editor */
    const add = ref(false);

    return {
      assignedTags,
      onClick,
      add,
    };
  },
});
</script>

<template>
  <div
    :class="{
      'credit-course-list-content': true,
      '--selected': state === 'selected',
    }"
  >
    <div
      class="credit-course-list-content__course-info course-info"
      @click="onClick"
    >
      <div class="course-info__container">
        <div class="course-info__code">{{ code }}</div>
        <div class="course-info__name">{{ name }}</div>
      </div>
      <div v-show="state !== 'selected'" class="course-info__tags">
        <Tag v-for="tag in assignedTags" :key="tag.id" :assign="true">{{
          tag.name
        }}</Tag>
      </div>
      <div class="course-info__credit">{{ credit }}</div>
      <div
        :class="{
          'course-info__expand': true,
          '--turned': state === 'selected',
          'material-icons': true,
        }"
      >
        expand_more
      </div>
    </div>
    <TagEditor
      v-show="state === 'selected'"
      v-model:add="add"
      heading="タグの編集"
      @create-tag="(tagName) => $emit('create-tag', tagName)"
    >
      <template #tags>
        <Tag
          v-for="tag in tags"
          :key="tag.id"
          :assign="tag.assign"
          @click="$emit('click-tag', tag)"
          >{{ tag.name }}
        </Tag>
        <template v-if="tags.length === 0">
          作成済みのタグがありません。<br />
          タグを作成すると授業を分類することができます。
        </template>
      </template>
      <template #btn>タグを新たに作成する</template>
    </TagEditor>
    <div
      v-show="state !== 'selected' || !add"
      class="credit-course-list-content__border"
    />
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.credit-course-list-content {
  width: 100%;

  &__border {
    width: 100%;
    height: 0.4rem;

    background: getColor(--color-base);
    box-shadow: $shadow-input-concave;
    border-radius: 0.2rem;
  }
}

.course-info {
  display: flex;
  align-items: center;
  gap: $spacing-2;

  padding: $spacing-3 $spacing-2 $spacing-2;

  @include button-cursor;

  &__container {
    flex-grow: 1;
  }

  &__code {
    color: getColor(--color-text-sub);
    font-size: $font-small;
  }

  &__name {
    margin-top: 0.2rem;
    font-weight: 500;
    line-height: $multi-line;
  }

  &__tags {
    display: flex;
    flex-direction: column;
    gap: $spacing-2;
    align-items: flex-end;
  }

  &__credit {
    font-weight: 500;
  }

  &__expand {
    color: getColor(--color-text-sub);
    font-size: $font-large;

    transition: $transition-transform;
    &.--turned {
      transform: rotate(-180deg);
    }
  }
}
</style>
