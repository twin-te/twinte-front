<template>
  <div class="view-settings">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          @click="$router.back()"
          size="large"
          color="normal"
          icon-name="arrow_back"
        ></IconButton>
      </template>
      <template #title>表示設定</template>
    </PageHeader>
    <div class="main">
      <div class="main__contents">
        <div class="main__content">
          ダークテーマ
          <ToggleSwitch
            class="switch"
            @click-toggle-switch="toggleDark"
            :isChecked="isDark"
          />
        </div>
        <div class="main__content">
          土曜授業を表示する
          <ToggleSwitch
            class="switch"
            @click-toggle-switch="toggleSaturdayCourseMode"
            :isChecked="saturdayCourseMode"
          />
        </div>
        <div class="main__content">
          8限まで表示する(大学院生用)
          <ToggleSwitch
            class="switch"
            @click-toggle-switch="toggleBachelorMode"
            :isChecked="bachelorMode"
          />
        </div>
        <div class="main__content">
          各時限の開始・終了時刻を表示する
          <ToggleSwitch
            class="switch"
            @click-toggle-switch="toggleTableTimeMode"
            :isChecked="tableTimeMode"
          />
        </div>
        <div class="main__content--dropdown">
          <p>時間割に表示する年度</p>
          <Dropdown
            @update:selectedOption="updateYear"
            :options="displayedYearOptions"
            v-model:selectedOption="selectedYear"
          ></Dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useHead } from "@vueuse/head";
import Dropdown from "~/components/Dropdown.vue";
import IconButton from "~/components/IconButton.vue";
import PageHeader from "~/components/PageHeader.vue";
import ToggleSwitch from "~/components/ToggleSwitch.vue";
import { useDark, useToggle } from "@vueuse/core";
import { useBachelorMode } from "~/usecases/useBachelorMode";
import { usePorts } from "~/usecases";
import { useDisplayedYear } from "~/usecases/useDisplayedYear";
import { getCourseListByYear } from "~/usecases/getCourseListByYear";
import { useTableTimeMode } from "~/usecases/useTableTime";
import { useSaturdayCourseMode } from "~/usecases/useSaturdayCourseMode";
import { getYear } from "~/usecases/getYear";

export default defineComponent({
  components: {
    Dropdown,
    IconButton,
    PageHeader,
    ToggleSwitch,
  },
  setup: () => {
    useHead({
      title: "Twin:te | 表示設定",
    });

    const ports = usePorts();

    const {
      saturdayCourseMode,
      toggleSaturdayCourseMode,
    } = useSaturdayCourseMode(ports);
    const { bachelorMode, toggleBachelorMode } = useBachelorMode(ports);
    const { tableTimeMode, toggleTableTimeMode } = useTableTimeMode(ports);
    const isDark = useDark({
      selector: "body",
    });
    const toggleDark = useToggle(isDark);

    const displayedYearOptions = [
      "自動(現在の年度)",
      "2022年度",
      "2021年度",
      "2020年度",
      "2019年度",
    ];
    const { displayedYear, setDisplayedYear } = useDisplayedYear(ports);
    const selectedYear = ref(
      displayedYear.value === null
        ? "自動(現在の年度)"
        : displayedYear.value + "年度"
    );
    const updateYear = async (year: string) => {
      selectedYear.value = year;
      setDisplayedYear(
        selectedYear.value === "自動(現在の年度)"
          ? null
          : Number(selectedYear.value.slice(0, 4))
      );
      getCourseListByYear(ports)(await getYear(ports));
    };

    return {
      isDark,
      toggleDark,
      saturdayCourseMode,
      toggleSaturdayCourseMode,
      bachelorMode,
      toggleBachelorMode,
      tableTimeMode,
      toggleTableTimeMode,
      displayedYearOptions,
      selectedYear,
      updateYear,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/styles";
.view-settings {
  @include max-width;
}

.main {
  margin-top: $spacing-5;
  &__contents {
    height: calc(#{$vh} - 8rem);
  }
  &__content {
    display: flex;
    align-items: center;
    padding: 1.2rem 0;
    color: getColor(--color-text-main);
    font-weight: 500;

    & .switch {
      margin: 0 0 0 auto;
    }
    &--dropdown {
      display: grid;
      gap: 0.8rem;
      padding: 2rem 0;
      p {
        line-height: $single-line;
        font-weight: 500;
        color: getColor(--color-text-main);
      }
    }
  }
}
</style>
