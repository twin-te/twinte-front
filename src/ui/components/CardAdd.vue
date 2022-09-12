<script lang="ts">
import { defineComponent } from "vue";
import Card from "./Card.vue";
import DecoratedIcon from "./DecoratedIcon.vue";
import IconButton from "./IconButton.vue";

export default defineComponent({
  components: { Card, DecoratedIcon, IconButton },
  props: {
    iconName: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  emits: ["click-next-button"],
  setup(_, { emit }) {
    const emitClickEvent = (e: MouseEvent) => {
      emit("click-next-button", e);
    };

    return { emitClickEvent };
  },
});
</script>

<template>
  <Card :width="width">
    <div class="card-add">
      <div class="card-add__icon">
        <DecoratedIcon :iconName="iconName"></DecoratedIcon>
      </div>
      <div class="card-add__heading">{{ heading }}</div>
      <div class="card-add__text">{{ text }}</div>
      <div class="card-add__button">
        <IconButton
          size="medium"
          color="normal"
          iconName="arrow_forward"
          @click="emitClickEvent"
        ></IconButton>
      </div>
    </div>
  </Card>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.card-add {
  display: grid;
  grid-template:
    "icon ... heading ... button" auto
    "icon ... ...     ... button" $spacing-2
    "icon ... text    ... button" auto
    / auto $spacing-5 1fr $spacing-5 auto;
  text-align: left;
  &__icon {
    @include center-flex;
    grid-area: icon;
  }
  &__heading {
    @include text-main;
    grid-area: heading;
  }
  &__text {
    @include text-sub-discription;
    grid-area: text;
  }
  &__button {
    @include center-flex;
    grid-area: button;
  }
}
</style>
