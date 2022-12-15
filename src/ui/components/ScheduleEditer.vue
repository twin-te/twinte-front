<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import {
  editableDays,
  isDisplaySpecialDay,
} from "~/presentation/presenters/day";
import { editableModules } from "~/presentation/presenters/module";
import { editablePeriods } from "~/presentation/presenters/period";
import { createBlankEditableSchedule } from "~/presentation/presenters/schedule";
import { notSpecified } from "~/presentation/viewmodels/option";
import Dropdown from "./Dropdown.vue";
import type { EditableDay } from "~/presentation/viewmodels/day";
import type { EditableModule } from "~/presentation/viewmodels/module";
import type { EditablePeriod } from "~/presentation/viewmodels/period";
import type { EditableSchedule } from "~/presentation/viewmodels/schedule";

export const useScheduleEditor = (initValue: EditableSchedule[] = []) => {
  const schedules = reactive<EditableSchedule[]>(initValue);
  if (schedules.length === 0) schedules.push(createBlankEditableSchedule());

  const addSchedule = () => {
    schedules.push(createBlankEditableSchedule());
  };

  const removeSchedule = (index: number) => {
    if (schedules.length === 1) return;
    schedules.splice(index, 1);
  };

  const updateSchedules = (index: number, schedule: EditableSchedule) => {
    schedules.splice(index, 1, schedule);
  };

  return {
    schedules,
    addSchedule,
    removeSchedule,
    updateSchedules,
  };
};

export default defineComponent({
  components: { Dropdown },
  props: {
    schedules: {
      type: Object as PropType<EditableSchedule[]>,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:schedules": (index: number, schedule: EditableSchedule) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "click-add-button": () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "click-remove-button": (index: number) => true,
  },
  setup(_, { emit }) {
    const updateModule = (
      index: number,
      schedule: EditableSchedule,
      module: EditableModule
    ) => {
      emit("update:schedules", index, { ...schedule, module });
    };

    const updateDay = (
      index: number,
      schedule: EditableSchedule,
      day: EditableDay
    ) => {
      if (isDisplaySpecialDay(day))
        emit("update:schedules", index, { module: schedule.module, day });
      else
        emit("update:schedules", index, {
          period: notSpecified,
          ...schedule,
          day,
        });
    };

    const updatePeriod = (
      index: number,
      schedule: EditableSchedule,
      period: EditablePeriod
    ) => {
      if ("period" in schedule)
        emit("update:schedules", index, { ...schedule, period });
    };

    const onClickAddButton = () => {
      emit("click-add-button");
    };
    const onClickRemoveButton = (index: number) => {
      emit("click-remove-button", index);
    };

    return {
      editableDays,
      editablePeriods,
      editableModules,
      notSpecified,
      isDisplaySpecialDay,
      updateModule,
      updateDay,
      updatePeriod,
      onClickAddButton,
      onClickRemoveButton,
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
          :selectedOption="schedule.module"
          :options="editableModules"
          :label="index > 0 ? '' : '学期'"
          @update:selectedOption="
            (module) => updateModule(index, schedule, module)
          "
        ></Dropdown>
        <Dropdown
          :selectedOption="schedule.day"
          :options="editableDays"
          :label="index > 0 ? '' : '曜日'"
          @update:selectedOption="(day) => updateDay(index, schedule, day)"
        ></Dropdown>
        <Dropdown
          :selectedOption="
            'period' in schedule ? schedule.period : notSpecified
          "
          :options="
            isDisplaySpecialDay(schedule.day) ? [notSpecified] : editablePeriods
          "
          :label="index > 0 ? '' : '時限'"
          :state="isDisplaySpecialDay(schedule.day) ? 'disabled' : 'default'"
          @update:selectedOption="
            (period) => updatePeriod(index, schedule, period)
          "
        ></Dropdown>
      </div>
      <div
        v-if="index > 0"
        class="schedule-editer__row__remove"
        @click="onClickRemoveButton(index)"
      >
        <span class="material-icons">close</span>
      </div>
    </section>
    <div class="schedule-editer__add" @click="onClickAddButton">
      <span class="material-icons">add</span>追加する
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

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
