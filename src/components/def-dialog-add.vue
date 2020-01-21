<template>
  <!--
    時間割追加画面
    ボタン、フォーム、CSVファイル追加辺りは別コンポネントに分けたい
  -->
  <section class="contents">
    <transition name="bound">
      <nav class="main" v-show="add">
        <article>
          <div class="svg-button material-icons close-btn" @click="chAdd()">close</div>
          <h1>授業の追加</h1>

          <!-- 検索フォーム -->
          <form class="search-form" @submit.prevent>
            <input
              v-model="input"
              type="text"
              placeholder="授業名や科目番号で検索"
              class="form"
              　@keyup.enter="search(input)"
            />
            <span v-if="input === ''" @click="lectures = []" class="material-icons search-btn">close</span>
            <span v-else @click="search(input)" class="material-icons search-btn">search</span>
          </form>

          <!-- 以下検索結果 -->
          <section class="result-list">
            <div
              v-for="(n, i) in lectures"
              :key="n.lecture_code + i"
              :style="{ background: i % 2 === 0 ? '#F9F9F9' : '#ebebeb' }"
            >
              <input
                type="checkbox"
                :id="n.lecture_code"
                :value="n.lecture_code"
                v-model="n.checked"
              />
              <label :for="n.lecture_code">
                {{ n.lecture_code }} - {{ n.lecture_name }} - {{ n.module
                }}{{ n.day }}{{ n.period }}
              </label>
            </div>
          </section>
          <!-- ここまで検索結果 -->

          <section class="others">
            <p v-if="isMobile" class="content" @click="twins()">
              Twinsからインポート
              <span class="material-icons icon">chevron_right</span>
            </p>
            <p class="content">
              CSVファイルから追加
              <br />
              <small>*{{ moduleMessage }}</small>
              <input
                type="file"
                name="file"
                accept="text/csv, .csv"
                id="fileElem"
                @change="onFileChange"
                class="add-csv"
              />
            </p>

            <!-- <p @click="custom()">手動入力で授業を作成</p> -->
          </section>
          <!-- → その他オプション -->
          <section class="save-btn" @click="asyncNumber()">時間割に追加</section>
        </article>
      </nav>
    </transition>

    <!-- 全体を暗くする -->
    <transition name="fade">
      <nav class="back" @click="chAdd()" v-if="add"></nav>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import * as Vuex from 'vuex';
import { searchLectures } from '../store/api/lectures';
import Swal from 'sweetalert2';
import { twinsToTwinteAlert } from './utils/swal';

type miniLecture = {
  lecture_code: string;
  lecture_name: string;
  module: string;
  day: string;
  period: number;
  checked: boolean;
};

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  // data___________________________________________________________________________________
  //
  input: string = '';
  lectures: miniLecture[] = [];
  isMobile = false;

  // computed___________________________________________________________________________________
  //
  get moduleMessage(): string {
    return `${this.$store.getters['table/module']}のCSVファイルを入力してください`;
  }
  get add(): boolean {
    return this.$store.getters['visible/add'];
  }
  get moduleNum(): number {
    return this.$store.getters['table/moduleNum'];
  }

  // method___________________________________________________________________________________
  //
  chAdd() {
    this.$store.commit('visible/chAdd', { display: false });
  }
  twins() {
    twinsToTwinteAlert();
  }
  custom() {
    this.$router.push('/custom');
    this.$store.commit('visible/chAdd', { display: false });
  }
  async search(input: string, type: 'csv' | 'input' = 'input') {
    const le = await searchLectures(input);
    if (!le || le.length === 0) {
      Swal.fire(
        '見つかりません',
        '検索しましたが何も見つかりませんでした',
        'error'
      );
      return;
    }

    le.forEach(async l => {
      await this.lectures.push({
        lecture_code: l.lectureCode,
        lecture_name: l.name,
        module: l.details[0].module,
        day: l.details[0].day,
        period: l.details[0].period,
        checked: type === 'csv'
      });
    });

    this.input = '';
    (document.activeElement as HTMLElement).blur();
  }
  async onFileChange(e: any) {
    e.preventDefault();
    const search = async (csv: string) => await this.search(csv, 'csv');

    const fileData: Blob = e.target.files[0];

    const reader = new FileReader();
    reader.onload = async () => {
      console.log('load');

      if (typeof reader.result !== 'string') return;
      const csvLectureList = await Promise.all(
        reader.result
          .split('\r\n')
          .filter(csv => csv) // drop blank line
          .map(csv => csv.replace(/["]/g, '')) // drop "
      );
      await csvLectureList.forEach(async csv => {
        console.log('search');
        await search(csv);
      });
    };
    await reader.readAsText(fileData);
  }
  async asyncNumber() {
    if (!this.$store.getters['api/isLogin']) {
      Swal.fire(
        'まだログインしていません',
        '歯車⚙からログインして下さい',
        'error'
      );
      return;
    }

    Swal.fire({
      title: '科目追加を行いますか？',
      text: '現在表示されている時間割は上書きされます',
      showCancelButton: true,
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ'
    }).then(async result => {
      if (!result.value) {
        return;
      }

      const lectureCodes = await Promise.all(
        this.lectures.filter(l => l.checked).map(l => l.lecture_code)
      );

      if (lectureCodes.length === 0) {
        Swal.fire(
          '追加するデータがありません',
          '検索を行い、追加する授業にチェックマークをつけて下さい',
          'warning'
        );
        return;
      }

      await this.$store.dispatch('api/addTable', { lectureCodes });
      // → 追加

      Swal.fire('追加完了', '時間割を更新しました', 'success');

      this.lectures = [];
      this.chAdd();
      // → ダイアログを閉じる
    });
  }

  mounted() {
    this.isMobile =
      /iP(hone|(o|a)d)/.test(navigator.userAgent) ||
      /TwinteAppforAndroid/.test(navigator.userAgent);
  }
}
</script>

<style lang="scss" scoped>
//++++++++++++++++++++++++// ダイアログの枠 //++++++++++++++++++++++++//
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 92vw;
  max-width: 70vh;
  height: 80vh;
  background: #ffffff;
  box-shadow: 1vmin 1vmin 3vmin rgba(0, 0, 0, 0.349);
  border-radius: 1vh;
  z-index: 6;
  padding: 5vh;
  box-sizing: border-box;
}

//++++++++++++++++++// 以下ダイアログの内容（中身） //+++++++++++++++++//
article {
  position: relative;
}

/* ボタン・アイコン */
.close-btn {
  position: absolute;
  top: -2.2vh;
  right: -2.1vh;
  font-size: 4vh;
  color: #717171;
}
.icon {
  display: inline-flex;
  vertical-align: middle;
  padding-bottom: 0.4vh;
}

/* 授業の追加 */
h1 {
  font-size: 2.9vh;
  color: #00c0c0;
  font-weight: 500;
  margin: 0 0 1.5vh;
}

/* 検索フォーム */
.search-form {
  position: relative;
  width: 100%;
  height: 4.5vh;
  margin: 0;
  padding: 0;
  .form {
    height: 100%;
    width: 100%;
    background-color: #fff;
    border: 0.2vh solid #9a9a9a;
    color: #555555;
    border-radius: 3vh;
    position: relative;
    margin: 0;
    padding: 0;
    padding-left: 3%;
    font-size: 16px;
    box-sizing: border-box;
  }
  ::placeholder {
    color: #9a9a9a;
    font-size: 14px;
    padding-top: 4px;
  }
  .search-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    height: 4.5vh;
    width: 4.5vh;
    border-radius: 50% 50%;
    background-color: #00c0c0;
    color: #fff;
    font-size: 3.5vh;
    text-align: center;
    line-height: 4.8vh;
    &:active {
      transition: all 0.2s;
      transform: scale(1.1);
      background-color: #05dbdb;
    }
  }
}

/** 検索結果 */
.result-list {
  width: 100%;
  height: 35vh;
  margin: 1.5vh 0;
  padding: 1vw 0.5vw;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
  font-size: 2vh;
  line-height: 150%;
  box-sizing: border-box;
}
.result-list div {
  padding: 2vw;
}

//++++++++++++++++++++++++// 検索以外の追加方法 //++++++++++++++++++++++++//
.others {
  border-top: 1px solid #adadad;
  width: 100%;
}
.content {
  font-size: 2vh;
  color: #9a9a9a;
  margin-left: 0.5vh;
  span {
    font-size: 3.4vh;
  }
}
.add-csv {
  margin-top: 1vh;
  color: #adadad;
  font-size: 1.8vh;
}

//++++++++++++++++++++++++// 保存ボタン //++++++++++++++++++++++++//
.save-btn {
  display: block;
  margin: 0 auto;
  color: #fff;
  width: 100%;
  height: 6vh;
  font-size: 2.3vh;
  line-height: 6vh;
  background: #00c0c0;
  border-radius: 1vh;
  text-align: center;
  &:active {
    transition: all 0.2s;
    transform: scale(1.05);
    background-color: #05dbdb;
  }
}

//++++++++++++++++++++++++// 後ろ //++++++++++++++++++++++++//
.back {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: rgba(100, 100, 100, 0.5);
  z-index: 5;
}
</style>
