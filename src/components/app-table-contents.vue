/** -> "../pages/index.vue" */
<template>
  <!-- tableタグ内で利用 時間割データの一部を受け取る -->
  <section class="row">
    <!-- 時限 -->
    <div class="column">
      <div
        id="time"
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
            <ripple @click="chDetail">
              <transition name="fade">
                <div
                  id="subject"
                  :style="{
                    background: getColor(data[module][n - 1][m - 1].number)
                  }"
                >
                  <div>
                    <div style="font-size: 9px">
                      {{ data[module][n - 1][m - 1].number | if(data[module] === null) return "" }}
                    </div>
                    <div style="font-size: 8px">
                      {{ data[module][n - 1][m - 1].name | if(data[module] === null) return "" }}
                    </div>
                    <div style="font-size: 9px">
                      {{ data[module][n - 1][m - 1].classroom | if(data[module] === null) return "" }}
                    </div>
                  </div>
                </div>
              </transition>
            </ripple>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

@Component({
  components: {
    ripple: () => import("~/components/ui-ripple.vue")
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  chDetail(): void {
    //TODO nとmを取り出す
    this.$store.commit("visible/chDetail", { bool: true });
  }

  /** data() */

  get data() {
    return this.$store.getters["old_api/data"];
  }

  /** 現在の学期 */
  get module() : number {
    return this.$store.getters["table/moduleNum"];
  }

  /**
   * getColor
   * @description その授業として適切な色を返す
   * @param 授業番号
   */
  getColor(number: string): string {
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
$height: calc((100vh - 43px - 58px - 40px) / 6)
$width: calc((100vw - 48px - 13vw) / 5)

section
  margin-left: 14px
  margin-right: 14px
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
#time
  width: 13vw
  height: $height
  font-style: normal
  font-weight: 600
  font-size: 11px
  line-height: 15px
  text-align: center
  color: #9A9A9A
#subject
  width: $width
  height: $height
  word-break: break-all
  font-style: normal
  font-weight: 600
  font-size: 9px
  line-height: 12px

/** animation */
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
