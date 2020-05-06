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
    TableHeader: () => import('~/components/app-table-header.vue'),
    Table: () => import('~/components/app-table-contents.vue'),
    ModalDetail: () => import('~/components/app-modal-detail.vue'),
  },
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variable.scss';
</style>
