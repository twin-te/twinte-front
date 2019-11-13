/**
 * Twin:teの最小構成
 *
 * ある程度の仕組み
 */

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
          <div @click="chAdd()" v-if="table === null">初期画面</div>
          <div @click="chAdd()" v-else-if="table[module][day - 1][period - 1].number === ''">なし</div>
          <div @click="chDetail(day - 1, period - 1)" v-else>{{ table[module][day - 1][period - 1].name }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  get table() {
    return this.$store.getters['old_api/data']
  }
  get module() {
    return this.$store.getters['table/moduleNum']
  }

  chDetail(day: number, period: number) {
    this.$store.commit('table/setClick', { day, period })
    this.$store.commit('visible/chDetail', { display: true })
  }
  chAdd() {
    this.$store.commit('visible/chAdd', { display: true })
  }
  chModule(direction: ("left" | "right")) {
    this.$store.commit("visible/chTable", { display: false, move: direction });
    setTimeout(() => {
      this.$store.commit(direction==='left' ? "table/prevModule" : "table/nextModule");
      this.$store.commit("visible/chTable", { display: true, move: direction });
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
