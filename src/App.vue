<template>
  <Layout>
    <Suspense>
      <router-view />
    </Suspense>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "~/templates/Layout.vue";

export default defineComponent({
  name: "App",
  components: { Layout },
  errorCaptured: (error) => {
    console.error(error);
    // TODO: トップレベルのエラーの処理を実装する 
    alert("エラーが発生しました。")
  },
});
</script>
