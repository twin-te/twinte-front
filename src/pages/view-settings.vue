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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useHead } from "@vueuse/head";
import IconButton from "~/components/IconButton.vue";
import PageHeader from "~/components/PageHeader.vue";
import ToggleSwitch from "~/components/ToggleSwitch.vue";
import { useDark, useToggle } from "@vueuse/core";
import { useBachelorMode } from "~/usecases/useBachelorMode";
import { usePorts } from "~/usecases";

export default defineComponent({
  components: {
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

    return { isDark, toggleDark, bachelorMode, toggleBachelorMode };
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
  }
}
</style>
