<template>
  <div class="home">
    <PageHeader :calendar="calendar" atHome>
      <template #left-button-icon>
        <IconButton
          size="large"
          color="normal"
          iconName="menu"
          class="header__left-button-icon"
          @click="toggleSidebar"
        ></IconButton
      ></template>
    </PageHeader>
    <section class="main">
      <ToggleButton
        class="main__toggle"
        :labels="{ left: '通常', right: '特殊' }"
        :whichSelected="courseType === 'Normal' ? 'left' : 'right'"
        :onClickToggleButton="toggleCourseType"
      />
      <div
        v-if="courseType === 'Normal'"
        v-click-away="closePopup"
        class="main__module"
      >
        <div class="main__module-text">
          {{ moduleMap[module] }}
        </div>
        <div class="main__module-selector">
          <IconButton
            class="main__module-btn"
            size="small"
            color="normal"
            icon-name="expand_more"
            data-gtm-marker="selection-module-button"
            :is-active="false"
            @click="togglePopup"
          />
          <Popup v-show="isPopupVisible" class="main__module-popup">
            <PopupContent
              v-for="(displayBaseModule, baseModule) in baseModuleMap"
              :key="baseModule"
              :value="displayBaseModule"
              @click="() => onClickPopup(baseModule)"
            >
            </PopupContent>
          </Popup>
        </div>
      </div>
      <Button
        v-if="courseType === 'Normal'"
        :state="currentModule === module ? 'active' : 'default'"
        class="main__btn"
        size="small"
        @click="() => setModule(currentModule)"
      >
        現在の学期
      </Button>

      <div
        v-if="courseType === 'Normal'"
        :class="{
          main__table: true,
          table: true,
          'main__table--popup': isPopupVisible,
        }"
        :style="{
          gridTemplateRows: `1.4rem repeat(${
            setting.nightPeriodMode ? 8 : 6
          }, 1fr)`,
          gridTemplateColumns: `${setting.timeLabelMode ? 3.6 : 2}rem repeat(${
            setting.saturdayCourseMode ? 6 : 5
          }, 1fr)`,
        }"
      >
        <div
          v-for="period in setting.nightPeriodMode ? 8 : 6"
          :key="period"
          :class="{
            table__period: true,
            'table__period--with-time': setting.timeLabelMode,
            'table__period--first': period === 1,
          }"
        >
          {{ period }}
          <p v-show="setting.timeLabelMode" class="table__time">
            {{ timelabels[period - 1].start }}
            <span class="table__time--tilda">~</span>
            {{ timelabels[period - 1].end }}
          </p>
        </div>
        <template v-for="(row, day) in timetable.normal[module]" :key="day">
          <div class="table__day">
            {{ dayMap[day] }}
          </div>
          <CourseTile
            v-for="(courses, period) in row"
            :key="period"
            class="table__course"
            :state="courses.length === 0 ? 'none' : 'default'"
            :name="courses.length === 0 ? '' : courses[0].name"
            :room="courses.length === 0 ? '' : courses[0].room"
            :caution="courses.length > 1 ? `他${courses.length - 1}件` : ''"
            @click="() => onClickCourseTile(day, period, courses)"
          />
        </template>
      </div>
      <section v-else class="special gtm-marker-special">
        <template v-for="day in specialDays" :key="day">
          <div class="special-header">
            <div class="special-header__label">
              {{ specialDayMap[day] }}
            </div>
            <div class="special-header__divider"></div>
          </div>
          <div class="special-container">
            <div
              v-for="course in timetable.special[day]"
              :key="course.id"
              class="special-contents"
            >
              <div class="special-contents__module">
                <span
                  v-for="schedule in course.schedule.onlyModule"
                  :key="schedule"
                  >{{ schedule }}</span
                >
              </div>
              <CourseTile
                class="special-contents__course"
                state="default"
                :name="course.name"
                :room="course.room"
                @click="$router.push(`/course/${course.id}`)"
              />
            </div>
            <div
              v-if="timetable.special[day].length === 0"
              class="special-contents"
            >
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
        <template v-if="timetable.special.Others.length !== 0">
          <div class="special-header">
            <div class="special-header__label">その他</div>
            <div class="special-header__divider"></div>
          </div>
          <div class="special-container">
            <div
              v-for="course in timetable.special.Others"
              :key="course.id"
              class="special-contents"
            >
              <div class="special-contents__module">
                <span
                  v-for="schedule in course.schedule.onlyModule"
                  :key="schedule"
                  >{{ schedule }}</span
                >
              </div>
              <CourseTile
                class="special-contents__course"
                state="default"
                :name="course.name"
                :room="course.room"
                @click="$router.push(`/course/${course.id}`)"
              />
            </div>
          </div>
        </template>
      </section>
    </section>
  </div>
  <Modal
    v-if="duplicateState"
    class="duplication-modal"
    size="large"
    @click="clearDuplicateState"
  >
    <template #title>授業が重複しています</template>
    <template #contents>
      <p class="modal__text">
        このコマ({{ dayMap[duplicateState.day] }}曜{{
          duplicateState.period
        }}限)には複数の授業が登録されています。
        不要な授業がある場合、以下から「授業詳細」ページへ移動し右上のメニューから削除してください。
      </p>
      <CourseTile
        v-for="course in duplicateState.courses"
        :key="course.id"
        class="modal__course-tile"
        state="default"
        :name="course.name"
        :room="course.room"
        @click="$router.push(`/course/${course.id}`)"
      />
    </template>
    <template #button>
      <Button
        size="medium"
        layout="fill"
        color="base"
        @click="clearDuplicateState"
      >
        閉じる
      </Button>
    </template>
  </Modal>
  <Modal v-if="isNewsModalVisible" size="large" @click="onClickNewsModal">
    <template #title>Twin:teからの新着お知らせ</template>
    <template #contents>
      <div class="news-modal__tips">
        過去のお知らせは <span class="material-icons">campaign</span>お知らせ
        で確認できます。
      </div>
      <div v-for="news in unreadNews" :key="news.id" class="news-modal__row">
        <NewsBox
          :title="news.title"
          :content="news.content"
          :publicationDate="formatPublishedAt(news.publishedAt)"
        ></NewsBox>
      </div>
    </template>
    <template #button>
      <Button
        size="medium"
        layout="fill"
        color="primary"
        @click="onClickNewsModal"
      >
        OK
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import dayjs from "dayjs";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { normalDays, specialDays } from "~/domain/day";
import { baseModules } from "~/domain/module";
import { daytimePeriods, periods } from "~/domain/period";
import {
  dayMap,
  normalDayMap,
  specialDayMap,
} from "~/presentation/presenters/day";
import { baseModuleMap, moduleMap } from "~/presentation/presenters/module";
import { formatPublishedAt } from "~/presentation/presenters/news";
import { getDisplayTimetable } from "~/presentation/presenters/timetable";
import Button from "~/ui/components/Button.vue";
import CourseTile from "~/ui/components/CourseTile.vue";
import IconButton from "~/ui/components/IconButton.vue";
import Modal from "~/ui/components/Modal.vue";
import NewsBox from "~/ui/components/NewsBox.vue";
import PageHeader from "~/ui/components/PageHeader.vue";
import Popup from "~/ui/components/Popup.vue";
import PopupContent from "~/ui/components/PopupContent.vue";
import ToggleButton from "~/ui/components/ToggleButton.vue";
import { getEvent, setEvent } from "~/ui/store/event";
import { useSwitch } from "../hooks/useSwitch";
import { toggleCourseType, setModule } from "../store";
import { getCoursesByYear, setCoursesByYear } from "../store/course";
import { getCourseType } from "../store/courseType";
import { getModule, getCurrentModule } from "../store/module";
import { getUnreadNews, setNews, updateNewsRead } from "../store/news";
import { getSetting, setSetting } from "../store/setting";
import { toggleSidebar } from "../store/sidebar";
import { getAllTags } from "../store/tag";
import { getApplicableYear, setApplicableYear } from "../store/year";
import type { NormalDay } from "~/domain/day";
import type { BaseModule } from "~/domain/module";
import type { Period } from "~/domain/period";
import type { DisplayRegisteredCourse } from "~/presentation/viewmodels/course";
import type { Calendar as PageHeaderCalendar } from "~/ui/components/PageHeader.vue";

useHead({
  title: "Twin:te | ホーム",
});

const router = useRouter();

/** year */
await setApplicableYear();
const year = getApplicableYear();

await Promise.all([
  setCoursesByYear(year.value),
  setEvent(),
  setNews(),
  setSetting(),
]);

/** courseType */
const courseType = getCourseType();

/** setting */
const setting = getSetting();

/** module */
const module = await getModule();
const currentModule: BaseModule = await getCurrentModule();

/** page header */
const event = getEvent();
const today = dayjs();
const calendar: PageHeaderCalendar = {
  schedule: event.value,
  month: today.month() + 1,
  day: today.date(),
  week: normalDayMap[normalDays[(today.day() + 6) % 7]],
};

/** popup */
const [isPopupVisible, , closePopup, togglePopup] = useSwitch(false);
const onClickPopup = (baseModule: BaseModule) => {
  setModule(baseModule);
  closePopup();
};

/** timelabel */
// https://www.tsukuba.ac.jp/education/g-courses-handbook/2.pdf
const timelabels = [
  { start: "8:40", end: "9:55" },
  { start: "10:10", end: "11:25" },
  { start: "12:15", end: "13:30" },
  { start: "13:45", end: "15:00" },
  { start: "15:15", end: "16:30" },
  { start: "16:45", end: "18:00" },
  { start: "18:00", end: "19:15" },
  { start: "19:20", end: "20:35" },
];

/** timetable */
const timetable = computed(() =>
  getDisplayTimetable(
    getCoursesByYear(year.value).value,
    getAllTags().value,
    baseModules,
    setting.value.saturdayCourseMode
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri"],
    specialDays,
    setting.value.nightPeriodMode ? periods : daytimePeriods
  )
);

/** duplicate state */
const useDuplicateState = () => {
  type DuplicateState = {
    day: NormalDay;
    period: Period;
    courses: DisplayRegisteredCourse[];
  };

  const duplicateState = ref<DuplicateState>();

  const setDuplicateState = (newDuplicateState: DuplicateState) => {
    duplicateState.value = newDuplicateState;
  };

  const clearDuplicateState = () => {
    duplicateState.value = undefined;
  };

  return { duplicateState, setDuplicateState, clearDuplicateState };
};

const {
  duplicateState,
  setDuplicateState,
  clearDuplicateState,
} = useDuplicateState();

/** course tile */
const onClickCourseTile = async (
  day: NormalDay,
  period: Period,
  courses: DisplayRegisteredCourse[]
) => {
  switch (courses.length) {
    case 0:
      await router.push("/add/search");
      break;
    case 1:
      await router.push(`/course/${courses[0].id}`);
      break;
    default:
      setDuplicateState({ day, period, courses });
      break;
  }
};

/** news modal */
const unreadNews = getUnreadNews();

const [isNewsModalVisible, , closeNewsModal] = useSwitch(
  unreadNews.value.length > 0
);

const onClickNewsModal = async () => {
  for (const news of unreadNews.value) {
    await updateNewsRead(news.id, true);
  }
  closeNewsModal();
};
</script>

<style lang="scss" scoped>
@import "~/ui/styles";

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
