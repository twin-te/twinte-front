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
      <tr v-for="y in 6">
        <td v-for="x in 5" class="subject">
          <div @click="chAdd()" v-if="table === null">初期画面</div>
          <div @click="chAdd()" v-else-if="table[module][x - 1][y - 1].number === ''">なし</div>
          <div @click="chDetail(x, y)" v-else>{{ table[module][x - 1][y - 1].name }}</div>
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

  chDetail(x: number, y: number) {
    this.$store.commit('table/setClick', { x: x - 1, y: y - 1 })
    this.$store.commit('visible/chDetail', { display: true })
  }
  chAdd() {
    this.$store.commit('visible/chAdd', { display: true })
  }
  chModule(direction="left") {
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
//** debug css */
// *:not(path):not(g) {
//   color: hsla(210, 100%, 100%, 0.9) !important;
//   background: hsla(210, 100%, 50%, 0.5) !important;
//   outline: solid 0.25rem hsla(210, 100%, 100%, 0.5) !important;
//   box-shadow: none !important;
// }
</style>
