<template>
  <div class="search">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          @click="$router.back()"
          size="large"
          color="normal"
          icon-name="arrow_back"
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
                v-model.trim="searchCode"
                @enter-text-field="search(0)"
                placeholder="例）GA -0"
                :height="3.4"
              >
              </TextFieldSingleLine>
            </LabeledTextField>
          </div>
          <div class="top__course-name">
            <LabeledTextField label="キーワード" size="slim">
              <TextFieldSingleLine
                v-model.trim="searchWord"
                @enterTextField="search(0)"
                placeholder="例）情報 倫理"
                :height="3.4"
              ></TextFieldSingleLine>
            </LabeledTextField>
          </div>
          <div class="top__search-button">
            <IconButton
              @click="search(0)"
              @keyup.enter="search(0)"
              iconName="search"
              size="medium"
              :loading="fetching"
            ></IconButton>
          </div>
        </section>
        <section class="search__option">
          <div class="option__display-toggle">
            <ToggleButton
              @click-toggle-button="toggleDetailed"
              :labels="{ left: '詳細', right: '簡易' }"
              :which-selected="isDetailed ? 'left' : 'right'"
            />
          </div>
          <div class="option__accordion-toggle" @click="toggleOpen">
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
            class="search__accordion"
            v-if="isAccordionOpen"
            key="accordion"
          >
            <div class="accordion__top-border"></div>
            <div class="accordion__only-blank" @click="toggleOnlyBlank">
              <Checkbox
                :isChecked="onlyBlank"
                @clickCheckbox.stop="toggleOnlyBlank"
              ></Checkbox>
              空いているコマのみを検索
            </div>
            <div v-if="!onlyBlank" class="accordion__shedule-editor">
              <ScheduleEditer
                v-model:schedules="schedules"
                :onClickAddButton="addSchedule"
                :onClickRemoveButton="removeSchedule"
              ></ScheduleEditer>
            </div>
          </section>
          <section
            class="search__result"
            v-else
            ref="searchBoxRef"
            key="result"
          >
            <Card v-show="searchResult.length > 0">
              <div
                class="result__row"
                v-for="(course, index) in searchResult"
                :key="course.course.id"
                :ref="
                  (el) => {
                    setSearchResultRef(el, index);
                  }
                "
              >
                <CardCourse
                  @click-card="course.isExpanded = !course.isExpanded"
                  @click-checkbox="flipSet(selectedCourses, course.course)"
                  :course="courseToCard(course.course)"
                  :isChecked="selectedCourses.has(course.course)"
                  :isDetailed="isDetailed"
                  :isExpanded="course.isExpanded"
                ></CardCourse>
              </div>
            </Card>
            <div
              v-show="searchResult.length === 0 && !isNoResultShow"
              class="result__description"
            >
              <p>
                ※授業データは筑波大学の教育課程編成支援システム(KdB)より取得しています。
              </p>
              <p>※毎朝5:00に更新されます。</p>
            </div>
            <div class="result__not-found" v-if="isNoResultShow">
              {{ searchWord }}に一致する授業がありません。
            </div>
          </section>
        </transition>
        <div class="search__selected">
          <div
            @click="toggleSelectedOpen"
            :class="{
              selected__count: true,
              '--active': selectedCourses.size > 0,
              '--opened': isSelectedOpen,
            }"
          >
            選択中の授業:
            {{ selectedCourses.size }}件
            <span v-show="selectedCourses.size > 0" class="material-icons"
              >expand_less</span
            >
          </div>
          <div v-show="isSelectedOpen" class="selected__course-list">
            <div
              v-for="course in selectedCourses.values()"
              :key="course.id"
              class="course-list__row"
            >
              <div class="course-list__name">
                {{ course.name }}
              </div>
              <CourseDetailMini
                icon-name="schedule"
                :text="periodToString(course.schedules)"
              />
              <div
                @click="targetCourseToDelete(course)"
                class="course-list__clear-button"
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
          @click="addCourse()"
          size="large"
          layout="fill"
          color="primary"
          :pauseActiveStyle="false"
          :state="btnState"
          >選択した授業を追加</Button
        >
      </section>
    </div>
    <Modal
      v-if="duplicationModal"
      class="duplication-modal"
      @click="closeDuplicationModal"
    >
      <template #title>開講時限が重複しています</template>
      <template #contents>
        <p class="modal__text">
          以下の授業のコマには既に授業が登録されています。そのまま追加してよろしいですか？（当該のコマには複数の授業が登録されます。）
        </p>
        <div class="modal__courses">
          <div
            class="duplicated-course"
            v-for="duplicatedCourse in duplicatedCourses"
            :key="duplicatedCourse.name"
          >
            <p class="duplicated-course__name">{{ duplicatedCourse.name }}</p>
            <CourseDetailMini
              class="duplicated-course__detail"
              iconName="schedule"
              :text="periodToString(duplicatedCourse.schedules)"
            ></CourseDetailMini>
          </div>
        </div>
      </template>
      <template #button>
        <Button
          @click="closeDuplicationModal"
          size="medium"
          layout="fill"
          color="base"
          >キャンセル</Button
        >
        <Button
          @click="addCourse(false)"
          size="medium"
          layout="fill"
          color="primary"
          >そのまま追加</Button
        >
      </template>
    </Modal>
    <Modal v-if="courseTargetedToDelete" @click="closeDeleteModal">
      <template #title>選択を解除しますか？</template>
      <template #contents>
        「{{ courseTargetedToDelete.name }}」の選択を解除しますか？ <br />
        解除すると「選択中の授業」一覧から削除されます。
      </template>
      <template #button>
        <Button
          @click="closeDeleteModal"
          size="medium"
          layout="fill"
          color="base"
          >キャンセル</Button
        >
        <Button
          @click="deleteTargetCourse(courseTargetedToDelete)"
          size="medium"
          layout="fill"
          color="danger"
          >解除</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { bulkAddCourseById } from "~/usecases/bulkAddCourseById";
import { Course } from "~/api/@types";
import { courseToCard } from "~/entities/courseCard";
import { defineComponent, ref, computed, ComponentPublicInstance } from "vue";
import { displayToast } from "~/entities/toast";
import { extractMessageOrDefault } from "~/usecases/error";
import { getDuplicatedCourses } from "~/usecases/getDuplicatedCourses";
import { periodToString } from "~/usecases/periodToString";
import { Schedule } from "~/entities/schedule";
import { searchCourse } from "~/usecases/searchCourse";
import { useGtm } from "@gtm-support/vue-gtm";
import { usePorts } from "~/usecases";
import { useRoute, useRouter } from "vue-router";
import { useSwitch } from "~/hooks/useSwitch";
import { useToggle, useIntersectionObserver } from "@vueuse/core";
import Button from "~/components/Button.vue";
import CardCourse from "~/components/CardCourse.vue";
import Checkbox from "~/components/Checkbox.vue";
import CourseDetailMini from "~/components/CourseDetailMini.vue";
import IconButton from "~/components/IconButton.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import ScheduleEditer from "~/components/ScheduleEditer.vue";
import TextFieldSingleLine from "~/components/TextFieldSingleLine.vue";
import ToggleButton from "~/components/ToggleButton.vue";
import Card from "~/components/Card.vue";
import { flipSet } from "~/util";
import LabeledTextField from "~/components/LabeledTextField.vue";

export default defineComponent({
  components: {
    Button,
    Card,
    CardCourse,
    Checkbox,
    CourseDetailMini,
    IconButton,
    Modal,
    PageHeader,
    ScheduleEditer,
    TextFieldSingleLine,
    ToggleButton,
    LabeledTextField,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const ports = usePorts();
    const gtm = useGtm();

    /** display toogle */
    const [isDetailed, toggleDetailed] = useToggle(true);

    /** accordion */
    const [isAccordionOpen, toggleOpen] = useToggle(
      route.query.module != null &&
        route.query.day != null &&
        route.query.period != null
    );

    /** search option */
    const [onlyBlank, toggleOnlyBlank] = useToggle();

    /** schedule-editor */
    const schedules = ref<Schedule[]>([
      {
        module: route.query.module ?? "指定なし",
        day: route.query.day ?? "指定なし",
        period: route.query.period ?? "指定なし",
      } as Schedule,
    ]);
    const addSchedule = () => {
      schedules.value.push({
        module: "指定なし",
        day: "指定なし",
        period: "指定なし",
      });
    };
    const removeSchedule = (index: number) => {
      schedules.value.splice(index, 1);
    };

    /** condition */
    const conditions = computed<{ style: "outline" | "filled"; label: string }>(
      () => {
        if (onlyBlank.value) return { style: "filled", label: "空きコマのみ" };
        else if (
          Object.values(schedules.value[0]).every((x) => x === "指定なし")
        )
          return { style: "outline", label: "未指定" };
        else
          return {
            style: "filled",
            label: schedules.value
              .map(
                (schedule) =>
                  `${schedule.module}${schedule.day}${schedule.period}`
              )
              .join(","),
          };
      }
    );

    const selectedCourses = ref(new Set<Course>());

    /** result */
    const searchResult = ref<{ course: Course; isExpanded: boolean }[]>([]);
    const [isSelectedOpen, toggleSelectedOpen] = useToggle(false);
    // 検索結果を動的に読み込む処理
    const searchBoxRef = ref<Element>();
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
      if (index + 1 == searchResult.value.length) {
        useIntersectionObserver(
          el,
          ([entry], observer) => {
            if (!entry.isIntersecting) return;
            search();
            observer.unobserve(entry.target);
          },
          options
        );
      }
    };

    /** top */
    let offset = 0;
    let limit = 50;
    const isNoResultShow = ref(false);
    const searchWord = ref("");
    const searchCode = ref("");
    const fetching = ref(false);
    const search = async (_offset = offset) => {
      fetching.value = true;
      if (_offset === 0) {
        searchResult.value.splice(-searchResult.value.length);
        offset = 0;
        gtm?.trackEvent({
          event: "search-courses",
          term: searchWord.value,
          code: searchCode.value,
          use_only_blank: onlyBlank.value,
          schedules: JSON.stringify(schedules.value),
        });
      }
      isAccordionOpen.value = false;
      let courses: Course[] = [];
      try {
        courses = await searchCourse(ports)(
          schedules.value,
          searchWord.value.split(/\s/),
          searchCode.value.split(/\s/),
          _offset,
          limit,
          onlyBlank.value
        );
      } catch (error) {
        fetching.value = false;
        console.error(error);
        displayToast(ports)(extractMessageOrDefault(error));
        return;
      }
      fetching.value = false;
      offset += limit;
      searchResult.value.splice(
        searchResult.value.length,
        courses.length,
        ...courses?.map((course: Course) => ({
          course,
          isSelected: false,
          isExpanded: false,
        }))
      );
      isNoResultShow.value = _offset === 0 && courses.length === 0;
    };

    /** button */
    const btnState = computed(() => {
      if (selectedCourses.value.size > 0) return "default";
      else return "disabled";
    });

    /** deulpication modal */
    const [
      duplicationModal,
      openDuplicationModal,
      closeDuplicationModal,
    ] = useSwitch();
    const duplicatedCourses = ref<Required<Course>[]>([]);

    const addCourse = async (showWarning = true) => {
      if (btnState.value == "disabled") return;
      duplicatedCourses.value = getDuplicatedCourses(ports)(
        Array.from(selectedCourses.value.values())
      );
      if (showWarning && duplicatedCourses.value.length > 0) {
        openDuplicationModal();
        return;
      }
      try {
        await bulkAddCourseById(ports)(
          Array.from(selectedCourses.value.values()).map(
            (course) => course.code
          )
        );
      } catch (error) {
        console.error(error);
        displayToast(ports)(extractMessageOrDefault(error));
        return;
      }
      router.push("/");
    };

    /** delete selected course modal */
    const courseTargetedToDelete = ref<Course>();
    const targetCourseToDelete = (course: Course) =>
      (courseTargetedToDelete.value = course);
    const closeDeleteModal = () => {
      courseTargetedToDelete.value = undefined;
    };
    const deleteTargetCourse = (course: Course | undefined) => {
      if (!course) return;
      selectedCourses.value.delete(course);
      courseTargetedToDelete.value = undefined;
    };

    return {
      addCourse,
      addSchedule,
      btnState,
      closeDeleteModal,
      closeDuplicationModal,
      conditions,
      courseTargetedToDelete,
      courseToCard,
      deleteTargetCourse,
      duplicatedCourses,
      duplicationModal,
      fetching,
      flipSet,
      isAccordionOpen,
      isDetailed,
      isNoResultShow,
      isSelectedOpen,
      limit,
      onlyBlank,
      openDuplicationModal,
      periodToString,
      removeSchedule,
      schedules,
      search,
      searchBoxRef,
      searchCode,
      searchResult,
      searchWord,
      selectedCourses,
      setSearchResultRef,
      targetCourseToDelete,
      toggleDetailed,
      toggleOnlyBlank,
      toggleOpen,
      toggleSelectedOpen,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/styles";
.search {
  @include max-width;
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
      background-color: getColor(--color-base);
    }
  }
  &__result,
  &__accordion {
    height: calc(
      #{$vh} - 26.6rem - 5rem - v-bind("`${isSelectedOpen ? selectedCourses.size * 2.7 : 0}rem`")
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
