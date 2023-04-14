<template>
  <div class="search">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          size="large"
          color="normal"
          icon-name="arrow_back"
          @click="$router.back()"
        ></IconButton>
      </template>
      <template #title>授業の検索</template>
    </PageHeader>
    <div class="main">
      <div class="main__search">
        <section class="search__top">
          <div class="top__course-code">
            <LabeledTextField label="科目番号" size="slim">
              <TextFieldSingleLine
                v-model.trim="code"
                placeholder="例）GA -0"
                type="slim"
                @enter-text-field="search"
              >
              </TextFieldSingleLine>
            </LabeledTextField>
          </div>
          <div class="top__course-name">
            <LabeledTextField label="キーワード" size="slim">
              <TextFieldSingleLine
                v-model.trim="keyword"
                placeholder="例）情報 倫理"
                type="slim"
                @enterTextField="search"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </div>
          <div class="top__search-button">
            <IconButton
              iconName="search"
              size="medium"
              :loading="fetching"
              @click="search"
              @keyup.enter="search"
            ></IconButton>
          </div>
        </section>
        <section class="search__option">
          <div class="option__display-toggle">
            <ToggleButton
              :labels="{ left: '詳細', right: '簡易' }"
              :which-selected="detailed ? 'left' : 'right'"
              @click-toggle-button="toggleDetailed()"
            />
          </div>
          <div class="option__accordion-toggle" @click="toggleAccordion">
            条件
            <span
              :class="`accordion-toggle__conditions --${conditions.style}`"
              >{{ conditions.label }}</span
            >
            <span
              :class="{ 'material-icons': true, '--turned': isAccordionOpen }"
              >expand_more</span
            >
          </div>
        </section>
        <transition name="spread-down" mode="out-in">
          <section
            v-if="isAccordionOpen"
            key="accordion"
            class="search__accordion"
          >
            <div class="accordion__top-border"></div>
            <div class="accordion__only-blank" @click="toggleOnlyBlank()">
              <Checkbox
                :isChecked="onlyBlank"
                @clickCheckbox.stop="toggleOnlyBlank()"
              ></Checkbox>
              空いているコマのみを検索
            </div>
            <div v-if="!onlyBlank" class="accordion__shedule-editor">
              <ScheduleEditer
                :schedules="schedules"
                :onClickAddButton="addSchedule"
                :onClickRemoveButton="removeSchedule"
                @update:schedules="updateSchedules"
              ></ScheduleEditer>
            </div>
          </section>
          <section
            v-else
            ref="searchBoxRef"
            key="result"
            class="search__result"
          >
            <div
              v-show="searchResults.length === 0 && !noResultText"
              class="result__description"
            >
              <p>
                ※授業データは筑波大学の教育課程編成支援システム(KdB)より取得しています。
              </p>
              <p>※毎朝5:00に更新されます。</p>
            </div>
            <Card v-show="searchResults.length > 0">
              <div
                v-for="(searchResult, index) in searchResults"
                :key="searchResult.course.id"
                :ref="
                  (el) => {
                    setSearchResultRef(el, index);
                  }
                "
                class="result__row"
              >
                <CardCourse
                  :course="searchResult.course"
                  :isChecked="isChecked(searchResult.course.id).value"
                  :isDetailed="detailed"
                  :isExpanded="courseIdToExpanded[searchResult.id]"
                  @click-checkbox="onClickCheckbox(searchResult)"
                  @click-card="onClickCard(searchResult.id)"
                ></CardCourse>
              </div>
            </Card>
            <div v-show="noResultText" class="result__not-found">
              「{{ noResultText }}」に一致する授業がありません。
            </div>
          </section>
        </transition>
        <div class="search__selected">
          <div
            :class="{
              selected__count: true,
              '--active': selectedSearchResults.length > 0,
              '--opened': isSelectedOpen,
            }"
            @click="toggleSelectedOpen()"
          >
            選択中の授業:
            {{ selectedSearchResults.length }}件
            <span
              v-show="selectedSearchResults.length > 0"
              class="material-icons"
              >expand_less</span
            >
          </div>
          <div v-show="isSelectedOpen" class="selected__course-list">
            <div
              v-for="{ course } in selectedSearchResults"
              :key="course.id"
              class="course-list__row"
            >
              <div class="course-list__name">
                {{ course.name }}
              </div>
              <CourseDetailMini
                icon-name="schedule"
                :text="course.schedule.full"
              />
              <div
                class="course-list__clear-button"
                @click="targetCourseToUnselect = course"
              >
                <span class="material-icons">clear</span>
                解除
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="main__bottom">
        <Button
          size="large"
          layout="fill"
          color="primary"
          :pauseActiveStyle="false"
          :state="buttonState"
          @click="addCourses()"
          >選択した授業を追加</Button
        >
      </section>
    </div>
    <Modal
      v-if="isDuplicateModalVisible"
      class="duplication-modal"
      @click="closeDuplicateModal"
    >
      <template #title>開講時限が重複しています</template>
      <template #contents>
        <p class="modal__text">
          以下の授業のコマには既に授業が登録されています。そのまま追加してよろしいですか？（当該のコマには複数の授業が登録されます。）
        </p>
        <div class="modal__courses">
          <div
            v-for="duplicateCourse in duplicatedScheduleCourses"
            :key="duplicateCourse.name"
            class="duplicated-course"
          >
            <p class="duplicated-course__name">{{ duplicateCourse.name }}</p>
            <CourseDetailMini
              class="duplicated-course__detail"
              iconName="schedule"
              :text="duplicateCourse.schedule.full"
            ></CourseDetailMini>
          </div>
        </div>
      </template>
      <template #button>
        <Button
          size="medium"
          layout="fill"
          color="base"
          @click="closeDuplicateModal"
          >キャンセル</Button
        >
        <Button
          size="medium"
          layout="fill"
          color="primary"
          @click="addCourses(false)"
          >そのまま追加</Button
        >
      </template>
    </Modal>
    <Modal
      v-if="targetCourseToUnselect"
      @click="targetCourseToUnselect = undefined"
    >
      <template #title>選択を解除しますか？</template>
      <template #contents>
        「{{ targetCourseToUnselect.name }}」の選択を解除しますか？ <br />
        解除すると「選択中の授業」一覧から削除されます。
      </template>
      <template #button>
        <Button
          size="medium"
          layout="fill"
          color="base"
          @click="targetCourseToUnselect = undefined"
          >キャンセル</Button
        >
        <Button
          size="medium"
          layout="fill"
          color="danger"
          @click="unselectTargetCourse"
          >解除</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useGtm } from "@gtm-support/vue-gtm";
import { useIntersectionObserver } from "@vueuse/core";
import { useToggle } from "@vueuse/shared";
import { ComponentPublicInstance, computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { usePorts } from "~/adapter";
import Usecase from "~/application/usecases";
import { isResultError } from "~/domain/error";
import { modules } from "~/domain/module";
import { initializeTimetable } from "~/domain/timetable";
import { courseToDisplay } from "~/presentation/presenters/course";
import {
  editableSchedulesToTimetable,
  isNotSpecifiedSchedule,
} from "~/presentation/presenters/schedule";
import { notSpecified } from "~/presentation/viewmodels/option";
import Button from "~/ui/components/Button.vue";
import Card from "~/ui/components/Card.vue";
import CardCourse from "~/ui/components/CardCourse.vue";
import Checkbox from "~/ui/components/Checkbox.vue";
import CourseDetailMini from "~/ui/components/CourseDetailMini.vue";
import IconButton from "~/ui/components/IconButton.vue";
import LabeledTextField from "~/ui/components/LabeledTextField.vue";
import Modal from "~/ui/components/Modal.vue";
import PageHeader from "~/ui/components/PageHeader.vue";
import ScheduleEditer, {
  useScheduleEditor,
} from "~/ui/components/ScheduleEditer.vue";
import TextFieldSingleLine from "~/ui/components/TextFieldSingleLine.vue";
import ToggleButton from "~/ui/components/ToggleButton.vue";
import { useSwitch } from "~/ui/hooks/useSwitch";
import { addCoursesByCodes } from "~/ui/store/course";
import { displayToast } from "~/ui/store/toast";
import { getApplicableYear } from "~/ui/store/year";
import { asyncFilter, deleteElementInArray } from "~/utils";
import type { Schedule } from "~/domain/schedule";
import type { DisplayCourse } from "~/presentation/viewmodels/course";

const gtm = useGtm();
const ports = usePorts();
const router = useRouter();

type SearchResult = {
  id: string;
  course: DisplayCourse;
  schedules: Schedule[];
};

/** toggle button */
const [detailed, toggleDetailed] = useToggle(true);

/** search options */
const year = getApplicableYear();
const code = ref("");
const keyword = ref("");
const [onlyBlank, toggleOnlyBlank] = useToggle(false);

/** accordion */
const [isAccordionOpen, , closeAccordion, toggleAccordion] = useSwitch(false);

const conditions = computed<{ style: "outline" | "filled"; label: string }>(
  () => {
    if (onlyBlank.value) return { style: "filled", label: "空きコマのみ" };
    else if (
      schedules.every((schedule) =>
        Object.values(schedule).every((value) => value === notSpecified)
      )
    ) {
      return { style: "outline", label: "未指定" };
    } else {
      return {
        style: "filled",
        label: schedules
          .map(
            (schedule) =>
              `${schedule.module}${schedule.day}${
                "period" in schedule ? schedule.period : ""
              }`
          )
          .join(","),
      };
    }
  }
);

/** schedule editor */
const {
  schedules,
  addSchedule,
  removeSchedule,
  updateSchedules,
} = useScheduleEditor();

/** search */
let currentOffset = 0;
const limit = 50;
const fetching = ref(false);
const noResultText = ref("");

const search = async (init = true) => {
  const timetable =
    onlyBlank.value || schedules.every(isNotSpecifiedSchedule)
      ? initializeTimetable(modules, true)
      : editableSchedulesToTimetable(
          schedules.filter((schedule) => !isNotSpecifiedSchedule(schedule))
        );
  const offset = init ? 0 : currentOffset;
  fetching.value = true;
  noResultText.value = "";

  const result = await Usecase.searchCourse(ports)(
    year.value,
    keyword.value.split(/\s/),
    code.value.split(/\s/),
    timetable,
    onlyBlank.value,
    "Cover",
    offset,
    limit
  );
  if (isResultError(result)) throw result;

  const newSearchResults: SearchResult[] = result.map((course) => ({
    id: course.id,
    course: courseToDisplay(course),
    schedules: course.schedules,
  }));
  if (offset === 0)
    searchResults.splice(0, searchResults.length, ...newSearchResults);
  else searchResults.splice(searchResults.length, 0, ...newSearchResults);
  result.forEach(({ id }) => (courseIdToExpanded[id] = false));

  fetching.value = false;
  if (searchResults.length === 0)
    noResultText.value = [code.value, keyword.value]
      .filter((value) => value)
      .join(" ");
  currentOffset = offset + limit;
  closeAccordion();

  // Gather information related to course searches.
  if (init) {
    gtm?.trackEvent({
      event: "search-courses",
      term: keyword.value,
      code: code.value,
      use_only_blank: onlyBlank.value,
      schedules: JSON.stringify(schedules),
    });
  }
};

/** search results */
const searchResults = reactive<SearchResult[]>([]);

const courseIdToExpanded = reactive<Record<string, boolean>>({});

// 検索結果を動的に読み込む処理
const searchBoxRef = ref<HTMLElement | null>(null);

const options = {
  root: searchBoxRef.value,
  rootMargin: "0px 0px 500px 0px",
  threshold: 0,
};

const setSearchResultRef = (
  el: Element | null | ComponentPublicInstance,
  index: number
) => {
  // TODO: el === null のエラーハンドリングを実装
  // TODO: ComponentPublicInstance と Element で振る舞いを分ける必要があるか調査
  if (!el) return;
  if (el instanceof Element && !(el instanceof HTMLElement)) return;
  if (index + 10 === searchResults.length) {
    useIntersectionObserver(
      el,
      ([entry], observer) => {
        if (!entry.isIntersecting) return;
        search(false);
        observer.unobserve(entry.target);
      },
      options
    );
  }
};

/** selected courses */
const [isSelectedOpen, toggleSelectedOpen] = useToggle(false);

const selectedSearchResults = reactive<SearchResult[]>([]);

const isChecked = (id: string) => {
  return computed(
    () =>
      selectedSearchResults.findIndex(({ course }) => course.id === id) !== -1
  );
};

const onClickCheckbox = (searchResult: SearchResult) => {
  const index = selectedSearchResults.findIndex(
    ({ id }) => id === searchResult.id
  );
  if (index !== -1) selectedSearchResults.splice(index, 1);
  else selectedSearchResults.push(searchResult);
};

const onClickCard = (id: string) => {
  courseIdToExpanded[id] = !courseIdToExpanded[id];
};

/** add button */
const buttonState = computed(() =>
  selectedSearchResults.length > 0 ? "default" : "disabled"
);

const duplicatedScheduleCourses = ref<DisplayCourse[]>([]);

const addCourses = async (warning = true) => {
  const registeredCourse = await Usecase.getRegisteredCoursesByYear(ports)(
    year.value
  );

  if (isResultError(registeredCourse)) throw registeredCourse;

  const duplicatedCourses = selectedSearchResults
    .filter(({ course: { code: selectedCourseCode } }) => {
      return registeredCourse.some(
        ({ code: registeredCourseCode }) =>
          registeredCourseCode === selectedCourseCode
      );
    })
    .map(({ course }) => course);

  if (duplicatedCourses.length > 0) {
    const text =
      `以下のコースはすでに登録されているため追加できません。\n` +
      duplicatedCourses
        .map(({ code, name }) => `【${code}】${name}`)
        .join("\n");
    displayToast(text, { type: "danger" });
    gtm?.trackEvent({ event: "duplicated-courses-error" });
    return;
  }

  duplicatedScheduleCourses.value = await (
    await asyncFilter(
      selectedSearchResults,
      async ({ schedules }) =>
        !(await Usecase.checkScheduleDuplicate(ports)(year.value, schedules))
    )
  ).map(({ course }) => course);

  if (warning && duplicatedScheduleCourses.value.length > 0) {
    openDuplicateModal();
    return;
  }

  await addCoursesByCodes(
    selectedSearchResults.map(({ course }) => ({
      year: year.value,
      code: course.code,
    }))
  );
  router.push("/");
};

/** duplicate modal */
const [
  isDuplicateModalVisible,
  openDuplicateModal,
  closeDuplicateModal,
] = useSwitch(false);

/** unselecte course modal */
const targetCourseToUnselect = ref<DisplayCourse>();

const unselectTargetCourse = () => {
  if (targetCourseToUnselect.value == undefined) return;
  deleteElementInArray(selectedSearchResults, targetCourseToUnselect.value.id);
  targetCourseToUnselect.value = undefined;
};
</script>

<style scoped lang="scss">
@import "~/ui/styles";
.search {
  /* @include max-width; */
}

.main {
  margin-top: $spacing-3;
  &__search {
    height: calc(#{$vh} - 15.4rem);
    padding: $spacing-3 $spacing-0 $spacing-0;
  }
  &__bottom {
    text-align: center;
    margin: $spacing-3 $spacing-0 $spacing-6;
    @include landscape {
      margin-bottom: $spacing-7;
    }
  }
  .button {
    display: inline-block;
  }
}

.search {
  &__top {
    display: flex;
    margin-bottom: $spacing-3;
  }
  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-4;
  }
  &__result {
    @include scroll-mask;
    overflow-y: auto;
    padding: $spacing-2;
    .card {
      padding: $spacing-4 $spacing-2;
      background: getColor(--color-base);
    }
  }
  &__result,
  &__accordion {
    height: calc(
      #{$vh} - 26.6rem - 5rem - v-bind("`${isSelectedOpen ? selectedSearchResults.length * 2.7 : 0}rem`")
    );
  }
  &__selected {
    padding: $spacing-2 $spacing-2 0;
  }
}

.top {
  &__course-code {
    flex: 1 0 10.2rem;
    margin-right: $spacing-1;
  }
  &__course-name {
    flex: 3 1 auto;
    margin-right: $spacing-2;
  }
  &__search-button {
    margin-top: 2.3rem;
  }
}

.option {
  &__accordion-toggle {
    @include text-button;
    @include button-cursor;
    display: flex;
    align-items: center;
    .material-icons {
      margin-left: $spacing-1;
      transition: $transition-transform;
      &.--turned {
        transform: rotate(-180deg);
      }
    }
  }
}

.accordion-toggle {
  &__conditions {
    margin-left: $spacing-1;
    padding: $spacing-1;
    border: 0.1rem solid getColor(--color-primary-dull);
    border-radius: $radius-1;
    &.--outline {
      color: getColor(--color-primary-dull);
    }
    &.--filled {
      @include ellipsis;
      max-width: 12rem;
      background-color: getColor(--color-primary-dull);
      color: getColor(--color-white);
    }
  }
}

.accordion {
  &__top-border {
    width: 100%;
    height: 0.4rem;
    margin-bottom: $spacing-4;
    box-shadow: $shadow-input-concave;
    border-radius: $radius-1;
  }
  &__only-blank {
    @include button-cursor;
    display: flex;
    align-items: center;
    margin-bottom: $spacing-6;
    div {
      margin-right: $spacing-4;
    }
  }
}

.result {
  &__description {
    line-height: $multi-line;
    color: getColor(--color-text-sub);
    p {
      margin-bottom: $spacing-1;
    }
  }
  &__row {
    margin-bottom: $spacing-3;
  }
  &__not-found {
    color: getColor(--color-disabled);
  }
}

.selected {
  &__count {
    @include button-cursor;
    @include text-button;
    &.--active {
      color: getColor(--color-primary);
    }
    .material-icons {
      transition: $transition-all;
    }
    &.--opened {
      .material-icons {
        transform: rotateZ(180deg);
      }
    }
  }
}

.course-list {
  &__row {
    display: flex;
    align-items: center;
    margin: $spacing-2 0;
    // 100 % だと ellipsis が中途半端な位置で反映される
    width: calc(100vw - #{$spacing-6} * 2);
    @include landscape {
      width: 100%;
    }
  }
  &__name {
    @include ellipsis;
    // HACK: 極限まで大きい値にしないと他の要素の flex-shink: 0 が効かない
    flex-shrink: 10000000000;
    margin-right: $spacing-2;
  }
  .course-detail-mini {
    flex-shrink: 0;
  }
  &__clear-button {
    @include button-cursor;
    @include text-button;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    margin-left: $spacing-3;
    font-size: 0.9rem;
    .material-icons {
      font-size: 1.4rem;
    }
  }
}

.duplication-modal .modal {
  &__text {
    line-height: $multi-line;
    margin-bottom: 3rem;
  }
  &__courses {
    display: grid;
    gap: $spacing-4;
  }
  .button {
    width: calc(50% - $spacing-3);
    &:first-child {
      margin-right: $spacing-3;
    }
    &:last-child {
      margin-left: $spacing-3;
    }
  }
}

.duplicated-course {
  @include center-flex(column);
  align-items: flex-start;
  &__name {
    font-weight: 500;
    line-height: $single-line;
    margin-bottom: $spacing-1;
  }
}
</style>
