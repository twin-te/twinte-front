<template>
  <div>
    <toolbar />
    <t-navigation :drawer="drawer" />
    <t-dialog :popup="popup" :looking="looking"> </t-dialog>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

interface Table {
  number: String;
  name: String;
  season: String;
  time: String;
  classroom: String;
  teacher: String;
}
@Component({
  components: {
    toolbar: () => import("~/components/layouts/toolbar.vue"),
    "t-navigation": () => import("~/components/layouts/nav.vue"),
    "t-dialog": () => import("~/components/layouts/dialog.vue")
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  popup: Boolean = false;
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
