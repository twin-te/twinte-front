/** -> "../pages/index.vue" */
<template>
  <!-- 科目詳細画面 -->
  <section class="contents">
    <transition name="bound">
      <nav class="main" v-show="dialog">
        <article>
          <!-- 教科名 -->
          <div class="svg-button material-icons close-btn" @click="chDetail()">
            close
          </div>
          <h1>
            <div class="sbj-name">
              {{ table.name }}
            </div>
            <p class="sbj-number">科目番号 {{ table.number }}</p>
          </h1>
          <!-- 科目詳細 -->
          <h2>
            <span class="material-icons icon">info</span>科目詳細
            <span class="syllabus-btn"
              >シラバス<span class="material-icons syllabus-chevron"
                >chevron_right</span
              ></span
            >
          </h2>
          <section class="sbj-detail-wrapper">
            <p class="h3">
              担当教員 <span class="sbj-detail">{{ table.teacher }}</span>
            </p>
            <p class="h3">
              開講時限
              <span class="sbj-detail"
                >{{ table.season }} {{ table.time }}</span
              >
            </p>
            <p class="h3">
              授業教室 <span class="sbj-detail">{{ table.classroom }}</span>
            </p>
          </section>
          <!-- メモ -->
          <h2 class="h2-2">
            <span class="material-icons icon">create</span>メモ
          </h2>
          <!-- 入力の枠 -->
          <input class="memo" type="text" />
          <section class="counters-wrapper">
            <div
              v-for="n in 3"
              :key="n"
              :class="{ attend: n === 1, absent: n === 2, late: n === 3 }"
              style="width: 30%"
            >
              <span class="counter-name"
                >{{ atmnb[n - 1] }} {{ count[n - 1] }}回</span
              >
              <!-- <+|-> -->
              <div class="counter">
                <span class="counter-left">+</span>
                <span class="counter-right">&#8211;</span>
              </div>
            </div>
          </section>
          <div class="save-btn">変更を保存</div>
          <p class="delete-btn">
            <span class="material-icons delete-icon">delete</span>この科目を削除
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

@Component
export default class Index extends Vue {
  //TODO implement these in store
  table: any = {
    number: "1A18011",
    name: "ネットワーク社会を支える情報技術入門I",
    season: "春AB",
    time: "月1",
    classroom: "3A306",
    teacher: "朴 泰祐"
  };
  atmnb: string[] = ["出席", "欠席", "遅刻"];
  count: number[] = [2, 2, 2];

  get dialog(): boolean {
    return this.$store.getters["visible/detail"];
  }

  chDetail(): void {
    this.$store.commit("visible/chDetail", { display: false });
  }
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: 2.9vh;
  margin-bottom: 0;
}
.back {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: rgba(100, 100, 100, 0.5);
  z-index: 5;
}

.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 92vw;
  max-width: 700px;
  height: 80vh;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.363);
  border-radius: 1vh;
  z-index: 6;
}
@media screen and (min-width: 1300px) {
  .main {
    max-width: 1000px;
  }
}
article {
  position: relative;
  margin: 5vh;
  height: calc(80vh - 10vh);
}
.close-btn {
  position: absolute;
  top: -2.2vh;
  right: -2.1vh;
  font-size: 4vh;
  color: #717171;
}
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
}
.delete-btn {
  position: absolute;
  bottom: -1.7vh;
  font-size: 2vh;
  color: rgb(255, 98, 98);
  margin: 0;
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
</style>
