<template>
  <!--
   * 時間割カード
   *
   * period: 時限, day: 曜日
   *
   * 授業内容は ./ui-subject.vue を参照
  -->
  <transition :name="moveDirection === 'left' ? 'slide-l' : 'slide-r'">
    <content class="timetable-panel" v-show="visible">
      <!-- 時限 -->
      <div class="timetable-panel__times-wrap">
        <section
          class="timetable-panel__times"
          v-for="i in 6"
          :key="i"
          :style="{ background: i % 2 === 0 ? '#F3F3F3' : '#F8F8F8' }"
        >
          {{ i }}
          <p>{{ timeTable[i - 1][0] }}</p>
          <p class="timetable-panel__times--tilde">~</p>
          <p>{{ timeTable[i - 1][1] }}</p>
        </section>
      </div>

      <!-- 授業 -->
      <section class="timetable-panel__subjects-wrap">
        <!-- 日: 0, 月: 1, 火: 2, 水: 3, 木: 4, 金: 5, 土: 6 -->
        <div v-for="(date, i) in weekCalender" :key="i">
          <Subject
            :day="date.day"
            :period="date.period"
            :moduleProp="date.module"
          />
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
    //   period: 3 ← 3限
    // }
    // fixme
    const calender = await Promise.all(weeks.map(getSchoolCalender))
    this.weekCalender = calender
      .map(({ data: d }, i) => ({
        module: d.module,
        day: d.substituteDay ? this.week2num(d.substituteDay.change_to) : i,
        date: weeks[i],
      }))
      .slice(1, 6)
      .reduce(
        (sum: any[], cal) => [
          ...sum,
          ...[...Array(6).keys()].map((i) => ({ ...cal, period: i + 1 })),
        ],
        []
      )
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

.timetable-panel {
  position: relative;
  margin: 2vmin;
  padding: 2vmin;
  box-shadow: $large-shadow;
  border-radius: 0.5rem;
  display: flex;

  &__times-wrap {
    display: flex;
    flex-direction: column;
  }

  &__times {
    width: 11vw;
    font-style: normal;
    font-weight: 500;
    font-size: 1.9vh;
    line-height: 3vh;
    text-align: center;
    color: #9a9a9a;
    padding: 1vmin 1vw;
    p {
      font-size: 1.65vh;
      line-height: 1vh;
      font-weight: 400;
    }
    &--tilde {
      transform: rotate(90deg);
    }
  }

  &__subjects-wrap {
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }
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
