<template>
  <!--
    カスタム追加
  -->
  <Dialog :show="show" @close="close()">
    <h1 class="title">授業の追加</h1>
    <section class="custom-form">
      <form class="form" @submit.prevent>
        <input type="text" />
      </form>
    </section>
  </Dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'

@Component({
  components: {
    Dialog: () => import('~/components/global/dialog.vue'),
  },
})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  get show(): boolean {
    return this.$store.getters['visible/custom']
  }

  close() {
    this.$store.commit('visible/chCustom', { display: false })
  }

  /**
   * カスタム授業を作成してAPIを投げる
   * 時間割を更新する
   */
  submit() {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/btn.scss';

//++++++++++++++++++// 以くだダイアログの内容（中身） //+++++++++++++++++//
.custom-form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 67.5vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

/* 授業の追加 */
.title {
  font-size: 1.8rem;
  color: #00c0c0;
  font-weight: 500;
  margin: 0 0 1.5vh;
}
</style>
