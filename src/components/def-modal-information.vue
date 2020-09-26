<template>
  <Dialog class="info" :show="show" @close="close()">
    <article class="info__layout">
      <h1 class="info__title">Twin:teからの新着お知らせ</h1>
      <div class="info__body">
        <section class="info__post" v-for="info in information" :key="info.id">
          <div class="info__date">{{ info.date }}</div>
          <h2 class="info__topic-title">{{ info.title }}</h2>
          <div class="info__content" v-html="info.content" />
          <hr class="info__divider" v-if="information.slice(-1)[0] !== info" />
        </section>
      </div>
      <Button class="info__button" @button-click="close()">OK</Button>

      <div class="check-display">
        <input
          type="checkbox"
          id="DisplayInfo"
          v-model="displayInfo"
          name="DisplayInfo"
          class="check-display__input"
        />
        <label class="check-display__checkbox" for="DisplayInfo"
          ><span class="material-icons">check</span></label
        >次回のTwin:te起動時に表示する
      </div>
    </article>
  </Dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getInformation, parse, Information } from '../api/information'
import * as Vuex from 'vuex'

@Component({
  components: {
    Dialog: () => import('~/components/global/dialog.vue'),
    Button: () => import('~/components/global/button.vue'),
  },
})
export default class ModalInfomation extends Vue {
  $store!: Vuex.ExStore

  information: Information = []
  displayInfo = true

  /**
   * モーダルが開いているかどうかの状態を取得
   */
  get show() {
    return this.$store.getters['visible/info']
  }

  /**
   * モーダルを閉じる
   */
  close() {
    this.$store.commit('visible/chInfo', { display: false })
  }

  async mounted() {
    await this.fetchInfo()

    // 起動時にお知らせを表示するかどうか
    const displayInfo = this.getDisplayInfo()
    const existInfo = this.existInfo()
    this.updateDisplayInfo(displayInfo || existInfo)
    this.saveLatestInfo()
  }

  /**
   * infoを取得する
   *
   * fetchにしていたけどライフサイクルがうまく非同期にならなかったのでmount時に実行
   */
  async fetchInfo() {
    const { data: info } = await getInformation()
    this.information = parse(info)
  }

  /**
   * 次回の起動時に表示するかを保存する
   */
  @Watch('displayInfo')
  setDisplayInfo() {
    return localStorage.setItem('DisplayInfo', String(this.displayInfo))
  }

  /**
   * 次回の起動時に表示するかを返す
   */
  getDisplayInfo() {
    const strageData = localStorage.getItem('DisplayInfo') ?? 'true'
    return strageData === String(true)
  }

  /**
   * モーダルの表示を切り替える
   */
  updateDisplayInfo(displayInfo: boolean) {
    this.$store.commit('visible/chInfo', { display: displayInfo })
  }

  /**
   * 最新のinfoのidをLocalStrageに保存する
   */
  saveLatestInfo() {
    localStorage.setItem('LatestInfo', this.information[0]?.id)
  }

  /**
   * 最新のinfoがすでに表示済みかどうかを返す
   */
  existInfo() {
    const id = localStorage.getItem('LatestInfo')
    const latestId = this.information[0]?.id
    return id !== latestId
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variable.scss';

@mixin elipsis {
  width: 100%;
  line-height: 140%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info {
  width: 100%;

  &__layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

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
    position: relative;
    height: 100%;
    overflow-y: scroll;
    margin-bottom: 5%;
  }

  &__post {
    padding: 4% 3% 0;
  }

  &__date {
    color: $sub-text-color;
    font-size: 1.1rem;
    margin: 0 0 1.5%;
  }

  &__topic-title {
    @include elipsis;

    color: $yellow-orange;
    font-size: 1.4rem;
    margin: 0 0 3%;
  }

  &__content {
    display: inline-block;
    color: $main-text-color;
    font-size: 1.2rem;
    margin: 0 0 6%;

    /deep/ h2 {
      font-size: 1.35rem;
    }
    /deep/ h3 {
      font-size: 1.3rem;
    }
    /deep/ p {
      margin: 0;
      padding: 0;
      line-height: 140%;
    }
    /deep/ a {
      text-decoration: none;
      color: $link-text-color;
    }
  }

  &__divider {
    margin: 0;
    padding: 0;
    border: none;
    border-bottom: 0.05rem solid $element-gray;
  }
}

.check-display {
  display: flex;
  color: $sub-text-color;
  font-size: 1.2rem;
  margin-top: 5%;
  align-items: center;

  &__label {
    display: inline-block;
    width: calc(100% - 3.5rem);
  }
  &__input {
    display: none;
  }
  &__checkbox {
    position: relative;
    display: inline-block;
    width: 1.7rem;
    height: 1.7rem;
    border: 0.14rem solid $element-gray;
    border-radius: 20% 20%;
    margin-right: 0.8rem;
    cursor: pointer;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      font-size: 100%;
      font-weight: 600;
      color: $element-gray;
      cursor: pointer;
      user-select: none;
    }
  }
  &__input:checked ~ &__checkbox {
    border: 0.14rem solid $primary-color;
    background-color: $primary-color;
    opacity: 1;
    span {
      color: $white;
      font-weight: 600;
      opacity: 1;
    }
  }
}
</style>
