<template ontouchstart="">
  <div class="main" @keyup.esc="closeAll()" tabindex="0">
    <Toolbar />
    <Navigation />
    <ModalAdd />
    <ModalAddCustom />
    <Information />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
// import { TimeTables } from "../types";
import { isLogin } from '../store/api/auth'
import Swal from 'sweetalert2'
import { getSchoolCalender } from '../api/school-calender'

@Component({
  components: {
    Toolbar: () => import('~/components/def-toolbar.vue'),
    Navigation: () => import('~/components/def-nav.vue'),
    ModalAdd: () => import('~/components/def-modal-add.vue'),
    ModalAddCustom: () => import('~/components/def-modal-add-custom.vue'),
    Information: () => import('~/components/def-modal-information.vue'),
  },
})
export default class Index extends Vue {
  $store!: Vuex.ExStore
  async mounted() {
    /**
     * ローカルデータの読み込み
     *
     * | ローカルデータがあるか確認
     * | ↓
     * | storeに格納
     *
     * の処理をここで行う
     *
     */

    const loginState = await isLogin()
    if (loginState) {
      await this.$store.dispatch('api/login')
    } else {
      Swal.fire(
        'ようこそTwin:teへ',
        'Twin:teを利用するにはログインが必要です。<br>⚙からログインして下さい。',
        'info'
      )
    }

    const table = localStorage.getItem('table')
    if (table) {
      // const periodDatas: TimeTables = JSON.parse(table);
      // this.$store.commit("API/SET_TABLE", { periodDatas });
      // this.$store.commit("API/LOGIN");
    }
    // → 時間割データ

    const module = localStorage.getItem('module')
    if (module) {
      this.$store.commit('table/setModule', { module })
    }
    // → 前回見ていた学期

    const subject = localStorage.getItem('subject')
    if (subject) {
      this.$store.commit('visible/setDisplaySubject', JSON.parse(subject))
    }
    // → 表示設定

    const loginFlag = localStorage.getItem('login')
    if (!loginFlag && loginState) {
      Swal.fire(
        'ログインできました',
        'ようこそTwin:teへ！➕ボタンをタップして時間割を登録してみましょう！',
        'success'
      )
      localStorage.setItem('login', 'true')
    }
    // → はじめてログインしたときのみ

    const query: any = this.$route.query
    if (query) {
      const validPeriod = this.$store.getters['api/table'].find((lecture) => {
        return lecture.user_lecture_id === query.user_lecture_id
      })
      if (validPeriod) {
        await this.$store.dispatch('table/setPeriod', { period: validPeriod })
        this.$store.commit('visible/chDetail', { display: true })
      }
    }
    // → lectureパラメータがあればそのダイアログを表示

    const cal = await getSchoolCalender(this.$dayjs().format('YYYY-MM-DD'))
    if (cal.data.substituteDay) {
      Swal.fire({
        toast: true,
        text: `今日は${cal.data.substituteDay.change_to}曜日課です`,
        position: 'bottom-left',
        showConfirmButton: false,
        icon: 'info',
        timer: 6000,
      })
    }

    document.documentElement.style.setProperty(
      '--outer-height',
      `${window.outerHeight}px`
    )
  }

  closeAll() {
    this.$store.commit('visible/chDrawer', { display: false })
    this.$store.commit('visible/chDetail', { display: false })
    this.$store.commit('visible/chAdd', { display: false })
    this.$store.commit('visible/chInfo', { display: false })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variable.scss';

.main:focus {
  outline: none;
}
</style>
