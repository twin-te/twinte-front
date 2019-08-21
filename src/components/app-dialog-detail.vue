/** -> "../pages/index.vue" */
<template>
  <!-- 科目詳細画面 -->
  <section class="contents">
    <transition name="bound">
      <nav class="main" v-if="dialog">
        <article style="padding: 25px">
          <!-- 教科名 -->
          <!-- <x> -->
          <div class="svg-button" @click="chDetail()">
            <svg
              id="close"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z"
                fill="#9A9A9A"
              />
            </svg>
          </div>
          <section
            style="padding-left: 9px; margin-top: 14px; border-left: 5px solid #00C0C0; text-overflow: ellipsis;overflow: hidden; white-space: nowrap; text-overflow: ellipsis"
          >
            <section style="color: #555555;font-size: 21px;">
              {{ table.name }}
            </section>
            <section style="color: #C4C4C4;font-size: 12px;">
              科目番号 {{ table.number }}
            </section>
          </section>
          <!-- 科目詳細 -->
          <section>
            <div
              style="display: flex; width: 100%; justify-content: space-between; margin-top: 26px; border-bottom: 1px solid #00C0C0; font-size: 14px"
            >
              <div style="color: #00C0C0">
                <!-- <i> -->
                <svg
                  class="same-v"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0339 3.33333C5.72599 3.33333 2.22974 6.81777 2.22974 11.1111C2.22974 15.4044 5.72599 18.8889 10.0339 18.8889C14.3418 18.8889 17.838 15.4044 17.838 11.1111C17.838 6.81777 14.3418 3.33333 10.0339 3.33333ZM10.8143 15H9.25347V10.3333H10.8143V15ZM10.8143 8.77777H9.25347V7.22222H10.8143V8.77777Z"
                    fill="#00C0C0"
                  />
                </svg>
                <div class="same-v">科目詳細</div>
              </div>
              <div style="color: #C4C4C4">シラバス</div>
            </div>
            <div style="margin-top: 10px; margin-left: 21px; line-height: 28px">
              <div>
                <span style="font-weight: 500">担当教員</span
                ><span
                  style="position: relative; left: 30px; color: #555555; font-weight: normal"
                  >{{ table.teacher }}
                </span>
              </div>
              <div>
                <span style="font-weight: 500">開講時限</span
                ><span
                  style="position: relative; left: 30px; color: #555555; font-weight: normal"
                  >{{ table.season }} {{ table.time }}</span
                >
              </div>
              <div>
                <span style="font-weight: 500">教室 </span
                ><span
                  style="position: relative; left: 30px; color: #555555; font-weight: normal"
                  >{{ table.classroom }}
                </span>
              </div>
            </div>
          </section>
          <!-- メモ -->
          <section>
            <div
              style="width: 100%; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #00C0C0;　color: #00C0C0; font-size: 14px; line-height: 20px"
            >
              <!-- <✐> -->
              <svg
                class="same-v"
                width="15"
                height="13"
                viewBox="0 0 15 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.0101929 10.292V13H2.93634L11.5665 5.01333L8.64038 2.30537L0.0101929 10.292ZM13.8294 2.91918C14.1337 2.63755 14.1337 2.18261 13.8294 1.90099L12.0035 0.211221C11.6992 -0.0704069 11.2076 -0.0704069 10.9033 0.211221L9.4753 1.5327L12.4015 4.24066L13.8294 2.91918Z"
                  fill="#00C0C0"
                />
              </svg>
              <div class="same-v">メモ</div>
            </div>
            <!-- 入力の枠 -->
            <div
              style="margin-bottom: 8px; margin-left: 10px; margin-right: 10px"
            >
              <input
                type="text"
                style="width: 100%; height: 85px; border: 1px solid #DDDDDD; box-sizing: border-box; border-radius: 8px;"
              />
            </div>
            <div
              style="display: flex; justify-content: space-between; margin-bottom: 12px; margin-left: 10px; margin-right: 10px"
            >
              <div
                v-for="n in 3"
                :key="n"
                :class="{ one: n === 1, two: n === 2, three: n === 3 }"
                style="width: 30%"
              >
                <span
                  style="font-family: Noto Sans JP; font-style: normal; font-weight: 500; font-size: 13px; line-height: 19px; text-align: center; color: #555555"
                  >{{ atmnb[n - 1] }} {{ count[n - 1] }}回</span
                >
                <!-- <+|-> -->
                <div style="display: flex; margin-bottom: 15px">
                  <span
                    @click=""
                    style="width: 50%; border: 1px solid #00C0C0; border-radius: 20px 0 0 20px; height: 30px"
                    >+</span
                  >
                  <span
                    @click=""
                    style="width: 50%; border: 1px solid #00C0C0; border-radius: 0 20px 20px 0; height: 30px;position: relative; left: -1px"
                    >-</span
                  >
                </div>
              </div>
            </div>
          </section>

          <section
            style="width: 100%; height: 40px; background: #00C0C0; border-radius: 7px; margin-bottom: 15px; position: relative"
          >
            <!-- 変更を保存 -->
            <span
              style="font-family: Noto Sans JP; font-style: normal; font-weight: 500; font-size: 16px; line-height: 23px; text-align: center; color: #FFFFFF; position: absolute; top: 50%; left: 50%; transform: translateY(-50%) translateX(-50%)"
              >変更を保存</span
            >
          </section>
          <section
            style="margin-buttom: 25px; font-family: Noto Sans JP; font-style: normal; font-weight: normal; font-size: 12px; line-height: 18px; color: #92B1FF"
          >
            <svg
              class="same-v"
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.99662 18H12.9561V4H0.99662V18ZM13.9527 1H10.4645L9.46789 0H4.48479L3.48817 1H0V3H13.9527V1Z"
                fill="#92B1FF"
              />
            </svg>
            <div class="same-v">この科目を削除</div>
          </section>
        </article>
      </nav>
    </transition>

    <!-- 全体を暗くする -->
    <transition name="fade">
      <nav class="back" @click="chDetail()" v-if="dialog"></nav>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
  //TODO implement these in store
  table: any = {
    number: "1A18011",
    name: "ネットワーク社会を支える情報技術入門I",
    season: "春AB",
    time: "月1",
    classroom: "3A306",
    teacher: "朴 泰祐"
  };
  atmnb: string[] = ["出席", "欠席", "遅刻"];
  count: number[] = [2, 2, 2];

  get dialog(): boolean {
    return this.$store.getters["visible/detail"];
  }

  chDetail(): void {
    this.$store.commit("visible/chDetail", { bool: false });
  }
}
</script>

<style lang="sass" scoped>
.same-v
  display: inline-block
  vertical-align: middle
/** 中央寄せ */
.center
  position: absolute
  top: 50%
  left: 50%
  transform: translateY(-50%) translateX(-50%)
.main
  position: absolute
  top: 73px
  left: 13px
  width: calc(100vw - 26px)
  height: calc(100vh - 128px)
  background: #FFFFFF
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2)
  border-radius: 10px
  z-index: 6
.back
  position: absolute
  width: 100vw
  height: 100vh
  left: 0px
  top: 0px
  background: rgba(100, 100, 100, 0.5)
  z-index: 5
#close
  float: right

.svg-button
  border: none
  background: none
  cursor: pointer
  &:focus
    outline: 2px dashed #17171D
  &:hover
    svg
      transform: scale(1.1)
  svg
    outline: none
    transition: transform 0.3s liner

.wrapper
  display: grid
  grid-template-columns: repeat(3, 1fr)
.one
  grid-column: 1
.two
  grid-column: 2
.three
  grid-column: 3

/** animation */
.bound-enter-active, .bound-leave-active
  transition: all .2s ease
.bound-enter, .bound-leave-to
  transform: scale(.5)
  opacity: 0
.fade-enter-active, .fade-leave-active
  transition: all .3s ease
.fade-enter, .fade-leave-to
  opacity: 0
</style>
