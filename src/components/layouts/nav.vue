<template>
  <!-- 歯車を押すと左から出現する -->
  <div class="contents" :style="{ display: drawer ? 'flex' : 'none' }">
    <nav class="main">

    </nav>
    <!-- 全体を暗くする -->
    <nav class="back"></nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    navlist: () => import("~/components/ui/nav-list.vue")
  }
})
export default class Index extends Vue {
    @Prop({ type: Boolean, required: true })
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
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
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
</style>
