<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="icon">
    <span class="material-icons">{{ iconName }}</span>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.icon {
  @include icon-cursor;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: $circle;
  box-shadow: $shadow-p-light-concave;
  background-color: getColor(--color-primary-light);
  span {
    @include text-liner;
    line-height: $fit;
    font-size: 2.6rem;
    text-shadow: $shadow-icon;
  }
}
</style>
