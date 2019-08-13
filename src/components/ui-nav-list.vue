/** -> "../components/def-nav.vue" */
<template>
  <!-- nav内で利用するリスト一つ一つ -->
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {}
</script>

<style lang="sass" scoped></style>
