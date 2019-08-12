<template>
  <div>
    <def-toolbar />
    <def-navigation :drawer="drawer" />
    <def-dialog :popup="popup" :looking="looking" />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

interface Table {
  number: string;
  name: string;
  season: string;
  time: string;
  classroom: string;
  teacher: string;
}
@Component({
  components: {
    "def-toolbar": () => import("~/components/def-toolbar.vue"),
    "def-navigation": () => import("~/components/def-nav.vue"),
    "def-dialog": () => import("~/components/def-dialog.vue")
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  popup: boolean = false;
  //TODO ボタン押したときに$emitでいい感じに同期
  looking: Table = {
    number: "1A18011",
    name: "ネットワーク社会を支える情報技術入門I",
    season: "春AB",
    time: "月1",
    classroom: "3A306",
    teacher: "朴 泰祐, 西沢　奏"
  };

  /** サイドバーの状態をcommitで取得 */
  get drawer() {
    return this.$store.getters["visible/drawer"];
  }
}
</script>

<style lang="sass" scoped></style>
