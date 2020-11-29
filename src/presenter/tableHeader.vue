<template>
  <section class="table-header">
    <div class="table-header__module">
      <span
        class="table-header__icon material-icons btn-animation"
        @click="prevModule"
        >chevron_left</span
      >
      <span>{{ module }}</span>
      <span
        class="table-header__icon material-icons btn-animation"
        @click="nextModule"
        >chevron_right</span
      >
    </div>
    <div class="table-header__wrap">
      <Day class="table-header__week-cal"></Day>
      <section class="table-header__wrap--week">
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
    Day: () => import('~/components/day.vue'),
  },
})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  week: string[] = [Day.Mon, Day.Tue, Day.Wed, Day.Thu, Day.Fri]

  prevModule() {
    this.$store.commit('visible/chTable', { display: false, move: 'left' })
    setTimeout(() => {
      this.$store.commit('pageState/prevModule')
      this.$store.commit('visible/chTable', { display: true, move: 'left' })
    }, 250)
  }

  nextModule() {
    this.$store.commit('visible/chTable', { display: false, move: 'right' })
    setTimeout(() => {
      this.$store.commit('pageState/nextModule')
      this.$store.commit('visible/chTable', { display: true, move: 'right' })
    }, 250)
  }

  get module(): string {
    return this.$store.getters['pageState/module']
  }
}
</script>

<style lang="scss" scoped>
$week-width: calc(100vw - 8vmin - 11vw);

.table-header {
  box-sizing: border-box;
  height: 8.4vh;

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
    color: $sub-text-color;
    font-style: normal;
    font-weight: 400;
    font-size: 2.2vh;
    line-height: 4.6vh;
    width: 45vw;
    top: 0.5vh;
    left: 50%;
    transform: translateX(-50%);
  }
  &__wrap {
    position: relative;
    display: flex;
    height: 2.5vh;
    font-style: normal;
    font-weight: 400;
    font-size: 2vh;
    color: $sub-text-color;

    &--week {
      position: absolute;
      display: flex;
      width: $week-width;
      justify-content: space-around;
      left: calc(11vw + 4vmin);
      top: 0.6vh;
    }
  }
}
</style>
