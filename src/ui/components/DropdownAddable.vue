<script lang="ts">
import { defineComponent, PropType, watch } from "vue";
import DropDown from "~/components/Dropdown.vue";
import { MethodOption, createOption } from "~/entities/method";

type Props = {
  methods: { value: MethodOption }[];
};

export default defineComponent({
  name: "DropdownAddable",
  components: {
    DropDown,
  },
  props: {
    methods: {
      type: Array as PropType<{ value: MethodOption }[]>,
      required: true,
    },
  },
  emits: ["update:methods", "click-add-button", "click-remove-button"],
  setup: (props: Props, { emit }) => {
    const add = () => {
      if (props.methods.some((obj) => obj.value === "指定なし")) return;
      emit("click-add-button");
    };
    watch(props.methods, (methods) => {
      const length = methods.length;
      if (length === 1) return;
      const i = methods.findIndex((obj) => obj.value === "指定なし");
      if (i === -1 || i === length - 1) return;
      methods.splice(i, 1);
    });

    return { createOption, add };
  },
});
</script>

<template>
  <div class="dropdown-addable">
    <div class="dropdown-addable__dropdown-row">
      <div
        class="dropdown-addable__dropdown"
        v-for="(data, i) in methods"
        :key="data.value"
      >
        <DropDown
          :options="createOption(methods)"
          v-model:selectedOption="data.value"
          :label="i === 0 ? '学期' : ''"
        >
        </DropDown>
        <div
          v-if="i"
          @click="$emit('click-remove-button', i)"
          class="dropdown-addable__remove-btn material-icons"
        >
          close
        </div>
      </div>
    </div>
    <div @click="add" class="dropdown-addable__add-btn">
      <span class="material-icons dropdown-addable__add-btn--icon">add</span>
      追加する
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/styles";

.dropdown-addable {
  &__dropdown-row {
    display: grid;
    gap: $spacing-5;
  }
  &__dropdown {
    @include center-flex;
    justify-content: flex-start;
    .dropdown {
      width: calc(100% - 2.8rem);
    }
  }
  &__remove-btn {
    color: getColor(--color-button-gray);
    font-size: 2rem;
    margin-left: $spacing-2;
    @include button-cursor;
  }
  &__add-btn {
    margin-top: $spacing-2;
    padding: $spacing-0 $spacing-1;
    @include center-flex;
    @include button-cursor;
    width: max-content;
    height: 2.8rem;
    color: getColor(--color-button-gray);
    font-weight: 500;
    line-height: $fit;
    &--icon {
      margin-right: $spacing-1;
      font-size: $font-maximum;
      font-weight: normal;
    }
  }
}
</style>
