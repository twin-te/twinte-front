<template>
  <PageHeader v-show="calLoading" :calendar="calendar" atHome></PageHeader>
  <article class="main">
    <ToggleButton
      class="main__toggle"
      :labels="label"
      :onClickToggleButton="todoFn"
    />
    <div class="main__module">
      {{ moduleJa }}
    </div>
    <ToggleIconButton
      class="main__module-btn"
      @click="todoFn"
      size="small"
      color="normal"
      icon-name="expand_more"
      :is-active="false"
    />
    <Button class="main__btn" @click="setCurrentModule" size="small"
      >現在の学期</Button
    >

    <div class="main__table table">
      <div
        v-for="(_, d) in 5"
        :key="weeks[d]"
        :class="{ table__day: true, 'table__day--first': d == 0 }"
      >
        {{ weeks[d] }}
      </div>
      <template v-for="(y, period) in table" :key="y">
        <div class="table__period">{{ period + 1 }}</div>
        <CourseTile
          v-for="(x, id) in y"
          :key="id"
          class="table__course"
          @click="onClickCourseTile(x)"
          :state="x.state"
          :courseName="x.name"
          :courseId="x.id"
        />
      </template>
    </div>
  </article>
  <Modal v-if="activeCourseTile !== null" @click="resetCourseTileState">
    <p>{{ activeCourseTile.id }}, {{ activeCourseTile.name }}</p>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CourseTile, {
  State as CourseTileState,
} from "~/components/CourseTile.vue";
import ToggleButton, { Labels } from "~/components/ToggleButton.vue";
import ToggleIconButton from "~/components/ToggleIconButton.vue";
import Button from "~/components/Button.vue";
import Modal from "~/components/Modal.vue";
import PageHeader, { Calendar } from "~/components/PageHeader.vue";
import { dayJaList } from "~/entities/day";
import { ModuleJa, moduleToJa } from "~/entities/module";
import { CourseModule } from "~/api/@types";
import { tableConstructor } from "~/entities/table";
import { getCurrentModule } from "~/usecases/getCurrentModule";
import { getCalendar } from "~/usecases/getCalendar";
import { useUsecase } from "~/usecases";

type CourseState = {
  id: string;
  name: string;
  state: CourseTileState;
};

export default defineComponent({
  name: "Table",
  components: {
    CourseTile,
    ToggleButton,
    ToggleIconButton,
    Button,
    Modal,
    PageHeader,
  },
  setup: () => {
    const label: Labels = { left: "通常", right: "特殊" };

    const module = ref<CourseModule>("SpringA");
    const { state: currentModule } = useUsecase(getCurrentModule, "SpringA");
    const moduleJa = computed<ModuleJa>(() => moduleToJa(module.value));

    const weeks = dayJaList;
    const activeCourseTile = ref<CourseState | null>(null);
    const table = computed(() =>
      tableConstructor<CourseState>({ name: "", id: "", state: "none" })
    );
    const { ready: calLoading, state: calendar } = useUsecase(
      getCalendar,
      {} as Calendar
    );

    const setCurrentModule = () => {
      module.value = currentModule.value;
    };
    const onClickCourseTile = (course: CourseState) => {
      activeCourseTile.value = course;
    };
    const resetCourseTileState = () => {
      activeCourseTile.value = null;
    };

    const todoFn = () => console.warn("not implements");

    return {
      weeks,
      label,
      moduleJa,
      todoFn,
      table,
      calLoading,
      calendar,
      setCurrentModule,
      activeCourseTile,
      onClickCourseTile,
      resetCourseTileState,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

.main {
  display: grid;
  border-radius: 1.6rem 1.6rem 0 0;
  box-shadow: $shadow-base;
  padding: 1.6rem 1.2rem;
  height: calc(100vh - 6rem);
  grid-template:
    "toggle module module-btn btn" 2.8rem
    "table table table table" 1fr
    / 12rem 1fr 1fr 10.4rem;

  &__toggle {
    grid-area: toggle;
  }

  &__module {
    color: $text-main;
    margin: auto 0.6rem auto auto;
    grid-area: module;
  }

  &__module-btn {
    grid-area: module-btn;
  }

  &__btn {
    grid-area: btn;
  }

  &__table {
    margin-top: 1.2rem;
    grid-area: table;
  }
}

.table {
  display: grid;
  grid-template-rows: 1.4rem repeat(6, 1fr);
  grid-template-columns: 2rem repeat(5, 1fr);
  gap: 0.2rem;
  height: 100%;

  &__day {
    color: $text-sub;
    margin: auto;
    &--first {
      grid-column-start: 2;
    }
  }

  &__period {
    color: $text-sub;
    margin: auto auto auto 0;
  }

  /* &__course {
  } */
}
</style>
