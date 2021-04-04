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
        <!-- <div class="main__content">
          ダークモード
          <ToggleSwitch
            class="switch"
            @click-toggle-switch="toggleDark"
            :isChecked="isDark"
          />
        </div> -->
        <div class="main__content">
          8限まで表示する(大学院生用)
          <ToggleSwitch
            class="switch"
            @click-toggle-switch="toggleBachelorMode"
            :isChecked="bachelorMode"
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
import { getCourseList } from "~/usecases/getCourseList";

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

    const { bachelorMode, toggleBachelorMode } = useBachelorMode(ports);

    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    const displayedYearOptions = ["指定なし", "2021年度", "2020年度"];
    const { displayedYear, setDisplayedYear } = useDisplayedYear(ports);
    const selectedYear = ref(
      displayedYear.value === null ? "指定なし" : displayedYear.value + "年度"
    );
    const updateYear = (year: string) => {
      selectedYear.value = year;
      setDisplayedYear(
        selectedYear.value === "指定なし"
          ? null
          : Number(selectedYear.value.slice(0, 4))
      );
      getCourseList(ports);
    };

    return {
      isDark,
      toggleDark,
      bachelorMode,
      toggleBachelorMode,
      displayedYearOptions,
      selectedYear,
      updateYear,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";
.view-settings {
  @include max-width;
}

.main {
  margin-top: $spacing-5;
  &__contents {
    height: calc(100vh - 8rem - #{$safe-area-top});
  }
  &__content {
    display: flex;
    align-items: center;
    padding: 1.2rem 0;
    color: $text-sub;
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
        color: $text-main;
      }
    }
  }
}
</style>
