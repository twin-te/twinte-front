/** -> "../layouts/default.vue" */
<template>
  <!-- 左側に出現するサイドバー -->
  <section class="contents">
    <transition name="slide">
      <nav class="main" v-if="drawer">
        設定
        <section v-for="l in list" :key="l.id">
          <ui-navlist>{{ l.name }}</ui-navlist>
        </section>
      </nav>
    </transition>

    <transition name="fade">
      <nav class="back" @click="chDrawer()" v-if="drawer"></nav>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

@Component({
  components: {
    "ui-navlist": () => import("~/components/ui-nav-list.vue")
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  get drawer(): boolean {
    return this.$store.getters["visible/drawer"];
  }

  chDrawer(): void {
    this.$store.commit("visible/chDrawer", { bool: false });
  }

  list: any = [
    { name: "ホームへ戻る" },
    { name: "使い方" },
    { name: "About" },
    { name: "表示設定" },
    { name: "時間割の共有" },
    { name: "時間割データの消去" }
  ];
}
</script>

<style lang="sass" scoped>
.main
  position: absolute
  left: 0px
  top: 0px
  max-width: 300px
  width: 80vw
  height: 100vh
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25)
  background: #fff
  z-index: 6
.back
  position: absolute
  left: 0px
  top: 0px
  width: 100vw
  height: 100vh
  background: rgba(100, 100, 100, 0.5)
  z-index: 5

/** animation */
.slide-enter-active, .slide-leave-active
  transition: transform .2s ease
.slide-enter, .slide-leave-to
  transform: translateX(-100%)

.fade-enter-active, .fade-leave-active
  transition: all .3s ease
.fade-enter, .fade-leave-to
  opacity: 0
</style>
