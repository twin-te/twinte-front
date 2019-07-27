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
    "toolbar": () => import("~/components/layouts/toolbar.vue"),
    "t-navigation": () => import("~/components/layouts/nav.vue"),
    "t-dialog": () => import("~/components/layouts/dialog.vue")
  }
})
export default class Index extends Vue {
  public drawer: Boolean = false;
  public popup: Boolean = false;
  //TODO ボタン押したときに$emitでいい感じに同期
  public looking: Table = { number: "1A18011", name: "ネットワーク社会を支える情報技術入門I", season: "春AB", time: "月1", classroom: "3A306", teacher: "朴 泰祐" };
}
</script>

<style lang="sass" scoped>
</style>