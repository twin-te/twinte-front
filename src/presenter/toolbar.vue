<template>
  <!-- 上につける緑のバー 高さ 56px + 2px -->
  <div>
    <nav class="top">
      <!-- ⚙ -->
      <span class="material-icons btn--setting" @click="chDrawer()"
        >settings</span
      >
      <!-- Twin:te -->
      <router-link to="/">
        <img
          src="~/assets/img/title-logo.png"
          class="title-logo"
          alt="Twin:te"
        />
      </router-link>
      <!-- + -->
      <span class="material-icons btn--add" @click="chAdd()">add</span>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  chDrawer() {
    this.$store.commit('visible/chDrawer', { display: true })
  }
  chAdd() {
    this.$store.commit('visible/chAdd', { display: true })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variable.scss';

.top {
  position: relative;
  display: flex;
  width: 100vw;
  height: 8vh;
  line-height: 8vh;
  background-color: $primary-color;
  font-size: 2em;
  // border-bottom: 2px solid $element-gray;
  box-shadow: $toolber-shadow;
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
.btn {
  &--add {
    font-size: 5.5vh;
    color: $white;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    &:active {
      transform: translateY(-50%) scale(1.1);
    }
  }
  &--setting {
    font-size: 4.3vh;
    color: $white;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &:active {
      transform: translateY(-50%) scale(1.1);
    }
  }
}
.top span {
  margin-left: 3vw;
  margin-right: 3vw;
}
</style>
