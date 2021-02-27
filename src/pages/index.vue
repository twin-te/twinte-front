<template>
  <Sidebar v-show="sidebar" :isLogin="true" class="sidebar__sm"></Sidebar>
  <GrayFilter v-show="sidebar" @click="closeSidebar"></GrayFilter>
  <PageHeader
    v-show="calReady"
    :calendar="calendar"
    atHome
    @click="openSidebar"
  ></PageHeader>
  <div class="main">
    <ToggleButton
      class="main__toggle"
      :labels="label"
      :whichSelected="whichSelected"
      :onClickToggleButton="onClickLabel"
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
  </div>
  <Modal
    v-if="welcomeModal"
    class="welcome-modal"
    @click="closeWelcomeModal"
    size="large"
  >
    <template #title>Twin:teへようこそ！</template>
    <template #contents>
      <img class="modal__mascot" src="../assets/colon2.png" alt="colonの画像" />
      <p class="modal__text">
        こんにちは！<br />
        筑波大生のための時間割アプリTwin:teをご利用いただきありがとうございます。<br />
        時間割の作成や複数端末間の連携のため、ログインしてください。<br />
        ※Twin:teにログインしたことがない場合は、自動的にアカウントが作成されます。
      </p>
    </template>
    <template #button>
      <Button
        @click="closeWelcomeModal"
        size="medium"
        layout="fill"
        color="base"
        >あとで</Button
      >
      <Button
        @click="$router.push('/login')"
        size="medium"
        layout="fill"
        color="primary"
        >ログインする</Button
      >
    </template>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CourseTile, {
  State as CourseTileState,
} from "~/components/CourseTile.vue";
import ToggleButton, { Labels, Select } from "~/components/ToggleButton.vue";
import ToggleIconButton from "~/components/ToggleIconButton.vue";
import Button from "~/components/Button.vue";
import Modal from "~/components/Modal.vue";
import PageHeader, { Calendar } from "~/components/PageHeader.vue";
import Sidebar from "~/components/Sidebar.vue";
import GrayFilter from "~/components/GrayFilter.vue";
import { dayJaList } from "~/entities/day";
import { ModuleJa, moduleToJa } from "~/entities/module";
import { CourseModule } from "~/api/@types";
import { tableConstructor } from "~/entities/table";
import { getCurrentModule } from "~/usecases/getCurrentModule";
import { getCalendar } from "~/usecases/getCalendar";
import { useUsecase } from "~/usecases";
import { useRouter } from "vue-router";

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
    Sidebar,
    GrayFilter,
  },
  setup: () => {
    const router = useRouter();

    /** サブヘッダー部分 */
    const label: Labels = { left: "通常", right: "特殊" };
    const whichSelected = ref<Select>("left");
    const module = ref<CourseModule>("SpringA");
    const moduleJa = computed<ModuleJa>(() => moduleToJa(module.value));
    const { state: currentModule } = useUsecase(getCurrentModule, "SpringA");
    const { ready: calReady, state: calendar } = useUsecase(
      getCalendar,
      {} as Calendar
    );
    const weeks = dayJaList;
    const onClickLabel = () => {
      whichSelected.value = whichSelected.value === "left" ? "right" : "left";
    };

    /** サイドバー */
    const sidebar = ref(false);
    const openSidebar = () => {
      sidebar.value = true;
    };
    const closeSidebar = () => {
      sidebar.value = false;
    };

    /** table */
    const table = computed(() =>
      tableConstructor<CourseState>({ name: "", id: "", state: "none" })
    );
    const activeCourseTile = ref<CourseState | null>(null);
    const setCurrentModule = () => {
      module.value = currentModule.value;
    };
    const onClickCourseTile = async (course: CourseState) => {
      activeCourseTile.value = course;
      await router.push(`/course/${activeCourseTile.value.id}`);
    };
    const resetCourseTileState = () => {
      activeCourseTile.value = null;
    };

    const todoFn = () => console.warn("not implements");

    // welcome modal
    const login = async () => {
      await router.push("/login");
    };
    const welcomeModal = ref(true);
    const openWelcomeModal = () => {
      welcomeModal.value = true;
    };
    const closeWelcomeModal = () => {
      welcomeModal.value = false;
    };

    return {
      weeks,
      label,
      whichSelected,
      onClickLabel,
      moduleJa,
      todoFn,
      sidebar,
      openSidebar,
      closeSidebar,
      table,
      calReady,
      calendar,
      setCurrentModule,
      activeCourseTile,
      onClickCourseTile,
      resetCourseTileState,
      login,
      welcomeModal,
      openWelcomeModal,
      closeWelcomeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

.main {
  display: grid;
  border-radius: $spacing-4 $spacing-4 0 0;
  box-shadow: $shadow-base;
  padding: $spacing-4 $spacing-3;
  margin: $spacing-4 0 0;
  height: calc(100vh - 7.6rem);
  grid-template:
    "toggle module module-btn btn" $spacing-7
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
    margin-top: $spacing-3;
    grid-area: table;
  }
}

.sidebar {
  &__sm {
    position: fixed;
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
    font-size: $font-small;
    margin: auto;
    &--first {
      grid-column-start: 2;
    }
  }

  &__period {
    color: $text-sub;
    font-size: $font-small;
    margin: auto auto auto 0;
  }

  /* &__course {
  } */
}

.welcome-modal .modal {
  &__mascot {
    width: 22.8rem;
    height: 11.4rem;
    margin: 2.7rem auto 6.4rem auto;
  }
  &__text {
    font-size: $font-medium;
    line-height: $multi-line;
  }
  .button {
    width: calc(50% - 1.2rem);
    &:first-child {
      margin-right: 1.2rem;
    }
    &:last-child {
      margin-left: 1.2rem;
    }
  }
}
</style>
