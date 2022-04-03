<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Schedule } from "~/entities/schedule";
import Dropdown, { Options as DropdownOptions } from "./Dropdown.vue";
import { scheduleModuleJaList } from "~/entities/module";
import { scheduleDayJaList } from "~/entities/day";
import { schedulePeriods } from "~/entities/period";

export default defineComponent({
  components: { Dropdown },
  props: {
    schedules: {
      type: Object as PropType<Schedule[]>,
      required: true,
    },
  },
  emits: ["update:schedule", "click-add-button", "click-remove-button"],
  setup(_, { emit }) {
    const semesterOptions = ref<DropdownOptions>(scheduleModuleJaList);
    const dateOptions = ref<DropdownOptions>(scheduleDayJaList);
    const periodOptions = ref<DropdownOptions>(schedulePeriods);
    const emitAddEvent = (e: MouseEvent) => {
      emit("click-add-button", e);
    };
    const emitRemoveEvent = (index: number, e: MouseEvent) => {
      emit("click-remove-button", index, e);
    };
    return {
      semesterOptions,
      dateOptions,
      periodOptions,
      emitAddEvent,
      emitRemoveEvent,
    };
  },
});
</script>

<template>
  <div class="schedule-editer">
    <section
      class="schedule-editer__row"
      v-for="(schedule, index) in schedules"
      :key="index"
    >
      <div class="schedule-editer__container">
        <Dropdown
          :options="semesterOptions"
          v-model:selectedOption="schedule.module"
          :label="index > 0 ? '' : '学期'"
        ></Dropdown>
        <Dropdown
          :options="dateOptions"
          v-model:selectedOption="schedule.day"
          :label="index > 0 ? '' : '曜日'"
        ></Dropdown>
        <Dropdown
          :options="periodOptions"
          v-model:selectedOption="schedule.period"
          :label="index > 0 ? '' : '時限'"
        ></Dropdown>
      </div>
      <div
        v-if="index > 0"
        @click="emitRemoveEvent(index, $event)"
        class="schedule-editer__row__remove"
      >
        <span class="material-icons">close</span>
      </div>
    </section>
    <div @click="emitAddEvent" class="schedule-editer__add">
      <span class="material-icons">add</span>追加する
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/styles";

.schedule-editer {
  &__row {
    display: flex;
    align-items: center;
    &:not(:first-child) {
      margin-top: $spacing-5;
    }
    &__remove {
      padding-left: $spacing-2;
      @include button-cursor;
      @include text-button;
    }
  }
  &__container {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 1fr);
    width: 30rem;
    gap: $spacing-2;
  }
  &__add {
    @include button-cursor;
    @include text-button;
    margin-top: $spacing-2;
    padding: $spacing-2 $spacing-1;
    span {
      margin-right: $spacing-1;
    }
  }
}
</style>
