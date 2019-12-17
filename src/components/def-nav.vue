<template>
  <!--
  //
  // ナビゲーションバー
  //
  // 歯車を押したら出現するバー
  // list変数で、様々なコンテンツを追加できます
  // list[].linkは相対urlも絶対urlも対応
  //
  -->
  <!-- 左側に出現するサイドバー -->
  <section class="contents">
    <transition name="slide">
      <nav class="main" v-if="drawer">
        <h1 class="settings">設定</h1>
        <div class="material-icons svg-button close-btn" @click="chDrawer()">
          close
        </div>

        <div class="login-btn" @click="logout()" v-if="isLogin">ログアウト</div>
        <div class="login-btn" @click="login()" v-else>ログイン</div>

        <section class="menu-contents-wrap">
          <div
            class="menu-content"
            v-for="(l, id) in list"
            :key="id"
            :id="l.icon"
            @click="goto(l.link)"
          >
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
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import Swal from 'sweetalert2'
import { BASE_URL } from '../store/api/config'

declare global {
  interface Window {
    android?: {
      openSettings: () => void
    }
  }
}

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  list = [
    { icon: 'home', name: 'ホームへ戻る', link: '/' },
    { icon: 'help', name: '使い方', link: 'https://www.twinte.net/howto' },
    // , { icon: "supervisor_account", name: "About", link: "/about" }
    // , { icon: "view_quilt", name: "表示設定", link: "/settings" }
    // , { icon: "share", name: "時間割の共有", link: "/" }
    // , { icon: "delete_sweep", name: "時間割データの消去", link: "/" }
  ]

  get drawer(): boolean {
    return this.$store.getters['visible/drawer']
  }

  get isLogin(): boolean {
    return this.$store.getters['api/isLogin']
  }

  chDrawer() {
    this.$store.commit('visible/chDrawer', { display: false })
  }

  goto(link: string) {
    if (link.startsWith('https://')) {
      location.href = link
    } else if (link.startsWith('func:')) {
      switch (link) {
        case 'func:android':
          if (window.android) {
            window.android.openSettings()
          }
          break
      }
    } else {
      this.$router.push(link)
      this.chDrawer()
    }
  }

  async login() {
    Swal.fire({
      title: 'どのアカウントでログインしますか?',
      html: `
      <p>
        Twin:teにログインしたことがない場合は自動的にアカウントが作成されます。
        <br />ログインをした場合、
        <a href="https://www.twinte.net/terms">利用規約</a>に同意したものとします。
      </p>
      <p>
        <a href="${BASE_URL}/auth/google">
          <img
            width="250"
            src="/authimg/btn_google_signin_light_normal_web@2x.png"
            alt="sign in with google"
          />
        </a>
      </p>
      <p>
        <a href="${BASE_URL}/auth/apple">
          <img
            width="250"
            src="/authimg/sign-in-with-apple.png"
            alt="SignInWithApple"
          />
        </a>
      </p>
      <p>
        <a href="${BASE_URL}/auth/twitter">
          <img
            width="250"
            src="/authimg/sign-in-with-twitter-gray.png"
            alt="ign-in-with-twitter"
          />
        </a>
      </p>
      `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: '閉じる',
    })
  }

  logout() {
    Swal.fire({
      title: 'ログアウトしますか?',
      showCancelButton: true,
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
    }).then((result) => {
      if (result.value) {
        this.$store.dispatch('api/logout')
        localStorage.removeItem('login')
        location.href = '/'
      }
    })
  }

  mounted() {
    const isMobile =
      /iP(hone|(o|a)d)/.test(navigator.userAgent) ||
      /TwinteAppforAndroid/.test(navigator.userAgent)
    if (isMobile) {
      this.list.push({
        icon: 'vertical_align_bottom',
        name: 'Twinsからインポート',
        link: 'https://twins.tsukuba.ac.jp',
      })
    }
    if (window.android) {
      this.list.push({
        icon: 'settings',
        name: 'Androidアプリの設定',
        link: 'func:android',
      })
    }
  }
}
</script>

<style lang="scss" scoped>
//++++++++++++++++++++++++// ドロワーメニューの枠 //++++++++++++++++++++++++//
.main {
  font-family: Noto Sans JP;
  position: absolute;
  left: 0px;
  top: 0px;
  max-width: 300px;
  width: 75vw;
  height: 100vh;
  box-shadow: 1vmin 1vmin 3vmin rgba(0, 0, 0, 0.349);
  background: #fff;
  z-index: 6;
}
@media screen and (min-width: 800px) {
  .main {
    min-width: 600px;
    max-width: 1000px;
    width: 40vmax;
  }
}

//++++++++++++++++++++++++// ドロワーメニューの内容（中身） //++++++++++++++++++++++++//

.settings {
  color: #717171;
  font-size: 3.8vh;
  font-weight: 400;
  margin: 12% auto 0 7%;
}
.close-btn {
  position: absolute;
  color: #717171;
  top: 4%;
  right: 7%;
  font-size: 4vh;
}
.login-btn {
  margin: 8% auto 0 auto;
  text-align: center;
  line-height: 5.5vh;
  width: 83%;
  height: 5.5vh;
  background-color: #4380f8;
  color: #ffffff;
  border-radius: 1vh;
  font-size: 2.5vh;
  cursor: pointer;
  &:active {
    transition: all 0.15s;
    transform: scale(1.05);
    background-color: #7aa6fd;
  }
}

/* メニュー項目 */
.main .menu-contents-wrap {
  margin: 4% 5% auto 7%;
}
.menu-content {
  position: relative;
  line-height: 9vh;
  margin: 0;
  height: 9vh;
  width: 100%;
  border-bottom: 0.2vh solid #c4c4c4;
}

.menu-icon {
  color: #00c0c0;
  position: absolute;
  left: 3%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 4.4vh;
}
.menu-content p {
  color: #717171;
  font-size: 2.5vh;
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
  font-size: 4.4vh;
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

//++++++++++++++++++++++++// 後ろ //++++++++++++++++++++++++//
.back {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(100, 100, 100, 0.5);
  z-index: 5;
}
</style>
