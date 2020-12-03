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
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Dialog extends Vue {
  @Prop({ required: true })
  show!: boolean
}
</script>

<style scoped lang="scss">
// モーダルのスタイル
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 92vw;
  max-width: 70vh;
  height: 80vh;
  background: $white;
  box-shadow: $large-shadow;
  border-radius: 1vh;
  z-index: 6;
  padding: 4vh;
  box-sizing: border-box;
}
.back {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(100, 100, 100, 0.5);
  z-index: 5;
}
.close-btn {
  position: absolute;
  top: 2.2vh;
  right: 2.1vh;
  font-size: 3.1rem;
  color: $main-text-color;
}
</style>
