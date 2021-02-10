<template>
  <div v-if="ready">{{ state ? "logined" : "not login" }}</div>
  <div v-else>loading...</div>

  <Button @click="$router.push('/add')" size="small">Go to Add Page</Button>

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

  <div class="course-details">
    <CourseDetail item="開講時限" value="春AB 木2"
      ><template #icon>
        <DecoratedIcon iconName="schedule"></DecoratedIcon> </template
    ></CourseDetail>

    <CourseDetail item="担当教員" value="山本早里"
      ><template #icon>
        <DecoratedIcon iconName="person"></DecoratedIcon> </template
    ></CourseDetail>

    <CourseDetail item="授業場所" value="6A508"
      ><template #icon>
        <DecoratedIcon iconName="room"></DecoratedIcon> </template
    ></CourseDetail>

    <CourseDetail item="授業形式" value="対面"
      ><template #icon>
        <DecoratedIcon iconName="category"></DecoratedIcon> </template
    ></CourseDetail>
  </div>

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
import CardAdd from "../components/CardAdd.vue";
import CardCourse, { Course } from "../components/CardCourse.vue";
import DecoratedIcon from "../components/DecoratedIcon.vue";

export default defineComponent({
  name: "App",
  components: {
    Button,
    IconButton,
    ToggleIconButton,
    CourseTile,
    CourseDetail,
    CardAdd,
    CardCourse,
    DecoratedIcon,
  },
  setup: () => {
    const { ready, state } = useUsecase(authCheck, true);
    const isBtnActive = ref({
      expand_more: false,
      edit: false,
      menu: false,
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
    const displayLog = () => {
      console.log("click");
    };

    return {
      displayLog,
      isBtnActive,
      ready,
      state,
      tileStat,
      isCourseCheked,
      courseInfo,
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

.card-add-wrapper {
  width: 40rem;
}

.card-course-wrapper {
  width: 40rem;
}
</style>
