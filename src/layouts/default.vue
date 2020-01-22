<template ontouchstart="">
  <div>
    <Toolbar />
    <Navigation />
    <DialogAdd />
    <DialogDetail />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import * as Vuex from 'vuex';
// import { TimeTables } from "../types";
import { isLogin } from '../store/api/auth';
import Swal from 'sweetalert2';

@Component({
  components: {
    Toolbar: () => import('~/components/def-toolbar.vue'),
    Navigation: () => import('~/components/def-nav.vue'),
    DialogAdd: () => import('~/components/def-dialog-add.vue'),
    DialogDetail: () => import('~/components/def-dialog-detail.vue')
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;
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

    const loginState = await isLogin();
    if (loginState) {
      await this.$store.dispatch('api/login');
    } else {
      Swal.fire(
        'ようこそTwin:teへ',
        'Twin:teを利用するにはログインが必要です。<br>⚙からログインして下さい。',
        'info'
      );
    }

    const table = localStorage.getItem('table');
    if (table) {
      // const periodDatas: TimeTables = JSON.parse(table);
      // this.$store.commit("API/SET_TABLE", { periodDatas });
      // this.$store.commit("API/LOGIN");
    }
    // → 時間割データ

    const module = localStorage.getItem('module');
    if (module) {
      this.$store.commit('table/setModule', { module });
    }
    // → 前回見ていた学期

    const subject = localStorage.getItem('subject');
    if (subject) {
      this.$store.commit('visible/setDisplaySubject', JSON.parse(subject));
    }
    // → 表示設定

    const loginFlag = localStorage.getItem('login');
    if (!loginFlag && loginState) {
      Swal.fire(
        'ログインできました',
        'ようこそTwin:teへ！➕ボタンをタップして時間割を登録してみましょう！',
        'success'
      );
      localStorage.setItem('login', 'true');
    }
    // → はじめてログインしたときのみ

    const query: any = this.$route.query;
    if (query) {
      const validPeriod = this.$store.getters['api/table'].find(lecture => {
        return lecture.user_lecture_id === query.user_lecture_id;
      });
      if (validPeriod) {
        await this.$store.dispatch('table/setPeriod', { period: validPeriod });
        this.$store.commit('visible/chDetail', { display: true });
      }
    }
    // → lectureパラメータがあればそのダイアログを表示

    document.documentElement.style.setProperty(
      '--outer-height',
      `${window.outerHeight}px`
    );
  }
}
</script>

<style lang="scss" scoped></style>
