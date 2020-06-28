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
      <div class="timetable-panel__subjects-wrap">
        <section v-for="subjectIndex in 30" :key="subjectIndex">
          <!-- 日: 0, 月: 1, 火: 2, 水: 3, 木: 4, 金: 5, 土: 6 -->
          <Subject
            :day="subject(subjectIndex).day"
            :period="subject(subjectIndex).period"
          />
        </section>
      </div>
    </content>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'

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
  subject(num: number) {
    const day = Math.floor(num / 6 + 1)
    const period = num % 6
    return {
      day,
      period,
    }
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
  box-sizing: border-box;
  height: 82vh;
  position: relative;
  margin: 0 2vmin 2vmin;
  padding: 2vmin;
  box-shadow: $large-shadow;
  border-radius: 0.5rem;
  display: flex;

  &__times-wrap {
    display: flex;
    flex-direction: column;
  }

  &__times {
    height: 100%;
    width: 11vw;
    font-style: normal;
    font-weight: 500;
    font-size: 1.9vh;
    line-height: 3vh;
    text-align: center;
    color: #9a9a9a;
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
    display: block;
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(6, calc(calc(82vh - 4vmin) / 6));
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
