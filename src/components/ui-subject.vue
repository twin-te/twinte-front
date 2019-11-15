<template>
  <section>
    <div
      id="subject"
      @click="chAdd()"
      v-if="
        table === null ||
        table[module] === undefined ||
        table[module][day - 1][period - 1].number === 'undefined'
      "
    ></div>
    <!-- → 授業が入っていない -->

    <div
      id="subject"
      :style="{
        background: getColor(table[module][day - 1][period - 1].number),
      }"
      @click="popUp(day, period)"
      v-else
    >
      <div class="sbj-number">
        {{ table[module][day - 1][period - 1].number }}
      </div>
      <div class="sbj-name">
        {{ table[module][day - 1][period - 1].name }}
      </div>
      <div class="sbj-classroom">
        {{ table[module][day - 1][period - 1].classroom }}
      </div>
    </div>
    <!-- → 授業が入っている -->

  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import * as Vuex from "vuex";

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  @Prop() day!: number
  @Prop() period!: number

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
  popUp(day: number, period: number) {
    day--
    period--
    setTimeout(() => {
      if (
        this.table === null ||
        this.table[this.module] === null ||
        this.table[this.module][day][period].number === ''
      ) {
        this.chAdd()
      } else {
        this.chDetail(day, period)
      }
    }, 20)
  }
  /** 授業に応じたテーマ色を返す */
  getColor(number: string): string {
    const char = number.split('')[0]
    switch (char) {
      case 'A':
        return '#DEFFF9'
      case 'B':
        return '#DEFFF9'
      case 'C':
        return '#DEFFF9'
      case 'E':
        return '#DEFFF9'
      case 'F':
        return '#DEFFF9'
      case 'G':
        return '#DEFFF9'
      case 'H':
        return '#DEFFF9'
      case 'W':
        return '#DEFFF9'
      case 'Y':
        return '#DEFFF9'
      case '1':
        return '#FFEEF7'
      case '2':
        return '#F0EBFF'
      case '3':
        return '#FFFCEB'
      default:
        return ''
    }
  }
}
</script>

<style lang="scss" scoped>
$height: calc((100vh - 16.5vh - 6vmin - 12vmin) / 6);
$width: calc(
  (
      100vw - 8vw /**外枠 */ - 11vw /** 時限 */ - 12vw
        /** 科目+時限 padding */
    ) / 5
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
.sbj-number {
  font-weight: 400;
}
.sbj-name {
  font-weight: 700;
}
.sbj-classroom {
  font-weight: 400;
}
</style>
