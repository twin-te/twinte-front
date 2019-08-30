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
      <img src="~/assets/img/title-logo.png"  id="title" class="my-2 title-logo">
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
    this.$store.commit("visible/chDrawer", { bool: true });
  }
  chAdd() {
    this.$store.commit("visible/chAdd", { bool: true });
  }
}
</script>

<style lang="sass" scoped>
.top
  position: relative
  display: flex
  width: 100vw
  height: 56px
  line-height: 56px
  background-color: #00C0C0
  font-size: 2em
.setting-btn
  color: #FFFFFF
  left: 1vw
  position: absolute
  top: 50%
  transform: translateY(-50%)
.top .title-logo
  height: 35px
  width: auto
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
.add-btn
  color: #FFFFFF
  position: absolute
  right: 1vw
  top: 50%
  transform: translateY(-50%)
.sub
  background: #C7C7C7
  width: 100vw
  height: 2px
.my-2
  margin-left: 16px
  margin-right: 16px
</style>
