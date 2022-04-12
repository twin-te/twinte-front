<template>
  <div class="import">
    <PageHeader>
      <template #left-button-icon>
        <div class="header__left-button-icon">
          <IconButton
            size="large"
            color="normal"
            iconName="menu"
            @click="toggleSidebar"
          ></IconButton>
        </div>
      </template>
      <template #title>授業のインポート</template>
    </PageHeader>
    <div class="main">
      <section ref="importBoxRef" key="result" class="main__result">
        <Card v-show="courses.length > 0">
          <div
            v-for="course in courses"
            :key="course.course.id"
            class="result__row"
          >
            <CardCourse
              :course="courseToCard(course.course)"
              :isChecked="selectedCourses.has(course.course)"
              :isDetailed="false"
              :isExpanded="course.isExpanded"
              @click-checkbox="flipSet(selectedCourses, course.course)"
              @click-card="course.isExpanded = !course.isExpanded"
            />
          </div>
        </Card>
      </section>
    </div>
    <section class="import__bottom">
      <Button
        size="large"
        layout="fill"
        color="primary"
        :pauseActiveStyle="false"
        :state="btnState"
        @click="addCourse()"
        >選択した授業を追加</Button
      >
    </section>
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
            v-for="duplicatedCourse in duplicatedCourses"
            :key="duplicatedCourse.name"
            class="duplicated-course"
          >
            <p class="duplicated-course__name">{{ duplicatedCourse.name }}</p>
            <CourseDetailMini
              class="duplicated-course__detail"
              iconName="schedule"
              :text="periodToString(duplicatedCourse.schedules)"
            />
          </div>
        </div>
      </template>
      <template #button>
        <Button
          size="medium"
          layout="fill"
          color="base"
          @click="closeDuplicationModal"
          >キャンセル</Button
        >
        <Button
          size="medium"
          layout="fill"
          color="primary"
          @click="addCourse(false)"
          >そのまま追加</Button
        >
      </template>
    </Modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Course } from "~/api/@types";
import Button from "~/components/Button.vue";
import Card from "~/components/Card.vue";
import CardCourse from "~/components/CardCourse.vue";
import CourseDetailMini from "~/components/CourseDetailMini.vue";
import IconButton from "~/components/IconButton.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import { courseToCard } from "~/entities/courseCard";
import { displayToast } from "~/entities/toast";
import { useSwitch } from "~/hooks/useSwitch";
import { useStore } from "~/store";
import { usePorts } from "~/usecases";
import { bulkAddCourseById } from "~/usecases/bulkAddCourseById";
import { extractMessageOrDefault } from "~/usecases/error";
import { getCoursesByCode } from "~/usecases/getCourseByCode";
import { getDuplicatedCourses } from "~/usecases/getDuplicatedCourses";
import { getYear } from "~/usecases/getYear";
import { periodToString } from "~/usecases/periodToString";
import { flipSet } from "~/util";

export default defineComponent({
  components: {
    Button,
    Card,
    CardCourse,
    CourseDetailMini,
    IconButton,
    PageHeader,
    Modal,
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const ports = usePorts();
    const store = useStore();

    const toggleSidebar = () => {
      store.commit("setSidebar", !store.state.sidebar);
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
      const year = await getYear(ports);
      duplicatedCourses.value = getDuplicatedCourses(ports)(
        Array.from(selectedCourses.value.values()),
        year
      );
      if (showWarning && duplicatedCourses.value.length > 0) {
        openDuplicationModal();
        return;
      }
      try {
        await bulkAddCourseById(ports)(
          Array.from(selectedCourses.value.values())?.map(
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

    // result
    // const year = Number(route.query.year);
    const codes = route.query.codes?.toString().split(",");
    if (!codes) {
      await router.push("/"); // Falthyはホームに戻す
      throw new Error("courses is undefined");
    }
    const importedCourses = await getCoursesByCode(ports)(codes).catch(
      // 未ログイン時
      (error) => {
        console.error(error);
        displayToast(ports)(
          "授業が取得できませんでした。ログインしていない場合はログインしてください。"
        );
        return {
          missingCourseCodes: [],
          courses: [],
        };
      }
    );
    if (importedCourses.missingCourseCodes.length > 0) {
      displayToast(ports)(
        `以下の科目番号は見つかりませんでした。 ${importedCourses.missingCourseCodes.join(
          ","
        )}`
      );
    }
    const courses = ref(
      importedCourses.courses.map((course) => ({
        course,
        isExpanded: false,
      }))
    );
    const selectedCourses = ref(new Set([...importedCourses.courses]));

    return {
      addCourse,
      btnState,
      toggleSidebar,
      closeDuplicationModal,
      courseToCard,
      duplicatedCourses,
      duplicationModal,
      flipSet,
      openDuplicationModal,
      periodToString,
      courses,
      selectedCourses,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/styles";
@include header-left-button-delete;

.import {
  display: flex;
  flex-direction: column;
  height: $vh;
  &__bottom {
    margin: $spacing-3 $spacing-0 $spacing-6;
    @include landscape {
      margin-bottom: $spacing-7;
    }
    .button {
      margin: 0 auto;
    }
  }
}

.main {
  margin-top: $spacing-3;
  flex-grow: 1;
  &__result {
    @include scroll-mask;
    height: calc(#{$vh} - 26.6rem);
    overflow-y: auto;
    padding: $spacing-2;
    .card {
      padding: $spacing-4 $spacing-2;
      background: getColor(--color-base);
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
