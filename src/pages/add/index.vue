<template>
  <article class="preview">
    <section class="preview__content">
      <Button @click="clickHandler" size="small">Back to Home</Button>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Button from "../../components/Button.vue";

export default defineComponent({
  name: "Add",
  components: {
    Button,
  },
  setup: () => {
    const router = useRouter();

    const clickHandler = async () => {
      await router.push("/");
    };

    return { clickHandler };
  },
});
</script>

<style lang="scss" scoped></style>
