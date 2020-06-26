<template>
  <!--
   * 時間割カード
   *
   * height 65vh x width 69vw
   * period: 時限, day: 曜日
   *
   * 授業内容は ./ui-subject.vue を参照
  -->
  <transition :name="moveDirection === 'left' ? 'slide-l' : 'slide-r'">
    <content class="row" v-show="visible">
      <!-- 時限 -->
      <section class="column">
        <div
          class="time"
          v-for="i in 6"
          :key="i"
          :style="{ background: i % 2 === 0 ? '#F3F3F3' : '#F8F8F8' }"
        >
          {{ i }}
          <p>{{ timeTable[i - 1][0] }}</p>
          <p class="tilde">~</p>
          <p>{{ timeTable[i - 1][1] }}</p>
        </div>
      </section>

      <!-- 授業 -->
      <section class="row">
        <!-- 日: 0, 月: 1, 火: 2, 水: 3, 木: 4, 金: 5, 土: 6 -->
        <div v-for="date in weekCalender" :key="date.date" class="column">
          <div v-for="period in 6" :key="period">
            <Subject
              :day="date.day"
              :period="period"
              :moduleProp="date.module"
            />
          </div>
        </div>
      </section>
    </content>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import { getSchoolCalender } from '../api/school-calender'

@Component({
  components: {
    Subject: () => import('~/components/ui-subject.vue'),
  },
})
export default class Index extends Vue {
  $store!: Vuex.ExStore
  timeTable = [
    ['8:40', '9:55'],
    ['10:10', '11:25'],
    ['12:15', '13:30'],
    ['13:45', '15:00'],
    ['15:15', '16:30'],
    ['16:45', '18:00'],
  ]
  weekCalender: { module: string; day: number; date: string }[] = []

  // 日: 0, 月: 1, 火: 2, 水: 3, 木: 4, 金: 5, 土: 6
  week2num(week: string) {
    const w = ['日', '月', '火', '水', '木', '金', '土']
    return w.indexOf(week)
  }

  async mounted() {
    const now = this.$dayjs()

    // [日, 月, 火, 水, 木, 金, 土] の日時
    // ['2020-5-18', '2020-5-19', '2020-5-20', '2020-5-21', '2020-5-22']
    const weeks = ['日', '月', '火', '水', '木', '金', '土']
      .map(this.week2num)
      .map((index) => now.day(index).format('YYYY-MM-DD'))

    // {
    //   date: "2020-06-14"
    //   day: 0 ← 日曜日の時間割
    //   module: "春B"
    // }
    this.weekCalender = (await Promise.all(weeks.map(getSchoolCalender)))
      .map(({ data: d }, i) => ({
        module: d.module,
        day: d.substituteDay ? this.week2num(d.substituteDay.change_to) : i,
        date: weeks[i],
      }))
      .slice(1, 6)

    // 今週の曜日を出力
    console.log(this.weekCalender)
  }

  get visible() {
    return this.$store.getters['visible/table'].display
  }
  get moveDirection() {
    return this.$store.getters['visible/table'].move
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/variable.scss';

$height: calc((100vh - 16.5vh - 6vmin - 12vmin) / 6);
$width: calc((100vw - 8vw - 11vw - 12vw) / 5);

//++++++++++++++++++++++++// 時間割表の枠 //++++++++++++++++++++++++//
content {
  position: relative;
  margin: 2vmin 2vw;
  padding: 2vmin 2vw;
  box-shadow: $large-shadow;
  border-radius: 10px;
}

//+++++++++++++++++++// 以下時間割の内容（中身） //++++++++++++++++++//

/* 縦横の整列 */
.row {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
}

/* 時限 */
.time {
  width: 11vw;
  height: $height;
  font-style: normal;
  font-weight: 500;
  font-size: 1.9vh;
  line-height: 3vh;
  text-align: center;
  color: #9a9a9a;
  padding: 1vmin 1vw;
}

.column p {
  font-size: 1.65vh;
  line-height: 1vh;
  font-weight: 400;
}
.tilde {
  transform: rotate(90deg);
}

/* animation */
.slide-l-enter-active,
.slide-l-leave-active {
  transition: transform 0.2s ease;
}
.slide-l-enter {
  transform: translateX(-100%);
}
.slide-l-leave-to {
  transform: translateX(100%);
}

.slide-r-enter-active,
.slide-r-leave-active {
  transition: transform 0.2s ease;
}
.slide-r-enter {
  transform: translateX(100%);
}
.slide-r-leave-to {
  transform: translateX(-100%);
}
</style>
