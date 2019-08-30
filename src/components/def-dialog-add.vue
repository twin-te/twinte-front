<template>
  <section class="contents">
    <transition name="bound">
      <nav class="main" v-if="add">
        <article style="padding: 25px">
          <div class="svg-button material-icons" @click="chAdd()">close</div>
          <section>
            <form>
              <textarea
                @keydown="findClassByName()"
                v-model="numbers"
                type="text"
                class="btn form"
              />
            </form>
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
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import axios from 'axios'

@Component({
  components: {},
})
export default class Index extends Vue {
  $store!: Vuex.ExStore
  // data______________________________________________________
  //
  numbers: string = ''
  result: {} = {}
  // props______________________________________________________
  //
  // computed______________________________________________________
  //
  get add() {
    return this.$store.getters['visible/add']
  }
  // method______________________________________________________
  //
  chAdd() {
    this.$store.commit('visible/chAdd', { bool: false })
  }
  async findClassByName() {
    if (this.numbers.length < 2) {
      return
    }
    await axios
      .post('https://twinte.net/api', {
        name: this.numbers,
      })
      .then((result) => {
        this.result = result.data
      })
      .catch((err) => {
        this.result = err
      })
  }
  async asyncNumber() {
    const moduleNum = this.$store.getters['table/moduleNum']
    const moduleList: string[] = [
      'haruA',
      'haruB',
      'haruC',
      'akiA',
      'akiB',
      'akiC',
    ]
    await this.$store.dispatch('old_api/asyncNumber', {
      number: [this.numbers],
      module: moduleList[moduleNum],
    })
  }
}
</script>

<style lang="scss" scoped>
/** 中央寄せ */
.btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #00C0C0;
  border-radius: 0.5rem;
  position: relative;
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
  color: #FFFFFF;
}
.main {
  position: absolute;
  top: 73px;
  left: 13px;
  width: calc(100vw - 26px);
  height: calc(100vh - 128px);
  background: #FFFFFF;
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
}

.form {
  background-color: #edf2f7;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border-width: 2px;
  border-color: #edf2f7;
  color: #4a5568;
}

.form:focus {
  border-color: #9f7aea;
  outline: 0;
  background-color: #fff;
}

/** animation */
.bound-enter-active, .bound-leave-active {
  transition: all .2s ease;
}
.bound-enter, .bound-leave-to {
  transform: scale(.5);
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
