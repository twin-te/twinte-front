<template>
  <div class="home">
    <PageHeader v-show="calReady" :calendar="calendar" atHome>
      <template #left-btn>
        <IconButton
          @click="toggleSidebar"
          size="large"
          color="normal"
          iconName="menu"
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
      <div class="main__module" v-if="whichSelected === 'left'">
        {{ module }}
      </div>
      <div class="main__module-selector" v-if="whichSelected === 'left'">
        <ToggleIconButton
          v-click-away="closePopupModule"
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
          v-for="(_, d) in 5"
          :key="weeks[d]"
          :class="{ table__day: true, 'table__day--first': d == 0 }"
        >
          {{ weeks[d] }}
        </div>
        <template v-for="(y, period) in table" :key="y">
          <div class="table__period">{{ period + 1 }}</div>
          <CourseTile
            v-for="(x, id) in y"
            :key="id"
            class="table__course"
            @click="onClickCourseTile(x)"
            :state="x.state"
            :name="x.name"
            :room="x.id"
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
    v-if="welcomeModal"
    class="welcome-modal"
    @click="closeWelcomeModal"
    size="large"
  >
    <template #title>Twin:teへようこそ！</template>
    <template #contents>
      <img class="modal__mascot" src="../assets/colon2.png" alt="colonの画像" />
      <p class="modal__text">
        こんにちは！<br />
        筑波大生のための時間割アプリTwin:teをご利用いただきありがとうございます。<br />
        時間割の作成や複数端末間の連携のため、ログインしてください。<br />
        ※Twin:teにログインしたことがない場合は、自動的にアカウントが作成されます。
      </p>
    </template>
    <template #button>
      <Button
        @click="closeWelcomeModal"
        size="medium"
        layout="fill"
        color="base"
      >
        あとで
      </Button>
      <Button
        @click="$router.push('/login')"
        size="medium"
        layout="fill"
        color="primary"
      >
        ログインする
      </Button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import CourseTile, {
  State as CourseTileState,
} from "~/components/CourseTile.vue";
import ToggleButton, { Labels, Select } from "~/components/ToggleButton.vue";
import ToggleIconButton from "~/components/ToggleIconButton.vue";
import IconButton from "~/components/IconButton.vue";
import Button from "~/components/Button.vue";
import Modal from "~/components/Modal.vue";
import PageHeader, { Calendar } from "~/components/PageHeader.vue";
import Popup from "~/components/Popup.vue";
import PopupContent from "~/components/PopupContent.vue";
import { dayJaList } from "~/entities/day";
import { ModuleJa, moduleMap } from "~/entities/module";
import { tableConstructor } from "~/entities/table";
import { getCurrentModule } from "~/usecases/getCurrentModule";
import { getCalendar } from "~/usecases/getCalendar";
import { useUsecase } from "~/usecases";
import { useStore } from "~/store";
import { useRouter } from "vue-router";
import { useToggle } from "@vueuse/core";
import { authCheck } from "~/usecases/authCheck";

type CourseState = {
  id: string;
  name: string;
  state: CourseTileState;
};

export default defineComponent({
  name: "Table",
  components: {
    CourseTile,
    ToggleButton,
    ToggleIconButton,
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
    const [popupModule, togglePopupModule] = useToggle(false);
    const closePopupModule = () => {
      popupModule.value = false;
    };
    const popupModuleData = moduleMap;
    const onClickModule = (selectedModule: ModuleJa) => {
      module.value = selectedModule;
      togglePopupModule();
    };

    /** table */
    const table = computed(() =>
      tableConstructor<CourseState>({ name: "", id: "", state: "none" })
    );
    const activeCourseTile = ref<CourseState | null>(null);
    const setCurrentModule = () => {
      module.value = currentModule.value;
    };
    const onClickCourseTile = async (course: CourseState) => {
      activeCourseTile.value = course;
      await router.push(`/course/${activeCourseTile.value.id}`);
    };
    const resetCourseTileState = () => {
      activeCourseTile.value = null;
    };

    const todoFn = () => console.warn("not implements");

    // welcome modal
    const login = async () => {
      await router.push("/login");
    };
    const { state: isLogin } = useUsecase(authCheck, true);
    const welcomeModal = ref(false);
    watch(isLogin, (v) => {
      welcomeModal.value = !v;
    });
    const openWelcomeModal = () => {
      welcomeModal.value = true;
    };
    const closeWelcomeModal = () => {
      welcomeModal.value = false;
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
      todoFn,
      table,
      calReady,
      calendar,
      setCurrentModule,
      isCurrentModule,
      activeCourseTile,
      onClickCourseTile,
      resetCourseTileState,
      login,
      isLogin,
      welcomeModal,
      openWelcomeModal,
      closeWelcomeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.main {
  display: grid;
  border-radius: $spacing-4 $spacing-4 0 0;
  box-shadow: $shadow-base;
  padding: $spacing-4 $spacing-3;
  margin: $spacing-4 0 0;
  height: calc(100vh - 7.6rem);
  grid-template:
    "toggle module module-selector btn" $spacing-7
    "table table table table" 1fr
    / 12rem 1fr 1fr 10.4rem;

  @include landscape {
    border-radius: $spacing-4;
    height: calc(100vh - 9.6rem);
  }

  &__toggle {
    grid-area: toggle;
  }

  &__module {
    color: $text-main;
    margin: auto 0.6rem auto auto;
    grid-area: module;
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

.sidebar {
  &--sm {
    position: fixed;
  }
}

.home {
  @include landscape {
    margin: 0 3.6rem $spacing-5;
  }
}

.table {
  display: grid;
  grid-template-rows: 1.4rem repeat(6, 1fr);
  grid-template-columns: 2rem repeat(5, 1fr);
  gap: 0.2rem;

  &__day {
    color: $text-sub;
    font-size: $font-small;
    margin: auto;
    &--first {
      grid-column-start: 2;
    }
  }

  &__period {
    color: $text-sub;
    font-size: $font-small;
    margin: auto auto auto 0;
  }

  /* &__course {
  } */
}

.special {
  grid-area: table;
}

.special-header {
  display: flex;
  margin: 1.2rem 0 1.6rem 0;
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
    margin-left: 1.2rem;
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
  margin-bottom: 3.2rem;
  &__module {
    color: $text-sub;
    font-size: $font-small;
    margin-left: 0.4rem;
  }
  &__course {
    height: 4.8rem;
  }
}

.welcome-modal .modal {
  &__mascot {
    width: 22.8rem;
    height: 11.4rem;
    margin: 2.7rem auto 6.4rem auto;
  }
  &__text {
    font-size: $font-medium;
    line-height: $multi-line;
  }
  .button {
    width: calc(50% - 1.2rem);
    &:first-child {
      margin-right: 1.2rem;
    }
    &:last-child {
      margin-left: 1.2rem;
    }
  }
}

.preview__dropdown {
  padding-bottom: 10rem;
}

.preview__dropdown {
  padding-bottom: 10rem;
}
</style>
