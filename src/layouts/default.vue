<template　ontouchstart="">
  <div>
    <def-toolbar />
    <def-navigation />
    <def-dialog-add />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

@Component({
  components: {
    "def-toolbar": () => import("~/components/def-toolbar.vue"),
    "def-navigation": () => import("~/components/def-nav.vue"),
    "def-dialog-add": () => import("~/components/def-dialog-add.vue")
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;
  mounted() {
    // ローカルデータの読み込み
    const data = localStorage.getItem("twinte-data"); // 旧データ
    if (data) {
      const json = JSON.parse(data);
      this.$store.commit("old_api/updateTableAll", { data: json.item });
      localStorage.removeItem("twinte-data");
    }

    const table = localStorage.getItem("table"); // 時間割データ
    if (table) {
      const json = JSON.parse(table);
      this.$store.commit("old_api/updateTableAll", { data: json });
    }

    const number = localStorage.getItem("number"); // 授業番号配列
    if (number) {
      const json = JSON.parse(number);
      this.$store.commit("old_api/SET_NUMBERS", { data: json });
    }

    const module = localStorage.getItem("module"); // 前回見ていた学期
    if (module) {
      this.$store.commit("table/setModule", { module });
    }

    // 開発用
    // if (process.env.NODE_ENV !== "production" && !table) {
    //   console.info(`mode: ${process.env.NODE_ENV}`);
    //   console.info(`you are: ${this.$nuxt.$route.path}`);
    //   this.$store.dispatch("old_api/login");
    //   this.$store.dispatch("old_api/assignObj", { moduleNum: 0 });
    //   this.$store.dispatch("old_api/assignObj", { moduleNum: 1 });
    //   this.$store.dispatch("old_api/assignObj", { moduleNum: 2 });
    //   this.$store.dispatch("old_api/assignObj", { moduleNum: 3 });
    //   this.$store.dispatch("old_api/assignObj", { moduleNum: 4 });
    //   this.$store.dispatch("old_api/assignObj", { moduleNum: 5 });
    //   this.$store.dispatch("old_api/assignObj", { moduleNum: 6 });
    //   this.$store.dispatch("old_api/createNumbers");
    //   window.alert("時間割を追加しました");
    // }
  }
}
</script>

<style lang="scss" scoped></style>
