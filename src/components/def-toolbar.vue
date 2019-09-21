/** -> "../layouts/default.vue" */
<template>
  <!-- 上につける緑のバー 高さ 56px + 2px -->
  <div>
    <nav class="top">
      <!-- ⚙ -->
      <span
        id="i_settings"
        class="material-icons svg-button my-2 setting-btn"
        @click="chDrawer()"
      >settings</span>
      <!-- Twin:te -->
      <img src="~/assets/img/title-logo.png" id="title" class="my-2 title-logo" alt="Twin:te" />
      <!-- + -->
      <span id="i_add" class="material-icons svg-button my-2 add-btn" @click="chAdd()">add</span>
    </nav>
    <nav class="sub"></nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

@Component
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  chDrawer() {
    this.$store.commit("visible/chDrawer", { display: true });
  }
  chAdd() {
    this.$store.commit("visible/chAdd", { display: true });
  }
}
</script>

<style lang="scss" scoped>
.top {
  position: relative;
  display: flex;
  width: 100vw;
  height: 8vh;
  line-height: 8vh;
  background-color: #00c0c0;
  font-size: 2em;
}
.setting-btn {
  font-size: 4.3vh;
  color: #ffffff;
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.top .title-logo {
  height: 5vh;
  width: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.add-btn {
  font-size: 5.5vh;
  color: #ffffff;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.sub {
  background: #c7c7c7;
  width: 100vw;
  height: 2px;
}
.my-2 {
  margin-left: 3vw;
  margin-right: 3vw;
}
</style>
