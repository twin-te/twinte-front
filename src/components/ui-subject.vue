<template>
  <div class="subject" @click="popUp()" v-if="!table"></div>
  <!-- → 授業が入っていない -->

  <div class="subject" @click="popUp()" v-else :style="setSubjectStyle()">
    <div v-if="display.lecture_code" class="subject--lectureId">
      {{ table.lecture_code }}
    </div>
    <div v-if="display.lecture_name" class="subject--name">
      {{ table.lecture_name }}
    </div>
    <div v-if="display.instructor" class="subject--instructor">
      {{ table.instructor }}
    </div>
    <div v-if="display.room" class="subject--room">
      {{ table.room }}
    </div>
  </div>
  <!-- → 授業が入っている -->
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import { TimetableEntity } from '~/api/@types'
import { YEAR } from '../common/config'

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  // 曜日。休日は -1
  @Prop() day!: number
  // 時限
  @Prop() period!: number
  // day, period 指定の他にdataを直接入力できる仕様
  @Prop() data?: TimetableEntity
  // クリックして詳細が開かないように disableオプションを用意
  @Prop() click?: 'disable'
  @Prop() moduleProp?: string

  week: string[] = ['日', '月', '火', '水', '木', '金', '土']

  // 表示設定の情報
  get display() {
    return this.$store.getters['visible/subject']
  }

  /**
   * day, period もしくは data を用いて
   * Periodを返す
   */
  get table() {
    if (this.data) {
      return this.data
    }

    // 休日
    if (this.day === -1) {
      return undefined
    }

    const periods = this.$store.getters['api/table']

    const validPeriod = periods.find((lecture) => {
      return (
        (lecture.module === this.module || lecture.module === '通年') && // module
        this.week.indexOf(lecture.day) === this.day && // day
        lecture.period === this.period && // period
        lecture.year === YEAR // 年度
      )
    })
    return validPeriod
  }

  // 学期を返す ex.春B
  get module() {
    return this.moduleProp ?? this.$store.getters['table/module']
  }

  // 表示設定オプションから適切な文字の大きさを返す
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

  // この授業の詳細モーダルを開く
  chDetail(period: TimetableEntity) {
    this.$store.dispatch('table/setPeriod', { period })
    this.$store.commit('visible/chDetail', { display: true })
  }

  // 新規追加モーダルを開く
  chAdd() {
    this.$store.commit('visible/chAdd', { display: true })
  }

  // クリックした時の挙動
  popUp() {
    // 設定画面ではclickできない
    if (this.click === 'disable') {
      return
    }

    this.table ? this.chDetail(this.table) : this.chAdd()
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
@import '~/assets/css/variable.scss';

/* 科目 */
.subject {
  height: 100%;
  box-sizing: border-box;
  word-break: break-all;
  font-style: normal;
  font-weight: 500;
  overflow: hidden;
  padding: 1.1vmin;
  &:active {
    transition: all 0.3s;
    filter: brightness(150%);
  }

  &--lectureId {
    color: $main-text-color;
    font-weight: 400;
  }
  &--name {
    color: $emphasis-text-color;
    font-weight: 600;
  }
  &--instructor {
    color: $main-text-color;
    font-weight: 400;
  }
  &--room {
    color: $main-text-color;
    font-weight: 400;
  }
}
</style>
