<template>
  <button class="btn" :style="{ width, height }">{{ text }}</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Index extends Vue {
  @Prop({ default: '300' }) width!: string;
  @Prop({ default: '60' }) height!: string;
  @Prop({ default: 'text' }) text!: string;
}
</script>

<style scoped lang="scss">
.btn {
  /* buttonのcssリセット */
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;

  font-size: 2.3vh;
  line-height: 6vh;
  background: #00c0c0;
  border-radius: 1vh;
  bottom: 0;
  color: #fff;
  text-align: center;
  &:active {
    transition: all 0.2s;
    transform: scale(1.05);
    background-color: #05dbdb;
  }
}
</style>
