/** * 時間割追加画面 *
ボタン、フォーム、CSVファイル追加辺りは別コンポネントに分けたい * TODO
CSVの処理はここで行う */
<template>
  <section class="contents">
    <transition name="bound">
      <nav class="main" v-show="add">
        <article>
          <div class="svg-button material-icons close-btn" @click="chAdd()">close</div>
          <h1>授業の追加</h1>
          <p class="content">
            科目名・授業番号で検索
            <span v-if="isIOS" class="twins-btn" @click="twins()">Twinsからインポート</span>
          </p>

          <form class="search-form" @submit.prevent>
            <input v-model="input" type="text" class="form" @keyup.enter="search(input)" />
            <span v-if="input === ''" @click="lectures = []" class="material-icons search-btn">close</span>
            <span v-else @click="search(input)" class="material-icons search-btn">search</span>
          </form>
          <!-- → 検索ボックス -->

          <section class="result-list">
            <div
              v-for="(n, i) in lectures"
              :key="n.lecture_code+i"
              :style="{ background: i % 2 === 0 ? '#F9F9F9' : '#ebebeb' }"
            >
              <input
                type="checkbox"
                :id="n.lecture_code"
                :value="n.lecture_code"
                v-model="n.checked"
              />
              <label :for="n.lecture_code">
                {{ n.lecture_code }} - {{ n.lecture_name }} - {{ n.module }}{{ n.day
                }}{{ n.period }}
              </label>
            </div>
          </section>
          <!-- → 検索結果 -->

          <section class="others">
            <p>
              CSVファイルから追加
              <br />
              <small>*{{ moduleMessage }}</small>
            </p>
            <input type="file" name="file" id="fileElem" @change="onFileChange" />
            <!-- <p @click="custom()">手動入力で授業を作成</p> -->
          </section>
          <!-- → その他オプション -->

          <section class="register-btn" @click="asyncNumber()">時間割に追加</section>
        </article>
      </nav>
    </transition>

    <!-- 全体を暗くする -->
    <transition name="fade">
      <nav class="back" @click="chAdd()" v-if="add"></nav>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";
import { searchLectures } from "../store/api/lectures";
import { login } from "../store/api/auth";
import Swal from "sweetalert2";

type miniLecture = {
  lecture_code: string;
  lecture_name: string;
  module: string;
  day: string;
  period: number;
  checked: boolean;
};

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  // data___________________________________________________________________________________
  //
  input: string = "";
  lectures: miniLecture[] = [];
  isIOS = false;

  // computed___________________________________________________________________________________
  //
  get moduleMessage(): string {
    return `${this.$store.getters["table/module"]}のCSVファイルを入力してください`;
  }
  get add(): boolean {
    return this.$store.getters["visible/add"];
  }
  get moduleNum(): number {
    return this.$store.getters["table/moduleNum"];
  }

  // method___________________________________________________________________________________
  //
  chAdd() {
    this.$store.commit("visible/chAdd", { display: false });
  }
  twins() {
    location.href = "https://twins.tsukuba.ac.jp";
  }
  custom() {
    this.$router.push("/custom");
    this.$store.commit("visible/chAdd", { display: false });
  }
  async search(input: string) {
    const le = await searchLectures(input);
    if (le) {
      le.forEach(async l => {
        if (l) {
          await this.lectures.push({
            lecture_code: l.lectureCode,
            lecture_name: l.name,
            module: l.details[0].module,
            day: l.details[0].day,
            period: l.details[0].period,
            checked: false
          });
        }
      });
    }
    this.input = "";
  }
  async onFileChange(e: any) {
    e.preventDefault();

    const fileData = e.target.files[0];
    if (fileData === null) {
      return;
    }
    let csvLectureList: string[] = [];
    const reader = new FileReader();
    reader.onload = function() {
      if (typeof reader.result === "string") {
        csvLectureList = reader.result
          .split("\n")
          .map(csv => {
            return csv.replace(/["]/g, "");
          }) // drop "
          .filter(csv => csv); // drop blank line
      }
    };

    reader.readAsText(fileData);
    setTimeout(() => {
      csvLectureList.forEach(csv => {
        this.search(csv);
      });
    }, 1000);
  }
  async asyncNumber() {
    if (!this.$store.getters["api/isLogin"]) {
      Swal.fire(
        "まだログインしていません",
        "歯車⚙からログインしてからお試し下さい",
        "error"
      );
      return;
    }
    Swal.fire({
      title: "科目追加を行いますか？",
      text: "現在表示されている時間割は上書きされます",
      showCancelButton: true,
      confirmButtonText: "はい",
      cancelButtonText: "いいえ"
    }).then(async result => {
      if (result.value) {
        const lectureCodes = await Promise.all(
          this.lectures.filter(l => l.checked).map(l => l.lecture_code)
        );
        await this.$store.dispatch("api/addTable", { lectureCodes });
        login();
        this.input = "";
      }
    });
  }

  mounted() {
    this.isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);
  }
}
</script>

<style lang="scss" scoped>
//++++++++++++++++++++++++// ダイアログの枠 //++++++++++++++++++++++++//
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 92vw;
  max-width: 700px;
  height: 80vh;
  background: #fff;
  box-shadow: 1vmine;
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
.close-btn {
  position: absolute;
  top: -1.5vh;
  cursor: pointer;
  right: -1.5vh;
  font-size: 4vh;
  transition: all 0.15s;
  color: #717171;
}
.register-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: auto;
  width: 100%;
  max-width: 550px;
  font-size: 2.3vh;
  height: 6vh;
  line-height: 6vh;
  background: #00c0c0;
  border-radius: 1vh;
  bottom: 0;
  color: #fff;
  text-align: center;
  &:active {
    transition: all 0.2s;
    transform: translateX(-50%) scale(1.05);
    background-color: #05dbdb;
  }
}
@media screen and (min-width: 1300px) {
  .register-btn {
    max-width: 1000px;
  }
}

/* 授業の追加 */
h1 {
  position: absolute;
  top: -0.8vh;
  font-size: 2.9vh;
  color: #00c0c0;
  font-weight: 500;
}
.content {
  position: absolute;
  top: 5.9vh;
  font-size: 2vh;
  color: #555;
  margin-left: 1.5vh;
}
.others {
  position: absolute;
  bottom: 7.5vh;
  border-top: 1px solid #adadad;
  width: 100%;
}
.others p {
  font-size: 2vh;
  color: #adadad;
  margin-left: 1.5vh;
  line-height: 100%;
}
.others input {
  margin-left: auto;
  margin-right: 0;
  color: #adadad;
}

/* 検索フォーム */
.search-form {
  position: absolute;
  width: calc(100% - 3vh);
  height: 4.5vh;
  top: 11.6vh;
  margin: 0 1.5vh;
}
.form {
  height: 100%;
  width: 98%;
  max-width: 1000px;
  background-color: #fff;
  border: 1px solid #adadad;
  color: #4a5568;
  border-radius: 3vh;
  position: relative;
  padding-left: 2%;
}
.search-btn {
  position: absolute;
  top: 0;
  right: -0.6vh;
  height: 5vh;
  width: 5vh;
  border-radius: 50% 50%;
  background-color: #00c0c0;
  color: #fff;
  font-size: 3.5vh;
  text-align: center;
  line-height: 4.8vh;
  &:active {
    transition: all 0.2s;
    transform: scale(1.1);
    background-color: #05dbdb;
  }
}

.form:focus {
  border-color: #558afa;
  outline: 0;
  background-color: #fff;
}

/** 検索結果 */
.result-list {
  position: absolute;
  width: calc(100% - 3vh-1vw);
  height: 26vh;
  top: 17.6vh;
  margin: 0 1.8vh;
  padding: 1vw 0.5vw;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}
.result-list div {
  padding: 2vw;
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
.twins-btn {
  font-size: 1.9vh;
  font-weight: 400;
  color: #8c6cff;
}
</style>
