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
          <div class="top__course-name">
            <TextFieldSingleLine
              v-model.trim="searchWord"
              @enterTextField="search(0)"
              placeholder="授業名や科目番号  (例 :「情報 倫理」,「GA」など)"
            ></TextFieldSingleLine>
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
        <div class="search__accordion-toggle" @click="toggleOpen">
          条件を指定する
          <span :class="{ 'material-icons': true, '--turned': isAccordionOpen }"
            >expand_more</span
          >
        </div>
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
            <!-- <template v-if="searchResult.length > 0"> -->
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
                @click-checkbox="course.isSelected = !course.isSelected"
                :course="courseToCard(course.course)"
                :isChecked="course.isSelected"
              ></CardCourse>
            </div>
            <!-- </template> -->
            <div class="result__not-found" v-if="isNoResultShow">
              {{ searchWord }}に一致する授業がありません。
            </div>
          </section>
        </transition>
      </div>
      <section class="main__button">
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

export default defineComponent({
  components: {
    Button,
    CardCourse,
    Checkbox,
    CourseDetailMini,
    IconButton,
    Modal,
    PageHeader,
    ScheduleEditer,
    TextFieldSingleLine,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const ports = usePorts();
    const gtm = useGtm();

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

    /** result */
    const searchResult = ref<{ course: Course; isSelected: boolean }[]>([]);
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
    const fetching = ref(false);
    const search = async (_offset = offset) => {
      fetching.value = true;
      if (_offset === 0) {
        searchResult.value.splice(-searchResult.value.length);
        offset = 0;
        gtm?.trackEvent({
          event: "search-courses",
          term: searchWord.value,
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
        ...courses?.map((course: Course) => ({ course, isSelected: false }))
      );
      isNoResultShow.value = _offset === 0 && courses.length === 0;
    };

    /** button */
    const btnState = computed(() => {
      if (searchResult.value.some((v) => v.isSelected)) return "default";
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
        searchResult.value.filter((v) => v.isSelected).map((v) => v.course)
      );
      if (showWarning && duplicatedCourses.value.length > 0) {
        openDuplicationModal();
        return;
      }
      try {
        await bulkAddCourseById(ports)(
          searchResult.value
            .filter((v) => v.isSelected)
            .map((v) => v.course.code)
        );
      } catch (error) {
        console.error(error);
        displayToast(ports)(extractMessageOrDefault(error));
        return;
      }
      router.push("/");
    };

    return {
      addCourse,
      addSchedule,
      btnState,
      closeDuplicationModal,
      courseToCard,
      duplicatedCourses,
      duplicationModal,
      fetching,
      isAccordionOpen,
      isNoResultShow,
      limit,
      onlyBlank,
      openDuplicationModal,
      periodToString,
      removeSchedule,
      schedules,
      search,
      searchBoxRef,
      searchResult,
      searchWord,
      setSearchResultRef,
      toggleOnlyBlank,
      toggleOpen,
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
  margin-top: $spacing-5;
  &__search {
    height: calc(#{$vh} - 16.2rem);
    padding: $spacing-3 $spacing-0 $spacing-0;
  }
  &__button {
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
    margin-bottom: $spacing-5;
  }
  &__accordion-toggle {
    @include text-button;
    @include button-cursor;
    display: table;
    margin: $spacing-0 $spacing-0 $spacing-6 auto;
    .material-icons {
      margin-left: $spacing-1;
      transition: $transition-transform;
      &.--turned {
        transform: rotate(-180deg);
      }
    }
  }
  &__result {
    height: calc(#{$vh} - 26.6rem);
    @include scroll-mask;
    overflow-y: auto;
    padding: $spacing-2;
  }
}

.top {
  &__course-name {
    width: 100%;
    margin-right: $spacing-2;
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
  &__row {
    margin-bottom: $spacing-3;
  }
  &__not-found {
    color: getColor(--color-disabled);
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
