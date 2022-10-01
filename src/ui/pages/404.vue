<template>
  <div class="container">
    <img src="../assets/404.png" alt="404 ページが見つかりません。" />
    <Button @click="$router.back()">元のページにもどる</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Button from "~/ui/components/Button.vue";

export default defineComponent({
  components: {
    Button,
  },
  setup: () => {
    const router = useRouter();
    return { router };
  },
});
</script>

<style scoped lang="scss">
@import "~/ui/styles";

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: $spacing-16;
  height: $vh;
}
</style>
