<template>
  <section>
    <TableHeader />
    <Table />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    TableHeader: () => import("~/components/app-table-header.vue"),
    Table: () => import("~/components/app-table-contents.vue")
  }
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped></style>
