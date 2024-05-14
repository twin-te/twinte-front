<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Button from "./Button.vue";

export default defineComponent({
  components: {
    Button,
  },
  props: {
    errorMessage: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const router = useRouter();

    const reload = () => {
      location.reload();
    };

    const goToHome = () => {
      router.push("/");
    };

    const goToFeedback = () => {
      router.push("/feedback");
    };

    return { reload, goToHome, goToFeedback };
  },
});
</script>

<template>
  <div class="error">
    <div class="error__icon material-icons">error_outline</div>
    <div class="error__message">
      {{ errorMessage }}
    </div>
    <div class="error__bottom">
      <Button @click="goToHome">ホームに戻る</Button>
      <Button @click="goToFeedback">フィードバックを送る</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.error {
  @include center-flex(column);
  width: 100%;
  height: 100vh;
  background: var(--base-liner);
  color: var(--text-sub-light);
  &__icon {
    font-size: 10rem;
    opacity: 0.2;
  }
  &__message {
    margin: 1rem 0 4rem;
    opacity: 0.7;
  }
  &__bottom {
    @include center-flex(column);
    gap: 2rem;
  }
}
</style>
