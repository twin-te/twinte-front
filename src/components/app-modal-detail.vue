<template>
  <!-- 科目詳細画面 -->
  <Dialog :show="show" @close="close()">
    <article v-if="table">
      <!-- 教科名 -->
      <h1>
        <div class="sbj-name">{{ table.lecture_name }}</div>

        <p class="sbj-number">科目番号 {{ table.lecture_code }}</p>
      </h1>

      <div class="scroll-area">
        <!-- 科目詳細 -->
        <section class="sbj-detail-wrapper">
          <p class="subject-item">
            担当教員
            <span>{{ table.instructor }}</span>
          </p>
          <p class="subject-item">
            開講時限
            <span>{{ table.module }} {{ table.day }}{{ table.period }}</span>
          </p>
          <p class="subject-item">
            授業教室
            <span v-if="!editableLecture">{{ table.room }}</span>
            <input v-else class="sbj-detail" v-model="editableLecture.room" />
            <i @click="edit()" class="edit-btn material-icons icon">edit</i>
            <!-- → 教室変更 -->
          </p>
          <p class="subject-item" v-if="userData !== null">
            授業形式
            <span>
              <i
                class="material-icons icon --format"
                :class="{ '--on': userData.formats.includes('FaceToFace') }"
                >people_alt</i
              >
              <i
                class="material-icons icon --format"
                :class="{ '--on': userData.formats.includes('Synchronous') }"
                >switch_video</i
              >
              <i
                class="material-icons icon --format"
                :class="{ '--on': userData.formats.includes('Asynchronous') }"
                >video_library</i
              >
              <i
                @click="changeDisplayFormatPanel"
                class="material-icons icon --expand"
                >{{ displayFormatPanel ? 'expand_less' : 'expand_more' }}</i
              >
            </span>
          </p>
          <FormatsPanel
            v-show="displayFormatPanel"
            :formats="localFormats"
            @change-formats="changeFormats"
            @reacquisition="reacquisition"
          />
        </section>

        <!-- メモ -->
        <h2>
          <!-- <i class="material-icons icon">description</i> -->
          メモ
        </h2>
        <textarea class="memo" type="text" v-model="localMemo"></textarea>
        <h2>
          出欠管理
          <span class="assign-btn" @click="attend()">
            出席する(responへ)
            <i class="material-icons icon">chevron_right</i>
          </span>
        </h2>
        <section class="counters-wrapper">
          <div
            v-for="n in 3"
            :key="n"
            :class="{ attend: n === 1, absent: n === 2, late: n === 3 }"
            style="width: 30%"
          >
            <span class="counter-name"
              >{{ atmnb[n - 1] }} {{ atmnbCount[n - 1] }}回</span
            >
            <!-- <+|-> -->
            <div class="counter">
              <span @click="counter(atmnb[n - 1], +1)" class="counter-left"
                >+</span
              >
              <span @click="counter(atmnb[n - 1], -1)" class="counter-right"
                >&#8211;</span
              >
            </div>
          </div>
        </section>
      </div>
      <hr class="footer-divider" />
      <div @click="save()" class="register-btn">変更を保存</div>
      <div class="flex">
        <p @click="deleteItem()" class="delete-btn">
          <i class="material-icons icon">delete</i>この科目を削除
        </p>
        <p @click="syllabus()" class="syllabus-btn">
          <i class="material-icons icon">menu_book</i>シラバスを参照
        </p>
      </div>
    </article>
  </Dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import Swal from 'sweetalert2'

import { LectureFormat } from '~/types'
import { YEAR } from '~/config'
import { openUrl } from './utils/openUrl'
import { GetReacquision } from '~/usecase/getReacquisition'
import { TimetableEntity, UserLectureEntity } from '~/api/@types'

@Component({
  components: {
    Dialog: () => import('~/components/global/dialog.vue'),
    FormatsPanel: () => import('~/components/global/FormatsPanel.vue'),
  },
})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  atmnb = ['出席', '欠席', '遅刻']
  moduleNum = this.$store.getters['table/moduleNum']
  localMemo = ''
  localFormats: Array<LectureFormat> = []
  displayFormatPanel = false
  editableLecture: TimetableEntity | null = null

  get atmnbCount() {
    return this.userData
      ? [this.userData.attendance, this.userData.absence, this.userData.late]
      : [0, 0, 0]
  }
  get userData() {
    return this.$store.getters['table/userData']
  }
  get table(): TimetableEntity | null {
    return this.$store.getters['table/looking']
  }
  get show(): boolean {
    return this.$store.getters['visible/detail']
  }

  changeDisplayFormatPanel() {
    this.displayFormatPanel = !this.displayFormatPanel
  }
  syllabus() {
    openUrl(
      `https://kdb.tsukuba.ac.jp/syllabi/${YEAR}/${this.table?.lecture_code}/jpn/0/`
    )
  }
  attend() {
    openUrl('https://atmnb.tsukuba.ac.jp')
  }
  edit() {
    if (this.editableLecture) {
      this.editableLecture = null
    } else {
      this.editableLecture = cloneDeep(this.table)
    }
  }
  counter(type: string, num: number) {
    if (!this.userData) {
      return
    }
    let { attendance, absence, late } = this.userData
    switch (type) {
      case '出席':
        attendance + num >= 0 ? (attendance += num) : 0
        break
      case '欠席':
        absence + num >= 0 ? (absence += num) : 0
        break
      case '遅刻':
        late + num >= 0 ? (late += num) : 0
        break
    }
    const userData: UserLectureEntity = {
      ...this.userData,
      memo: this.localMemo,
      attendance,
      absence,
      late,
    }
    this.$store.dispatch('table/updatePeriod', { userData })
  }

  async deleteItem() {
    Swal.fire({
      title: 'この時間割を削除しますか?',
      showCancelButton: true,
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
    }).then(async (result) => {
      if (result.value && this.table && this.userData) {
        await this.$store.dispatch('api/deleteTable', {
          table: this.table,
          userLecture: this.userData,
        })

        this.close()
        // → ダイアログを閉じる
      }
    })
  }

  async close() {
    this.localMemo = ''
    this.editableLecture = null
    this.displayFormatPanel = false
    this.$store.commit('visible/chDetail', { display: false })
    this.$store.commit('table/setUserData', { userData: null })
    this.$store.commit('table/setLooking', { period: null })
  }

  async reacquisition() {
    if (!this.table?.lecture_code) return

    const formats = await new GetReacquision(this.table.lecture_code).run({
      lecture: this.$deps.lecture,
    })
    this.localFormats = formats

    await this.save()
  }

  async changeFormats(format: LectureFormat, value: boolean) {
    if (value) {
      this.localFormats = [...this.localFormats, format]
    } else {
      // formatを配列から取り除きたい
      this.localFormats = this.localFormats.filter((f) => f !== format)
    }

    await this.save()
  }

  async save() {
    if (!this.userData) {
      return
    }
    const userData: UserLectureEntity = {
      ...this.userData,
      memo: this.localMemo,
      formats: this.localFormats,
    }
    await this.$store.dispatch('table/updatePeriod', { userData })
    // → メモ、形式の変更

    if (this.editableLecture) {
      this.$deps.timeTable.updateLecture(this.editableLecture)
      await this.$store.dispatch('table/setPeriod', {
        period: this.editableLecture,
      })
    }
    // → 教室の変更

    this.editableLecture = null // 編集モードをオフに
    await this.$store.dispatch('api/fetch') // 最新のデータを反映

    await Swal.fire({
      title: '完了',
      text: 'メモを保存しました',
      icon: 'success',
      toast: true,
      showConfirmButton: false,
      position: 'bottom-left',
      timer: 6000,
    })
  }

  @Watch('userData')
  onUserDataChange() {
    if (this.userData) {
      this.localMemo = this.userData.memo
      this.localFormats = this.userData.formats
    }
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
  height: 100%;
  width: 100%;
}

/* ボタン・アイコン */
.icon {
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  padding-bottom: 0.4vh;

  &.--format {
    margin-top: -0.7rem;
    font-size: 1.8rem;
    padding: 0.3rem;
    border-radius: 50%;
    color: $element-pale-gray;
    background: $element-light-gray;
  }

  &.--expand {
    margin-top: -0.7rem;
    color: $sub-text-color;
    font-size: 3rem;
  }

  &.--on {
    background: $yellow-orange-light;
  }
}

/* 科目の情報 */
h1 {
  display: block;
  width: 95%;
  font-size: 1.7rem;
  line-height: 2.5rem;
  font-weight: 500;
  text-overflow: ellipsis;
  border-left: 0.5rem solid $primary-color;
  padding-top: 0.4rem;
  padding-left: 0.8rem;
  margin: 0 0 1rem;
  .sbj-number {
    font-size: 1.2rem;
    color: $sub-text-color;
    font-weight: 400;
    line-height: 2rem;
    margin: 0.4rem 0;
  }
}

h2 {
  width: 100%;
  font-size: 1.4rem;
  color: $primary-color;
  font-weight: 400;
  margin: 0;
  padding-bottom: 0.3rem;
  i {
    font-size: 2rem;
    margin-right: 1%;
  }
  .assign-btn {
    // position: absolute;
    font-size: 1.2rem;
    color: $sub-text-color;
    font-weight: 400;
    line-height: 1.5rem;
    padding-left: 1rem;
    i {
      font-size: 1.6rem;
      margin-right: 0;
    }
  }
}

.scroll-area {
  position: relative;
  height: 100%;
  overflow-y: scroll;
}
.sbj-detail-wrapper {
  font-size: 1.4rem;
  padding: 0 0.3rem;
}
.subject-item {
  display: flex;
  font-weight: 500;
  line-height: 1.5rem;
  .edit-btn {
    padding-left: 0.5rem;
    font-size: 1.7rem;
    color: $sub-text-color;
  }
  span {
    margin-left: 5%;
    font-weight: 400;
    max-width: 70%;
  }
  .sbj-detail {
    margin-left: 5%;
    height: 1.8rem;
    line-height: 1.5rem;
    max-width: 60%;
  }
}

/* メモ */

.memo {
  width: 100%;
  height: 25%;
  min-height: 10vh;
  color: $main-text-color;
  border: 0.2vh solid $element-gray;
  border-radius: 0.5rem;
  flex-basis: 20vh;
  flex-shrink: 2;
  margin: 0 0 3vh;
  box-sizing: border-box;
}

/* 出欠 */
.counters-wrapper {
  display: flex;
  justify-content: space-between;
  text-align: center;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 2vh;
}
.counter-name {
  color: $sub-text-color;
  line-height: 2.6rem;
  font-size: 1.3rem;
}
.counter {
  display: flex;
  justify-content: center;
}
.attend {
  grid-column: 1;
}
.absent {
  grid-column: 2;
}
.late {
  grid-column: 3;
}
.counter-left {
  position: relative;
  height: 3.1rem;
  width: 5rem;
  font-size: 2.2rem;
  color: $primary-color;
  line-height: 3rem;
  border: 0.2vh solid $primary-color;
  border-radius: 3.1rem 0 0 3.1rem;
}
.counter-right {
  position: relative;
  left: -0.2vh;
  height: 3.1rem;
  width: 5rem;
  font-size: 2.2rem;
  color: $primary-color;
  line-height: 2.6rem;
  border: 0.2vh solid $primary-color;
  border-radius: 0 3.1rem 3.1rem 0;
}
.counter-left:active,
.counter-right:active {
  background-color: $primary-color;
  color: white;
}

.footer-divider {
  width: calc(100% + 8vh - 2px);
  display: block;
  border: 0.05rem solid $element-gray;
  box-shadow: 0 -0.5rem 1rem $element-gray;
  margin: 0 0 1.5rem -4vh;
  padding: 0;
}

//++++++++++++++++++++++++// 編集・削除ボタン //++++++++++++++++++++++++//
.flex {
  font-size: 1.3rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
}
.delete-btn {
  color: $element-denger;
  /* stylelint-disable-next-line no-descending-specificity */
  i {
    font-size: 2rem;
  }
}
.syllabus-btn {
  position: absolute;
  right: 0;
  color: $primary-color;
  /* stylelint-disable-next-line no-descending-specificity */
  i {
    font-size: 2rem;
    padding-right: 0.4rem;
  }
}
</style>
