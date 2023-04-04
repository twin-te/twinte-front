<template>
  <PageHeader>
    <template #left-button-icon>
      <IconButton
        size="large"
        color="normal"
        icon-name="arrow_back"
        @click="$router.back()"
      ></IconButton>
    </template>
    <template #title>CSVファイルから追加</template>
  </PageHeader>
  <div class="main">
    <div class="main__csv csv">
      <p class="csv__header">CSVファイル</p>
      <InputButtonFile
        name="csv-file"
        accept="text/csv"
        @change-file="loadCourses"
      >
        アップロードする
      </InputButtonFile>
    </div>
    <div class="main__courses courses">
      <div class="courses__contents">
        <CardCourse
          v-for="result in loadedResults"
          :key="result.course.id"
          :isChecked="result.selected"
          :course="result.course"
          :isExpanded="result.expanded"
          @click="onClickCard(result.course.id)"
          @click-checkbox="result.selected = !result.selected"
        >
        </CardCourse>
      </div>
    </div>
    <div class="main__button">
      <Button
        size="large"
        layout="fill"
        color="primary"
        data-gtm-marker="csv-import-button"
        :pauseActiveStyle="false"
        :state="buttonState"
        @click="addCourses()"
        >選択した授業を追加</Button
      >
    </div>
  </div>
  <Modal
    v-if="duplicateCourses.length > 0"
    class="duplication-modal"
    @click="duplicateCourses = []"
  >
    <template #title>開講時限が重複しています</template>
    <template #contents>
      <p class="modal__text">
        以下の授業のコマには既に授業が登録されています。そのまま追加してよろしいですか？（当該のコマには複数の授業が登録されます。）
      </p>
      <div class="modal__courses">
        <div
          v-for="course in duplicateCourses"
          :key="course.id"
          class="duplicated-course"
        >
          <p class="duplicated-course__name">{{ course.name }}</p>
          <CourseDetailMini
            class="duplicated-course__detail"
            iconName="schedule"
            :text="course.schedule.full"
          ></CourseDetailMini>
        </div>
      </div>
    </template>
    <template #button>
      <Button
        size="medium"
        layout="fill"
        color="base"
        @click="duplicateCourses = []"
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
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { usePorts } from "~/adapter";
import Usecase from "~/application/usecases";
import { isResultError, ValueError } from "~/domain/error";
import { courseToDisplay } from "~/presentation/presenters/course";
import Button from "~/ui/components/Button.vue";
import CardCourse from "~/ui/components/CardCourse.vue";
import CourseDetailMini from "~/ui/components/CourseDetailMini.vue";
import IconButton from "~/ui/components/IconButton.vue";
import InputButtonFile from "~/ui/components/InputButtonFile.vue";
import Modal from "~/ui/components/Modal.vue";
import PageHeader from "~/ui/components/PageHeader.vue";
import { addCoursesByCodes } from "~/ui/store/course";
import { displayToast } from "~/ui/store/toast";
import { getApplicableYear, setApplicableYear } from "~/ui/store/year";
import type { Schedule } from "~/domain/schedule";
import type { DisplayCourse } from "~/presentation/viewmodels/course";

const ports = usePorts();
const router = useRouter();

/** year */
await setApplicableYear();
const year = getApplicableYear();

/** result */
type LoadedResult = {
  course: DisplayCourse;
  schedules: Schedule[];
  selected: boolean;
  expanded: boolean;
};
const loadedResults = reactive<LoadedResult[]>([]);
const selectedResults = computed(() =>
  loadedResults.filter(({ selected }) => selected)
);

const onClickCard = (courseId: string) => {
  const course = loadedResults.find((result) => result.course.id === courseId);
  if (!course) return;
  course.expanded = !course.expanded;
};

type Risyu = {
  type: "risyu";
  codes: string[];
};

type Seiseki = {
  type: "seiseki";
  data: {
    code: string;
    year: number;
  }[];
};

type CSV = Risyu | Seiseki;

const readCSV = async (file: File): Promise<CSV> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const line = reader.result
        .split(/\r\n|\r|\n/)
        .filter((v) => v) // drop blank line
        .map((v) => v.replace(/"/g, ""));

      // 履修フォーマット
      if (line[0].length === 7) {
        resolve({
          type: "risyu",
          codes: line,
        });
      }

      // 成績フォーマット
      else if (line[0].split(",").length === 11) {
        line.splice(0, 1); // delete header
        resolve({
          type: "seiseki",
          data: [
            ...new Set(
              line.map((v) => ({
                code: v.split(",")[2],
                year: Number(v.split(",")[9]),
              }))
            ),
          ],
        });
      } else throw new ValueError("このフォーマット形式に対応していません");
    };
    reader.onerror = (error) => reject(error);
  });
};

const loadCourses = async (file: File) => {
  loadedResults.splice(0, loadedResults.length);
  let codes: string[] = [];

  try {
    const csv = await readCSV(file);
    switch (csv.type) {
      case "risyu":
        codes = csv.codes;
        break;
      case "seiseki":
        codes = csv.data
          .filter((v) => v.year === year.value)
          .map(({ code }) => code);
        displayToast(`${year.value}年度の授業を読み込んでいます。`, {
          type: "primary",
        });
        break;
    }
  } catch (error) {
    console.error(error);
    displayToast("ファイルの読み込みに失敗しました。");
    return;
  }

  if (codes.length === 0) {
    displayToast(`読み込むコースがありません。`);
    return;
  }

  const result = await Usecase.getCourses(ports)(
    codes.map((code) => ({ year: year.value, code }))
  );
  if (isResultError(result)) throw result;

  loadedResults.splice(
    0,
    loadedResults.length,
    ...result.map((course) => ({
      course: courseToDisplay(course),
      schedules: course.schedules,
      selected: true,
      expanded: false,
    }))
  );

  const missingCodes = codes.filter(
    (code) => result.find((course) => course.code === code) == undefined
  );
  if (missingCodes.length > 0) {
    displayToast(
      `以下の科目番号はシラバスに存在しませんでした。存在する講義のみを表示しています。\n${missingCodes.join(
        "  "
      )}`,
      { displayPeriod: 0 }
    );
  }
};

const addCourses = async (warning = true) => {
  if (buttonState.value === "disabled") return;

  duplicateCourses.value = (
    await Promise.all(
      selectedResults.value.map(async ({ course, schedules }) => ({
        course,
        result: await Usecase.checkScheduleDuplicate(ports)(
          year.value,
          schedules
        ),
      }))
    )
  ).reduce<DisplayCourse[]>((ret, { course, result }) => {
    if (isResultError(result)) throw result;
    if (!result) ret.push(course);
    return ret;
  }, []);

  if (warning && duplicateCourses.value.length > 0) return;
  await addCoursesByCodes(
    selectedResults.value.map(({ course }) => ({
      year: course.year,
      code: course.code,
    }))
  );
  router.push("/");
};

/** duplicate modal */
const duplicateCourses = ref<DisplayCourse[]>([]);

const buttonState = computed(() => {
  if (loadedResults.some(({ selected }) => selected)) return "default";
  return "disabled";
});
</script>

<style scoped lang="scss">
@import "~/ui/styles";

.header {
  max-width: 900px;
}
.main {
  max-width: 900px;
  &__csv {
    margin-top: $spacing-8;
  }
  &__courses {
    margin-top: $spacing-5;
  }
  &__error {
    margin-top: $spacing-6;
    height: calc(#{$vh} - 26.1rem);
    @include landscape {
      height: calc(#{$vh} - 26.5rem);
    }
    color: getColor(--danger);
    line-height: 2rem;
  }
  &__button {
    margin: $spacing-3 $spacing-0 $spacing-6;
    @include center-flex;
    @include landscape {
      margin-bottom: $spacing-7;
    }
  }
}
.csv {
  &__header {
    font-weight: 500;
    line-height: $single-line;
    margin-bottom: $spacing-4;
  }
}
.courses {
  height: calc(#{$vh} - 25.7rem);
  @include landscape {
    height: calc(#{$vh} - 26.1rem);
  }
  overflow-y: auto;
  margin-right: -($spacing-4);
  padding-right: $spacing-4;
  @include scroll-mask;
  &__contents {
    display: grid;
    gap: $spacing-3;
    margin: $spacing-3 $spacing-0 $spacing-14;
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
