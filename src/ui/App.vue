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
      <div class="loading">
        <p class="loading__text">Now loading...</p>
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import * as Sentry from "@sentry/vue";
import { onErrorCaptured, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { usePorts } from "~/adapter";
import { getUser } from "~/application/usecases/user/getUser";
import {
  InternalServerError,
  isResultError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import Error from "~/ui/components/Error.vue";
import { getAuthState } from "~/ui/store/auth";
import Layout from "~/ui/templates/Layout.vue";
import { setSetting } from "./store/setting";

setSetting();

const router = useRouter();

/** error */
const errorMessage = ref("");

onErrorCaptured((error) => {
  console.log("onErrorCaptured");
  console.log(error);

  if (error instanceof UnauthorizedError) {
    router.push("/login");
  } else if (error instanceof NetworkError) {
    errorMessage.value = "ネットワークエラー。通信状況をご確認下さい。";
  } else if (error instanceof InternalServerError) {
    if (error.message.includes("指定された講義は既に登録されています")) {
      errorMessage.value = "既に追加されている授業を追加しようとしています。";
    } else {
      errorMessage.value =
        "申し訳ございません。サーバー内でエラーが発生しました。";
    }
    return true;
  } else {
    errorMessage.value = error.message;
    return true;
  }

  return false;
});

const authState = getAuthState();

const ports = usePorts();

watch(authState, () => {
  if (authState) {
    getUser(ports)()
      .then((user) => {
        if (isResultError(user)) return;
        Sentry.setUser(user);
      })
      .catch(() => Sentry.setUser(null));
  } else {
    Sentry.setUser(null);
  }
});
</script>

<style scoped lang="scss">
@import "~/ui/styles";

.loading {
  @include center-flex;
  width: 100%;
  height: 100vh;
  background: var(--base-liner);
  color: var(--text-sub-light);
}
</style>
