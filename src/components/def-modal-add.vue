<template>
  <!--
    時間割追加画面
    ボタン、フォーム、CSVファイル追加辺りは別コンポネントに分けたい
  -->
  <Dialog :show="show" @close="close()">
    <article>
      <h1 class="title"><i class="title--icon material-icons">add</i> 授業の追加</h1>

      <!-- 検索フォーム -->
      <form class="search-form" @submit.prevent>
        <input
          v-model="input"
          type="text"
          placeholder="授業名/科目番号で検索"
          class="search-form__form"
          @keyup.enter="search(input, 'input')"
        />
        <span
          @click="search(input, 'input')"
          class="search-form__btn material-icons"
          >search</span
        >
      </form>

      <!-- 以下検索結果 -->
      <section class="result-list">
        <div
          class="result-wrap"
          v-for="(n, i) in lectures"
          :key="n.lecture_code + i"
        >
          <input
            type="checkbox"
            :id="n.lecture_code"
            :value="n.lecture_code"
            v-model="n.checked"
            class="result-list__input"
          />
          <label class="result-list__checkbox" :for="n.lecture_code">
            <span class="material-icons">check</span>
          </label>
          <div class="result-content">
            <label class="result-list__lecture-code" for="n.lecture_code">
              {{ n.lecture_code }}
              <span>{{ n.module }}{{ n.day }}{{ n.period }}</span>
            </label>
            <label class="result-list__lecture-name" for="n.lecture_code">{{
              n.lecture_name
            }}</label>
          </div>
          <div class="result-formats">
            <i
              class="material-icons icon result-formats__icon"
              :class="{
                'result-formats__icon--on': n.formats.includes('FaceToFace'),
              }"
              >people_alt</i
            >
            <i
              class="material-icons icon result-formats__icon"
              :class="{
                'result-formats__icon--on': n.formats.includes('Synchronous'),
              }"
              >switch_video</i
            >
            <i
              class="material-icons icon result-formats__icon"
              :class="{
                'result-formats__icon--on': n.formats.includes('Asynchronous'),
              }"
              >video_library</i
            >
          </div>
          <span @click="syllabus(n)" class="syllabus-btn material-icons"
            >chevron_right</span
          >
        </div>
      </section>
      <!-- ここまで検索結果 -->

      <section class="others-form">
        <p class="others-form__content" @click="twins()">
          Twinsからインポート
          <span class="material-icons icon">chevron_right</span>
        </p>
        <p class="others-form__content" @click="custom()">
          手動入力で授業を作成
          <span class="material-icons icon">chevron_right</span>
        </p>
        <p class="others-form__content" @click="csv()">
          CSVファイルから追加
          <span class="material-icons icon">chevron_right</span>
        </p>
      </section>
      <!-- → その他オプション -->
      <hr class="footer-divider" />
      <section class="register-btn" @click="submitByNumber()">
        時間割に追加
      </section>
    </article>
  </Dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import Swal from 'sweetalert2'

import { twinsToTwinteAlert } from './utils/swal'
import { addCustomLecture } from './utils/addCustomLecture'
import { isMobile } from '../common/ua'
import { searchLectures } from '../store/api/lectures'
import { YEAR } from '../common/config'
import { openUrl } from './utils/openUrl'

type miniLecture = {
  lecture_code: string
  lecture_name: string
  module: string
  day: string
  period: number
  checked: boolean
  formats: string[]
}

@Component({
  components: {
    Dialog: () => import('~/components/global/dialog.vue'),
  },
})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  // data___________________________________________________________________________________
  //
  input: string = ''
  lectures: miniLecture[] = []

  // computed___________________________________________________________________________________
  //
  get moduleMessage(): string {
    return `${this.$store.getters['table/module']}のCSVファイルを入力してください`
  }
  get show(): boolean {
    return this.$store.getters['visible/add']
  }
  get moduleNum(): number {
    return this.$store.getters['table/moduleNum']
  }

  // method___________________________________________________________________________________
  //
  close() {
    this.$store.commit('visible/chAdd', { display: false })
  }
  twins() {
    if (isMobile()) {
      twinsToTwinteAlert()
    } else {
      Swal.fire(
        'ご利用の環境では非対応です',
        'この機能はiOS版アプリ・Android版アプリでのみ利用できます。',
        'info'
      )
    }
  }
  syllabus(n: miniLecture) {
    openUrl(
      `https://kdb.tsukuba.ac.jp/syllabi/${YEAR}/${n.lecture_code}/jpn/0/`
    )
  }

  async custom() {
    await addCustomLecture()
    await this.$store.commit('visible/chAdd', { display: false })
    await // this.$store.commit('visible/chCustom', { display: true })
    await this.$store.dispatch('api/fetch')
  }

  async search(input: string, type: 'csv' | 'input') {
    if (input === '') {
      return
    }
    this.lectures = await this.parse(input, type)
    if (this.lectures.length === 0) {
      Swal.fire(
        '見つかりません',
        '科目番号や科目名が正しいかどうかご確認ください',
        'error'
      )
    }
    this.input = ''
    ;(document.activeElement as HTMLElement).blur()
  }

  async parse(input: string, type: 'csv' | 'input'): Promise<miniLecture[]> {
    const le = await searchLectures(input)

    return le.map((l) => {
      return {
        lecture_code: l.lectureCode,
        lecture_name: l.name,
        module: l.details[0]?.module || '',
        day: l.details[0]?.day || '',
        period: l.details[0]?.period || 0,
        formats: l.formats,
        checked: type === 'csv',
      }
    })
  }

  async csv() {
    const { value: file } = await Swal.fire({
      title: 'CSVファイルから追加',
      text: this.moduleMessage,
      input: 'file',
      inputAttributes: {
        accept: 'text/csv, .csv',
        'aria-label': this.moduleMessage,
      },
      customClass: {
        input: 'csv-form',
      },
    })

    if (file) {
      const reader = new FileReader()
      reader.onload = async (e: any) => {
        e.preventDefault()

        // viewとstate以外(csv処理)を入れたくない
        const parse = async (csv: string) => await this.parse(csv, 'csv')
        const pushLecture = (lectures: miniLecture[]) => {
          this.lectures = [...this.lectures, ...lectures]
        }
        if (typeof reader.result !== 'string') return

        const lectures = await Promise.all(
          reader.result
            .split('\r\n')
            .filter((v) => v) // drop blank line
            .map((v) => v.replace(/["]/g, '')) // drop "
            .map(async (lecture) => {
              return await parse(lecture)
            })
        )

        pushLecture(lectures.flat())
      }
      reader.readAsText(file as Blob)
    }
  }

  async submitByNumber() {
    if (!this.$store.getters['api/isLogin']) {
      Swal.fire(
        'まだログインしていません',
        '歯車⚙からログインしてください',
        'info'
      )
      return
    }

    Swal.fire({
      title: '科目追加を行いますか？',
      text: '時間割が重複している場合はあらかじめ削除してください。',
      showCancelButton: true,
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
    }).then(async (result) => {
      if (!result.value) {
        return
      }

      const lectureCodes = await Promise.all(
        this.lectures.filter((l) => l.checked).map((l) => l.lecture_code)
      )

      if (lectureCodes.length === 0) {
        Swal.fire(
          '追加するデータがありません',
          '検索を行い、追加する授業にチェックマークをつけてください',
          'warning'
        )
        return
      }

      await this.$store.dispatch('api/addTable', { lectureCodes })
      // → 追加

      Swal.fire('完了', '時間割が更新されました。', 'success')

      this.lectures = []
      this.close()
      // → ダイアログを閉じる
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variable.scss';
@import '~/assets/css/modal.scss';

//++++++++++++++++++// 以下ダイアログの内容（中身） //+++++++++++++++++//
article {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

/* ボタン・アイコン */
.icon {
  display: inline-flex;
  vertical-align: middle;
  padding-bottom: 0.4vh;
}

/* 授業の追加 */
.title {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  color: $primary-color;
  font-weight: 400;
  margin: 0 0 1.5vh;
  &--icon {
    font-size: 30px;
  }
}

/* 検索フォーム */
.search-form {
  position: relative;
  width: 100%;
  height: 3.2rem;
  margin: 0;
  padding: 0;
  &__form {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: $white;
    font-size: 16px;
    color: $main-text-color;
    box-sizing: border-box;
    border: 0.1rem solid $element-gray;
    border-radius: 3rem;
    padding: 0;
    padding-left: 4%;
    margin: 0;
  }
  &__btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 3rem;
    width: 4rem;
    margin: 0;
    padding: 0;
    font-size: 2.5rem;
    color: $primary-color;
    line-height: 3.4rem;
    text-align: center;
    border-radius: 50% 50%;
    user-select: none;
    &:active {
      transition: all 0.2s;
      transform: scale(1.1);
    }
  }
  ::placeholder {
    color: $sub-text-color;
    font-size: 14px;
    font-weight: 300;
    line-height: normal;
  }
  ::-webkit-input-placeholder {
    padding-top: 0.2em;
  }
  :focus {
    outline: none;
  }
}

//++++++++++++++++++++++++// 検索以外の追加方法 //++++++++++++++++++++++++//
.others-form {
  border-top: 1px solid $element-gray;
  width: 100%;
  &__content {
    font-size: 1.2rem;
    color: $sub-text-color;
    margin: 1vh;
    margin-left: 0.5vh;
    cursor: pointer;
    user-select: none;
    span {
      font-size: 2rem;
    }
  }
}

/** 検索結果 */
.result-list {
  width: 100%;
  height: 100%;
  margin: 1.5vh 0;
  padding: 0;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
  box-sizing: border-box;
  .result-wrap {
    position: relative;
    padding: 11px 1rem;
    display: flex;
    align-items: center;
    &::after {
      $w: 1rem;

      content: "";
      position: absolute;
      bottom: 0;
      left: $w;
      width: calc(100% - (#{$w} * 2));
      height: 0.5px;
      background-color: $element-gray;
    }
  }
  &__label {
    display: inline-block;
    width: calc(100% - 3.5rem);
  }
  &__input {
    display: none;
  }
  &__checkbox {
    flex: 0 0 auto;
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
  .result-content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
  &__lecture-name {
    color: $emphasis-text-color;
    font-size: 1.35rem;
    line-height: 160%;
    font-weight: 500;
  }
  &__lecture-code {
    color: $sub-text-color;
    font-size: 1.2rem;
    font-weight: 400;
    span {
      padding-left: 0.3rem;
      font-weight: 400;
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
  .result-formats {
    height: 100%;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    &__icon {
      font-size: 14px;
      margin-left: 5px;
      padding: 0.3rem;
      border-radius: 50%;
      color: $element-pale-gray;
      background: $element-light-gray;
      &--on {
        background: $yellow-orange-light;
      }
    }
  }
  .syllabus-btn {
    margin: 0 -10px 0 -3px;
    color: $sub-text-color;
    font-size: 24px;
  }
}
.footer-divider {
  width: calc(100% + 8vh - 2px);
  display: block;
  border: 0.05rem solid $element-gray;
  box-shadow: 0 -0.5rem 1rem $element-gray;
  margin: 0 0 1.5rem -4vh;
  padding: 0;
}
</style>
