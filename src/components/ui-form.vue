<template>
  <div class="form">
    <p>
      番号
      <input type="text" v-model="form.lectureId" placeholder="授業番号(7ケタ)" />
    </p>
    <p>
      授業
      <input type="text" v-model="form.name" placeholder="授業名" />
    </p>
    <p>
      学期
      <select name="module" v-model="form.module">
        <option v-for="module in moduleList" :key="module" :value="module">{{ module }}</option>
      </select>
    </p>
    <p>
      曜日
      <select name="day" v-model="form.day">
        <option v-for="day in dayList" :key="day" :value="day">{{ day }}</option>
      </select>
    </p>
    <p>
      時限
      <input type="number" v-model="form.period" placeholder="時限" />
    </p>
    <p>
      教師
      <input type="text" v-model="form.instructor" placeholder="教師名" />
    </p>
    <p>
      教室
      <input type="text" v-model="form.room" placeholder="教室" />
    </p>

    <div @click="createLectureByUser()">
      <TButton id="create-btn" width="80%" text="作成">作成</TButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { createLecture } from "../store/api/timetables";
import { YEAR } from "../store/api/config";

export enum Module {
  SpringA = "春A",
  SpringB = "春B",
  SpringC = "春C",
  FallA = "秋A",
  FallB = "秋B",
  FallC = "秋C",
  SummerVacation = "夏季休業中",
  SpringVacation = "春季休業中",
  Annual = "通年",
  Unknown = "不明"
}
export enum Day {
  Sun = "日",
  Mon = "月",
  Tue = "火",
  Wed = "水",
  Thu = "木",
  Fri = "金",
  Sat = "土",
  Unknown = "不明"
}

@Component({
  components: {
    TButton: () => import("~/components/global/button.vue")
  }
})
export default class Index extends Vue {
  form = {
    lectureId: "",
    name: "",
    module: Module.SpringA,
    day: Day.Mon,
    period: 0,
    instructor: "",
    room: ""
  };
  dayList: Day[] = [Day.Mon, Day.Tue, Day.Wed, Day.Thu, Day.Fri];
  moduleList: Module[] = [
    Module.SpringA,
    Module.SpringB,
    Module.SpringC,
    Module.FallA,
    Module.FallB,
    Module.FallC
  ];

  async createLectureByUser() {
    if (!confirm("追加しますか?")) {
      return;
    }
    await createLecture(
      YEAR,
      this.form.module,
      this.form.day,
      this.form.period,
      {
        lectureID: this.form.lectureId,
        name: this.form.name,
        instructor: this.form.instructor,
        room: this.form.room
      }
    );
    alert("追加完了しました。時間割画面に遷移します");
    location.href = "/";
  }
}
</script>

<style scoped lang="scss">
.form {
  width: 80%;
}
input {
  max-width: 550px;
}
#create-btn {
  margin: 0.5rem;
}
</style>
