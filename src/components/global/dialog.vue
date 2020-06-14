<template>
  <!--
  Basic usage:
  <Dialog @close="this.$store.commit('close')" :display='false'>
    <section />
    <section />
    <section />
  </Dialog>
  -->

  <section class="contents">
    <transition name="bound">
      <main v-if="show" class="main">
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
      <div v-if="show" class="back" @click="$emit('close')"></div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Index extends Vue {
  @Prop({ default: false }) show!: boolean
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variable.scss';
@import '~/assets/css/modal.scss';
</style>
