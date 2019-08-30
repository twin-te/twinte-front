/** -> "../pages/index.vue" */
<template>
  <!-- 高さ 43px -->
  <section>
    <div id="module">
      <span class="material-icons svg-button" @click="prevModule"
        >chevron_left</span
      >
      <span>{{ module }}</span>
      <span class="material-icons svg-button" @click="nextModule"
        >chevron_right</span
      >
    </div>
    <div id="week">
      <app-day id="day"></app-day>
      <section class="week-wrapper">
      <div v-for="n in 5" :key="n">{{ week[n - 1] }}</div>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'

@Component({
  components: {
    AppDay: () => import('~/components/app-day.vue'),
  },
})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  week: string[] = ['月', '火', '水', '木', '金']

  prevModule() {
    this.$store.commit('table/prevModule')
  }

  nextModule() {
    this.$store.commit('table/nextModule')
  }

  get module(): string {
    const num: number = this.$store.getters['table/moduleNum']
    const moduleListJp: string[] = ['春A', '春B', '春C', '秋A', '秋B', '秋C']
    return moduleListJp[num]
  }
}
</script>

<style lang="scss" scoped>
$week-width: calc(100vw - 20px - 20px - 13vw);

#module {
  position: absolute;
  display: flex;
  font-family: Noto Sans JP;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  height: 32px;
  width: 35vw;
  color: #9A9A9A;
  justify-content: space-between;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
}
#week {
  position: absolute;
  display: flex;
  width: 87vw;
  height: 30px;
  line-height: 27px;
  font-family: Noto Sans JP;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: #9A9A9A;
  top: 90px;
}
#day {
  position: relative;
  top: -28px;
}
.week-wrapper {
  position: absolute;
  display: flex;
  width: $week-width;
  justify-content: space-around;
  left: calc(13vw + 20px);
}
</style>
