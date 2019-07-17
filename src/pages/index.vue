<template>
  <section>
    <div id="sem"><span id="notation">秋A</span></div>
    <table id="week">
    <tr>
      <td id="day">今日</td>
      <td v-for="n in 6" :key="n">{{ week[n - 1] }}</td>
    </tr>
  </table>
    <time-table id="table" semester=0></time-table>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    timeTable: () => import("~/components/pages/table.vue")
  }
})
export default class Index extends Vue {
  public semester: number = 0;
  public week: string[] = ["月", "火", "水", "木", "金"];
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
  text-align: center
  color: #9A9A9A
#week
  position: absolute
  width: 243px
  height: 27px
  left: 87px
  top: 86px
  color: #9A9A9A
#day
  position: fixed
  width: 49px
  height: 48px
  left: 14px
  top: 62px
</style>
