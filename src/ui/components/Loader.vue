<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    size: {
      // size is loader's width and height pixel included dots
      type: Number,
      default: 20,
    },
  },
});
</script>

<template>
  <div class="loader" />
</template>

<style lang="scss" scoped>
@import "~/ui/styles";

$redius-1: calc(var(--size) / 8 * 3);
$redius-2: calc(var(--size) / 8 * 2);
$redius-3: 0;

$spread-1: calc(var(--size) / 8 * 0.2);
$spread-2: 0;
$spread-3: calc(var(--size) / 8 * -1);

@function box-shadow($shift) {
  // prettier-ignore
  $result: (
      ($redius-3               calc(-1 * #{$redius-1}) 0),
      ($redius-2               calc(-1 * #{$redius-2}) 0),
      ($redius-1               $redius-3               0),
      ($redius-2               $redius-2               0),      
      ($redius-3               $redius-1               0),
      (calc(-1 * #{$redius-2}) $redius-2               0),
      (calc(-1 * #{$redius-1}) $redius-3               0),
      (calc(-1 * #{$redius-2}) calc(-1 * #{$redius-2}) 0),
  );

  $spreads: (
    $spread-1,
    $spread-2,
    $spread-3,
    $spread-3,
    $spread-3,
    $spread-3,
    $spread-3,
    $spread-2
  );

  @for $i from 1 through length($result) {
    $j: ((($i - 1) - $shift) % length($result)) + 1;
    $new-box-shadow: append(nth($result, $i), nth($spreads, $j), "space");
    $result: set-nth($result, $i, $new-box-shadow);
  }

  @return $result;
}

.loader {
  --size: v-bind(`${size}px`);
  color: var(--color--text-main);
  margin: $redius-1;
  width: calc(var(--size) / 8);
  height: calc(var(--size) / 8);
  border-radius: 50%;
  animation: loading 1.3s infinite linear;
  transform: translateZ(0);
}

@keyframes loading {
  0%,
  100% {
    box-shadow: box-shadow(0);
  }
  12.5% {
    box-shadow: box-shadow(1);
  }
  25% {
    box-shadow: box-shadow(2);
  }
  37.5% {
    box-shadow: box-shadow(3);
  }
  50% {
    box-shadow: box-shadow(4);
  }
  62.5% {
    box-shadow: box-shadow(5);
  }
  75% {
    box-shadow: box-shadow(6);
  }
  87.5% {
    box-shadow: box-shadow(7);
  }
}
</style>
