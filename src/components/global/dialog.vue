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
@import '~/assets/css/variable.scss';
@import '~/assets/css/modal.scss';
</style>
