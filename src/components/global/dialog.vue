<template>
  <section class="contents">
    <transition name="bound">
      <main v-if="display" class="main">
        <slot></slot>
      </main>
    </transition>
    <transition name="fade">
      <nav class="back" @click="close()" v-if="display"></nav>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Index extends Vue {
  @Prop({ default: false }) display!: boolean;

  close() {
    this.$emit('closeDialog');
  }
}
</script>

<style scoped lang="scss">
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 92vw;
  max-width: 70vh;
  height: 80vh;
  background: #ffffff;
  box-shadow: 1vmin 1vmin 3vmin rgba(0, 0, 0, 0.349);
  border-radius: 1vh;
  z-index: 6;
  padding: 4.4vh;
  box-sizing: border-box;
}
.back {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: rgba(100, 100, 100, 0.5);
  z-index: 5;
}
</style>
