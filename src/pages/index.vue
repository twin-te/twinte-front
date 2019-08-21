<template>
  <section>
    <app-time-table-header />
    <app-time-table />
    <app-dialog />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    AppTimeTableHeader: () => import("~/components/app-table-header.vue"),
    AppTimeTable: () => import("~/components/app-table-contents.vue"),
    AppDialog: () => import("~/components/app-dialog-detail.vue")
  }
})
export default class Index extends Vue {}
</script>

<style lang="sass" scoped></style>
