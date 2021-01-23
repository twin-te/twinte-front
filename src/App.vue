<template>
  <Button @click="clickHandler" size="small">Button</Button>

  <ToggleIconButton
    @click="isBtnActive.expand_more = !isBtnActive.expand_more"
    size="small"
    color="normal"
    iconName="expand_more"
    :isActive="isBtnActive.expand_more"
  ></ToggleIconButton>

  <ToggleIconButton
    @click="isBtnActive.edit = !isBtnActive.edit"
    size="medium"
    color="normal"
    iconName="edit"
    :isActive="isBtnActive.edit"
  ></ToggleIconButton>

  <ToggleIconButton
    @click="isBtnActive.menu = !isBtnActive.menu"
    size="large"
    color="normal"
    iconName="menu"
    :isActive="isBtnActive.menu"
  ></ToggleIconButton>

  <IconButton
    @click="clickHandler"
    size="large"
    color="danger"
    iconName="delete"
  ></IconButton>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "./components/Button.vue";
import IconButton from "./components/IconButton.vue";
import ToggleIconButton from "./components/ToggleIconButton.vue";

export default defineComponent({
  name: "App",
  components: {
    Button,
    IconButton,
    ToggleIconButton,
  },
  setup: () => {
    const isBtnActive = ref({
      expand_more: false,
      edit: false,
      menu: false,
    });

    const clickHandler = () => {
      console.log("click");
    };

    return { clickHandler, isBtnActive };
  },
});
</script>

<style lang="scss" scoped>
@import "./scss/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
