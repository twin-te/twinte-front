<template>
  <div>
    <def-toolbar />
    <def-navigation />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    "def-toolbar": () => import("~/components/def-toolbar.vue"),
    "def-navigation": () => import("~/components/def-nav.vue")
  }
})
export default class Index extends Vue {
}
</script>

<style lang="sass" scoped></style>
