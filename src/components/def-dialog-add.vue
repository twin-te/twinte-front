<template>
  <section class="contents">
    <transition name="bound">
      <nav class="main" v-show="add">
        <article>
          <div class="svg-button material-icons" @click="chAdd()">close</div>
          <h1 class="add-title">授業の追加</h1>
          <section class="search-form">
            <textarea
              @keydown="findClassByName()"
              v-model="numbers"
              type="text"
              class="form"
            />
          </section>
          <section class="others">
            <p class="othercontent">CSVファイルから追加</p>
            <p class="othercontent">手動入力で授業を作成</p>
          </section>
          <section class="btn">
            <span class="center" @click="asyncNumber()">時間割に追加</span>
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
import axios from "axios";

@Component({
  components: {}
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;
  // data______________________________________________________
  //
  numbers: string = "";
  result: {} = {};
  // props______________________________________________________
  //
  // computed______________________________________________________
  //
  get add() {
    return this.$store.getters["visible/add"];
  }
  // method______________________________________________________
  //
  chAdd() {
    this.$store.commit("visible/chAdd", { display: false });
  }
  async findClassByName() {
    if (this.numbers.length < 2) {
      return;
    }
    await axios
      .post("https://twinte.net/api", {
        name: this.numbers
      })
      .then(result => {
        this.result = result.data;
      })
      .catch(err => {
        this.result = err;
      });
  }
  async asyncNumber() {
    const moduleNum = this.$store.getters["table/moduleNum"];
    const moduleList: string[] = [
      "haruA",
      "haruB",
      "haruC",
      "akiA",
      "akiB",
      "akiC"
    ];
    await this.$store.dispatch("old_api/asyncNumber", {
      number: [this.numbers],
      module: moduleList[moduleNum]
    });
  }
}
</script>

<style lang="scss" scoped>
/** 中央寄せ */
article {
  position: relative;
  margin: 5.7vw;
  height: calc(80vh - 11.4vw);
}
.add-title {
}
.btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: auto;
  width: 100%;
  max-width: 600px;
  height: 6vh;
  line-height: 40px;
  background: #00c0c0;
  border-radius: 0.5rem;
  bottom: 2vh;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-family: Noto Sans JP;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
}
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 92vw;
  height: 80vh;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 0.6rem;
  z-index: 6;
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
#close {
  float: right;
  font-size: 40px;
}
.search-form {
  width: 90%;
  max-width: 600px;
  height: 6vh;
  margin: 0 auto;
  line-height: 40px;
  border-radius: 0.5rem;
  position: relative;
}

.form {
  height: 5vh;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border: 1px solid #adadad;
  color: #4a5568;
  border-radius: 3vh;
  position: relative;
}

.form:focus {
  border-color: #9f7aea;
  outline: 0;
  background-color: #fff;
}
</style>
