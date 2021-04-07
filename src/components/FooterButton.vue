<script lang="ts">
import { defineComponent, PropType } from "vue";
import Button, { State } from "~/components/Button.vue";

export default defineComponent({
  components: {
    Button,
  },
  props: {
    onButtonClick: {
      type: Function,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonState: {
      type: String as PropType<State>,
      default: "default",
    },
  },
  emits: ["button-click"],
});
</script>

<template>
  <div class="footer-button">
    <div class="footer-button__button">
      <Button
        @click="$emit('button-click')"
        size="large"
        layout="fill"
        color="primary"
        :state="buttonState"
        >{{ buttonText }}</Button
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/scss/main.scss";

.footer-button {
  width: 100%;
  height: 7rem;
  &__button {
    @include center-flex;
  }
}
</style>
