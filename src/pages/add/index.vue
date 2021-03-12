<template>
  <div class="add">
    <PageHeader>
      <template #left-button-icon>
        <div class="header__left-button-icon">
          <IconButton
            @click="toggleSidebar"
            size="large"
            color="normal"
            iconName="menu"
          ></IconButton>
        </div>
      </template>
      <template #title>授業の追加</template>
    </PageHeader>
    <div class="main">
      <div class="main__card">
        <CardAdd
          @click-next-button="$router.push('/')"
          iconName="search"
          heading="授業の検索"
          text="ワードや条件を指定して授業を検索・追加します。"
        ></CardAdd>
      </div>
      <div class="main__card">
        <CardAdd
          @click-next-button="$router.push('/')"
          iconName="get_app"
          heading="Twinsからインポート"
          text="Twinsで登録した授業をモジュール単位でインポートします。"
        ></CardAdd>
      </div>
      <div class="main__card">
        <CardAdd
          @click-next-button="$router.push('/')"
          iconName="insert_drive_file"
          heading="CSVファイルから追加"
          text="CSVファイルに入っている授業データを追加します。"
        ></CardAdd>
      </div>
      <div class="main__card">
        <CardAdd
          @click-next-button="$router.push('/')"
          iconName="style"
          heading="手動で授業を作成"
          text="手入力でカスタマイズして授業を作成します。"
        ></CardAdd>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CardAdd from "~/components/CardAdd.vue";
import IconButton from "~/components/IconButton.vue";
import PageHeader from "~/components/PageHeader.vue";
import { defineComponent } from "vue";
import { useStore } from "~/store";

export default defineComponent({
  name: "Add",
  components: {
    CardAdd,
    IconButton,
    PageHeader,
  },
  setup: () => {
    const store = useStore();

    /** ヘッダー */
    const toggleSidebar = () => {
      store.commit("setSidebar", !store.state.sidebar);
    };

    return {
      CardAdd,
      IconButton,
      PageHeader,
      toggleSidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

@include header-left-button-delete;

.add {
  margin: $spacing-0;
  @include max-width;
}

.main {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 7.6rem);
  margin-top: $spacing-8;
  &__card {
    margin-bottom: $spacing-4;
  }
}
</style>
