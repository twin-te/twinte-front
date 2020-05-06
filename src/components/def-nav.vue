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
        <h1>メニュー</h1>
        <div
          class="material-icons btn-animation close-btn"
          @click="closeDrawer()"
        >
          close
        </div>

        <div class="register-btn" @click="logout()" v-if="isLogin">
          ログアウト
        </div>
        <div class="register-btn" @click="login()" v-else>ログイン</div>

        <section class="menu-contents-wrap">
          <div
            class="menu-content"
            v-for="(l, id) in list"
            :key="id"
            :id="l.icon"
            @click="navigateHandler(l.link)"
          >
            <p>
              <span class="material-icons menu-icon">{{ l.icon }}</span>
              {{ l.name }}
            </p>
          </div>
        </section>
      </nav>
    </transition>

    <transition name="fade">
      <nav class="back" @click="closeDrawer()" v-if="drawer"></nav>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import Swal from 'sweetalert2'

import { twinsToTwinteAlert, loginAlert } from './utils/swal'
import { sleep } from './utils/sleep'
import { BASE_URL } from '../common/config'
import { isMobile } from '../common/ua'

declare global {
  interface Window {
    android?: {
      openSettings?: () => void
      share?: (message: string) => void
    }
    webkit?: {
      messageHandlers?: {
        iPhoneSettings?: {
          postMessage: (hoge: string) => void
        }
        share?: {
          postMessage: (message: string) => void
        }
      }
    }
  }
}

@Component({})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  list = [
    { icon: 'home', name: 'ホームへ戻る', link: '/' },
    { icon: 'help', name: '使い方', link: 'https://www.twinte.net/#usages' },
    { icon: 'view_quilt', name: '表示設定', link: '/display-settings' },
    // , { icon: "share", name: "時間割の共有", link: "/" }
  ]

  get drawer(): boolean {
    return this.$store.getters['visible/drawer']
  }

  get isLogin(): boolean {
    return this.$store.getters['api/isLogin']
  }

  closeDrawer() {
    this.$store.commit('visible/chDrawer', { display: false })
  }

  login() {
    loginAlert()
  }

  logout() {
    Swal.fire({
      title: 'ログアウトしますか?',
      showCancelButton: true,
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
    }).then(async (result) => {
      if (result.value) {
        await this.$store.dispatch('api/logout')
        location.href = `${BASE_URL}/auth/logout`
      }
    })
  }

  async navigateHandler(link: string) {
    const shareMessage = '#Twinte'

    this.closeDrawer()

    if (link.startsWith('https://')) {
      location.href = link
    } else if (link.startsWith('func:')) {
      await sleep(300)
      switch (link) {
        case 'func:android-settings':
          if (window.android?.openSettings) window.android?.openSettings()
          break
        case 'func:android-share':
          if (window.android?.share) window.android?.share(shareMessage)
          break
        case 'func:iPhone-settings':
          window.webkit?.messageHandlers?.iPhoneSettings?.postMessage('')
          break
        case 'func:iPhone-share':
          window.webkit?.messageHandlers?.share?.postMessage(shareMessage)
          break
        case 'func:twins':
          twinsToTwinteAlert()
          break
      }
    } else {
      this.$router.push(link)
    }
  }

  mounted() {
    if (isMobile()) {
      this.list.push({
        icon: 'vertical_align_bottom',
        name: 'Twinsからインポート',
        link: 'func:twins',
      })
    }
    if (window.android) {
      if (window.android?.openSettings)
        this.list.push({
          icon: 'settings',
          name: 'Androidアプリの設定',
          link: 'func:android-settings',
        })
      if (window.android?.share)
        this.list.push({
          icon: 'share',
          name: '時間割のシェア',
          link: 'func:android-share',
        })
    }
    if (window.webkit) {
      if (window.webkit.messageHandlers?.iPhoneSettings)
        this.list.push({
          icon: 'settings',
          name: 'iPhoneアプリの設定',
          link: 'func:iPhone-settings',
        })
      if (window.webkit.messageHandlers?.share)
        this.list.push({
          icon: 'share',
          name: '時間割のシェア',
          link: 'func:iPhone-share',
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/main.scss';

//++++++++++++++++++++++++// ドロワーメニューの枠 //++++++++++++++++++++++++//
.main {
  font-family: Noto Sans JP;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  box-shadow: $large-shadow;
  background: #fff;
  z-index: 6;
  padding: 5vh 3.5vh;
}

//++++++++++++++++++++++++// ドロワーメニューの内容（中身） //++++++++++++++++++++++++//

h1 {
  color: $sub-text-color;
  font-size: 2.3rem;
  font-weight: 400;
  margin: 0 auto 10% 0;
}
.close-btn {
  position: absolute;
  color: $close-btn-color;
  top: 5vh;
  right: 3.5vh;
  font-size: 3rem;
}

/* メニュー項目 */
.main .menu-contents-wrap {
  margin-top: 4%;
}
.menu-content {
  position: relative;
  height: 4.2rem;
  padding-right: 6vh;
  margin: 0;
}

.menu-icon {
  display: inline-flex;
  left: 3%;
  margin-right: 1vh;
  font-size: 2.7rem;
  color: $primary-color;
  vertical-align: middle;
}
.menu-content p {
  margin: 0;
  padding-left: 1vh;
  font-size: 1.5rem;
  color: $main-text-color;
  font-weight: 300;
  line-height: 4.5rem;
  user-select: none;
}
.menu-content p::after {
  content: 'chevron_right';
  position: absolute;
  right: 0;
  display: inline-flex;
  font-family: 'Material Icons';
  color: $primary-color;
  font-size: 2.3rem;
  vertical-align: middle;
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
