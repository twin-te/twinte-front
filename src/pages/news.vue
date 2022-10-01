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
        <div v-for="_news in news" :key="_news.id" class="news__row">
          <NewsBox
            :title="_news.title"
            :content="_news.content"
            :publicationDate="formatDatetime(_news.publishedAt)"
          ></NewsBox>
        </div>
        <div v-if="news.length === 0" class="news__not-news">
          表示できるお知らせはありません。
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent } from "vue";
import { Information } from "~/api/@types";
import IconButton from "~/components/IconButton.vue";
import NewsBox from "~/components/NewsBox.vue";
import PageHeader from "~/components/PageHeader.vue";
import { formatDatetime } from "~/entities/news";
import { displayToast } from "~/entities/toast";
import { usePorts } from "~/usecases";
import { getNews } from "~/usecases/getNews";

export default defineComponent({
  components: {
    IconButton,
    PageHeader,
    NewsBox,
  },
  setup: async () => {
    const ports = usePorts();

    useHead({
      title: "Twin:te | お知らせ",
    });

    const news: Information[] = await getNews(ports)().catch(() => {
      displayToast(ports)(
        "お知らせの更新に失敗しました。ネットワーク環境をご確認ください。"
      );
      return [];
    });
    return {
      formatDatetime,
      news,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/styles";
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
