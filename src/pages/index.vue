<template>
  <div class="home">
    <PageHeader v-show="calReady" :calendar="calendar" atHome>
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
    <div class="main">
      <ToggleButton
        class="main__toggle"
        :labels="label"
        :whichSelected="whichSelected"
        :onClickToggleButton="onClickLabel"
      />
      <div
        class="main__module"
        v-click-away="closePopupModule"
        v-if="whichSelected === 'left'"
      >
        <div class="main__module-text">
          {{ module }}
        </div>
        <div class="main__module-selector">
          <IconButton
            class="main__module-btn"
            @click="togglePopupModule"
            size="small"
            color="normal"
            icon-name="expand_more"
            :is-active="false"
          />
          <Popup class="main__module-popup" v-show="popupModule">
            <PopupContent
              v-for="data in popupModuleData"
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
        :pauseActiveStyle="false"
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
          'main__table--popup': popupModule,
        }"
        v-if="whichSelected === 'left'"
      >
        <div
          v-for="period in 6"
          :key="period"
          :class="{
            table__period: true,
            'table__period--first': period == 1,
          }"
        >
          {{ period }}
        </div>
        <template v-for="(y, d) in table" :key="d">
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
      <div class="special" v-else>
        <div class="special-header">
          <div class="special-header__label">集中</div>
          <div class="special-header__divider"></div>
        </div>
        <div class="special-contents">
          <div class="special-contents__module">春A</div>
          <CourseTile
            class="special-contents__course"
            state="default"
            name="Pedagogy for a Changing World I"
            room="1A101"
          />
          <div class="special-contents__module">夏休</div>
          <CourseTile
            class="special-contents__course"
            state="default"
            name="初等数学基礎"
            room="1A101"
          />
          <div class="special-contents__module">秋A</div>
          <CourseTile
            class="special-contents__course"
            state="default"
            name="生物科学オムニバス特講"
            room="-"
          />
        </div>

        <div class="special-header">
          <div class="special-header__label">応談</div>
          <div class="special-header__divider"></div>
        </div>
        <div class="special-contents">
          <div class="special-contents__module">-</div>
          <CourseTile
            class="special-contents__course"
            state="none"
            name=""
            room=""
          />
        </div>

        <div class="special-header">
          <div class="special-header__label">随時</div>
          <div class="special-header__divider"></div>
        </div>
        <div class="special-contents">
          <div class="special-contents__module">-</div>
          <CourseTile
            class="special-contents__course"
            state="none"
            name=""
            room=""
          />
        </div>
      </div>
    </div>
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
        :key="course.courseId"
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
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CourseTile from "~/components/CourseTile.vue";
import ToggleButton, { Labels, Select } from "~/components/ToggleButton.vue";
import IconButton from "~/components/IconButton.vue";
import Button from "~/components/Button.vue";
import Modal from "~/components/Modal.vue";
import PageHeader, { Calendar } from "~/components/PageHeader.vue";
import Popup from "~/components/Popup.vue";
import PopupContent from "~/components/PopupContent.vue";
import { DayJa, dayJaList } from "~/entities/day";
import { ModuleJa, moduleMap } from "~/entities/module";
import { CourseState, dummyData } from "~/entities/table";
import { getCurrentModule } from "~/usecases/getCurrentModule";
import { getCalendar } from "~/usecases/getCalendar";
import { useUsecase } from "~/usecases";
import { useStore } from "~/store";
import { useRouter } from "vue-router";
import { useSwitch } from "~/hooks/useSwitch";

export default defineComponent({
  name: "Table",
  components: {
    CourseTile,
    ToggleButton,
    IconButton,
    Button,
    Modal,
    PageHeader,
    Popup,
    PopupContent,
  },
  setup: () => {
    const router = useRouter();
    const store = useStore();

    /** ヘッダー */
    const toggleSidebar = () => {
      store.commit("setSidebar", !store.state.sidebar);
    };

    /** サブヘッダー部分 */
    const label = ref<Labels>({ left: "通常", right: "特殊" });
    const whichSelected = ref<Select>("left");
    const module = ref<ModuleJa>("春A");
    const { state: currentModule } = useUsecase(getCurrentModule, "春A");
    const isCurrentModule = computed(
      () => module.value === currentModule.value
    );
    const { ready: calReady, state: calendar } = useUsecase(
      getCalendar,
      {} as Calendar
    );
    const weeks = dayJaList;
    const onClickLabel = () => {
      whichSelected.value = whichSelected.value === "left" ? "right" : "left";
    };
    const [popupModule, , closePopupModule, togglePopupModule] = useSwitch(
      false
    );
    const popupModuleData = moduleMap;
    const onClickModule = (selectedModule: ModuleJa) => {
      module.value = selectedModule;
      togglePopupModule();
    };

    /** table */
    const table = computed(() => dummyData.table);
    const setCurrentModule = () => {
      module.value = currentModule.value;
    };
    const onClickCourseTile = async (
      courses: CourseState[],
      day: DayJa,
      period: number
    ) => {
      switch (courses.length) {
        case 1:
          await router.push(`/course/${courses[0].name}`);
          break;
        case 2:
          duplicationState.value = {
            courses,
            day,
            period,
          };
          break;
        default:
          break;
      }
    };

    // duplication modal
    type DuplocationState = {
      day: DayJa;
      period: number;
      courses: CourseState[];
    };
    const initialDuplicationState: DuplocationState = {
      courses: [],
      day: "月",
      period: 1,
    };
    const duplicationState = ref<DuplocationState>(initialDuplicationState);
    const clearDuplicationState = () => {
      duplicationState.value = initialDuplicationState;
    };

    return {
      toggleSidebar,
      weeks,
      label,
      whichSelected,
      onClickLabel,
      popupModule,
      togglePopupModule,
      closePopupModule,
      popupModuleData,
      onClickModule,
      module,
      table,
      calReady,
      calendar,
      setCurrentModule,
      isCurrentModule,
      onClickCourseTile,
      duplicationState,
      clearDuplicationState,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.main {
  display: grid;
  border-radius: $radius-4 $radius-4 0 0;
  box-shadow: $shadow-base;
  padding: $spacing-4 $spacing-3;
  margin: $spacing-4 0 0;
  height: calc(100vh - 7.6rem);
  grid-template:
    "toggle module btn" $spacing-7
    "table table table" 1fr
    / 12rem 1fr 10.4rem;

  @include landscape {
    border-radius: $spacing-4;
    height: calc(100vh - 9.6rem);
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
    color: $text-main;
    font-weight: $font-medium;
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
  grid-template-rows: 1.4rem repeat(6, 1fr);
  grid-template-columns: 2rem repeat(5, 1fr);
  grid-auto-flow: column;
  gap: 0.2rem;

  &__period {
    color: $text-sub;
    font-size: $font-small;
    margin: auto auto auto 0;
    &--first {
      grid-row-start: 2;
    }
  }

  &__day {
    color: $text-sub;
    font-size: $font-small;
    margin: auto;
  }
}

.special {
  grid-area: table;
}

.special-header {
  display: flex;
  margin: $spacing-3 0 $spacing-4 0;
  align-items: center;
  height: 2rem;

  &__label {
    color: $text-main;
    font-size: $font-medium;
  }
  &__divider {
    border-radius: 0.2rem;
    height: 0.4rem;
    width: calc(100% - 4rem);
    margin-left: $spacing-3;
    box-shadow: $shadow-input-concave;
  }
}

.special-contents {
  width: 100%;
  grid-area: table;
  display: grid;
  grid-template-columns: 4.8rem 1fr;
  grid-template-rows: 4.8rem;
  gap: 0.2rem;
  margin-bottom: $spacing-8;
  &__module {
    color: $text-sub;
    font-size: $font-small;
    margin-left: $spacing-1;
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

.preview__dropdown {
  padding-bottom: 10rem;
}

.preview__dropdown {
  padding-bottom: 10rem;
}
</style>
