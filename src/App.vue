<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "~/templates/Layout.vue";

export default defineComponent({
  name: "App",
  components: { Layout },
});
</script>
