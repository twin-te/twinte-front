<template>
  <section @click="popUp(table[day][period])">
    <div id="subject" v-if="!table[day][period]"></div>
    <!-- → 授業が入っていない -->

    <div
      id="subject"
      :style="{
        background: getColor(table[day][period].lectureID),
      }"
      v-else
    >
      <div class="sbj-lectureId">{{ table[day][period].lectureId }}</div>
      <div class="sbj-name">{{ table[day][period].name }}</div>
      <div class="sbj-room">{{ table[day][period].room }}</div>
    </div>
    <!-- → 授業が入っている -->
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import * as Vuex from "vuex";
import { TimeTables, Period } from "../types/index";

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

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  @Prop() day!: number;
  @Prop() period!: number;

  week = [Day.Mon, Day.Tue, Day.Wed, Day.Thu, Day.Fri];

  get table() {
    const periods = this.$store.getters["api/table"];
    return this.createTable(periods);
  }
  get module() {
    return this.$store.getters["table/module"];
  }
  /**
   * 時間割の作成
   */

  createTable(periods: TimeTables): (Period | null)[][] {
    const table: (Period | null)[][] = [];
    const module = this.module;
    const week = this.week;

    for (let d = 0; d < 5; d++) {
      const periodsArr: (Period | null)[] = [];
      for (let p = 1; p <= 6; p++) {
        const validPeriod = periods.find(function(period) {
          return (
            period.module === module && // module
            week.indexOf(period.day) === d && // day
            period.period === p
          ); // period
        });
        periodsArr.push(validPeriod ? validPeriod : null);
      }
      table.push(periodsArr);
    }
    return table;
  }
  chDetail(period: Period) {
    this.$store.dispatch("table/setPeriod", { period });
    this.$store.commit("visible/chDetail", { display: true });
  }
  chAdd() {
    this.$store.commit("visible/chAdd", { display: true });
  }
  popUp(period: Period | null) {
    setTimeout(() => {
      if (period) {
        this.chDetail(period);
      } else {
        this.chAdd();
      }
    }, 20);
  }
  /** 授業に応じたテーマ色を返す */
  getColor(number: string): string {
    const char = number.split("")[0];
    switch (char) {
      case "A":
        return "#DEFFF9";
      case "B":
        return "#DEFFF9";
      case "C":
        return "#DEFFF9";
      case "E":
        return "#DEFFF9";
      case "F":
        return "#DEFFF9";
      case "G":
        return "#DEFFF9";
      case "H":
        return "#DEFFF9";
      case "W":
        return "#DEFFF9";
      case "Y":
        return "#DEFFF9";
      case "1":
        return "#FFEEF7";
      case "2":
        return "#F0EBFF";
      case "3":
        return "#FFFCEB";
      default:
        return "";
    }
  }
}
</script>

<style lang="scss" scoped>
$height: calc((100vh - 16.5vh - 6vmin - 12vmin) / 6);
$width: calc(
  (100vw - 8vw /**外枠 */ - 11vw /** 時限 */ - 12vw /** 科目+時限 padding */) /
    5
);
/* 科目 */
#subject {
  color: #555;
  width: $width;
  height: $height;
  padding: 1vmin 1vw;
  word-break: break-all;
  font-style: normal;
  font-weight: 700;
  font-size: 1.3vh;
  line-height: 2vh;
  overflow: hidden;
  &:active {
    transition: all 0.3s;
    filter: brightness(150%);
  }
}
.sbj-lectureId {
  font-weight: 400;
}
.sbj-name {
  font-weight: 700;
}
.sbj-room {
  font-weight: 400;
}
</style>
