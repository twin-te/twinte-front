<template>
  <!--
    Basic usage:
    <Button @button-click="fun()" width="200" height="100">save</Button>
  -->
  <button
    @click="$emit('button-click')"
    class="save-btn"
    :style="{ width, height }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Index extends Vue {
  @Prop({ default: '300' }) width!: string;
  @Prop({ default: '60' }) height!: string;
}
</script>

<style scoped lang="scss">
@import '~/assets/css/btn.scss';
</style>
