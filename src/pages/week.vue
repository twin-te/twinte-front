<template>
  <section>
    <Table />
    <ModalDetail />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    Table: () => import('~/components/app-week-table-contents.vue'),
    ModalDetail: () => import('~/components/app-modal-detail.vue'),
  },
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variable.scss';
</style>
