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
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useUsecase } from "~/usecases";
import { authCheck } from "~/usecases/authCheck";
import Button from "../components/Button.vue";
import IconButton from "../components/IconButton.vue";
import ToggleIconButton from "../components/ToggleIconButton.vue";

export default defineComponent({
  name: "App",
  components: {
    Button,
    IconButton,
    ToggleIconButton,
  },
  setup: () => {
    const { ready, state } = useUsecase(authCheck, true);
    const isBtnActive = ref({
      expand_more: false,
      edit: false,
      menu: false,
    });

    const clickHandler = () => {
      console.log("click");
    };

    return { clickHandler, isBtnActive, ready, state };
  },
});
</script>

<style lang="scss" scoped></style>
