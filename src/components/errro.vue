<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    errorMessage: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="error">
    <div class="error__icon material-icons">error_outline</div>
    <div class="error__message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/scss/main.scss";

.error {
  @include center-flex(column);
  &__icon {
    font-size: 10rem;
    opacity: 0.2;
  }
  &__message {
    margin-top: 1rem;
    opacity: 0.7;
  }
}
</style>
