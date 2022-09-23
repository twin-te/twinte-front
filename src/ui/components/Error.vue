<script lang="ts">
import { defineComponent } from "vue";
import IconButton from "./IconButton.vue";
import PageHeader from "./PageHeader.vue";

export default defineComponent({
  components: {
    PageHeader,
    IconButton,
  },
  props: {
    errorMessage: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const reload = () => {
      location.reload();
    };
    return { reload };
  },
});
</script>

<template>
  <PageHeader>
    <template #left-button-icon>
      <IconButton
        size="large"
        color="normal"
        icon-name="arrow_back"
        @click="reload"
      ></IconButton>
    </template>
    <template #title></template>
  </PageHeader>
  <div class="error">
    <div class="error__icon material-icons">error_outline</div>
    <div class="error__message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.error {
  @include center-asolute;
  @include center-flex(column);
  width: 80%;
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
