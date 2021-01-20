<template>
  <Button @click="clickHandler" size="small">Button</Button>
  <Icon-Button @click="clickHandler" size="small" color="nomal" iconName="expand_more"></Icon-Button>
  <Icon-Button @click="clickHandler" size="medium" color="nomal" iconName="edit"></Icon-Button>
  <Icon-Button @click="clickHandler" size="large" color="nomal" iconName="menu"></Icon-Button>
  <Icon-Button @click="clickHandler" size="large" color="danger" iconName="delete"></Icon-Button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "./components/Button.vue";
import IconButton from "./components/IconButton.vue";

export default defineComponent({
  name: "App",
  components: {
    Button,
    IconButton
  },
  setup: () => {
    const clickHandler = () => {
      console.log("click");
    };

    return { clickHandler };
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
