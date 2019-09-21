/** -> "../pages/index.vue" */ /** -> "..//.vue" */ /**TODO
directiveで実装したい */
<template>
  <div class="main" @click="onClick" :disabled="ripple">
    <transition
      name="ripple"
      @enter="rippleEnter"
      @after-enter="afterRippleEnter"
    >
      <span v-if="ripple" ref="ripple" class="ripple" />
    </transition>
    <span class="label">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
  /** data() */
  ripple: boolean = false;
  x: number = 0;
  y: number = 0;

  /** methods() */
  onClick(e: any): void {
    this.x = e.layerX;
    this.y = e.layerY;
    this.ripple = !this.ripple;
    this.$emit("click");
  }

  rippleEnter(): void {
    const rip: any = this.$refs.ripple;
    rip.style.top = `${this.y}px`;
    rip.style.left = `${this.x}px`;
  }

  afterRippleEnter(): void {
    this.ripple = false;
  }
}
</script>

<style lang="scss" scoped>
$main-color: white;

.main {
  border: none;
  position: relative;
  background-color: $main-color;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hove {
    background-color: darken($main-color, 10%);
  }
  .labe {
    transform: translateY(1px);
  }
  &:focu {
    outline: none;
  }
  &:disable {
    background-color: darken($main-color, 10%);
  }
  .labe {
    opacity: 0.5;
    transform: translateY(1px);
  }
}
.label {
  display: block;
  pointer-events: none;
  color: white;
  transform: translateY(0);
  transition: transform 0.2s;
}
.ripple {
  z-index: 9999;
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  background-color: rgba(darken($main-color, 10%), 1);
  opacity: 0;
  transform: translate(-50%, -50%) scale(10);
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
  &-enter {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0);
  }
}
</style>
