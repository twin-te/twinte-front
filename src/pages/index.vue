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
        @click="clickHandler"
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
        <CourseDetail
          iconName="schedule"
          item="開講時限"
          value="春AB 木2"
        ></CourseDetail>

        <CourseDetail
          iconName="person"
          item="担当教員"
          value="山本早里"
        ></CourseDetail>

        <CourseDetail
          iconName="room"
          item="授業場所"
          value="6A508"
        ></CourseDetail>

        <CourseDetail
          iconName="category"
          item="授業形式"
          value="対面"
        ></CourseDetail>
      </div>
    </section>

    <section class="preview__content preview__dropdown">
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
import ScheduleEditer, {
  Schedule,
  Schedules,
} from "../components/ScheduleEditer.vue";

export default defineComponent({
  name: "App",
  components: {
    Button,
    IconButton,
    ToggleIconButton,
    CourseTile,
    CourseDetail,
    ScheduleEditer,
  },
  setup: () => {
    const { ready, state } = useUsecase(authCheck, true);
    const isBtnActive = ref({
      expand_more: false,
      edit: false,
      menu: false,
    });
    const tileStat = ref<CourseTileState>("default");
    const selectedOption = ref<string>("");
    const schedules = ref<Schedules>([
      { id: 0, semester: "", date: "", period: "" },
    ]);

    const addScheduleRow = () => {
      schedules.value.push({
        id: schedules.value.slice(-1)[0].id + 1,
        semester: "",
        date: "",
        period: "",
      });
    };
    const removeScheduleRow = (id: number) => {
      const index = schedules.value.findIndex(
        (el: Schedule): boolean => el.id == id
      );
      schedules.value.splice(index, 1);
    };
    const clickHandler = () => {
      console.log("click");
    };

    return {
      clickHandler,
      isBtnActive,
      ready,
      state,
      tileStat,
      selectedOption,
      schedules,
      addScheduleRow,
      removeScheduleRow,
    };
  },
});
</script>

<style lang="scss" scoped>
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

.preview__dropdown {
  padding-bottom: 10rem;
}
</style>
