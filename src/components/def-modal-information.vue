<template>
  <Dialog :show="show" @close="close()">
    <article>
      <h1 class="title">モーダル</h1>
      <div v-if="information.length === 0">
        nothing to read...
      </div>
      <ul v-else>
        <li v-for="info in information" :key="info.id">
          <p>{{ info.title }}</p>
          <p>{{ info.date }}</p>
          <p v-html="info.content"></p>
        </li>
      </ul>
    </article>
  </Dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getInformation, parse, Information } from '../api/information'

@Component({
  components: {
    Dialog: () => import('~/components/global/dialog.vue'),
  },
})
export default class Index extends Vue {
  // dev
  show = true
  information: Information = []

  close() {
    this.show = false
  }

  async fetch() {
    const { data: info } = await getInformation()
    this.information = parse(info)
  }
}
</script>

<style lang="scss" scoped></style>
