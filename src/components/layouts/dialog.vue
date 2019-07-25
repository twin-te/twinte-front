<template>
  <!-- 歯車を押すと左から出現する -->
  <div class="contents" :style="{ display: popup ? 'flex' : 'none' }">
    <nav class="main">
      <div id="name">{{ looking.name }}</div>
      <div id="number">科目番号 {{ looking.number }}</div>
      <div class="green" id="kamokushousai">科目詳細</div>
      <div id="detail-content">
        <div>{{ looking.teacher }}</div>
        <div>{{ looking.season }} {{ looking.time }}</div>
        <div>{{ looking.classroom }}</div>
      </div>
    </nav>
    <!-- 全体を暗くする -->
    <nav class="back"></nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
  @Prop({ type: Boolean, default: false, required: true })
  popup!: Boolean;
  @Prop({ type: Object, default: { "number": "", "name": "", "season": "", "time": "", "classroom": "", "teacher": "" }, required: true })
  looking!: any;
}
</script>

<style lang="sass" scoped>
div
  text-overflow: ellipsis
.main
  position: absolute
  width: 346px
  height: 539px
  left: 13px
  top: 73px
  box-shadow: 0px 0px 250px rgba(0, 0, 0, 0.25)
  background: #FFFFFF
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2)
  border-radius: 10px
  z-index: 6
.back
  position: absolute
  width: 375px
  height: 667px
  left: 0px
  top: 0px
  background: rgba(100, 100, 100, 0.5)
  z-index: 5
#name
  position: relative
  height: 23px
  left: 52px
  top: 112px

  font-family: Noto Sans JP
  font-style: normal
  font-weight: 500
  font-size: 21px
  line-height: 30px
  text-align: center

  color: #555555
#number
  position: relative
  width: 100.94px
  height: 17px
  left: 55px
  top: 139px

  font-family: Noto Sans JP
  font-style: normal
  font-weight: 500
  font-size: 12px
  line-height: 17px
  text-align: center

  color: #C4C4C4
.green
  font-family: Noto Sans JP
  font-style: normal
  font-weight: 500
  font-size: 14px
  line-height: 20px
  text-align: center

  color: #00C0C0;
#kamokushousai
  position: absolute
  width: 296px
  height: 22px
  left: 38px
  top: 182px
#detail-content
  position: absolute
  width: 135px
  height: 75px
  left: 59px
  top: 214px
</style>
