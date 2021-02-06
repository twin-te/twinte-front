<template>
  <Button @click="clickHandler" size="small">Button</Button>

  <Checkbox
    @click-checkbox="btnsState.checkbox = !btnsState.checkbox"
    :isChecked="btnsState.checkbox"
  ></Checkbox>

  <ToggleSwitch
    @click-toggle-switch="btnsState.toggleSwitch = !btnsState.toggleSwitch"
    :isChecked="btnsState.toggleSwitch"
  ></ToggleSwitch>

  <ToggleButton
    @click-toggle-button="
      btnsState.toggleBtn = btnsState.toggleBtn == 'left' ? 'right' : 'left'
    "
    :labels="{ left: '通常', right: '特殊' }"
    :whichSelected="btnsState.toggleBtn"
  ></ToggleButton>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "./components/Button.vue";
import Checkbox from "./components/Checkbox.vue";
import ToggleSwitch from "./components/ToggleSwitch.vue";
import ToggleButton from "./components/ToggleButton.vue";

export default defineComponent({
  name: "App",
  components: {
    Button,
    Checkbox,
    ToggleSwitch,
    ToggleButton,
  },
  setup: () => {
    const btnsState = ref({
      checkbox: false,
      toggleSwitch: false,
      toggleBtn: "left" as "left" | "right",
    });

    const clickHandler = (e: MouseEvent) => {
      console.log(e);
    };

    return { clickHandler, btnsState };
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
