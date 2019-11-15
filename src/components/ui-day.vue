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

type Today = { month: number | null; day: number | null; week: string | null };

@Component({})
export default class Index extends Vue {
  today: Today = {
    month: null,
    day: null,
    week: null
  };

  mounted() {
    const date = new Date();
    const weeks = ["日", "月", "火", "水", "木", "金", "土"];
    this.today = {
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: weeks[date.getDay()]
    };
  }
}
</script>

<style lang="scss" scoped>
#day {
  position: absolute;
  box-shadow: 0.5vmin 0.5vmin 1.5vmin rgba(0, 0, 0, 0.226);
  border-radius: 1vh;
  height: 6.7vh;
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
  line-height: 2.5vh;
}
#cal-week {
  color: #9a9a9a;
  font-size: 1.4vh;
  text-align: center;
  line-height: 2.1vh;
}
</style>
