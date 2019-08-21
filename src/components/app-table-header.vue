/** -> "../pages/index.vue" */
<template>
  <!-- 高さ 43px -->
  <section>
    <div id="module">
      <span @click="prevModule">く</span>
      <span>{{ module }}</span>
      <span @click="nextModule">く</span>
    </div>
    <div id="week">
      <app-day id="day"></app-day>
      <div v-for="n in 5" :key="n">{{ week[n - 1] }}</div>
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
    this.$store.commit("table/prevModule");
  }

  nextModule() {
    this.$store.commit("table/nextModule");
  }

  get module(): string {
    const num: number = this.$store.getters["table/moduleNum"];
    const moduleListJp: string[] = ["春A", "春B", "春C", "秋A", "秋B", "秋C"];
    return moduleListJp[num];
  }
}
</script>

<style lang="sass" scoped>
#module
  display: flex
  font-family: Noto Sans JP
  font-style: normal
  font-weight: 500
  font-size: 16px
  line-height: 24px
  height: 24px
  color: #9A9A9A
  justify-content: space-evenly
  margin-top: 8px
#week
  display: flex
  justify-content: space-between
  width: calc(100vw - 20px)
  height: 27px
  line-height: 27px
  margin-left: 14px
  margin-right: 14px
  font-family: Noto Sans JP
  font-style: normal
  font-weight: 500
  font-size: 15px
  color: #9A9A9A
#day
  position: relative
  top: -28px
</style>
