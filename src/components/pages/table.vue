<template>
  <!-- tableタグ内で利用 時間割データの一部を受け取る -->
  <table>
    <thead>
      <tr>
        <td>今日</td>
        <td v-for="n in 6" :key="n">{{ week[n-1] }}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="m in 6" :key="m">
        <td v-for="n in 6" :key="n">
          <div v-if="n==1">{{m}}限</div>
          <div :style="{background: getColor}" v-else>{{ data[semester][n-2][m-1].name }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import data from "~/assets/data.json";

@Component
export default class Index extends Vue {
  @Prop()
  semester: number;
  /** data() */
  public data: any = data;
  public week: string[] = ["月", "火", "水", "木", "金"];

  /** computed() */
  /**
   * today
   */
  public get today(): object {
    const date = new Date();
    console.dir(date);
    const today = {};
    return today;
  }
    /**
   * getColor
   * @description その授業として適切な色を返す
   * @todo 引数を渡せるようにしないといけない
   */
  public get getColor(): string {
    const number: string = "1";
    const char: string = number.split('')[0]
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

<style lang="sass" scoped>
div
  width: 48.25px
  height: 75.68px
  word-break: break-all
  font-style: normal
  font-weight: 600
  font-size: 9px
  line-height: 12px
  color: #555555
  padding: 5px
table
  position: absolute
  width: 347px
  height: 536px
  left: 14px
  top: 116px
tbody
  box-shadow: 3px 3px 16px rgba(147, 147, 147, 0.25)
  border-radius: 10px
</style>
