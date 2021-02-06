<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="course-detail">
    <div class="course-detail__icon">
      <span class="material-icons">{{ iconName }}</span>
    </div>
    <div class="course-detail__item">{{ item }}</div>
    <div class="course-detail__value">{{ value }}</div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.course-detail {
  display: grid;
  grid-template:
    "icon ... item " auto
    "icon ... ...  " auto
    "icon ... value" auto
    / 4rem 1.6rem auto;
  text-align: left;
  &__icon {
    grid-area: icon;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: $circle;
    box-shadow: $shadow-p-light-concave;
    background-color: $primary-light;
    span {
      line-height: 1;
      font-size: 2.6rem;
      color: #6bcedc;
      background: $primary-liner;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  &__item {
    grid-area: item;
    line-height: $single-line;
    font-size: 1.2rem;
    color: $text-sub;
  }
  &__value {
    grid-area: value;
    line-height: $single-line;
    font-size: 1.4rem;
    font-weight: 500;
    color: $text-main;
  }
}
</style>
