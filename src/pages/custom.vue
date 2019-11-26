<template>
  <div class="container">
    <h1 class="title">自分で時間割を作成する</h1>
    <h2 class="sub-title">カスタムデータの入力</h2>
    <cbuForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    cbuForm: () => import("~/components/ui-form.vue"),
    TButton: () => import("~/components/global/button.vue")
  }
})
export default class Index extends Vue {}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 550px;
}
.title {
  font-size: 3vh;
}
.sub-title {
  font-size: 2vh;
}
</style>
