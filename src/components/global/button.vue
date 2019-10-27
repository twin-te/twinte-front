<template>
  <div class="btn" :style="{ width, height }"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator"

@Component({})
export default class Index extends Vue {
  @Prop({ default: 300 }) width!: number;
  @Prop({ default: 60 }) height!: number;
}
</script>

<style scoped lang="scss">
.btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 550px;
  font-size: 2.3vh;
  height: 6vh;
  line-height: 6vh;
  background: #00c0c0;
  border-radius: 1vh;
  bottom: 3.1vh;
  color: #fff;
  text-align: center;
  cursor: pointer;
  &:active {
    transition: all 0.2s;
    transform: translateX(-50%) scale(1.05);
    background-color: #05dbdb;
  }
}
</style>
