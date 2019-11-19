<template>
  <div class="form">
    <input type="text" v-model="form.lectureId" placeholder="授業番号" />
    <input type="text" v-model="form.name" placeholder="名前" />
    <input type="text" v-model="form.module" placeholder="学期" />
    <input type="text" v-model="form.day" placeholder="曜日" />
    <input type="text" v-model="form.period" placeholder="時限" />
    <TButton width="80%" height="60" text="作成" @click="createLectureByUser()">作成</TButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    TButton: () => import("~/components/global/button.vue")
  }
})
export default class Index extends Vue {
  form = {
    lectureId: "",
    name: "",
    module: "",
    day: "",
    period: ""
  };

  createLectureByUser() {
    if (!confirm("追加しますか?")) {
      return;
    }
    // ここで処理
  }
}
</script>

<style scoped lang="scss">
.form {
  margin: 0.5rem;
  padding: 1rem;
  width: 80%;
}
input {
  margin: 0.5rem;
  width: 80%;
}
</style>
