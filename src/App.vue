<template>
  <Button @click="clickHandler" size="small">Button</Button>
  <TextFieldSingleLine
    v-model="text1"
    @enter-text-field="enterHandler(text1)"
    placeholder="e.g."
    iconName="search"
  ></TextFieldSingleLine>
  {{ text1 }}
  <TextFieldSingleLine
    v-model="text2"
    @enter-text-field="enterHandler(text2)"
    placeholder="例）ゼミ"
    :width="20"
    :height="3"
  ></TextFieldSingleLine>
  {{ text2 }}
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "./components/Button.vue";
import TextFieldSingleLine from "./components/TextFieldSingleLine.vue";

export default defineComponent({
  name: "App",
  components: {
    Button,
    TextFieldSingleLine,
  },
  setup: () => {
    const text1 = ref("");
    const text2 = ref("");

    const clickHandler = () => {
      console.log("click");
    };

    const enterHandler = (text: string) => {
      console.log('enter ! ', text);
    };

    return { clickHandler, enterHandler, text1, text2 };
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
