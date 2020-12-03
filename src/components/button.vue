<template>
  <!--
    Basic usage:
    <Button @button-click="fun()" width="200" height="100">save</Button>
  -->
  <button
    @click="$emit('button-click')"
    class="register-btn"
    :style="{ width, height }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Index extends Vue {
  @Prop({ default: '300' }) width!: string
  @Prop({ default: '60' }) height!: string
}
</script>

<style scoped lang="scss">
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
</style>
