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
    @click="clickHandler"
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

  <Card width="80%">aaaa</Card>

  <DecoratedIcon iconName="schedule"></DecoratedIcon>
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
import Card from "../components/Card.vue";
import DecoratedIcon from "../components/DecoratedIcon.vue";

export default defineComponent({
  name: "App",
  components: {
    Button,
    IconButton,
    ToggleIconButton,
    CourseTile,
    CourseDetail,
    Card,
    DecoratedIcon,
  },
  setup: () => {
    const { ready, state } = useUsecase(authCheck, true);
    const isBtnActive = ref({
      expand_more: false,
      edit: false,
      menu: false,
    });

    const tileStat = ref<CourseTileState>("default");

    const clickHandler = () => {
      console.log("click");
    };

    return { clickHandler, isBtnActive, ready, state, tileStat };
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
</style>
