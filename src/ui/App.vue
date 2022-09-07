<template>
  <div v-if="errorMessage" class="error">
    <Error :errorMessage="errorMessage"></Error>
  </div>
  <Suspense v-else>
    <template #default>
      <Layout>
        <router-view />
      </Layout>
    </template>
    <template #fallback>
      <div class="loading">now loading...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { onErrorCaptured, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { InternalServerError, NetworkError, UnauthorizedError } from "~/domain/error";
import Error from "~/ui/components/Error.vue";
import Layout from "~/ui/templates/Layout.vue";
import { setSetting } from "./store/setting";

setSetting();

const router = useRouter();

/** unregister service worker (v2) */
onMounted(() => {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
});

/** error */
const errorMessage = ref("");

onErrorCaptured((error) => {
  console.log("onErrorCaptured");
  console.log(error);

  if (error instanceof UnauthorizedError) {
    errorMessage.value = "未認証です。ログインして下さい。";
  } else if (error instanceof NetworkError) {
    errorMessage.value = "ネットワークエラー。通信状況をご確認下さい。";
  } else if (error instanceof InternalServerError) {
    errorMessage.value = "申し訳ございません。サーバー内でエラーが発生しました。";
  } else {
    errorMessage.value = error.message;
  }

  return false;
});
</script>

<style scoped lang="scss">
@import "~/ui/styles";

.loading {
  @include center-asolute;
  opacity: 0.5;
}
</style>
