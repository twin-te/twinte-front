<template>
  <div class="news">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          size="large"
          color="normal"
          icon-name="arrow_back"
          @click="$router.back()"
        ></IconButton>
      </template>
      <template #title>お知らせ</template>
    </PageHeader>
    <div class="main">
      <div class="main__news">
        <div
          v-for="{ id, title, content, publishedAt } in news"
          :key="id"
          class="news__row"
        >
          <NewsBox
            :title="title"
            :content="content"
            :publicationDate="formatPublishedAt(publishedAt)"
          ></NewsBox>
        </div>
        <div v-if="news.length === 0" class="news__not-news">
          表示できるお知らせはありません。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { formatPublishedAt } from "~/presentation/presenters/news";
import IconButton from "~/ui/components/IconButton.vue";
import NewsBox from "~/ui/components/NewsBox.vue";
import PageHeader from "~/ui/components/PageHeader.vue";
import { getNews, setNews } from "../store/news";

useHead({
  title: "Twin:te | お知らせ",
});

await setNews();
const news = getNews();
</script>

<style scoped lang="scss">
@import "~/ui/styles";
.news {
  @include max-width;
}

.main {
  height: calc(#{$vh} - 6rem);
  padding: $spacing-5 0;
  &__news {
    @include scroll-mask-large;
    height: calc(#{$vh} - 6rem - (2 * #{$spacing-5}));
    padding: $spacing-3 0;
    overflow-y: auto;
  }
}

.news {
  &__row {
    margin-bottom: $spacing-10;
  }
  &__not-news {
    @include text-description;
    padding-left: 1rem;
  }
}
</style>
