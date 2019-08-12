<template>
  <section>
    <div id="notation">秋A</div>
    <div id="week">
      <div id="day"><app-day /></div>
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
}
</script>

<style lang="sass" scoped>
#notation
  position: absolute
  width: 26px
  height: 23px
  left: 176px
  top: 64px
  font-family: Noto Sans JP
  font-style: normal
  font-weight: 500
  font-size: 16px
  line-height: 23px
  color: #9A9A9A
#week
  display: flex
  justify-content: space-between
  position: absolute
  width: 243px
  height: 27px
  left: 87px
  top: 87px
  font-family: Noto Sans JP
  font-style: normal
  font-weight: 500
  font-size: 15px
  color: #9A9A9A
#day
  position: fixed
  width: 49px
  height: 48px
  left: 14px
  top: 62px
</style>
