<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="course-detail-mini">
    <div class="course-detail-mini__icon">
      <span class="material-icons">{{ iconName }}</span>
    </div>
    <div class="course-detail-mini__value">{{ text }}</div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.course-detail-mini {
  @include center-flex;
  &__icon {
    @include text-main;
    @include text-liner;
    @include icon-cursor;
    @include iconlayout;
    margin-right: $spacing-1;
  }
  &__value {
    @include text-sub-discription;
  }
}
</style>
