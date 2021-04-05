<script lang="ts">
import { useToggle } from "@vueuse/core";
import { computed, defineComponent, PropType, ref, watch } from "vue";
import DropdownContent from "./DropdownContent.vue";

export type Options = string[];

type Props = {
  options: Options;
  selectedOption: string;
  label: string;
  placeholder: string;
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
    placeholder: {
      type: String,
      default: "指定なし",
    },
  },
  emits: ["update:selectedOption"],
  setup(props: Props, { emit }) {
    const [isOptionsShown, toggleShown] = useToggle();

    const unselectedOptions = ref(props.options);

    watch(isOptionsShown, (isOptionsShown) => {
      if (!isOptionsShown) return;
      unselectedOptions.value = props.options.filter(
        (o) => o !== props.selectedOption
      );
    });

    const isDefault = computed(() => {
      return props.placeholder === props.selectedOption;
    });

    const hasLabel = computed(() => {
      return props.label !== "";
    });

    const isSelected = (value: string) => {
      return value === props.selectedOption;
    };

    const closeOptions = () => {
      isOptionsShown.value = false;
    };

    const emitSelectedEvent = (option: string) => {
      emit("update:selectedOption", option);
    };

    return {
      unselectedOptions,
      isOptionsShown,
      isDefault,
      isSelected,
      hasLabel,
      toggleShown,
      closeOptions,
      emitSelectedEvent,
    };
  },
});
</script>

<template>
  <div class="dropdown">
    <div v-if="hasLabel" class="dropdown__label">{{ label }}</div>
    <div @click="toggleShown" v-click-away="closeOptions" class="dropdown__box">
      <div v-if="isDefault" class="dropdown__box__text--unselected">
        {{ placeholder }}
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
          v-for="option in unselectedOptions"
          :key="option"
          :value="option"
          :isSelected="isSelected(option)"
          @click="[emitSelectedEvent(option), closeOptions]"
        ></DropdownContent>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import "~/scss/main.scss";

.dropdown {
  position: relative;
  width: 100%;
  &__label {
    @include text-main;
    margin-bottom: $spacing-2;
  }
  &__box {
    @include button-cursor;
    @include text-main;
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
    width: 100%;
    position: absolute;
    z-index: 10;
    top: calc(100% + 0.6rem);
    left: 0;
    border-radius: $radius-1;
    padding: $spacing-2 0;
    background-color: $base;
    box-shadow: $shadow-convex;
  }
}
</style>
