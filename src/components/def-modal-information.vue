<template>
  <Dialog class="info" :show="show" @close="close()">
    <h1 class="info__title">Twin:teからの新着お知らせ</h1>
    <div class="info__body">
      <div class="info__post" v-for="info in information" :key="info.id">
        <div class="info__date">{{ info.date }}</div>
        <h2 class="info__topic-title">{{ info.title }}</h2>
        <div class="info__content" v-html="info.content" />
        <hr
          class="info__divider"
          v-if="information[information.length - 1] !== info"
        />
      </div>
    </div>
    <Button class="info__button" @button-click="show = false">OK</Button>

    <input
      v-model="displayInfo"
      @change="setDisplayInfo(displayInfo)"
      name="DisplayInfo"
      type="checkbox"
    />
    <label for="DisplayInfo" class="info__check-display"
      >次回のTwin:te起動時に表示する</label
    >
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

@mixin elipsis {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info {
  width: 100%;

  &__title {
    margin-top: 0;
    color: $primary-color;
    font-weight: 400;
    font-size: 1.7rem;
    &::before {
      content: 'announcement';
      display: inline-flex;
      font-family: 'Material Icons', sans-serif;
      vertical-align: middle;
      font-size: 3rem;
      margin-right: 2%;
    }
  }

  &__body {
    height: 73%;
    overflow-y: scroll;
    margin-bottom: 5%;
  }

  &__post {
    padding: 3% 5%;
  }

  &__date {
    color: $sub-text-color;
    font-size: 1.1rem;
    line-height: 1.4rem;
  }

  &__topic-title {
    @include elipsis;

    color: $info-topic-title-color;
    font-size: 1.4rem;
  }

  &__content {
    color: $main-text-color;
    font-size: 1.2rem;
    line-height: 1.7rem;
  }

  &__divider {
    margin: 0;
    padding: 0;
    border: none;
    border-bottom: 0.1rem solid $element-gray;
  }

  &__check-display {
    display: inline-block;
    color: $sub-text-color;
    font-size: 1.2rem;
    margin-top: 5%;
  }
}
</style>
