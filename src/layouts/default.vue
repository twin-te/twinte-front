<template ontouchstart="">
  <div>
    <Toolbar />
    <Navigation />
    <DialogAdd />
    <DialogDetail />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";
// import { TimeTables } from "../types";
import { isLogin } from "../store/api/auth";
import Swal from "sweetalert2";

@Component({
  components: {
    Toolbar: () => import("~/components/def-toolbar.vue"),
    Navigation: () => import("~/components/def-nav.vue"),
    DialogAdd: () => import("~/components/def-dialog-add.vue"),
    DialogDetail: () => import("~/components/def-dialog-detail.vue")
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;
  mounted() {
    /**
     * ローカルデータの読み込み
     *
     * | ローカルデータがあるか確認
     * | ↓
     * | storeに格納
     *
     * の処理をここで行う
     *
     */

    const table = localStorage.getItem("table");
    if (table) {
      // const periodDatas: TimeTables = JSON.parse(table);
      // this.$store.commit("API/SET_TABLE", { periodDatas });
      // this.$store.commit("API/LOGIN");
    } else {
    }
    this.login();
    // → 時間割データ

    const module = localStorage.getItem("module");
    if (module) {
      this.$store.commit("table/setModule", { module });
    }
    // → 前回見ていた学期
  }
  async login() {
    if (await isLogin()) {
      this.$store.dispatch("api/login");
    } else {
      Swal.fire(
        "ようこそTwin:teへ",
        "Twin:teを利用するにはログインが必要です。<br>⚙からログインして下さい。",
        "info"
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
