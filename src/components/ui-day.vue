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
@import '~/assets/css/variable.scss';

.cal {
  position: absolute;
  box-shadow: $small-shadow;
  border-radius: 1vh;
  height: 6.7vh;
  width: 6.5vh;
  left: 4.5vw;
  top: -3.7vh;

  &__month {
    background: $primary-color;
    color: #fff;
    font-size: 1.5vh;
    text-align: center;
    line-height: 2vh;
  }
  &__day {
    color: $sub-text-color;
    font-size: 2.6vh;
    text-align: center;
    line-height: 2.5vh;
  }
  &__week {
    color: $sub-text-color;
    font-size: 1.4vh;
    text-align: center;
    line-height: 2.1vh;
  }
}
</style>
