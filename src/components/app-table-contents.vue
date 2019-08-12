<template>
  <!-- tableタグ内で利用 時間割データの一部を受け取る -->
  <section class="row">
    <!-- 時限 -->
    <div class="column">
      <div
        class="time"
        v-for="i in 6"
        :key="i"
        :style="{ background: i % 2 === 0 ? '#F3F3F3' : '#F8F8F8' }"
      >
        {{ i }}
      </div>
    </div>

    <!-- 授業 -->
    <div class="column">
      <div v-for="m in 6" :key="m">
        <div class="row">
          <div v-for="n in 5" :key="n">
            <ripple @click="chDialog">
              <div
                class="subject"
                :style="{
                  background: getColor(data[semester][n - 1][m - 1].number)
                }"
              >
                <div style="font-size: 9">
                  {{ data[semester][n - 1][m - 1].number }}
                </div>
                <div style="font-size: 9">
                  {{ data[semester][n - 1][m - 1].name }}
                </div>
                <div style="font-size: 9">
                  {{ data[semester][n - 1][m - 1].classroom }}
                </div>
              </div>
            </ripple>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

@Component({
  components: {
    ripple: () => import("~/components/ui-ripple.vue")
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  @Prop({ required: true })
  semester!: number;

  chDialog(): void {
    //TODO nとmを取り出す
    this.$store.commit("visible/chDialog", { bool: true });
  }

  /** data() */
  /** jsonの読み込みがミスするので臨時, 多分tsconfigとかそこら辺の設定 */
  /* eslint-disable */
  data: any = [
    [
      [{ number: "1A18011", name: "ネットワーク社会を支える情報技術入門I", season: "春AB", time: "月1", classroom: "3A306", teacher: "朴 泰祐" },{ number: "1B17031", name: "経営の科学I", season: "春AB", time: "月2", classroom: "3A204", teacher: "生稲 史彦,高野 祐一" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "31CH052", name: "English Integrated Skills I", season: "春AB", time: "月4", classroom: "CA509", teacher: "スタウト マイケル デンリー フランシス" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" }],
      [{ number: "GB10114", name: "線形代数I", season: "春AB", time: "火1,2", classroom: "3B202", teacher: "建部 修見,保國 惠一" },{ number: "GB10114", name: "線形代数I", season: "春AB", time: "火1,2", classroom: "3B202", teacher: "建部 修見,保國 惠一" },{ number: "2133143", name: "基礎体育ニュースポーツ(春)", season: "春AB", time: "火3", classroom: "", teacher: "齊藤 武利" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "GB10615", name: "コンピュータリテラシ", season: "春AB", time: "火5,6\n金2", classroom: "3A416", teacher: "建部 修見,早瀬 康裕" },{ number: "GB10615", name: "コンピュータリテラシ", season: "春AB", time: "火5,6\n金2", classroom: "3A416", teacher: "建部 修見,早瀬 康裕"  }],
      [{ number: "GB10314", name: "解析学I", season: "春AB", time: "水1,2", classroom: "3A203", teacher: "古川 宏" },{ number: "GB10314", name: "解析学I", season: "春AB", time: "水1,2", classroom: "3A203", teacher: "古川 宏" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "GB00231", name: "化学A", season: "春ABC", time: "水5", classroom: "3A402", teacher: "中村 潤児" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" }],
      [{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "1118102", name: "フレッシュマン・セミナー", season: "春AB", time: "木2", classroom: "3A213", teacher: "古川 宏" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "31AH052", name: "English Critical Reading Strategies I", season: "春AB", time: "木4", classroom: "CA304", teacher: "長谷部 郁子" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" }],
      [{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "GB10615", name: "コンピュータリテラシ", season: "春AB", time: "火5,6\n金2", classroom: "3A416", teacher: "建部 修見,早瀬 康裕" },{ number: "GB11214", name: "力学", season: "春AB", time: "金3,4", classroom: "3A416", teacher: "合原 一究,滝沢 穂高" },{ number: "GB11214", name: "力学", season: "春AB", time: "金3,4", classroom: "3A416", teacher: "合原 一究,滝沢 穂高" },{ number: "31BH052", name: "English Intercultural Communication I", season: "春AB", time: "金5", classroom: "1B208", teacher: "清水 知子" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" }]
    ],
    [
      [{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" }],
      [{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他" },{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他" },{ number: "GB10664", name: "プログラミング入門A", season: "春C", time: "火3-5", classroom: "3A403", teacher: "前田 敦司" },{ number: "GB10664", name: "プログラミング入門A", season: "春C", time: "火3-5", classroom: "3A403", teacher: "前田 敦司" },{ number: "GB10664", name: "プログラミング入門A", season: "春C", time: "火3-5", classroom: "3A403", teacher: "前田 敦司" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" }],
      [{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "GB00231", name: "化学A", season: "春ABC", time: "水5", classroom: "3A402", teacher: "中村 潤児" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" }],
      [{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他" },{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他" },{ number: "GB11814", name: "コンピュータ数学", season: "春C", time: "木3,4", classroom: "3A202", teacher: "櫻井 鉄也,多田野 寛人,今倉 暁" },{ number: "GB11814", name: "コンピュータ数学", season: "春C", time: "木3,4", classroom: "3A202", teacher: "櫻井 鉄也,多田野 寛人,今倉 暁" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" }],
      [{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他" },{ number: "GB10981", name: "情報科学概論I", season: "春C", time: "火・木1,2\n金3,4", classroom: "3A403", teacher: "滝沢,保國,山際 他" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" },{ number: "", name: "", season: "", time: "", classroom: "", teacher: "" }]
    ]
  ];

  /**
   * getColor
   * @description その授業として適切な色を返す
   * @param 授業番号
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
      default:  return "";
    }
  }
}
</script>

<style lang="sass" scoped>
section
  position: absolute
  width: 327px
  height: 516px
  left: 14px
  top: 116px
  padding: 10px
  box-shadow: 3px 3px 16px rgba(147, 147, 147, 0.25)
  border-radius: 10px
.row
  display: flex
  flex-direction: row
.column
  display: flex
  flex-direction: column
div
  color: #555555
.time
  width: 42px
  height: 73px
  font-style: normal
  font-weight: 600
  font-size: 11px
  line-height: 15px
  text-align: center
  color: #9A9A9A
  padding-top: 13px
.subject
  width: 47px
  height: 76px
  word-break: break-all
  font-style: normal
  font-weight: 600
  font-size: 9px
  line-height: 12px
  padding: 5px
</style>
