<template>
  <!-- 歯車を押すと左から出現する -->
  <div class="contents" :class="{ drawer: !drawer }">
    <nav class="main">

    </nav>
    <nav class="back">

    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
    @Prop({ type: Object, required: true })
    drawer!: Boolean;
  }
</script>

<style lang="sass" scoped>
.main
  position: absolute
  width: 289px
  height: 667px
  left: 0px
  top: 0px
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
  background: #fff
  z-index: 6
.back
  position: absolute
  width: 375px
  height: 667px
  left: 0px
  top: 0px
  background: rgba(100, 100, 100, 0.5)
  z-index: 5
.drawer
  display: none
.contents
  display: flex
</style>
