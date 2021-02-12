<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import DropdownContent from "./DropdownContent.vue";

export type Options = string[];

type Props = {
  options: Options;
  selectedOption: string;
  label: string;
  width: string;
};

export default defineComponent({
  components: { DropdownContent },
  props: {
    options: {
      type: Object as PropType<Options>,
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "8.8rem",
    },
  },
  emits: ["update:selectedOption"],
  setup(props: Props, { emit }) {
    const isOptionsShown = ref(false);

    const isDefault = computed(() => {
      return props.selectedOption === "";
    });

    const hasLabel = computed(() => {
      return props.label !== "";
    });

    const isSelected = (value: string) => {
      return value === props.selectedOption;
    };

    const toggleShown = () => {
      isOptionsShown.value = !isOptionsShown.value;
    };

    const emitSelectedEvent = (option: string) => {
      // option は「春A」などの文字
      emit("update:selectedOption", option);
    };

    return {
      isOptionsShown,
      isDefault,
      isSelected,
      hasLabel,
      toggleShown,
      emitSelectedEvent,
    };
  },
});
</script>

<template>
  <div class="dropdown">
    <div v-if="hasLabel" class="dropdown__label">{{ label }}</div>
    <div @click="toggleShown" class="dropdown__box" :style="{ width: width }">
      <div v-if="isDefault" class="dropdown__box__text--unselected">
        指定なし
      </div>
      <div v-else>{{ selectedOption }}</div>
      <div
        :class="{
          'material-icons': true,
          dropdown__box__icon: true,
          '--turned': isOptionsShown,
        }"
      >
        expand_more
      </div>
    </div>
    <transition name="spread-down">
      <div v-show="isOptionsShown" class="dropdown__options">
        <DropdownContent
          v-for="option in options"
          :key="option"
          :value="option"
          :isSelected="isSelected(option)"
          :width="width"
          @click="[emitSelectedEvent(option), toggleShown()]"
        ></DropdownContent>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.dropdown {
  position: relative;
  &__label {
    @include text-label;
    margin-bottom: $spacing-2;
  }
  &__box {
    @include button-cursor;
    @include text-label;
    display: flex;
    justify-content: space-between;
    border-radius: $radius-1;
    box-shadow: $shadow-input-concave;
    padding: $spacing-2;
    background-color: $base;
    &__text--unselected {
      color: $unselected;
    }
    &__icon {
      transition: $transition-transform;
      &.--turned {
        transform: rotate(-180deg);
      }
    }
  }
  &__options {
    position: absolute;
    top: calc(100% + 0.6rem);
    left: 0;
    border-radius: $radius-1;
    padding: $spacing-2 0;
    background-color: $base;
    box-shadow: $shadow-convex;
  }
}
</style>
