<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Dropdown, {
  Options as DropdownOptions,
} from "../components/Dropdown.vue";

export type Schedule = {
  id: number;
  semester: string;
  date: string;
  period: string;
};
export type Schedules = Schedule[];

export default defineComponent({
  components: { Dropdown },
  props: {
    onClickAddButton: {
      type: Function,
      required: true,
    },
    onClickRemoveButton: {
      type: Function,
      required: true,
    },
    schedules: {
      type: Object as PropType<Schedules>,
      required: true,
    },
  },
  emits: ["update:schedule", "click-add-button", "click-remove-button"],
  setup(_, { emit }) {
    const semesterOptions = ref<DropdownOptions>([
      "春A",
      "春B",
      "春C",
      "秋A",
      "秋B",
      "秋C",
      "その他",
    ]);
    const dateOptions = ref<DropdownOptions>([
      "月",
      "火",
      "水",
      "木",
      "金",
      "土",
      "日",
      "その他",
    ]);
    const periodOptions = ref<DropdownOptions>([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
    ]);
    const emitAddEvent = (e: MouseEvent) => {
      emit("click-add-button", e);
    };
    const emitRemoveEvent = (id: number, e: MouseEvent) => {
      emit("click-remove-button", id, e);
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
    <div
      class="schedule-editer__row"
      v-for="(schedule, index) in schedules"
      :key="schedule.id"
    >
      <Dropdown
        :options="semesterOptions"
        v-model:selectedOption="schedule.semester"
        :label="index > 0 ? '' : '学期'"
      ></Dropdown>
      <Dropdown
        :options="dateOptions"
        v-model:selectedOption="schedule.date"
        :label="index > 0 ? '' : '曜日'"
      ></Dropdown>
      <Dropdown
        :options="periodOptions"
        v-model:selectedOption="schedule.period"
        :label="index > 0 ? '' : '時限'"
      ></Dropdown>
      <div
        v-if="index > 0"
        @click="emitRemoveEvent(schedule.id, $event)"
        class="schedule-editer__row__remove"
      >
        <span class="material-icons">close</span>
      </div>
    </div>
    <div @click="emitAddEvent" class="schedule-editer__add">
      <span class="material-icons">add</span>追加する
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/main.scss";

.schedule-editer {
  &__row {
    display: flex;
    align-items: center;
    gap: $spacing-2;
    &:not(:first-child) {
      margin-top: $spacing-5;
    }
    &__remove {
      @include button-cursor;
      @include text-button;
    }
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
