<template>
  <!-- 時間割の日時 -->
  <div>
    <svg
      width="57"
      height="56"
      viewBox="0 0 57 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <rect
          x="2"
          y="2.98239"
          width="49"
          height="47.0176"
          rx="5"
          fill="white"
        />
      </g>
      <rect x="2" y="2" width="49" height="13.7535" fill="#00C0C0" />
      <text x="17" y="12.5" font-size="9" fill="#FCFCFC">
        {{ today.month }}月
      </text>
      <text x="20.5" y="33" font-size="18" fill="#9A9A9A">{{ today.day }}</text>
      <text x="18.5" y="45" font-size="9" fill="#9A9A9A">
        ({{ today.week }})
      </text>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0.982389"
          width="57"
          height="55.0176"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  async asyncData() {
    return {};
  }
})
export default class Index extends Vue {
  public today: {
    month: number;
    day: number;
    week: string;
  } = { month: 10, day: 1, week: "火" };
}
</script>

<style lang="sass" scoped></style>
