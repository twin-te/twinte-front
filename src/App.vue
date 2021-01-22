<template>
  <Button @click="clickHandler" size="small">Button</Button>
  <Checkbox @change="clickHandler"></Checkbox>
  <ToggleSwitch @change="clickHandler"></ToggleSwitch>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "./components/Button.vue";
import Checkbox from "./components/Checkbox.vue";
import ToggleSwitch from "./components/ToggleSwitch.vue";

export default defineComponent({
  name: "App",
  components: {
    Button,
    Checkbox,
    ToggleSwitch,
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
