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
      <main v-if="display" class="main">
        <div class="svg-button material-icons close-btn" @click="$emit('close')">close</div>

        <slot></slot>
      </main>
    </transition>

    <transition name="fade">
      <div v-if="display" class="back" @click="$emit('close')"></div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Index extends Vue {
  @Prop({ default: false }) display!: boolean;
}
</script>

<style scoped lang="scss">
@import '~/assets/css/main.scss';
@import '~/assets/css/dialog.scss';
</style>
