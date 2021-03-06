<template>
  <div class="add">
    <PageHeader>
      <template #left-btn>
        <IconButton
          @click="toggleSidebar"
          size="large"
          color="normal"
          iconName="menu"
        ></IconButton
      ></template>
      <template #title>授業の追加</template>
    </PageHeader>
    <div class="main">
      <CardAdd
        @click-next-button="moveTo('/')"
        iconName="search"
        heading="授業の検索"
        text="ワードや条件を指定して授業を検索・追加します。"
      ></CardAdd>
      <CardAdd
        @click-next-button="moveTo('/')"
        iconName="get_app"
        heading="Twinsからインポート"
        text="Twinsで登録した授業をモジュール単位でインポートします。"
      ></CardAdd>
      <CardAdd
        @click-next-button="moveTo('/')"
        iconName="insert_drive_file"
        heading="CSVファイルから追加"
        text="CSVファイルに入っている授業データを追加します。"
      ></CardAdd>
      <CardAdd
        @click-next-button="moveTo('/')"
        iconName="style"
        heading="手動で授業を作成"
        text="手入力でカスタマイズして授業を作成します。"
      ></CardAdd>
    </div>
  </div>
</template>

<script lang="ts">
import CardAdd from "~/components/CardAdd.vue";
import IconButton from "~/components/IconButton.vue";
import PageHeader from "~/components/PageHeader.vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "~/store";

export default defineComponent({
  name: "Add",
  components: {
    CardAdd,
    IconButton,
    PageHeader,
  },
  setup: () => {
    const router = useRouter();
    const store = useStore();

    /** ヘッダー */
    const toggleSidebar = () => {
      store.commit("setSidebar", !store.state.sidebar);
    };

    /** メインコンテンツ */
    const moveTo = async (path: string) => {
      await router.push(path);
    };

    return {
      CardAdd,
      moveTo,
      IconButton,
      PageHeader,
      toggleSidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.add {
  margin: $spacing-0 $spacing-0;
  @include tab-and-pc {
    margin: $spacing-0 $spacing-9;
  }
  max-width: $max-pc-item-width;
}

.main {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 7.6rem);
  margin: $spacing-7 $spacing-4 $spacing-0;
  @include tab-and-pc {
    margin: $spacing-4 $spacing-0 $spacing-0;
  }
  gap: $spacing-4 $spacing-0;
}
</style>
