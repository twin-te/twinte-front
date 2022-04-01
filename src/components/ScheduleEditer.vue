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
      v-for="(schedule, index) in schedules"
      :key="index"
      class="schedule-editer__row"
    >
      <div class="schedule-editer__container">
        <Dropdown
          v-model:selectedOption="schedule.module"
          :options="semesterOptions"
          :label="index > 0 ? '' : '学期'"
        ></Dropdown>
        <Dropdown
          v-model:selectedOption="schedule.day"
          :options="dateOptions"
          :label="index > 0 ? '' : '曜日'"
        ></Dropdown>
        <Dropdown
          v-model:selectedOption="schedule.period"
          :options="periodOptions"
          :label="index > 0 ? '' : '時限'"
        ></Dropdown>
      </div>
      <div
        v-if="index > 0"
        class="schedule-editer__row__remove"
        @click="emitRemoveEvent(index, $event)"
      >
        <span class="material-icons">close</span>
      </div>
    </section>
    <div class="schedule-editer__add" @click="emitAddEvent">
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
