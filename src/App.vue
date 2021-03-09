<template>
  <div id="app">
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "~/templates/Layout.vue";

export default defineComponent({
  name: "App",
  components: { Layout },
});
</script>

<style lang="scss" scoped>
@import "./scss/main.scss";
</style>
