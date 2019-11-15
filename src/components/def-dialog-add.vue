<template>
  <section class="contents">
    <transition name="bound">
      <nav class="main" v-show="add">
        <article>
          <div class="svg-button material-icons close-btn" @click="chAdd()">
            close
          </div>
          <h1>授業の追加</h1>
          <p class="content">科目名・授業番号で検索</p>

          <form class="search-form">
            <input
              v-model="input"
              type="text"
              class="form"
            />
            <span class="material-icons search-btn">search</span>
          </form>
          <!-- → 検索ボックス -->

          <ul>
            <li v-for="n in lectureIds" :key="n">{{ n }}</li>
          </ul>
          <!-- → 検索結果 -->

          <section class="others">
            <p class="other-content">
              CSVファイルから追加<br /><small>*{{ moduleMessage }}</small>
            </p>
            <input
              class="other-content"
              type="file"
              name="file"
              id="fileElem"
              @change="onFileChange"
            />
            <!-- <p class="other-content">手動入力で授業を作成</p> -->
          </section>
          <!-- → その他オプション -->

          <section class="register-btn" @click="asyncNumber()">
            時間割に追加
          </section>
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

@Component({
  components: {}
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  // data___________________________________________________________________________________
  //
  input: string = "";
  lectureIds: string[] = [];
  assertMessage: string =
    "科目追加を行いますか？現在表示されている時間割は上書きされます";

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
  chAdd = () => {
    this.$store.commit("visible/chAdd", { display: false });
  };
  onFileChange = async (e: any) => {
    e.preventDefault();
    const fileData = e.target.files[0];
    if (fileData === null) {
      alert("ファイルが入力されてません");
      return;
    }
    //TODO numbersに番号をいれる
    await this.asyncNumber();
    alert("完了");
  };
  asyncNumber = async () => {
    console.log(confirm(this.assertMessage))
    if (confirm(this.assertMessage)) {
      console.log(this.input);
      return;
    }
    console.log(this.input);
    
    this.lectureIds.push(this.input);
    await this.$store.dispatch('api/addTable', { lectureIds: this.lectureIds })
  };
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
  bottom: 8.5vh;
  border-top: 1px solid #adadad;
  width: 100%;
}
.other-content {
  font-size: 2vh;
  color: #adadad;
  margin-left: 1.5vh;
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
