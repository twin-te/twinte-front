/** -> "../pages/index.vue" */
<template>
  <!-- 高さ 43px -->
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
      <app-day id="day"></app-day>
      <section class="week-wrapper">
        <div v-for="n in 5" :key="n">{{ week[n - 1] }}</div>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

@Component({
  components: {
    AppDay: () => import("~/components/app-day.vue")
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  week: string[] = ["月", "火", "水", "木", "金"];

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
    const num: number = this.$store.getters["table/moduleNum"];
    const moduleListJp: string[] = ["春A", "春B", "春C", "秋A", "秋B", "秋C"];
    return moduleListJp[num];
  }
}
</script>

<style lang="scss" scoped>
$week-width: calc(
  100vw - 8vw /*contentのmargin+padding*/ - 13vw /*timeのwidth+padding*/
);
.s4 {
  font-size: 4vh;
}
#module {
  position: absolute;
  display: flex;
  font-family: Noto Sans JP;
  font-style: normal;
  font-weight: 500;
  font-size: 2vh;
  line-height: 4vh;
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
}
</style>
