<template>
  <article class="preview">
    <div v-if="ready">
      {{ state ? "logined" : "not login" }}
    </div>
    <div v-else>loading...</div>

    <section class="preview__content">
      <Button @click="$router.push('/add')" size="small">Go to Add Page</Button>
    </section>
    <section class="preview__content--flex">
      <ToggleIconButton
        @click="isBtnActive.expand_more = !isBtnActive.expand_more"
        size="small"
        color="normal"
        icon-name="expand_more"
        :is-active="isBtnActive.expand_more"
      ></ToggleIconButton>

      <ToggleIconButton
        @click="isBtnActive.edit = !isBtnActive.edit"
        size="medium"
        color="normal"
        icon-name="edit"
        :is-active="isBtnActive.edit"
      ></ToggleIconButton>

      <ToggleIconButton
        @click="isBtnActive.menu = !isBtnActive.menu"
        size="large"
        color="normal"
        icon-name="menu"
        :is-active="isBtnActive.menu"
      ></ToggleIconButton>

      <IconButton
        @click="displayLog"
        size="large"
        color="danger"
        icon-name="delete"
      ></IconButton>
    </section>

    <section class="preview__content">
      <div class="course-grid">
        <CourseTile
          @click="tileStat = tileStat == 'active' ? 'default' : 'active'"
          :state="tileStat"
          courseName="学校を考える"
          courseId="1A101"
        ></CourseTile>

        <CourseTile
          state="active"
          courseName="学校を考える"
          courseId="1A101"
        ></CourseTile>

        <CourseTile state="none" courseName="" courseId=""></CourseTile>

        <CourseTile
          state="default"
          courseName="学校を考える"
          courseId="1A101"
          caution="他1件"
        ></CourseTile>
      </div>
    </section>

    <section class="preview__content">
      <div class="course-details">
        <CourseDetail item="開講時限" value="春AB 木2"
          ><template #icon>
            <DecoratedIcon iconName="schedule"></DecoratedIcon></template
        ></CourseDetail>

        <CourseDetail item="担当教員" value="山本早里"
          ><template #icon>
            <DecoratedIcon iconName="person"></DecoratedIcon></template
        ></CourseDetail>

        <CourseDetail item="授業場所" value="6A508"
          ><template #icon>
            <DecoratedIcon iconName="room"></DecoratedIcon></template
        ></CourseDetail>

        <CourseDetail item="授業形式" value="対面"
          ><template #icon>
            <DecoratedIcon iconName="category"></DecoratedIcon></template
        ></CourseDetail>
      </div>
    </section>

    <section class="preview__content--flex">
      <section class="preview__content">
        <Sidebar :isLogin="true"></Sidebar>
      </section>
      <section class="preview__content">
        <SidebarContent
          @click="displayLog"
          iconName="home"
          item="ホーム"
        ></SidebarContent>
        <SidebarContent
          @click="displayLog"
          :link="true"
          iconName="home"
          item="ホーム"
        ></SidebarContent>
        <SidebarContent
          @click="displayLog"
          iconName="home"
          item="ホーム"
          :selected="true"
        ></SidebarContent>
      </section>
    </section>
    <section>
      <div class="card-add-wrapper">
        <CardAdd
          @click-next-button="displayLog"
          iconName="search"
          heading="授業の検索"
          text="ワードや条件を指定して授業を検索・追加します。"
        ></CardAdd>
      </div>

      <div class="card-course-wrapper">
        <CardCourse
          @click-checkbox="isCourseCheked = !isCourseCheked"
          @click-syllabus-link="displayLog"
          :isChecked="isCourseCheked"
          :course="courseInfo"
        ></CardCourse>
      </div>
    </section>
    <div class="preview__content">
      <Popup>
        <PopupContent
          v-for="data in popupData"
          :key="data.value"
          @click="data.onClick"
          :link="data.link"
          :value="data.value"
          :color="data.color"
        ></PopupContent>
      </Popup>
    </div>
    <div class="preview__content">
      <Popup>
        <PopupContent
          v-for="data in popupModuleData"
          :key="data.value"
          @click="data.onClick"
          :value="data.value"
        >
        </PopupContent>
      </Popup>
    </div>
    <section class="preview__content">
      <Button @click="openModal" size="small">Open Modal</Button>
    </section>
    <section class="preview__content">
      <Modal v-if="modal" @click="closeModal" size="small">
        <template #title>title</template>
        <template #contents>
          <div class="contents">contents</div>
        </template>
        <template #button>
          <Button @click="closeModal" layout="fill" size="medium"
            >Button</Button
          >
          <Button
            @click="clickHandler"
            layout="fill"
            size="medium"
            color="primary"
            >Button</Button
          >
        </template>
      </Modal>
    </section>
    <PageHeader
      atHome
      :calendar="{ month: 2, day: 23, week: '火', schedule: '通常日課' }"
    >
      <template #left-btn>
        <IconButton
          @click="clickHandler"
          size="large"
          color="normal"
          icon-name="menu"
        ></IconButton>
      </template>
    </PageHeader>
    <PageHeader>
      <template #left-btn>
        <IconButton
          @click="clickHandler"
          size="large"
          color="normal"
          icon-name="arrow_back"
        ></IconButton>
      </template>
      <template #title>授業詳細</template>
      <template #right-btn>
        <ToggleIconButton
          @click="isBtnActive.more_vert = !isBtnActive.more_vert"
          size="large"
          color="normal"
          icon-name="more_vert"
          :is-active="isBtnActive.more_vert"
        ></ToggleIconButton>
      </template>
    </PageHeader>

    <section class="preview__content preview__scheduleEditer">
      <ScheduleEditer
        v-model:schedules="schedules"
        @click-add-button="addScheduleRow"
        @click-remove-button="removeScheduleRow"
      ></ScheduleEditer>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useUsecase } from "~/usecases";
import { authCheck } from "~/usecases/authCheck";
import Button from "../components/Button.vue";
import IconButton from "../components/IconButton.vue";
import ToggleIconButton from "../components/ToggleIconButton.vue";
import CourseTile, {
  State as CourseTileState,
} from "../components/CourseTile.vue";
import CourseDetail from "../components/CourseDetail.vue";
import Sidebar from "../components/Sidebar.vue";
import SidebarContent from "../components/SidebarContent.vue";
import DecoratedIcon from "../components/DecoratedIcon.vue";
import CardAdd from "../components/CardAdd.vue";
import CardCourse, { Course } from "../components/CardCourse.vue";
import Popup from "../components/Popup.vue";
import PopupContent, {
  Color as PopupContentColor,
} from "../components/PopupContent.vue";
import Modal from "../components/Modal.vue";
import PageHeader from "../components/PageHeader.vue";
import ScheduleEditer, { Schedules } from "../components/ScheduleEditer.vue";

export default defineComponent({
  name: "Preview",
  components: {
    Button,
    CardAdd,
    CardCourse,
    CourseDetail,
    CourseTile,
    DecoratedIcon,
    IconButton,
    Modal,
    PageHeader,
    Popup,
    PopupContent,
    ScheduleEditer,
    Sidebar,
    SidebarContent,
    ToggleIconButton,
  },
  setup: () => {
    const { ready, state } = useUsecase(authCheck, true);
    const isBtnActive = ref({
      expand_more: false,
      edit: false,
      menu: false,
      more_vert: false,
    });
    const courseInfo = ref<Course>({
      id: "01EB512",
      name: "色彩計画論特講色彩計画論特講色色彩計画論特講色彩計画論特講色",
      period: "春A 水2",
      room: "6A203",
      url: "https://example.com",
    });
    const tileStat = ref<CourseTileState>("default");
    const isCourseCheked = ref(false);
    const schedules = ref<Schedules>([
      { semester: "指定なし", date: "指定なし", period: "指定なし" },
    ]);
    const displayLog = () => {
      console.log("click");
    };

    // popup
    const popupClickHandler = (value: string) => {
      console.log(value);
    };

    const popupData: {
      onClick: Function;
      link: boolean;
      value: string;
      color: PopupContentColor;
    }[] = [
      {
        onClick: popupClickHandler,
        link: false,
        value: "編集する",
        color: "normal",
      },
      {
        onClick: popupClickHandler,
        link: true,
        value: "シラバス",
        color: "normal",
      },
      {
        onClick: popupClickHandler,
        link: true,
        value: "出席(respon)",
        color: "normal",
      },
      {
        onClick: popupClickHandler,
        link: true,
        value: "地図",
        color: "normal",
      },
      {
        onClick: popupClickHandler,
        link: false,
        value: "削除する",
        color: "danger",
      },
    ];

    const popupModuleData: {
      onClick: Function;
      value: string;
    }[] = [
      { onClick: popupClickHandler, value: "春A" },
      { onClick: popupClickHandler, value: "春B" },
      { onClick: popupClickHandler, value: "春C" },
      { onClick: popupClickHandler, value: "秋A" },
      { onClick: popupClickHandler, value: "秋B" },
      { onClick: popupClickHandler, value: "秋C" },
    ];

    const modal = ref(false);

    const openModal = () => {
      modal.value = true;
    };

    const closeModal = () => {
      modal.value = false;
    };

    const clickHandler = () => {
      console.log("click");
    };

    const addScheduleRow = () => {
      schedules.value.push({
        semester: "指定なし",
        date: "指定なし",
        period: "指定なし",
      });
    };
    const removeScheduleRow = (index: number) => {
      schedules.value.splice(index, 1);
    };

    return {
      addScheduleRow,
      clickHandler,
      closeModal,
      courseInfo,
      displayLog,
      isBtnActive,
      isCourseCheked,
      modal,
      openModal,
      popupData,
      popupModuleData,
      ready,
      removeScheduleRow,
      state,
      schedules,
      tileStat,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

.course-grid {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 0.2rem;
  width: 220px;
  height: 300px;
}

.course-details {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.card-add-wrapper {
  width: 40rem;
}

.card-course-wrapper {
  width: 40rem;
}

// modal
.modal {
  // buttonが2個の場合
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
</style>
