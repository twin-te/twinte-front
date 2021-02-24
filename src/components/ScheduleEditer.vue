<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import Dropdown, {
  Options as DropdownOptions,
} from "../components/Dropdown.vue";
import ScheduleEditer from "./ScheduleEditer.vue";

type Schedules = {
  id: number;
  semester: string;
  date: string;
  period: string;
}[];

type Props = {
  schedules: Schedules;
};

export default defineComponent({
  components: { Dropdown },
  props: {
    schedules: {
      type: Object as PropType<Schedules>,
      required: true,
    },
  },
  emits: ["update:schedule", "click-add-button", "click-remove-button"],
  setup(props: Props, { emit }) {
    const semesterOptions = ref<DropdownOptions>(["春A", "春B", "春C"]);
    const dateOptions = ref<DropdownOptions>([
      "月",
      "火",
      "水",
      "木",
      "金",
      "土",
      "日",
    ]);
    const periodOptions = ref<DropdownOptions>([
      "1時限",
      "2時限",
      "3時限",
      "4時限",
      "5時限",
      "6時限",
      "7時限",
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
        @click="emitRemoveEvent(schedule.id)"
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
