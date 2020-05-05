<template>
  <!-- 時間割の日時 -->
  <section class="cal">
    <div class="cal__month">{{ today.month }}月</div>
    <div class="cal__day">{{ today.day }}</div>
    <div class="cal__week">({{ today.week }})</div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

type Today = { month: number | null; day: number | null; week: string | null }

@Component({})
export default class Index extends Vue {
  today: Today = {
    month: null,
    day: null,
    week: null,
  }

  mounted() {
    const date = new Date()
    const weeks = ['日', '月', '火', '水', '木', '金', '土']
    this.today = {
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: weeks[date.getDay()],
    }
  }
}
</script>

<style lang="scss" scoped>
.cal {
  position: absolute;
  box-shadow: 0.2rem 0.2rem 1.2rem rgba(0, 0, 0, 0.123);
  border-radius: 1vh;
  height: 6.7vh;
  width: 6.5vh;
  left: 4.5vw;
  top: -3.7vh;

  &__month {
    background: #00c0c0;
    color: #fcfcfc;
    font-size: 1.5vh;
    text-align: center;
    line-height: 2vh;
  }
  &__day {
    color: #9a9a9a;
    font-size: 2.6vh;
    text-align: center;
    line-height: 2.5vh;
  }
  &__week {
    color: #9a9a9a;
    font-size: 1.4vh;
    text-align: center;
    line-height: 2.1vh;
  }
}
</style>
