<template>
  <div>
    <def-toolbar />
    <def-navigation />
    <def-dialog-add />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    "def-toolbar": () => import("~/components/def-toolbar.vue"),
    "def-navigation": () => import("~/components/def-nav.vue"),
    "def-dialog-add": () => import("~/components/def-dialog-add.vue")
  }
})
export default class Index extends Vue {}
</script>

<style lang="sass" scoped></style>
