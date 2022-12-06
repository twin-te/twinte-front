<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="news-box">
    <div class="news-box__publication-date">{{ publicationDate }}</div>
    <div class="news-box__title">{{ title }}</div>
    <!-- `content` is a reliable value, because it is provided by twin:te operator -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="news-box__content" v-html="content"></div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.news-box {
  &__publication-date {
    @include text-description-sub;
  }
  &__title {
    @include text-liner;
    margin-top: $spacing-1;
    line-height: $single-line;
    font-size: $font-large;
    font-weight: 500;
  }
  &__content {
    margin-top: $spacing-2;
    @include text-description;
    // v-html へ style を当てるには deep selector が必要
    ::v-deep(a) {
      color: getColor(--color-text-link);
    }
  }
}
</style>
