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
    ellipsis: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <div class="course-detail-mini">
    <div class="course-detail-mini__icon">
      <span class="material-icons">{{ iconName }}</span>
    </div>
    <div
      :class="{
        'course-detail-mini__value': true,
        '--ellipsis': ellipsis,
      }"
    >
      {{ text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.course-detail-mini {
  @include center-flex;
  overflow: hidden;
  &__icon {
    @include text-main;
    @include icon-cursor;
    margin-right: $spacing-1;
    span {
      @include text-liner;
    }
  }
  &__value {
    @include text-sub-discription;
    &.--ellipsis {
      @include ellipsis;
    }
  }
}
</style>
