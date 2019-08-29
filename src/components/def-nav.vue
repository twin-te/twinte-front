/** -> "../layouts/default.vue" */
<template>
  <!-- 左側に出現するサイドバー -->
  <section class="contents">
    <transition name="slide">
      <nav class="main" v-if="drawer">
        <h1 class="settings">設定</h1>
        <div class="material-icons close-btn">close</div>
        <div class="login-btn">ログイン</div>
        <section class="menu-contents-wrap">
          <div class="menu-content" v-for="l in list" :key="l.id" :id="l.icon">
            <span class="material-icons menu-icon">{{ l.icon }}</span>
            <p>{{ l.name }}</p>
            <span class="material-icons menu-allow">chevron_right</span>
          </div>
        </section>
      </nav>
    </transition>

    <transition name="fade">
      <nav class="back" @click="chDrawer()" v-if="drawer"></nav>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

@Component({
  components: {
    "ui-navlist": () => import("~/components/ui-nav-list.vue")
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  get drawer(): boolean {
    return this.$store.getters["visible/drawer"];
  }

  chDrawer(): void {
    this.$store.commit("visible/chDrawer", { bool: false });
  }

  list: any = [
    { icon: "home", name: "ホームへ戻る", link: "/" },
    { icon: "help", name: "使い方", link: "/tutorial" },
    { icon: "supervisor_account", name: "About", link: "/about" },
    { icon: "view_quilt", name: "表示設定", link: "/settings" },
    { icon: "share", name: "時間割の共有", link: "/" },
    { icon: "delete_sweep", name: "時間割データの消去", link: "/" }
  ];
}
</script>

<style lang="scss" scoped>
.main {
  font-family: Noto Sans JP;
  position: absolute;
  left: 0px;
  top: 0px;
  max-width: 289px;
  width: 75vw;
  height: 100vh;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  background: #fff;
  z-index: 6;
}
.back {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(100, 100, 100, 0.5);
  z-index: 5;
}
.settings {
  color: #717171;
  font-size: 130%;
  font-weight: 400;
  margin: 12% auto 0 7%;
}
.close-btn {
  position: absolute;
  color: #717171;
  top: 4%;
  right: 7%;
}
.login-btn {
  margin: 8% auto 0 auto;
  text-align: center;
  line-height: 36px;
  max-width: 241px;
  width: 83%;
  height: 36px;
  background-color: #4380f8;
  color: #ffffff;
  border-radius: 6px;
}
.login-btn:hover {
  background-color: #5e94ff;
}
.main .menu-contents-wrap {
  margin: 4% 5% auto 7%;
  max-width: 267px;
}
.menu-content {
  position: relative;
  line-height: 65px;
  margin: 0;
  height: 65px;
  width: 100%;
  border-bottom: 1px solid #c4c4c4;
}
.menu-icon {
  color: #00c0c0;
  position: absolute;
  left: 3%;
  top: 50%;
  transform: translateY(-50%);
}
.menu-content p {
  color: #717171;
  font-size: 105%;
  font-weight: 300;
  padding-left: 19%;
  margin: 0;
}
.menu-allow {
  color: #00c0c0;
  position: absolute;
  top: 50%;
  right: 1%;
  transform: translateY(-50%);
}
#home span {
  color: #4380f8;
}
#home p {
  color: #4380f8;
}
/** animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
