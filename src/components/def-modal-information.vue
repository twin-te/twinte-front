<template>
  <Dialog :show="show" @close="close()">
    <h1>モーダル</h1>
    <div v-for="info in information" :key="info.id">
      <h2>{{ info.title }}</h2>
      <div>{{ info.date }}</div>
      <div v-html="info.content" />
    </div>
  </Dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
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

  mounted() {
    // 起動時にお知らせを表示するかどうか
    const displayInfo = this.getDisplayInfo()
    if (!displayInfo) {
      return this.setDisplayInfo(true)
    }
    this.updateDisplayInfo(displayInfo)
  }

  setDisplayInfo(bool: boolean) {
    return localStorage.setItem('DisplayInfo', String(bool))
  }
  getDisplayInfo() {
    return localStorage.getItem('DisplayInfo')
  }
  updateDisplayInfo(displayInfo: string) {
    this.show = displayInfo === String(true)
  }
}
</script>

<style lang="scss" scoped></style>
