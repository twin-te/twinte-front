<template>
  <section>
    <TableHeader />
    <Table />
    <ModalDetail />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    TableHeader: () => import('~/presenter/tableHeader.vue'),
    Table: () => import('~/presenter/timetable.vue'),
    ModalDetail: () => import('~/presenter/modalDetail.vue'),
  },
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variable.scss';
</style>
