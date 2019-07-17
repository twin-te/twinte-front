<template>
  <!-- tableタグ内で利用 時間割データの一部を受け取る -->
  <table>
    <tbody>
      <tr v-for="m in 6" :key="m">
        <td v-for="n in 6" :key="n">
          <div v-if="n == 1" :style="{background: m%2===0?'#F3F3F3':'#F8F8F8'}">{{ m }}限</div>
          <div :style="{ background: getColor(data[semester][n - 2][m - 1].number) }" v-else>
            {{ data[semester][n - 2][m - 1].name }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
// ({
//   async asyncData() {
//     return {
//       data: process.env.data
//     }
//   }
// })
export default class Index extends Vue {
  @Prop({ type: Object, required: true })
  semester!: number;

  /** data() */
  /** jsonの読み込みがミスするので臨時 */
  public data: any = [
    [
      [{ number: "1A18011", name: "ネットワーク社会を支える情報技術入門I", season: "春AB", time: "月1", classroom: "3A306", teacher: "朴 泰祐"},{ number: "1B17031", name: "経営の科学I", season: "春AB", time: "月2", classroom: "3A204", teacher: "生稲 史彦,高野 祐一"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "31CH052", name: "English Integrated Skills I", season: "春AB", time: "月4", classroom: "CA509", teacher: "スタウト マイケル デンリー フランシス"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" } ],
      [{ number: "GB10114", name: "線形代数I", season: "春AB", time: "火1,2", classroom: "3B202", teacher: "建部 修見,保國 惠一"},{ number: "GB10114", name: "線形代数I", season: "春AB", time: "火1,2", classroom: "3B202", teacher: "建部 修見,保國 惠一"},{ number: "2133143", name: "基礎体育ニュースポーツ(春)", season: "春AB", time: "火3", classroom: "", teacher: "齊藤 武利"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "GB10615", name: "コンピュータリテラシ", season: "春AB", time: "火5,6\n金2", classroom: "3A416", teacher: "建部 修見,早瀬 康裕"},{ number: "GB10615", name: "コンピュータリテラシ", season: "春AB", time: "火5,6\n金2", classroom: "3A416", teacher: "建部 修見,早瀬 康裕" } ],
      [{ number: "GB10314", name: "解析学I", season: "春AB", time: "水1,2", classroom: "3A203", teacher: "古川 宏"},{ number: "GB10314", name: "解析学I", season: "春AB", time: "水1,2", classroom: "3A203", teacher: "古川 宏"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "GB00231", name: "化学A", season: "春ABC", time: "水5", classroom: "3A402", teacher: "中村 潤児"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" } ],
      [{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "1118102", name: "フレッシュマン・セミナー", season: "春AB", time: "木2", classroom: "3A213", teacher: "古川 宏"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "31AH052", name: "English Critical Reading Strategies I", season: "春AB", time: "木4", classroom: "CA304", teacher: "長谷部 郁子"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" } ],
      [{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "GB10615", name: "コンピュータリテラシ", season: "春AB", time: "火5,6\n金2", classroom: "3A416", teacher: "建部 修見,早瀬 康裕"},{ number: "GB11214", name: "力学", season: "春AB", time: "金3,4", classroom: "3A416", teacher: "合原 一究,滝沢 穂高"},{ number: "GB11214", name: "力学", season: "春AB", time: "金3,4", classroom: "3A416", teacher: "合原 一究,滝沢 穂高"},{ number: "31BH052", name: "English Intercultural Communication I", season: "春AB", time: "金5", classroom: "1B208", teacher: "清水 知子"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" } ]
    ],
    [
      [{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" } ],
      [{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他"},{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他"},{ number: "GB10664", name: "プログラミング入門A", season: "春C", time: "火3-5", classroom: "3A403", teacher: "前田 敦司"},{ number: "GB10664", name: "プログラミング入門A", season: "春C", time: "火3-5", classroom: "3A403", teacher: "前田 敦司"},{ number: "GB10664", name: "プログラミング入門A", season: "春C", time: "火3-5", classroom: "3A403", teacher: "前田 敦司"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" } ],
      [{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "GB00231", name: "化学A", season: "春ABC", time: "水5", classroom: "3A402", teacher: "中村 潤児"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" } ],
      [{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他"},{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他"},{ number: "GB11814", name: "コンピュータ数学", season: "春C", time: "木3,4", classroom: "3A202", teacher: "櫻井 鉄也,多田野 寛人,今倉 暁"},{ number: "GB11814", name: "コンピュータ数学", season: "春C", time: "木3,4", classroom: "3A202", teacher: "櫻井 鉄也,多田野 寛人,今倉 暁"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" } ],
      [{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他"},{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他"},{ number: "", name: "", season: "", time: "", classroom: "", teacher: ""},{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" }]
    ]
  ];

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
  public getColor(number: string): string { 
    const char: string = number.split("")[0];
    switch (char) {
      case "A": return "#DEFFF9";
      case "B": return "#DEFFF9";
      case "C": return "#DEFFF9";
      case "E": return "#DEFFF9";
      case "F": return "#DEFFF9";
      case "G": return "#DEFFF9";
      case "H": return "#DEFFF9";
      case "W": return "#DEFFF9";
      case "Y": return "#DEFFF9";
      case "1": return "#FFEEF7";
      case "2": return "#F0EBFF";
      case "3": return "#FFFCEB";
      default : return "";
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
td
  padding: 0
table
  position: absolute
  width: 347px
  height: 536px
  left: 14px
  top: 116px
  border-spacing: 0
  border-collapse: separate
  webkit-border-horizontal-spacing: 0
  webkit-border-vertical-spacing: 0
tbody
  box-shadow: 3px 3px 16px rgba(147, 147, 147, 0.25)
  border-radius: 10px
</style>
