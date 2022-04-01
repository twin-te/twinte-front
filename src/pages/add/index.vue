<template>
  <div class="add">
    <PageHeader>
      <template #left-button-icon>
        <div class="header__left-button-icon">
          <IconButton
            size="large"
            color="normal"
            iconName="menu"
            @click="toggleSidebar"
          ></IconButton>
        </div>
      </template>
      <template #title>授業の追加</template>
    </PageHeader>
    <div class="main">
      <section class="main__card">
        <CardAdd
          iconName="search"
          heading="授業の検索"
          text="ワードや条件を指定して授業を検索・追加します。"
          @click-next-button="$router.push('/add/search')"
        ></CardAdd>
      </section>
      <section v-if="isMobile" class="main__card">
        <CardAdd
          iconName="get_app"
          heading="TWINSからインポート"
          text="TWINSで登録した授業をモジュール単位でインポートします。"
          @click-next-button="$router.push('/add/twins')"
        ></CardAdd>
      </section>
      <section class="main__card">
        <CardAdd
          iconName="insert_drive_file"
          heading="CSVファイルから追加"
          text="CSVファイルに入っている授業データを追加します。"
          @click-next-button="$router.push('/add/csv')"
        ></CardAdd>
      </section>
      <section class="main__card">
        <CardAdd
          iconName="styles"
          heading="手動で授業を作成"
          text="手入力でカスタマイズして授業を作成します。"
          @click-next-button="$router.push('/add/manual')"
        ></CardAdd>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import CardAdd from "~/components/CardAdd.vue";
import IconButton from "~/components/IconButton.vue";
import PageHeader from "~/components/PageHeader.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "~/store";
import { useHead } from "@vueuse/head";
import { isMobile as isMobileFn } from "~/usecases/ua";

export default defineComponent({
  name: "Add",
  components: {
    CardAdd,
    IconButton,
    PageHeader,
  },
  setup: () => {
    useHead({
      title: "Twin:te | 授業追加",
    });

    const store = useStore();

    /** ヘッダー */
    const toggleSidebar = () => {
      store.commit("setSidebar", !store.state.sidebar);
    };

    const isMobile = ref(isMobileFn());

    return {
      CardAdd,
      IconButton,
      PageHeader,
      toggleSidebar,
      isMobile,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~/styles";

@include header-left-button-delete;

.add {
  margin: $spacing-0;
  @include max-width;
}

.main {
  display: flex;
  flex-direction: column;
  height: calc(#{$vh} - 9.2rem);
  margin-top: $spacing-8;
  &__card {
    margin-bottom: $spacing-4;
  }
}
</style>
