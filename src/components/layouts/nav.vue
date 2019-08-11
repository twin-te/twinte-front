<template>
  <!-- 歯車を押すと左から出現する -->
  <div class="contents" :style="{ display: drawer ? '' : 'none' }">
    <nav class="main">
      設定
      <section v-for="l in list" :key="l.id">
        <navlist>{{ l.name }}</navlist>
      </section>
    </nav>
    <!-- 全体を暗くする -->
    <nav class="back" @click="chDrawer()"></nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

@Component({
  components: {
    navlist: () => import("~/components/ui/nav-list.vue")
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
  width: 80%
  max-width: 300px
  height: 100vh
  left: 0px
  top: 0px
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  background: #fff
  z-index: 6
.back
  position: absolute
  width: 100vw
  height: 100vh
  left: 0px
  top: 0px
  background: rgba(100, 100, 100, 0.5)
  z-index: 5
</style>
