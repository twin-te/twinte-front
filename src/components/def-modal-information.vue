<template>
  <Dialog class="info" :show="show" @close="close()">
    <h1 class="info__title">Twin:teからの新着お知らせ</h1>
    <div class="info__post" v-for="info in information" :key="info.id">
      <div class="info__date">{{ info.date }}</div>
      <h2 class="info__subtitle">{{ info.title }}</h2>
      <div class="info__content" v-html="info.content" />
      <hr
        class="info__divider"
        v-if="information[information.length - 1] !== info"
      />
    </div>

    <Button class="info__button" @button-click="show = false">OK</Button>

    <input
      v-model="displayInfo"
      @change="setDisplayInfo(displayInfo)"
      name="DisplayInfo"
      type="checkbox"
    />
    <label for="DisplayInfo">次回のTwin:te起動時に表示する</label>
  </Dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getInformation, parse, Information } from '../api/information'

@Component({
  components: {
    Dialog: () => import('~/components/global/dialog.vue'),
    Button: () => import('~/components/global/button.vue'),
  },
})
export default class Index extends Vue {
  // dev
  show = true
  information: Information = []
  displayInfo = true

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
    const d = displayInfo === String(true)
    this.displayInfo = d
    this.show = d
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variable.scss';
$info-title-color: #f2b456;

@mixin elipsis {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info {
  width: 100%;

  &__title {
    color: $primary-color;
    // fixme ずれてる
    &::before {
      content: 'announcement';
      display: inline-flex;
      font-family: 'Material Icons', sans-serif;
      vertical-align: middle;
    }
  }

  &__date {
    color: $sub-text-color;
    height: 14px;
    font-size: 10px;
    line-height: 14px;
  }

  &__post {
    padding: 17px;
  }

  &__content {
    color: $main-text-color;
    font-size: 10px;
    line-height: 15px;
  }

  &__subtitle {
    @include elipsis;
    color: $info-title-color;
    height: 20px;
    font-size: 13px;
    line-height: 20px;
  }

  &__divider {
    border: 0.5px solid $element-gray;
  }

  // fixme
  &__button {
    background: $primary-color;
    width: 100%;
    height: 60px;
  }
}
</style>
