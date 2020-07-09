<template>
  <!-- 科目詳細画面 -->
  <Dialog :show="show" @close="close()">
    <article v-if="table">
      <!-- 教科名 -->
      <h1>
        <div class="sbj-name">{{ table.lecture_name }}</div>

        <p class="sbj-number">科目番号 {{ table.lecture_code }}</p>
      </h1>

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
        <!--
        <p class="subject-item">
          単位数
          <span>{{userData.credits}}</span>
        </p>-->
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
          style="width: 30%;"
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

import { Period } from '../types'
import { UserLectureEntity } from '../types/server'
import { updateLecture } from '../store/api/timetables'
import { YEAR } from '../common/config'
import { openUrl } from './utils/openUrl'

@Component({
  components: {
    Dialog: () => import('~/components/global/dialog.vue'),
  },
})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  atmnb = ['出席', '欠席', '遅刻']
  moduleNum = this.$store.getters['table/moduleNum']
  localMemo = ''
  editableLecture: Period | null = null

  get atmnbCount() {
    return this.userData
      ? [this.userData.attendance, this.userData.absence, this.userData.late]
      : [0, 0, 0]
  }
  get userData() {
    return this.$store.getters['table/userData']
  }
  get table(): Period | null {
    return this.$store.getters['table/looking']
  }
  get show(): boolean {
    return this.$store.getters['visible/detail']
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
      twinte_lecture_id: this.userData.twinte_lecture_id,
      user_lecture_id: this.userData.user_lecture_id,
      lecture_name: this.userData.lecture_name,
      instructor: this.userData.instructor,
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
          UserLecture: this.userData,
        })

        this.close()
        // → ダイアログを閉じる
      }
    })
  }

  async close() {
    this.localMemo = ''
    this.editableLecture = null
    this.$store.commit('visible/chDetail', { display: false })
    this.$store.commit('table/setUserData', { userData: null })
    this.$store.commit('table/setLooking', { period: null })
  }

  async save() {
    if (!this.userData) {
      return
    }
    const userData: UserLectureEntity = {
      twinte_lecture_id: this.userData.twinte_lecture_id,
      user_lecture_id: this.userData.user_lecture_id,
      lecture_name: this.userData.lecture_name,
      instructor: this.userData.instructor,
      memo: this.localMemo,
      attendance: this.userData.attendance,
      absence: this.userData.absence,
      late: this.userData.late,
    }
    await this.$store.dispatch('table/updatePeriod', { userData })
    // → メモの変更

    if (this.editableLecture) {
      await updateLecture(this.editableLecture)
    }
    // → 教室の変更

    this.$store.dispatch('api/login')
    // → 反映

    this.editableLecture = null // 編集モードをオフに
    this.close() // 閉じさせる
    Swal.fire('完了', 'メモを保存しました', 'success')
  }

  @Watch('userData')
  onUserDataChange() {
    if (this.userData) {
      this.localMemo = this.userData.memo
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
  overflow-y: scroll;
}

/* ボタン・アイコン */
.icon {
  display: inline-flex;
  vertical-align: middle;
  padding-bottom: 0.4vh;
}

/* 科目の情報 */
h1 {
  height: 6rem;
  font-size: 1.7rem;
  line-height: 3.4rem;
  font-weight: 500;
  text-overflow: ellipsis;
  border-left: 0.5rem solid $primary-color;
  white-space: nowrap;
  padding-left: 0.8rem;
  margin: 0;
  .sbj-number {
    font-size: 1.2rem;
    color: $sub-text-color;
    font-weight: 400;
    line-height: 2rem;
    margin: 0 0 0.7rem;
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
    position: absolute;
    font-size: 1.2rem;
    color: #c0c0c0;
    font-weight: 400;
    line-height: 1.5rem;
    padding-left: 1rem;
    i {
      font-size: 1.6rem;
      margin-right: 0;
    }
  }
}
.sbj-detail-wrapper {
  font-size: 1.4rem;
  padding: 0 0.3rem;
  margin: 0.5rem 0;
}
.subject-item {
  font-weight: 500;
  margin: 1.2rem 0;
  .edit-btn {
    padding-left: 0.5rem;
    font-size: 1.7rem;
    color: $sub-text-color;
  }
  span {
    padding-left: 5%;
    font-weight: 400;
  }
}

/* メモ */

.memo {
  width: 100%;
  height: 100%;
  min-height: 10vh;
  color: $main-text-color;
  border: 0.2vh solid $form-border-color;
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

//++++++++++++++++++++++++// 編集・削除ボタン //++++++++++++++++++++++++//
.flex {
  display: flex;
  justify-content: space-between;
}
.delete-btn {
  font-size: 1.3rem;
  color: $denger-element-color;
  margin: 2vh 0 0;
  /* stylelint-disable-next-line no-descending-specificity */
  i {
    font-size: 2rem;
  }
}
.syllabus-btn {
  font-size: 1.3rem;
  color: $primary-color;
  margin: 2vh 0 0;
  /* stylelint-disable-next-line no-descending-specificity */
  i {
    font-size: 2rem;
    padding-right: 0.4rem;
  }
}
</style>
