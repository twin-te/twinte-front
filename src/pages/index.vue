<template>
  <section>
    <app-header-table />
    <app-time-table id="table" :semester="semester" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    AppHeaderTable: () => import("~/components/app-table-header.vue"),
    AppTimeTable: () => import("~/components/app-table-contents.vue")
  }
})
export default class Index extends Vue {
  semester: number = 0;
}
</script>

<style lang="sass" scoped></style>
