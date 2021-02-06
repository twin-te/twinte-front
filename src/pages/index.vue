<template>
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
      course-name="学校を考える"
      course-id="1A101"
    ></CourseTile>
    <CourseTile
      state="active"
      course-name="学校を考える"
      course-id="1A101"
    ></CourseTile>
    <CourseTile state="none"></CourseTile>
    <CourseTile
      state="default"
      course-name="学校を考える"
      course-id="1A101"
      caution="他1件"
    ></CourseTile>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "../components/Button.vue";
import IconButton from "../components/IconButton.vue";
import ToggleIconButton from "../components/ToggleIconButton.vue";
import CourseTile from "../components/CourseTile.vue";

export default defineComponent({
  name: "App",
  components: {
    Button,
    IconButton,
    ToggleIconButton,
    CourseTile,
  },
  setup: () => {
    const isBtnActive = ref({
      expand_more: false,
      edit: false,
      menu: false,
    });

    const tileStat = ref("default" as "default" | "active" | "none");

    const clickHandler = () => {
      console.log("click");
    };

    return { clickHandler, isBtnActive, tileStat };
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
</style>
