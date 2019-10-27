<template>
  <section>
    <app-time-table-header />
    <app-time-table />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    AppTimeTableHeader: () => import("~/components/app-table-header.vue"),
    AppTimeTable: () => import("~/components/app-table-contents.vue")
  }
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped></style>
