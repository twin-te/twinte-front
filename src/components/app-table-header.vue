<template>
  <section class="table-header">
    <div class="table-header__module">
      <span
        class="table-header__icon material-icons svg-button"
        @click="prevModule"
        >chevron_left</span
      >
      <span>{{ module }}</span>
      <span
        class="table-header__icon material-icons svg-button"
        @click="nextModule"
        >chevron_right</span
      >
    </div>
    <div class="table-header__week">
      <day class="table-header__week-cal"></day>
      <section class="table-header__week-wrapper">
        <div v-for="n in 5" :key="n">{{ week[n - 1] }}</div>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'

enum Day {
  Sun = '日',
  Mon = '月',
  Tue = '火',
  Wed = '水',
  Thu = '木',
  Fri = '金',
  Sat = '土',
  Unknown = '不明',
}

@Component({
  components: {
    Day: () => import('~/components/ui-day.vue'),
  },
})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  week: string[] = [Day.Mon, Day.Tue, Day.Wed, Day.Thu, Day.Fri]

  prevModule() {
    this.$store.commit('visible/chTable', { display: false, move: 'left' })
    setTimeout(() => {
      this.$store.commit('table/prevModule')
      this.$store.commit('visible/chTable', { display: true, move: 'left' })
    }, 250)
  }

  nextModule() {
    this.$store.commit('visible/chTable', { display: false, move: 'right' })
    setTimeout(() => {
      this.$store.commit('table/nextModule')
      this.$store.commit('visible/chTable', { display: true, move: 'right' })
    }, 250)
  }

  get module(): string {
    return this.$store.getters['table/module']
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variable.scss';

$week-width: calc(
  100vw - 8vw /*contentのmargin+padding*/ - 13vw /*timeのwidth+padding*/
);

.table-header {
  &__icon {
    display: block;
    width: 15vw;
    font-size: 4.6vh;
    text-align: center;
  }
  &__module {
    position: relative;
    display: flex;
    justify-content: space-between;
    font-family: Noto Sans JP;
    color: #9a9a9a;
    font-style: normal;
    font-weight: 400;
    font-size: 2.2vh;
    line-height: 4.6vh;
    width: 45vw;
    top: 0.5vh;
    left: 50%;
    transform: translateX(-50%);
  }
  &__week {
    position: relative;
    display: flex;
    width: 87vw;
    height: 2.5vh;
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: 400;
    font-size: 2vh;
    color: #9a9a9a;

    &-wrapper {
      position: absolute;
      display: flex;
      width: $week-width;
      justify-content: space-around;
      left: calc(13vw + 4vw);
      top: 0.6vh;
    }
  }
}
</style>
