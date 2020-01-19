<template>
  <div>
    <h2>表示する項目</h2>
    <label
      >教科名<input
        v-model="sbj.lecture_name"
        type="checkbox"
        name="lecture_name"
        id="lecture_name"
    /></label>
    <label
      >教科番号<input
        v-model="sbj.lecture_code"
        type="checkbox"
        name="lecture_number"
        id="lecture_number"
    /></label>
    <label
      >教師名<input
        v-model="sbj.instructor"
        type="checkbox"
        name="instructor"
        id="instructor"
    /></label>
    <label
      >教室名<input v-model="sbj.room" type="checkbox" name="room" id="room"
    /></label>
    <Subject :data="sampleData" click="disable" />

    <h2>文字の大きさ</h2>
    <label
      ><input v-model="sbj.font_size" type="radio" value="small" />小</label
    >
    <label
      ><input v-model="sbj.font_size" type="radio" value="medium" />中</label
    >
    <label
      ><input v-model="sbj.font_size" type="radio" value="large" />大</label
    >
    <button @click="setSbj()">保存</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import * as Vuex from 'vuex';
import { Period, SubjectSettings } from '../types';
import cloneDeep from 'lodash/cloneDeep';

@Component({
  components: {
    Subject: () => import('~/components/ui-subject.vue'),
    TButton: () => import('~/components/global/button.vue')
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  sbj: SubjectSettings = {
    lecture_name: false,
    lecture_code: false,
    instructor: false,
    room: false,
    font_size: 'medium'
  };

  sampleData: Period = {
    lecture_code: 'GB11514',
    lecture_name: 'シミュレーション物理',
    instructor: '都市樹',
    year: 2019,
    module: '秋C',
    day: '木',
    period: 4,
    room: '3C313',
    user_lecture_id: 'sampledata'
  };

  setSbj() {
    this.$store.commit('visible/setDisplaySubject', this.sbj);
    this.sbj = cloneDeep(this.$store.getters['visible/subject']);
    localStorage.setItem('subject', JSON.stringify(this.sbj));
  }

  mounted() {
    this.sbj = cloneDeep(this.$store.getters['visible/subject']);
  }
}
</script>

<style scoped lang="scss"></style>
