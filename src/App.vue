<template>
  <Layout>
    <Suspense>
      <router-view v-if="!hasError" />
      <div class="error" v-else>
        <Error :errorMessage="errorMessage"></Error>
      </div>
    </Suspense>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import { isErrorObj } from "~/usecases/error";
import Error from "~/components/errro.vue";
import Layout from "~/templates/Layout.vue";

export default defineComponent({
  name: "App",
  components: { Error, Layout },
  setup: () => {
    const hasError = ref(false);
    const errorMessage = ref("");
    onErrorCaptured((error) => {
      hasError.value = true;
      if (isErrorObj(error)) {
        errorMessage.value = error.message ?? "";
      }
    });
    return { hasError, errorMessage };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";

.error {
  @include center-asolute;
  width: 80%;
}
</style>
