<template>
  <div class="btn" :style="{ width, height }">{{ text }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class Index extends Vue {
  @Prop({ default: "300" }) width!: string;
  @Prop({ default: "60" }) height!: string;
  @Prop({ default: "text" }) text!: string;
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
  color: #fff;
  text-align: center;
  &:active {
    transition: all 0.2s;
    transform: translateX(-50%) scale(1.05);
    background-color: #05dbdb;
  }
}
</style>
