/** * Twin:teの最小構成 * * ある程度の仕組み */

<template>
  <table>
    <thead>
      <tr>
        <th colspan="3">現在の学期: {{ module }}</th>
        <th colspan="1" @click="chModule('left')">prev</th>
        <th colspan="1" @click="chModule('right')">next</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="period in 6" :key="period">
        <td v-for="day in 5" :key="day" class="subject">
          <div @click="chAdd()" v-if="table[day - 1][period - 1] === null">
            初期状態 or なし
          </div>
          <div
            @click="chDetail(table[day - 1][period - 1])"
            v-else
            :style="{
              background: getColor(table[day - 1][period - 1].lecture_code)
            }"
          >
            {{ table[day - 1][period - 1].lecture_name }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import * as Vuex from 'vuex';
import { TimeTables, Period } from '../types';

enum Day {
  Sun = '日',
  Mon = '月',
  Tue = '火',
  Wed = '水',
  Thu = '木',
  Fri = '金',
  Sat = '土',
  Unknown = '不明'
}

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore;
  week: string[] = [Day.Mon, Day.Tue, Day.Wed, Day.Thu, Day.Fri];

  get table() {
    const periods = this.$store.getters['api/table'];
    return this.createTable(periods);
  }
  get module() {
    return this.$store.getters['table/module'];
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
            period.period === p // period
          );
        });
        periodsArr.push(validPeriod ? validPeriod : null);
      }
      table.push(periodsArr);
    }
    return table;
  }
  getColor(number: string): string {
    const char = number.split('')[0];
    switch (char) {
      case 'A':
        return '#DEFFF9';
      case 'B':
        return '#DEFFF9';
      case 'C':
        return '#DEFFF9';
      case 'E':
        return '#DEFFF9';
      case 'F':
        return '#DEFFF9';
      case 'G':
        return '#DEFFF9';
      case 'H':
        return '#DEFFF9';
      case 'W':
        return '#DEFFF9';
      case 'Y':
        return '#DEFFF9';
      case '1':
        return '#FFEEF7';
      case '2':
        return '#F0EBFF';
      case '3':
        return '#FFFCEB';
      default:
        return '';
    }
  }
  chDetail(period: Period) {
    this.$store.dispatch('table/setPeriod', { period });
    this.$store.commit('visible/chDetail', { display: true });
  }
  chAdd() {
    this.$store.commit('visible/chAdd', { display: true });
  }
  chModule(direction: 'left' | 'right') {
    this.$store.commit('visible/chTable', { display: false, move: direction });
    setTimeout(() => {
      this.$store.commit(
        direction === 'left' ? 'table/prevModule' : 'table/nextModule'
      );
      this.$store.commit('visible/chTable', { display: true, move: direction });
    }, 0);
  }
}
</script>

<style lang="scss" scoped>
.subject {
  width: calc(100vw / 5);
}
table,
td {
  border: 1px solid #333;
}
</style>
