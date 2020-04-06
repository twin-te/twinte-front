<template>
  <section @click="popUp()">
    <div id="subject" v-if="!table"></div>
    <!-- → 授業が入っていない -->

    <div id="subject" :style="setSubjectStyle()" v-else>
      <div v-if="display.lecture_code" class="sbj-lectureId">
        {{ table.lecture_code }}
      </div>
      <div v-if="display.lecture_name" class="sbj-name">
        {{ table.lecture_name }}
      </div>
      <div v-if="display.instructor" class="sbj-instructor">
        {{ table.instructor }}
      </div>
      <div v-if="display.room" class="sbj-room">{{ table.room }}</div>
    </div>
    <!-- → 授業が入っている -->
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import { Period } from '../types/index'
import { YEAR } from '../common/config'

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

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  @Prop() day!: number
  @Prop() period!: number
  @Prop() data!: Period | undefined
  @Prop() click!: string | undefined

  week: string[] = [Day.Mon, Day.Tue, Day.Wed, Day.Thu, Day.Fri]

  get display() {
    return this.$store.getters['visible/subject']
  }

  get table() {
    if (this.data) {
      return this.data
    }

    const periods = this.$store.getters['api/table']
    const module = this.module
    const week = this.week
    const day = this.day
    const period = this.period + 1

    const validPeriod = periods.find((lecture) => {
      return (
        (lecture.module === module || lecture.module === '通年') && // module
        week.indexOf(lecture.day) === day && // day
        lecture.period === period && // period
        lecture.year === YEAR
      )
    })
    return validPeriod
  }
  get module() {
    return this.$store.getters['table/module']
  }
  setSubjectStyle() {
    switch (this.display.font_size) {
      case 'small':
        return {
          background: this.getColor(this.table?.lecture_code),
          fontSize: '0.85rem',
          lineHeight: '1.4rem',
        }
      case 'medium':
        return {
          background: this.getColor(this.table?.lecture_code),
          fontSize: '1.03rem',
          lineHeight: '1.4rem',
        }
      default:
        'large'
        return {
          background: this.getColor(this.table?.lecture_code),
          fontSize: '1.2rem',
          lineHeight: '1.6rem',
        }
    }
  }
  chDetail(period: Period) {
    this.$store.dispatch('table/setPeriod', { period })
    this.$store.commit('visible/chDetail', { display: true })
  }
  chAdd() {
    this.$store.commit('visible/chAdd', { display: true })
  }
  popUp() {
    if (this.click === 'disable') {
      return
    }
    // 設定画面ではclickできない

    if (this.table) {
      this.chDetail(this.table)
    } else {
      this.chAdd()
    }
  }
  /** 授業に応じたテーマ色を返す */
  getColor(number: string | undefined): string {
    if (!number) {
      return '#EEEEEE'
    }
    // → カスタム授業

    const char = number.substring(0, 1)
    switch (char) {
      case '1':
        return '#FFEEF7'
      case '2':
        return '#F0EBFF'
      case '3':
        return '#FFFCEB'
      default:
        return '#DEFFF9'
    }
  }
}
</script>

<style lang="scss" scoped>
$height: calc((100vh - 16.5vh - 6vmin - 12vmin) / 6);
$width: calc(
  (100vw - 8vw /**外枠 */ - 11vw /** 時限 */ - 12vw /** 科目+時限 padding */) /
    5
);
/* 科目 */
#subject {
  color: #555;
  width: $width;
  height: $height;
  padding: 1vmin 1vw;
  word-break: break-all;
  font-style: normal;
  font-weight: 700;
  overflow: hidden;
  &:active {
    transition: all 0.3s;
    filter: brightness(150%);
  }
}
.sbj-lectureId {
  font-weight: 400;
}
.sbj-name {
  font-weight: 700;
}
.sbj-instructor {
  font-weight: 400;
}
.sbj-room {
  font-weight: 400;
}
</style>
