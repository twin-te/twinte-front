/** * モジュール名 * 矢印 * 曜日名 * width: 79vw x height: 7.6vh *
prevModule、nextModule は アニメーションの関係上いろんな処理を行っている */
<template>
  <section>
    <div id="module">
      <span class="s4 material-icons svg-button" @click="prevModule"
        >chevron_left</span
      >
      <span>{{ module }}</span>
      <span class="s4 material-icons svg-button" @click="nextModule"
        >chevron_right</span
      >
    </div>
    <div id="week">
      <day id="day"></day>
      <section class="week-wrapper">
        <div v-for="n in 5" :key="n">{{ week[n - 1] }}</div>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

enum Day {
  Sun = "日",
  Mon = "月",
  Tue = "火",
  Wed = "水",
  Thu = "木",
  Fri = "金",
  Sat = "土",
  Unknown = "不明"
}

@Component({
  components: {
    Day: () => import("~/components/ui-day.vue")
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  week: string[] = [Day.Mon, Day.Tue, Day.Wed, Day.Thu, Day.Fri];

  prevModule() {
    this.$store.commit("visible/chTable", { display: false, move: "left" });
    setTimeout(() => {
      this.$store.commit("table/prevModule");
      this.$store.commit("visible/chTable", { display: true, move: "left" });
    }, 250);
  }

  nextModule() {
    this.$store.commit("visible/chTable", { display: false, move: "right" });
    setTimeout(() => {
      this.$store.commit("table/nextModule");
      this.$store.commit("visible/chTable", { display: true, move: "right" });
    }, 250);
  }

  get module(): string {
    return this.$store.getters["table/module"];
  }
}
</script>

<style lang="scss" scoped>
$week-width: calc(
  100vw - 8vw /*contentのmargin+padding*/ - 13vw /*timeのwidth+padding*/
);
.s4 {
  font-size: 4.6vh;
}
#module {
  position: absolute;
  display: flex;
  font-family: Noto Sans JP;
  font-style: normal;
  font-weight: 500;
  font-size: 2.2vh;
  line-height: 4.6vh;
  width: 35vw;
  color: #9a9a9a;
  justify-content: space-between;
  top: 8.5vh;
  left: 50%;
  transform: translateX(-50%);
}
#week {
  position: absolute;
  display: flex;
  width: 87vw;
  height: 3vh;
  line-height: 3vh;
  font-family: Noto Sans JP;
  font-style: normal;
  font-weight: 500;
  font-size: 2vh;
  color: #9a9a9a;
  top: 12.5vh;
}
.week-wrapper {
  position: absolute;
  display: flex;
  width: $week-width;
  justify-content: space-around;
  left: calc(13vw + 4vw);
  top: 0.2vh;
}
</style>
