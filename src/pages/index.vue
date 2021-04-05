<template>
  <div class="home">
    <PageHeader :calendar="calendar" atHome>
      <template #left-button-icon>
        <IconButton
          @click="toggleSidebar"
          size="large"
          color="normal"
          iconName="menu"
          class="header__left-button-icon"
        ></IconButton
      ></template>
    </PageHeader>
    <section class="main">
      <ToggleButton
        class="main__toggle"
        :labels="label"
        :whichSelected="whichSelected"
        :onClickToggleButton="onClickLabel"
      />
      <div
        class="main__module"
        v-click-away="closePopup"
        v-if="whichSelected === 'left'"
      >
        <div class="main__module-text">
          {{ module }}
        </div>
        <div class="main__module-selector">
          <IconButton
            class="main__module-btn"
            @click="togglePopup"
            size="small"
            color="normal"
            icon-name="expand_more"
            :is-active="false"
          />
          <Popup class="main__module-popup" v-show="popup">
            <PopupContent
              v-for="data in popupData"
              :key="data"
              @click="onClickModule(data)"
              :value="data"
            >
            </PopupContent>
          </Popup>
        </div>
      </div>
      <Button
        v-if="whichSelected === 'left'"
        :state="isCurrentModule ? 'active' : 'default'"
        class="main__btn"
        @click="setCurrentModule"
        size="small"
      >
        現在の学期
      </Button>

      <div
        :class="{
          main__table: true,
          table: true,
          'main__table--popup': popup,
        }"
        :style="{ gridTemplateRows: `1.4rem repeat(${table[0].length}, 1fr)` }"
        v-if="whichSelected === 'left'"
      >
        <div
          v-for="period in table[0].length"
          :key="period"
          :class="{
            table__period: true,
            'table__period--first': period == 1,
          }"
        >
          {{ period }}
        </div>
        <template v-for="(y, d) in table" :key="d">
          <div class="table__day">
            {{ weeks[d] }}
          </div>
          <CourseTile
            v-for="(courses, id) in y"
            :key="id"
            class="table__course"
            @click="onClickCourseTile(courses, weeks[d], id + 1)"
            :state="courses.length === 0 ? 'none' : 'default'"
            :name="courses[0]?.name ?? ''"
            :room="courses[0]?.room ?? ''"
            :caution="courses.length > 1 ? `他${courses.length - 1}件` : ''"
          />
        </template>
      </div>
      <section class="special" v-else>
        <template v-for="(value, key) in specialTable" :key="key">
          <div class="special-header">
            <div class="special-header__label">{{ specialDayMap[key] }}</div>
            <div class="special-header__divider"></div>
          </div>
          <div class="special-container">
            <div
              class="special-contents"
              v-for="course in value"
              :key="course.id"
            >
              <div class="special-contents__module">
                <span v-for="m in course.module" :key="m">{{ m }}</span>
              </div>
              <CourseTile
                class="special-contents__course"
                @click="$router.push(`/course/${course.id}`)"
                state="default"
                :name="course.name"
                :room="course.room"
              />
            </div>
            <div v-if="value.length === 0" class="special-contents">
              <div class="special-contents__module"></div>
              <CourseTile
                class="special-contents__course"
                state="none"
                name=""
                room=""
              />
            </div>
          </div>
        </template>
        <div class="special-header">
          <div class="special-header__label">土曜</div>
          <div class="special-header__divider"></div>
        </div>
        <div class="special-container">
          <div
            class="special-contents"
            v-for="course in saturdayCourseList"
            :key="course.id"
          >
            <div class="special-contents__module">
              <span v-for="m in course.module" :key="m">{{ m }}</span>
            </div>
            <CourseTile
              class="special-contents__course"
              @click="$router.push(`/course/${course.id}`)"
              state="default"
              :name="course.name"
              :room="course.room"
            />
          </div>
          <div v-if="saturdayCourseList.length === 0" class="special-contents">
            <div class="special-contents__module"></div>
            <CourseTile
              class="special-contents__course"
              state="none"
              name=""
              room=""
            />
          </div>
        </div>
      </section>
    </section>
  </div>
  <Modal
    v-if="duplicationState.courses.length > 0"
    class="duplication-modal"
    @click="clearDuplicationState()"
    size="large"
  >
    <template #title>授業が重複しています</template>
    <template #contents>
      <p class="modal__text">
        このコマ({{ duplicationState.day }}曜{{
          duplicationState.period
        }}限)には複数の授業が登録されています。
        不要な授業がある場合、以下から「授業詳細」ページへ移動し右上のメニューから削除してください。
      </p>
      <CourseTile
        v-for="course in duplicationState.courses"
        :key="course.courseId"
        class="modal__course-tile"
        state="default"
        :name="course.name"
        :room="course.room"
        @click="
          onClickCourseTile(
            [course],
            duplicationState.day,
            duplicationState.period
          )
        "
      />
    </template>
    <template #button>
      <Button
        @click="clearDuplicationState()"
        size="medium"
        layout="fill"
        color="base"
      >
        閉じる
      </Button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue-demi";
import { courseListToTable } from "~/usecases/courseListToTable";
import { CourseState } from "~/entities/table";
import { getCurrentModule } from "~/usecases/getCurrentModule";
import { ModuleJa, moduleJaList } from "~/entities/module";
import { RegisteredCourse } from "~/api/@types";
import { specialDayMap } from "~/entities/day";
import { usePorts } from "~/usecases";
import { useRouter } from "vue-router";
import { useSidebar } from "~/usecases/useSidebar";
import { useSwitch } from "~/hooks/useSwitch";
import { weekdays, WeekDayJa, weekdayJaList } from "~/entities/day";
import Button from "~/components/Button.vue";
import CourseTile from "~/components/CourseTile.vue";
import IconButton from "~/components/IconButton.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import Popup from "~/components/Popup.vue";
import PopupContent from "~/components/PopupContent.vue";
import ToggleButton, { Labels } from "~/components/ToggleButton.vue";
import { useLabel } from "~/usecases/useLabel";
import { courseListToSpecialTable } from "~/usecases/courseListToSpecialTable";
import { getCalendar } from "~/usecases/getCalendar";
import { useHead } from "@vueuse/head";
import { useStore } from "~/store";
import { useBachelorMode } from "~/usecases/useBachelorMode";
import { useDisplayedModule } from "~/usecases/useDisplayedModule";
import { getSaturdayCourseList } from "~/usecases/getSaturdayCourseList";

export default defineComponent({
  name: "Table",
  components: {
    Button,
    CourseTile,
    IconButton,
    Modal,
    PageHeader,
    Popup,
    PopupContent,
    ToggleButton,
  },
  setup: async () => {
    useHead({
      title: "Twin:te | ホーム",
    });

    const store = useStore();
    const ports = usePorts();
    const router = useRouter();

    /** ヘッダー */
    const { toggleSidebar } = useSidebar();

    /** サブヘッダー部分 */
    const label = ref<Labels>({ left: "通常", right: "特殊" });
    const currentModule = await getCurrentModule(ports);
    const calendar = await getCalendar(ports);
    const {
      displayedModule: module,
      setDisplayedModule,
    } = await useDisplayedModule(ports);
    const isCurrentModule = computed(() => module.value === currentModule);
    const { whichSelected, onClickLabel } = useLabel(ports);
    const [popup, , closePopup, togglePopup] = useSwitch(false);
    const popupData = moduleJaList;
    const onClickModule = (selectedModule: ModuleJa) => {
      setDisplayedModule(selectedModule);
      togglePopup();
    };

    /** table */
    const { bachelorMode } = useBachelorMode(ports);
    const storedCourses: RegisteredCourse[] = store.getters.courses;
    const table = computed(() =>
      courseListToTable(storedCourses, module.value, bachelorMode.value)
    );
    const specialTable = computed(() =>
      courseListToSpecialTable(storedCourses)
    );
    const saturdayCourseList = computed(() =>
      getSaturdayCourseList(storedCourses)
    );
    const setCurrentModule = () => {
      setDisplayedModule(currentModule);
    };
    const weeks = weekdayJaList;
    const onClickCourseTile = async (
      courses: CourseState[],
      day: WeekDayJa,
      period: number
    ) => {
      switch (courses.length) {
        case 0:
          await router.push({
            path: "/add/search",
            query: { module: module.value, day, period },
          });
          break;
        case 1:
          await router.push(`/course/${courses[0].courseId}`);
          break;
        default:
          duplicationState.value = {
            day,
            period,
            courses,
          };
          break;
      }
    };

    /** duplication modal */
    type DuplocationState = {
      day: WeekDayJa;
      period: number;
      courses: CourseState[];
    };
    const initialDuplicationState: DuplocationState = {
      day: "月",
      period: 1,
      courses: [],
    };
    const duplicationState = ref<DuplocationState>(initialDuplicationState);
    const clearDuplicationState = () => {
      duplicationState.value = initialDuplicationState;
    };

    return {
      toggleSidebar,
      weekdays,
      label,
      whichSelected,
      onClickLabel,
      calendar,
      module,
      popup,
      togglePopup,
      closePopup,
      popupData,
      onClickModule,
      setCurrentModule,
      isCurrentModule,
      table,
      specialTable,
      saturdayCourseList,
      weeks,
      specialDayMap,
      onClickCourseTile,
      duplicationState,
      clearDuplicationState,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.main {
  display: grid;
  border-radius: $radius-4 $radius-4 $radius-0 $radius-0;
  box-shadow: $shadow-base;
  padding: $spacing-4 $spacing-3;
  margin: $spacing-4 (-$spacing-4) $spacing-0; //縦向きの画面でLayoutのpaddingを無視するため
  @include landscape {
    margin: $spacing-4 $spacing-0 $spacing-0;
  }
  height: calc(100vh - 7.6rem - #{$safe-area-top});
  grid-template:
    "toggle module btn" $spacing-7
    "table table table" 1fr
    / 12rem 1fr 10.4rem;

  @include landscape {
    border-radius: $spacing-4;
    height: calc(#{$vh} - 9.6rem);
  }

  &__toggle {
    grid-area: toggle;
  }

  &__module {
    grid-area: module;
    display: flex;
    margin: auto auto;
  }

  &__module-text {
    color: $text-main;
    font-weight: 500;
    font-size: $font-large;
    margin: auto 0.6rem auto;
  }

  &__module-selector {
    position: relative;
    grid-area: module-selector;
  }

  &__module-popup {
    position: absolute;
    left: -4.9rem;
    top: 3.6rem;
    z-index: 10;
  }

  &__btn {
    grid-area: btn;
  }

  &__table {
    margin-top: $spacing-3;
    grid-area: table;

    &--popup {
      transition: $transition-all;
      opacity: 0.2;
    }
  }
}

@include header-left-button-delete;

.sidebar {
  &--sm {
    position: fixed;
  }
}

.table {
  display: grid;
  grid-template-columns: 2rem repeat(5, 1fr);
  grid-auto-flow: column;
  gap: 0.2rem;
  overflow-y: auto;

  &__period {
    color: $text-sub;
    font-size: $font-small;
    margin: auto auto auto 0;
    &--first {
      grid-row-start: 2;
    }
  }

  &__day {
    color: $text-sub;
    font-size: $font-small;
    margin: auto;
  }
}

.special {
  grid-area: table;
  height: calc(#{$vh} - 14.8rem);
  @include landscape {
    height: calc(#{$vh} - 16.4rem);
  }
  overflow-y: scroll;
  margin-top: $spacing-3;
}

.special-header {
  display: flex;
  margin-bottom: $spacing-4;
  align-items: center;
  height: 2rem;

  &__label {
    color: $text-main;
    font-size: $font-medium;
  }
  &__divider {
    border-radius: 0.2rem;
    height: 0.4rem;
    width: calc(100% - 4rem);
    margin-left: $spacing-3;
    box-shadow: $shadow-input-concave;
  }
}

.special-container {
  display: grid;
  gap: 0.2rem;
  margin-bottom: $spacing-8;
}

.special-contents {
  width: 100%;
  display: grid;
  grid-template-columns: 4.8rem 1fr;
  grid-template-rows: 4.8rem;
  gap: 0.2rem;
  &__module {
    color: $text-sub;
    font-size: $font-small;
    margin-left: $spacing-1;
    display: flex;
    flex-direction: column;
    line-height: $single-line;
  }
  &__course {
    height: 4.8rem;
  }
}

.duplication-modal .modal {
  &__text {
    font-size: $font-medium;
    line-height: $multi-line;
    margin-bottom: 3rem;
  }
  &__course-tile {
    height: 4.8rem;
    margin-bottom: $spacing-2;
  }
}
</style>
