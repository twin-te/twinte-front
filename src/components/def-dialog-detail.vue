/** -> "../layout/default.vue" */
<template>
  <!-- 科目詳細画面 -->
  <section class="contents">
    <transition name="bound">
      <nav class="main" v-show="dialog">
        <article v-if="table">
          <!-- 教科名 -->
          <div class="svg-button material-icons close-btn" @click="chDetail()">
            close
          </div>
          <h1>
            <div class="sbj-name">{{ table.lecture_name }}</div>

            <p class="sbj-number">科目番号 {{ table.lecture_code }}</p>
          </h1>

          <!-- 科目詳細 -->
          <h2>
            <i class="material-icons icon">info</i>科目詳細
            <span class="syllabus-btn" @click="syllabus()">
              シラバス
              <i class="material-icons icon">chevron_right</i>
            </span>
          </h2>
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
              <!-- → 教室変更 -->
            </p>
          </section>

          <!-- メモ -->
          <h2>
            <i class="material-icons icon">create</i>メモ
            <span class="syllabus-btn" @click="attend()">
              出席
              <i class="material-icons icon">chevron_right</i>
            </span>
          </h2>
          <textarea class="memo" type="text" v-model="localMemo"></textarea>
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
          <div @click="save()" class="save-btn">変更を保存</div>
          <div class="flex">
            <p @click="deleteItem()" class="delete-btn">
              <i class="material-icons icon">delete</i>この科目を削除
            </p>
            <p @click="edit()" class="edit-btn">
              <i class="material-icons icon">edit</i>教室情報を編集
            </p>
          </div>
        </article>
      </nav>
    </transition>

    <!-- 全体を暗くする -->
    <transition name="fade">
      <nav class="back" @click="chDetail()" v-if="dialog"></nav>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import * as Vuex from 'vuex';
import { Period } from '../types';
import { UserLectureEntity } from '../types/server';
import { updateLecture } from '../store/api/timetables';
import cloneDeep from 'lodash/cloneDeep';
import Swal from 'sweetalert2';

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  atmnb = ['出席', '欠席', '遅刻'];
  moduleNum = this.$store.getters['table/moduleNum'];
  localMemo = '';
  localLectureId = '';
  editableLecture: Period | null = null;

  get atmnbCount() {
    return this.userData
      ? [this.userData.attendance, this.userData.absence, this.userData.late]
      : [0, 0, 0];
  }
  get userData() {
    return this.$store.getters['table/userData'];
  }
  get table(): Period | null {
    return this.$store.getters['table/looking'];
  }
  get dialog(): boolean {
    return this.$store.getters['visible/detail'];
  }

  syllabus() {
    switch (
      this.table?.lecture_code
        .split('')
        .splice(0, 2)
        .join('')
    ) {
      case 'GB':
        location.href = `http://www.coins.tsukuba.ac.jp/syllabus/${this.table?.lecture_code}.html`;
      default:
        location.href = `https://kdb.tsukuba.ac.jp/syllabi/2019/${this.table?.lecture_code}/jpn/#course-title`;
    }
  }
  attend() {
    location.href = 'https://atmnb.tsukuba.ac.jp';
  }
  edit() {
    if (this.editableLecture) {
      this.editableLecture = null;
    } else {
      this.editableLecture = cloneDeep(this.table);
    }
  }
  counter(type: string, num: number) {
    if (!this.userData) {
      return;
    }
    let { attendance, absence, late } = this.userData;
    switch (type) {
      case '出席':
        attendance + num >= 0 ? (attendance += num) : 0;
        break;
      case '欠席':
        absence + num >= 0 ? (absence += num) : 0;
        break;
      case '遅刻':
        late + num >= 0 ? (late += num) : 0;
        break;
    }
    const userData: UserLectureEntity = {
      twinte_lecture_id: this.userData.twinte_lecture_id,
      user_lecture_id: this.userData.user_lecture_id,
      lecture_name: this.userData.lecture_name,
      instructor: this.userData.instructor,
      memo: this.userData.memo,
      attendance,
      absence,
      late
    };
    this.$store.dispatch('table/updatePeriod', { userData });
  }

  deleteItem() {
    Swal.fire({
      title: 'この時間割を削除しますか?',
      showCancelButton: true,
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ'
    }).then(async result => {
      if (result.value && this.table && this.userData) {
        await this.$store.dispatch('api/deleteTable', {
          table: this.table,
          UserLecture: this.userData
        });

        this.chDetail();
        // → ダイアログを閉じる
      }
    });
  }

  chDetail(): void {
    this.localMemo = '';
    this.editableLecture = null;
    this.$store.commit('visible/chDetail', { display: false });
    this.$store.commit('table/setUserData', { userData: null });
    this.$store.commit('table/setLooking', { period: null });
  }

  async save() {
    if (!this.userData) {
      return;
    }
    const userData: UserLectureEntity = {
      twinte_lecture_id: this.userData.twinte_lecture_id,
      user_lecture_id: this.userData.user_lecture_id,
      lecture_name: this.userData.lecture_name,
      instructor: this.userData.instructor,
      memo: this.localMemo,
      attendance: this.userData.attendance,
      absence: this.userData.absence,
      late: this.userData.late
    };
    await this.$store.dispatch('table/updatePeriod', { userData });
    // → メモの変更

    if (this.editableLecture) {
      await updateLecture(this.editableLecture);
    }
    // → 教室の変更

    this.$store.dispatch('api/login');
    // → 反映

    this.editableLecture = null; // 編集モードをオフに
    this.chDetail(); // 閉じさせる
    Swal.fire('完了', 'メモを保存しました', 'success');
  }

  fetchMemo() {
    setTimeout(() => {
      if (
        this.userData &&
        this.localLectureId !== this.userData.user_lecture_id
      ) {
        this.localMemo = this.userData.memo;
        this.localLectureId = this.userData.user_lecture_id;
      }
      this.fetchMemo();
    }, 1000);
    // リアクティブにできないのは既知のバグ
  }

  mounted() {
    this.$nextTick(() => {
      this.fetchMemo();
    });
  }
}
</script>

<style lang="scss" scoped>
//++++++++++++++++++// ダイアログの枠 //++++++++++++++++++++++//
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 92vw;
  max-width: 70vh;
  height: 80vh;
  background: #ffffff;
  box-shadow: 1vmin 1vmin 3vmin rgba(0, 0, 0, 0.349);
  border-radius: 1vh;
  z-index: 6;
  padding: 5vh;
  box-sizing: border-box;
}

//++++++++++++++++++// 以下ダイアログの内容（中身） //+++++++++++++++++//
article {
  position: relative;
}

/* ボタン・アイコン */
.close-btn {
  position: absolute;
  top: -2.2vh;
  right: -2.1vh;
  font-size: 4vh;
  color: #717171;
}
.icon {
  display: inline-flex;
  vertical-align: middle;
  padding-bottom: 0.4vh;
}

/* 科目の情報 */
h1 {
  border-left: 0.8vh solid #00c0c0;
  color: #555555;
  font-size: 2.9vh;
  line-height: 4.5vh;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 8vh;
  padding-left: 0.9vh;
  margin: 0;
  .sbj-number {
    color: #c4c4c4;
    font-size: 1.8vh;
    font-weight: 400;
    line-height: 3.5vh;
    margin: 0;
  }
}
h2 {
  width: 100%;
  color: #00c0c0;
  border-bottom: 0.2vh solid #00c0c0;
  font-weight: 500;
  font-size: 2.3vh;
  i {
    font-size: 2.9vh;
  }
  .syllabus-btn {
    line-height: 3vh;
    position: absolute;
    right: 0;
    font-size: 1.9vh;
    font-weight: 400;
    color: #c4c4c4;
    i {
      font-size: 3vh;
    }
  }
}

.sbj-detail-wrapper {
  padding: 0 2.5vmin;
  font-size: 2.1vh;
  line-height: 2.1vh;
  margin-bottom: 3vh;
}
.subject-item {
  color: #555555;
  font-weight: 500;
  span {
    padding-left: 5%;
    font-weight: 400;
  }
}

/* メモ */
.memo {
  width: 100%;
  height: 14vh;
  border: 0.2vh solid #dddddd;
  border-radius: 0.5rem;
  margin: 0;
  box-sizing: border-box;
}

/* 出欠 */
.counters-wrapper {
  text-align: center;
  grid-template-columns: repeat(3, 1fr);
  display: flex;
  justify-content: space-around;
  margin-bottom: 2vh;
}
.counter-name {
  line-height: 4.4vh;
  font-size: 2vh;
  color: #555555;
  margin-left: -0.7vh;
}
.counter {
  display: flex;
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
  color: #00c0c0;
  font-size: 4.4vh;
  line-height: 4.3vh;
  width: 50%;
  border: 0.2vh solid #00c0c0;
  border-radius: 2.8vh 0 0 2.8vh;
  height: 4.6vh;
  position: relative;
}
.counter-right {
  color: #00c0c0;
  font-size: 4.3vh;
  line-height: 3.4vh;
  width: 50%;
  border: 0.2vh solid #00c0c0;
  border-radius: 0 2.8vh 2.8vh 0;
  height: 4.6vh;
  position: relative;
  left: -0.2vh;
}
.counter-left:active,
.counter-right:active {
  background-color: #00c0c0;
  color: white;
}

//++++++++++++++++++++++++// 保存・編集・削除ボタン //++++++++++++++++++++++++//
.save-btn {
  display: block;
  margin: 0 auto;
  color: #fff;
  width: 100%;
  height: 6vh;
  font-size: 2.3vh;
  line-height: 6vh;
  background: #00c0c0;
  border-radius: 1vh;
  text-align: center;
  &:active {
    transition: all 0.2s;
    transform: translateX(-50%) scale(1.05);
    background-color: #05dbdb;
  }
}

.flex {
  display: flex;
  justify-content: space-between;
}
.delete-btn {
  font-size: 2.1vh;
  color: rgb(255, 98, 98);
  i {
    font-size: 3vh;
  }
}
.edit-btn {
  font-size: 2.1vh;
  color: #6678df;
  i {
    font-size: 3vh;
  }
}

//++++++++++++++++++++++++// 後ろ //++++++++++++++++++++++++//
.back {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: rgba(100, 100, 100, 0.5);
  z-index: 5;
}
</style>
