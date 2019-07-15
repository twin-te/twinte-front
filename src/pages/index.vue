<template>
  <section>
    <div id="sem"><span id="notation">秋A</span></div>
    <time-table id="table" semester></time-table>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    timeTable: () => import("~/components/pages/table.vue")
  }
})
export default class Index extends Vue {
  public semester: number = 0;
}
</script>

<style lang="sass" scoped>
#notation
  position: absolute
  width: 26px
  height: 23px
  left: 176px
  top: 64px
  font-family: Noto Sans JP
  font-style: normal
  font-weight: 500
  font-size: 16px
  line-height: 23px
  text-align: center
  color: #9A9A9A
</style>
