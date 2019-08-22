<template>
  <section class="contents">
    <transition name="bound">
      <nav class="main" v-if="add">
        <article style="padding: 25px">
          <!-- <x> -->
          <div class="svg-button" @click="chAdd()">
            <svg
              id="close"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z"
                fill="#9A9A9A"
              />
            </svg>
          </div>
          <section>
            <form>
              <textarea v-model="numbers" type="text" class="input-box" />
            </form>
          </section>
          <section
            style="width: 100%; height: 40px; background: #00C0C0; border-radius: 7px; margin-bottom: 15px; position: relative"
          >
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

@Component({
  components: {}
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;
  // data______________________________________________________
  //
  numbers: string = "";
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
    this.$store.commit("visible/chAdd", { bool: false });
  }
  async asyncNumber() {
    const moduleNum = this.$store.getters["table/moduleNum"];
    const moduleList: string[] = ["haruA", "haruB", "haruC", "akiA", "akiB", "akiC"];
    this.$store.dispatch("old_api/asyncNumber", {
      number: [this.numbers],
      module: moduleList[moduleNum]
    });
  }
}
</script>

<style lang="sass" scoped>
/** 中央寄せ */
.center
  position: absolute
  top: 50%
  left: 50%
  transform: translateY(-50%) translateX(-50%)
  font-family: Noto Sans JP
  font-style: normal
  font-weight: 500
  font-size: 16px
  line-height: 23px
  text-align: center
  color: #FFFFFF
.main
  position: absolute
  top: 73px
  left: 13px
  width: calc(100vw - 26px)
  height: calc(100vh - 128px)
  background: #FFFFFF
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2)
  border-radius: 10px
  z-index: 6
.back
  position: absolute
  width: 100vw
  height: 100vh
  left: 0px
  top: 0px
  background: rgba(100, 100, 100, 0.5)
  z-index: 5
#close
  float: right

.svg-button
  border: none
  background: none
  cursor: pointer
  &:focus
    outline: 2px dashed #17171D
  &:hover
    svg
      transform: scale(1.1)
  svg
    outline: none
    transition: transform 0.3s liner

.input-box
  margin-top: 14px
  margin-bottom: 14px
  width: 100%
  font-size: 1.3em
  font-family: Arial, sans-serif
  color: #aaa
  border: solid 1px #ccc
  -webkit-border-radius: 3px
  -moz-border-radius: 3px
  border-radius: 3px

/** animation */
.bound-enter-active, .bound-leave-active
  transition: all .2s ease
.bound-enter, .bound-leave-to
  transform: scale(.5)
  opacity: 0
.fade-enter-active, .fade-leave-active
  transition: all .3s ease
.fade-enter, .fade-leave-to
  opacity: 0
</style>
