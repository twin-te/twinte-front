<template>
  <div>
    <def-toolbar />
    <def-navigation />
    <def-dialog :looking="looking" />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

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
  //TODO ボタン押したときに$emitでいい感じに同期
  looking: Table = {
    number: "1A18011",
    name: "ネットワーク社会を支える情報技術入門I",
    season: "春AB",
    time: "月1",
    classroom: "3A306",
    teacher: "朴 泰祐"
  };
}
</script>

<style lang="sass" scoped></style>
