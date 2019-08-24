/** -> "app-table-header.vue" */
<template>
  <!-- 時間割の日時 -->
  <section id="day">
  <div id="cal-month">
      {{ today.month }}月
  </div>
  <div id="cal-day">
      {{ today.day }}
  </div>
  <div id="cal-week">
      ({{ today.week }})
  </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class Index extends Vue {
  today: {month: number | null, day: number | null, week: string | null} = { month: null, day: null, week: null };

  mounted() {
    const date = new Date();
    const weeks = ["日", "月", "火", "水", "木", "金", "土"];
    this.today = {
      month: date.getMonth(),
      day: date.getDate(),
      week: weeks[date.getDay()]
    }
  }
}
</script>

<style lang="sass" scoped>
#day
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25)
  border-radius: 5px
  height: 50px
  width: 50px
#cal-month
  background: #00C0C0
  color: #FCFCFC
  font-size: 9px
  text-align: center
  width: 50px
  height: 14px
  line-height: 14px
#cal-day
  background: #FCFCFC
  color: #9A9A9A
  font-size: 18px
  text-align: center
  width: 50px
  line-height: 20px
#cal-week
  background: #FCFCFC
  color: #9A9A9A
  font-size: 9px
  text-align: center
  width: 50px
  line-height: 10px
</style>
