<template>
  <!--
  Basic usage:
  <Dialog @close="this.$store.commit('close')" :show='false'>
    <section />
    <section />
    <section />
  </Dialog>
  -->

  <section class="contents">
    <transition name="bound">
      <main v-show="show" class="main">
        <div
          class="material-icons close-btn btn-animation"
          @click="$emit('close')"
        >
          close
        </div>
        <slot></slot>
      </main>
    </transition>

    <transition name="fade">
      <div v-show="show" class="back" @click="$emit('close')"></div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component({})
export default class Dialog extends Vue {
  @Prop({ required: true })
  show!: boolean

  /**
   * windwos全体にキーイベントを適応するため
   * @keyup.escではなく、EventListenerを使用
   */
  @Watch('show')
  onESC() {
    if (this.show === false) {
      window.removeEventListener('keyup', this.onEscKeyUp)
    } else {
      window.addEventListener('keyup', this.onEscKeyUp)
    }
  }

  onEscKeyUp(e: KeyboardEvent) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variable.scss';
@import '~/assets/css/modal.scss';
</style>
