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
            data-gtm-marker="selection-module-button"
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
        :style="{
          gridTemplateRows: `1.4rem repeat(${bachelorMode ? 8 : 6}, 1fr)`,
          gridTemplateColumns: `${tableTimeMode ? 3.6 : 2}rem repeat(${
            saturdayCourseMode ? 6 : 5
          }, 1fr)`,
        }"
        v-if="whichSelected === 'left'"
      >
        <div
          v-for="period in bachelorMode ? 8 : 6"
          :key="period"
          :class="{
            table__period: true,
            'table__period--with-time': tableTimeMode,
            'table__period--first': period == 1,
          }"
        >
          {{ period }}
          <p v-show="tableTimeMode" class="table__time">
            {{ tableTimeData[period - 1].start }}
            <span class="table__time--tilda">~</span>
            {{ tableTimeData[period - 1].end }}
          </p>
        </div>
        <template v-for="(y, d) in table[jaToBaseModule(module)]" :key="d">
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
      <section class="special gtm-marker-special" v-else>
        <template
          v-for="(courses, specialDay) in specialTable"
          :key="specialDay"
        >
          <div class="special-header">
            <div class="special-header__label">
              {{ dayToSpecialDayJa(specialDay) }}
            </div>
            <div class="special-header__divider"></div>
          </div>
          <div class="special-container">
            <div
              class="special-contents"
              v-for="course in courses"
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
            <div v-if="courses.length === 0" class="special-contents">
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
        <template v-if="undisplayedCourses.length !== 0">
          <div class="special-header">
            <div class="special-header__label">その他</div>
            <div class="special-header__divider"></div>
          </div>
          <div class="special-container">
            <div
              class="special-contents"
              v-for="course in undisplayedCourses"
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
          </div>
        </template>
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
        :key="course.id"
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
  <Modal v-if="isShow" @click="isShow = false" size="large">
    <template #title>Twin:teからの新着お知らせ</template>
    <template #contents>
      <div class="news-modal__tips">
        過去のお知らせは <span class="material-icons">campaign</span>お知らせ
        で確認できます。
      </div>
      <div class="news-modal__row" v-for="_news in news" :key="_news.id">
        <NewsBox
          :title="_news.title"
          :content="_news.content"
          :publicationDate="formatDatetime(_news.publishedAt)"
        ></NewsBox>
      </div>
    </template>
    <template #button>
      <Button
        @click="isShow = false"
        size="medium"
        layout="fill"
        color="primary"
      >
        OK
      </Button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { courseListToTable } from "~/usecases/courseListToTable";
import { CourseState } from "~/entities/table";
import { getCurrentModule } from "~/usecases/getCurrentModule";
import { ModuleJa, moduleJaList } from "~/entities/module";
import { RegisteredCourse, Information } from "~/api/@types";
import { dayToSpecialDayJa } from "~/entities/day";
import { usePorts } from "~/usecases";
import { useRouter } from "vue-router";
import { useSidebar } from "~/usecases/useSidebar";
import { useSwitch } from "~/hooks/useSwitch";
import { WeekDayJa, weekdayJaList } from "~/entities/day";
import Button from "~/components/Button.vue";
import CourseTile from "~/components/CourseTile.vue";
import IconButton from "~/components/IconButton.vue";
import Modal from "~/components/Modal.vue";
import NewsBox from "~/components/NewsBox.vue";
import PageHeader from "~/components/PageHeader.vue";
import Popup from "~/components/Popup.vue";
import PopupContent from "~/components/PopupContent.vue";
import ToggleButton, { Labels } from "~/components/ToggleButton.vue";
import { jaToBaseModule } from "~/entities/module";
import { useLabel } from "~/usecases/useLabel";
import {
  courseListToSpecialTable,
  getUndisplayedCourses,
} from "~/usecases/courseListToSpecialTable";
import { getCalendar } from "~/usecases/getCalendar";
import { useHead } from "@vueuse/head";
import { useBachelorMode } from "~/usecases/useBachelorMode";
import { useDisplayedModule } from "~/usecases/useDisplayedModule";
import { useTableTimeMode } from "~/usecases/useTableTime";
import { getNews } from "~/usecases/getNews";
import { formatDatetime } from "~/entities/news";
import { useSaturdayCourseMode } from "~/usecases/useSaturdayCourseMode";
import { getCourseListByYear } from "~/usecases/getCourseListByYear";
import { getYear } from "~/usecases/getYear";

export default defineComponent({
  name: "Table",
  components: {
    Button,
    CourseTile,
    IconButton,
    Modal,
    NewsBox,
    PageHeader,
    Popup,
    PopupContent,
    ToggleButton,
  },
  setup: async () => {
    useHead({
      title: "Twin:te | ホーム",
    });
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
    const { saturdayCourseMode } = useSaturdayCourseMode(ports);
    const { bachelorMode } = useBachelorMode(ports);
    const { tableTimeMode } = useTableTimeMode(ports);
    const year = await getYear(ports);
    const storedCourses: RegisteredCourse[] = await getCourseListByYear(ports)(
      year
    );
    const table = computed(() =>
      courseListToTable(
        storedCourses,
        saturdayCourseMode.value,
        bachelorMode.value
      )
    );
    const specialTable = computed(() =>
      courseListToSpecialTable(storedCourses)
    );
    const undisplayedCourses = computed(() =>
      getUndisplayedCourses(storedCourses, table.value, specialTable.value)
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
          await router.push(`/course/${courses[0].id}`);
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
    const tableTimeData = [
      { start: "8:40", end: "9:55" },
      { start: "10:10", end: "11:25" },
      { start: "12:15", end: "13:30" },
      { start: "13:45", end: "15:00" },
      { start: "15:15", end: "16:30" },
      { start: "16:45", end: "18:00" },
      { start: "18:20", end: "19:35" },
      { start: "19:45", end: "21:00" },
    ];

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

    /** news modal */
    let news = ref<Information[]>([]);
    const isShow = ref(false);
    getNews(ports)({ ignoreReadNews: true })
      .then((res) => {
        news.value = res;
        isShow.value = res.length > 0;
      })
      .catch();

    return {
      toggleSidebar,
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
      undisplayedCourses,
      weeks,
      jaToBaseModule,
      saturdayCourseMode,
      bachelorMode,
      tableTimeMode,
      tableTimeData,
      dayToSpecialDayJa,
      onClickCourseTile,
      duplicationState,
      clearDuplicationState,
      isShow,
      news,
      formatDatetime,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~/styles";

.main {
  display: grid;
  border-radius: $radius-4 $radius-4 $radius-0 $radius-0;
  box-shadow: $shadow-base;
  padding: $spacing-4 $spacing-3;
  margin: $spacing-4 (-$spacing-4) $spacing-0; //縦向きの画面でLayoutのpaddingを無視するため
  @include landscape {
    margin: $spacing-4 $spacing-0 $spacing-0;
  }
  height: calc(#{$vh} - 7.6rem);
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
    color: getColor(--color-text-main);
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
  grid-auto-flow: column;
  gap: 0.2rem;
  overflow-y: auto;

  &__period {
    @include center-flex(column);
    color: getColor(--color-text-sub);
    font-size: $font-small;
    font-weight: 500;
    margin: auto auto auto 0;
    &--with-time {
      border-radius: $radius-1;
      background: getColor(--color-undefined);
      margin: 0;
      overflow-y: auto;
    }
    &--first {
      grid-row-start: 2;
    }
  }

  &__time {
    font-size: 1rem;
    font-weight: normal;
    line-height: $fit;
    color: getColor(--color-text-sub-light);
    margin: 0.5rem 0 0 0;
    display: grid;
    gap: $spacing-1;
    &--tilda {
      width: min-content;
      display: inline-block;
      margin: auto auto;
      transform: rotate(90deg);
    }
  }

  &__day {
    color: getColor(--color-text-sub);
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
  overflow-y: auto;
  margin-top: $spacing-3;
}

.special-header {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: $spacing-3;
  align-items: center;
  margin-bottom: $spacing-4;
  height: 2rem;

  &__label {
    color: getColor(--color-text-main);
    font-size: $font-medium;
  }
  &__divider {
    border-radius: 0.2rem;
    height: 0.4rem;
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
    color: getColor(--color-text-sub);
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

.news-modal {
  &__tips {
    @include text-description-sub;
    margin-bottom: $spacing-3;
  }
  &__row {
    margin-bottom: $spacing-10;
  }
}
</style>
