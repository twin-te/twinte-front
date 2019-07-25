<template>
  <!-- 上につける緑のバー -->
  <div>
    <nav class="top"><icon>Twin:te</icon></nav>
    <nav class="sub"></nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {}
</script>

<style lang="sass" scoped>
.top
  width: 375px
  height: 56px
  background-color: #00C0C0
  font-size: 2em
icon
  position: absolute;
  width: 117px;
  height: 33px;
  left: 129px;
  top: 11px;
.sub
  background: #C7C7C7
  height: 2px
</style>
