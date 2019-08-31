/** -> "app-table-header.vue" */
<template>
  <!-- 時間割の日時 -->
  <section id="day">
    <div id="cal-month">{{ today.month }}月</div>
    <div id="cal-day">
      {{ today.day }}
    </div>
    <div id="cal-week">({{ today.week }})</div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class Index extends Vue {
  today: { month: number | null, day: number | null, week: string | null } = { month: null, day: null, week: null };

  mounted() {
    const date = new Date();
    const weeks = ["日", "月", "火", "水", "木", "金", "土"];
    this.today = {
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: weeks[date.getDay()]
    }
  }
}
</script>

<style lang="scss" scoped>
#day {
  position: absolute;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 1vh;
  height: 7vh;
  width: 6.5vh;
  left: 4.5vw;
  top: -3.7vh;
}
#cal-month {
  background: #00c0c0;
  color: #fcfcfc;
  font-size: 1.5vh;
  text-align: center;
  line-height: 2vh;
}
#cal-day {
  color: #9a9a9a;
  font-size: 2.6vh;
  text-align: center;
  line-height: 3vh;
}
#cal-week {
  color: #9a9a9a;
  font-size: 1.4vh;
  text-align: center;
  line-height: 2vh;
}
</style>
