<template>
  <!--
    時間割追加画面
    ボタン、フォーム、CSVファイル追加辺りは別コンポネントに分けたい
  -->
  <Dialog :show="show" @close="close()">
    <article>
      <h1 class="title">授業の追加</h1>

      <!-- 検索フォーム -->
      <form class="search-form" @submit.prevent>
        <input
          v-model="input"
          type="text"
          placeholder="授業名や科目番号で検索"
          class="search-form__form"
          @keyup.enter="search(input, 'input')"
        />
        <span @click="lectures = []" class="search-form__btn material-icons"
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
            <label class="result-list__lecture-name" for="n.lecture_code">
              {{ n.lecture_name }}
            </label>
          </div>
          <span class="syllabus-btn material-icons">menu_book</span>
        </div>
      </section>
      <!-- ここまで検索結果 -->

      <section class="others-form">
        <p class="others-form__content --clickable" @click="twins()">
          Twinsからインポート
          <span class="material-icons icon">chevron_right</span>
        </p>
        <p class="others-form__content --clickable" @click="custom()">
          手動入力で授業を作成
          <span class="material-icons icon">chevron_right</span>
        </p>
        <p class="others-form__content">
          CSVファイルから追加
          <br />
          <small>*{{ moduleMessage }}</small>
          <br />
          <input
            type="file"
            name="file"
            accept="text/csv, .csv"
            id="fileElem"
            @change="onFileChange"
            class="add-csv"
          />
        </p>
      </section>
      <!-- → その他オプション -->
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

type miniLecture = {
  lecture_code: string
  lecture_name: string
  module: string
  day: string
  period: number
  checked: boolean
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
  async custom() {
    await addCustomLecture()
    await this.$store.commit('visible/chAdd', { display: false })
    await // this.$store.commit('visible/chCustom', { display: true })
    await this.$store.dispatch('api/fetch')
  }

  async search(input: string, type: 'csv' | 'input') {
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
        checked: type === 'csv',
      }
    })
  }

  async onFileChange(e: Event) {
    e.preventDefault()
    const fileData: Blob = (e.target as any).files[0]
    const reader = new FileReader()

    // viewとstate以外(csv処理)を入れたくない
    const parse = async (csv: string) => await this.parse(csv, 'csv')
    const pushLecture = (lectures: miniLecture[]) => {
      this.lectures = [...this.lectures, ...lectures]
    }
    reader.onload = async () => {
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
    await reader.readAsText(fileData)
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
@import '~/assets/css/btn.scss';
@import '~/assets/css/variable.scss';

//++++++++++++++++++// 以くだダイアログの内容（中身） //+++++++++++++++++//
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
  font-size: 1.8rem;
  color: $primary-color;
  font-weight: 400;
  margin: 0 0 1.5vh;
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
    background-color: #fff;
    font-size: 16px;
    color: $main-text-color;
    box-sizing: border-box;
    border: 0.1rem solid $form-border-color;
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
  }
  :focus {
    outline: none;
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
    padding: 0.8rem 1rem;
    display: flex;
    align-items: center;
  }
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
    border: 0.14rem solid $unselected-element-color;
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
      color: $unselected-element-color;
      cursor: pointer;
      user-select: none;
    }
  }
  &__input:checked ~ &__checkbox {
    border: 0.14rem solid $primary-color;
    background-color: $primary-color;
    opacity: 1;
    span {
      color: #fff;
      font-weight: 600;
      opacity: 1;
    }
  }
  .result-content {
    width: 90%;
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
  .syllabus-btn {
    padding-left: 0.3rem;
    color: $primary-color;
    font-size: 1.9rem;
  }
}

//++++++++++++++++++++++++// 検索以外の追加方法 //++++++++++++++++++++++++//
.others-form {
  border-top: 1px solid #adadad;
  width: 100%;
  &__content {
    font-size: 1.2rem;
    color: $sub-text-color;
    margin: 1vh;
    margin-left: 0.5vh;
    span {
      font-size: 2rem;
    }
    &.--clickable {
      cursor: pointer;
      user-select: none;
    }
  }
}
.add-csv {
  margin: 1vh;
  color: $sub-text-color;
  font-size: 1.2rem;
}
</style>
