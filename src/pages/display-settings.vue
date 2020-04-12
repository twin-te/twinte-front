<template>
  <main class="display-settings">
    <h1>表示設定</h1>
    <div class="setting-card">
      <h2>時間割表の設定</h2>
      <div class="preview-flex">
        <section class="visible-setting">
          <h3>表示する項目</h3>
          <ul>
            <li>
              <input
                @change="setSbj()"
                v-model="sbj.lecture_code"
                type="checkbox"
                name="lecture_number"
                id="lecture_number"
                class="setting-checkbox"
              />
              <label class="display-check" for="lecture_number">
                <span class="material-icons">check</span> </label
              >科目番号
            </li>
            <li>
              <input
                @change="setSbj()"
                v-model="sbj.instructor"
                type="checkbox"
                name="instructor"
                id="instructor"
                class="setting-checkbox"
              />
              <label class="display-check" for="instructor">
                <span class="material-icons">check</span> </label
              >担当教員
            </li>
            <li>
              <input
                @change="setSbj()"
                v-model="sbj.room"
                type="checkbox"
                name="room"
                id="room"
                class="setting-checkbox"
              />
              <label class="display-check" for="room">
                <span class="material-icons">check</span> </label
              >教室名
            </li>
          </ul>
        </section>

        <!-- 時間割表のプレビュー -->
        <div class="preview-wrap">
          <Subject class="subject" :data="sampleData" click="disable" />
        </div>
      </div>

      <section class="fontsize-setting">
        <h3>文字の大きさ</h3>
        <div class="fontsizebtn-flex">
          <label>
            <input
              @change="setSbj()"
              v-model="sbj.font_size"
              type="radio"
              value="small"
              class="setting-radio"
            />
            <span class="fontsize-btn">小</span>
          </label>
          <label>
            <input
              @change="setSbj()"
              v-model="sbj.font_size"
              type="radio"
              value="medium"
              class="setting-radio"
            />
            <span class="fontsize-btn">中</span>
          </label>
          <label>
            <input
              @change="setSbj()"
              v-model="sbj.font_size"
              type="radio"
              value="large"
              class="setting-radio"
            />
            <span class="fontsize-btn">大</span>
          </label>
        </div>
        <!-- <button @click="setSbj()">保存</button> -->
      </section>
    </div>
  </main>
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
    lecture_code: '0A00000',
    lecture_name: '科目名',
    instructor: '担当教員',
    year: 2019,
    module: '秋C',
    day: '木',
    period: 4,
    room: '0A000',
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

<style scoped lang="scss">
.display-settings {
  color: #555555;
  padding: 1vh 6vw;
  max-width: 70vh;
  margin: 0 auto;
}
h1 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 2vh;
}
h2 {
  font-size: 1.8rem;
  color: #00c0c0;
  font-weight: 500;
  margin: 0 0 3vh;
}

h3 {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 1vh;
}
.setting-card {
  background-color: white;
  border-radius: 1vh;
  box-shadow: 1vmin 1vmin 3vmin rgba(0, 0, 0, 0.349);
  margin: 1vh auto 2vh auto;
  padding: 3vh 5vmin;
}

.preview-flex {
  display: flex;
  justify-content: flex-start;
}
.visible-setting {
  width: 45%;
  margin-bottom: 3vh;
  padding-left: 2vmin;
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  li {
    font-size: 1.4rem;
    line-height: 2.5 * 1.4rem;
  }
}
.preview-wrap {
  position: relative;
  width: 46%;
}
.subject {
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  -ms-wrap-margin: 0;
}

.display-check {
  position: relative;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: middle;
  border: 0.25vh solid #9a9a9a;
  border-radius: 20% 20%;
  margin-right: 4%;
  opacity: 0.5;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    font-size: 1.6rem;
    color: #9a9a9a;
    opacity: 0.8;
  }
}

.setting-checkbox:checked ~ .display-check {
  border: 0.25vh solid #00c0c0;
  opacity: 1;
  span {
    color: #00c0c0;
    font-weight: bold;
    opacity: 1;
  }
}

input {
  display: none;
}

.fontsize-setting {
  padding-left: 2vmin;
  .fontsizebtn-flex {
    display: flex;
    vertical-align: middle;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }

  .fontsize-btn {
    display: block;
    width: 6rem;
    height: 3rem;
    background-color: white;
    color: #c9c9c9;
    text-align: center;
    line-height: 3rem;
    border: #c9c9c9 0.2rem solid;
    border-radius: 400px;
    margin-top: 1vh;
    margin-right: 3vh;
  }
  label:nth-child(1) {
    font-size: 1.5rem;
  }
  label:nth-child(2) {
    font-size: 1.8rem;
  }
  label:nth-child(3) {
    font-size: 2rem;
  }
  .setting-radio:checked ~ .fontsize-btn {
    border: #00c0c0 0.2rem solid;
    background-color: #00c0c0;
    color: white;
    opacity: 1;
  }
}
</style>
