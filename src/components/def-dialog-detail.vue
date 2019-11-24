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
            <div v-if="!editableLecture" class="sbj-name">{{ table.lecture_name }}</div>
            <input v-else class="sbj-name" v-model="editableLecture.lecture_name">
            
            <p class="sbj-number">科目番号 {{ table.lecture_code }}</p>
          </h1>
          <!-- 科目詳細 -->
          <h2>
            <span class="material-icons icon">info</span>科目詳細
            <span class="syllabus-btn" @click="syllabus()">
              シラバス
              <span class="material-icons syllabus-chevron">chevron_right</span>
            </span>
          </h2>
          <section class="sbj-detail-wrapper">
            <p class="h3">
              担当教員
              <span v-if="!editableLecture" class="sbj-detail">{{
                table.instructor
              }}</span>
              <input v-else class="sbj-detail" v-model="editableLecture.instructor" />
            </p>
            <p class="h3">
              開講時限
              <span v-if="!editableLecture" class="sbj-detail"
                >{{ table.module }} {{ table.day }}{{ table.Period }}</span
              >
              <input v-else class="sbj-detail" v-model="editableLecture.module" />
            </p>
            <p class="h3">
              授業教室
              <span v-if="!editableLecture" class="sbj-detail">{{
                table.room
              }}</span>
              <input v-else class="sbj-detail" v-model="editableLecture.room" />
            </p>
          </section>
          <!-- メモ -->
          <h2 class="h2-2">
            <span class="material-icons icon">create</span>メモ
            <span class="syllabus-btn" @click="attend()">
              出席
              <span class="material-icons syllabus-chevron">chevron_right</span>
            </span>
          </h2>
          <!-- 入力の枠 -->
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
          <p @click="deleteItem()" class="delete-btn">
            <span class="material-icons delete-icon">delete</span>この科目を削除
          </p>
          <p @click="edit()" class="edit-btn">
            <span class="material-icons delete-icon">edit</span>この科目を編集
          </p>
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
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";
import { Period } from "../types";
import { UserLectureEntity } from "../types/server";
import { deleteLecture, updateLecture } from "../store/api/timetables";
import cloneDeep from "lodash/cloneDeep";

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  atmnb = ["出席", "欠席", "遅刻"];
  moduleNum = this.$store.getters["table/moduleNum"];
  localMemo = "";
  localLectureId = "";
  editableLecture: Period | null = null;

  get atmnbCount() {
    if (this.userData) {
      return [
        this.userData.attendance,
        this.userData.absence,
        this.userData.late
      ];
    }
    return [0, 0, 0];
  }
  get userData() {
    return this.$store.getters["table/userData"];
  }
  get table(): Period | null {
    return this.$store.getters["table/looking"];
  }
  get dialog(): boolean {
    return this.$store.getters["visible/detail"];
  }

  syllabus() {
    if (this.table) {
      location.href = `https://kdb.tsukuba.ac.jp/syllabi/2019/${this.table.lecture_code}/jpn/#course-title`;
    }
  }
  attend() {
    location.href = "https://atmnb.tsukuba.ac.jp";
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
      case "出席":
        attendance + num > 0 ? (attendance += num) : 0;
        break;
      case "欠席":
        absence + num > 0 ? (absence += num) : 0;
        break;
      case "遅刻":
        late + num > 0 ? (late += num) : 0;
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
    this.$store.dispatch("table/updatePeriod", { userData });
  }

  async deleteItem() {
    if (!confirm("この時間割を削除しますか?")) {
      return;
    }
    if (this.table) {
      await deleteLecture(
        this.table.year,
        this.table.module,
        this.table.day,
        this.table.period
      );
    }
    alert("finish this page will be reloaded");
    location.href = "/";
  }

  chDetail(): void {
    this.$store.commit("visible/chDetail", { display: false });
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
    await this.$store.dispatch("table/updatePeriod", { userData });
    // → 出欠などの変更

    if (this.editableLecture) {
      await updateLecture(this.editableLecture);
      location.href = "/";
    }
    // → 教室などの変更
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
  max-width: 700px;
  height: 80vh;
  background: #ffffff;
  box-shadow: 1vmin 1vmin 3vmin rgba(0, 0, 0, 0.349);
  border-radius: 1vh;
  z-index: 6;
}
@media screen and (min-width: 1300px) {
  .main {
    max-width: 1000px;
  }
}

//++++++++++++++++++// 以下ダイアログの内容（中身） //+++++++++++++++++//
article {
  position: relative;
  margin: 5vh;
  height: calc(80vh - 10vh);
}

/* ボタン・アイコン */
.icon {
  font-size: 2.9vh;
  margin-bottom: 0;
}
.close-btn {
  position: absolute;
  top: -2.2vh;
  right: -2.1vh;
  font-size: 4vh;
  color: #717171;
  cursor: pointer;
}
.save-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 550px;
  font-size: 2.3vh;
  height: 6vh;
  line-height: 6vh;
  background: #00c0c0;
  border-radius: 1vh;
  bottom: 3.1vh;
  color: #fff;
  text-align: center;
  cursor: pointer;
  &:active {
    transition: all 0.2s;
    transform: translateX(-50%) scale(1.05);
    background-color: #05dbdb;
  }
}
.delete-btn {
  position: absolute;
  bottom: -1.7vh;
  font-size: 2vh;
  color: rgb(255, 98, 98);
  margin: 0;
  cursor: pointer;
}
.edit-btn {
  position: absolute;
  bottom: -1.7vh;
  right: 0;
  font-size: 2vh;
  color: rgb(102, 120, 223);
  margin: 0;
  cursor: pointer;
}
.icon {
  font-size: 2.7vh;
  position: relative;
  bottom: -0.4vh;
  margin-right: 0.4vh;
}
.syllabus-chevron {
  position: relative;
  bottom: -0.9vh;
}
.delete-icon {
  position: relative;
  font-size: 3.2vh;
  vertical-align: middle;
  top: -0.2vh;
}

/* 科目の情報 */
h1 {
  position: absolute;
  top: -0.6vh;
  padding-left: 1.2vh;
  width: calc(100% - 1.5vh - 2vh);
  border-left: 0.8vh solid #00c0c0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 8vh;
}
.sbj-name {
  color: #555555;
  font-size: 2.7vh;
  font-weight: 500;
  line-height: 4.5vh;
  margin: 0;
}
.sbj-number {
  color: #c4c4c4;
  font-size: 1.8vh;
  font-weight: 400;
  line-height: 3.5vh;
  margin: 0;
}
h2 {
  position: absolute;
  top: 10.3vh;
  width: 100%;
  color: #00c0c0;
  border-bottom: 0.2vh solid #00c0c0;
  padding-bottom: 0.1vh;
  font-weight: 500;
  font-size: 2.2vh;
}
.syllabus-btn {
  position: absolute;
  right: 0;
  font-size: 1.9vh;
  font-weight: 400;
  color: #c4c4c4;
  bottom: 2px;
}
.sbj-detail-wrapper {
  position: absolute;
  top: 15.7vh;
  font-size: 2vh;
  left: 4%;
  width: 96%;
}
.h3 {
  color: #555555;
  font-weight: 500;
}
.sbj-detail {
  padding-left: 5%;
  font-weight: 400;
}

/* メモ */
.h2-2 {
  position: absolute;
  top: 29.6vh;
}
.memo {
  position: absolute;
  bottom: 21vh;
  left: 50%;
  transform: translateX(-50%);
  width: 93%;
  height: 12.5vh;
  border: 0.2vh solid #dddddd;
  box-sizing: border-box;
  border-radius: 8px;
}

/* 出欠 */
.counters-wrapper {
  text-align: center;
  position: absolute;
  bottom: 11.3vh;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  grid-template-columns: repeat(3, 1fr);
  display: flex;
  justify-content: space-between;
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
  font-size: 5vh;
  line-height: 4.3vh;
  width: 50%;
  border: 0.2vh solid #00c0c0;
  border-radius: 2.8vh 0 0 2.8vh;
  height: 4.6vh;
  position: relative;
}
.counter-right {
  color: #00c0c0;
  font-size: 4.9vh;
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
