<template>
  <!--
    時間割追加画面
    ボタン、フォーム、CSVファイル追加辺りは別コンポネントに分けたい
  -->
  <Dialog :show="show" @close="close()">
    <article>
      <h1>授業の追加</h1>

      <!-- 検索フォーム -->
      <form class="search-form" @submit.prevent>
        <input
          v-model="input"
          type="text"
          placeholder="授業名や科目番号で検索"
          class="form"
          @keyup.enter="search(input, 'input')"
        />
        <span
          v-if="input === ''"
          @click="lectures = []"
          class="material-icons search-btn"
          >close</span
        >
        <span
          v-else
          @click="search(input, 'input')"
          class="material-icons search-btn"
          >search</span
        >
      </form>

      <!-- 以下検索結果 -->
      <section class="result-list">
        <div
          v-for="(n, i) in lectures"
          :key="n.lecture_code + i"
          :style="{ background: i % 2 === 0 ? '#F9F9F9' : '#ebebeb' }"
        >
          <input
            type="checkbox"
            :id="n.lecture_code"
            :value="n.lecture_code"
            v-model="n.checked"
          />
          <label :for="n.lecture_code">
            {{ n.lecture_code }} - {{ n.lecture_name }} - {{ n.module
            }}{{ n.day }}{{ n.period }}
          </label>
        </div>
      </section>
      <!-- ここまで検索結果 -->

      <section class="others">
        <p class="content" @click="twins()">
          Twinsからインポート
          <span class="material-icons icon">chevron_right</span>
        </p>
        <p class="content">
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

        <!-- <p @click="custom()">手動入力で授業を作成</p> -->
      </section>
      <!-- → その他オプション -->
      <section class="save-btn" @click="asyncNumber()">時間割に追加</section>
    </article>
  </Dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import { searchLectures } from '../store/api/lectures'
import Swal from 'sweetalert2'
import { twinsToTwinteAlert } from './utils/swal'

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
  get isMobile() {
    return /iP(hone|(o|a)d)|TwinteAppforAndroid/.test(navigator.userAgent)
  }
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
    if (this.isMobile) {
      twinsToTwinteAlert()
    } else {
      Swal.fire(
        'ご利用の環境では非対応です',
        'この機能はiOS版アプリ・Android版アプリでのみ利用できます。',
        'info'
      )
    }
  }
  custom() {
    this.$router.push('/custom')
    this.$store.commit('visible/chAdd', { display: false })
  }
  async search(input: string, type: 'csv' | 'input') {
    this.lectures = await this.parse(input, type)
    if (this.lectures.length === 0) {
      Swal.fire(
        '見つかりません',
        '検索しましたが何も見つかりませんでした',
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

  async asyncNumber() {
    if (!this.$store.getters['api/isLogin']) {
      Swal.fire(
        'まだログインしていません',
        '歯車⚙からログインして下さい',
        'info'
      )
      return
    }

    Swal.fire({
      title: '科目追加を行いますか？',
      text: '現在表示されている時間割は上書きされます',
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
          '検索を行い、追加する授業にチェックマークをつけて下さい',
          'warning'
        )
        return
      }

      await this.$store.dispatch('api/addTable', { lectureCodes })
      // → 追加

      Swal.fire('追加完了', '時間割を更新しました', 'success')

      this.lectures = []
      this.close()
      // → ダイアログを閉じる
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/btn.scss';

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
h1 {
  font-size: 1.8rem;
  color: #00c0c0;
  font-weight: 500;
  margin: 0 0 1.5vh;
}

/* 検索フォーム */
.search-form {
  position: relative;
  width: 100%;
  height: 3.2rem;
  margin: 0;
  padding: 0;
  .form {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #fff;
    font-size: 1.2rem;
    color: #555555;
    box-sizing: border-box;
    border: 0.2vh solid #9a9a9a;
    border-radius: 3rem;
    padding: 0;
    padding-left: 3%;
    margin: 0;
  }
  ::placeholder {
    color: #9a9a9a;
    font-size: 1.2rem;
    padding-top: 4px;
  }
  .search-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 3.2rem;
    width: 3.2rem;
    background-color: #00c0c0;
    font-size: 2.5rem;
    color: #fff;
    line-height: 3.2rem;
    text-align: center;
    border-radius: 50% 50%;
    margin: 0;
    padding: 0;
    &:active {
      transition: all 0.2s;
      transform: scale(1.1);
      background-color: #05dbdb;
    }
  }
}

/** 検索結果 */
.result-list {
  width: 100%;
  height: 100%;
  margin: 1.5vh 0;
  padding: 1vw 0.5vw;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
  font-size: 1.3rem;
  line-height: 150%;
  box-sizing: border-box;
}
.result-list div {
  padding: 1rem;
}

//++++++++++++++++++++++++// 検索以外の追加方法 //++++++++++++++++++++++++//
.others {
  border-top: 1px solid #adadad;
  width: 100%;
}
.content {
  font-size: 1.2rem;
  color: #9a9a9a;
  margin: 1vh;
  margin-left: 0.5vh;
  span {
    font-size: 2rem;
  }
}
.add-csv {
  margin: 1vh;
  color: #adadad;
  font-size: 1.2rem;
}
</style>
