<template>
  <div>
    <nav class="top">
      Twin:te
    </nav>
    <nav class="sub"></nav>
    <nuxt></nuxt>
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
.sub
  background: #C7C7C7
  height: 2px
</style>