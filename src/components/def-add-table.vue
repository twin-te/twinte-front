<template>
  <!-- 時間割の追加 -->
  <div :style="{ display: add ? '' : 'none' }">
    <nav class="main">
      <article style="padding: 25px">
        <!-- 教科名 -->
        <!-- <x> -->
        <div class="svg-button" @click="add = false">
          <svg
            id="close"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z"
              fill="#9A9A9A"
            />
          </svg>
        </div>
        <section
          style="padding-left: 9px; margin-top: 14px; border-left: 5px solid #00C0C0; text-overflow: ellipsis;overflow: hidden; white-space: nowrap; text-overflow: ellipsis"
        >
          <section style="color: #555555;font-size: 21px;">
            時間割の追加
          </section>
        </section>

        <section
          style="width: 100%; height: 40px; background: #00C0C0; border-radius: 7px; margin-bottom: 15px; position: relative"
        >
          <!-- 変更を保存 -->
          <span
            style="font-family: Noto Sans JP; font-style: normal; font-weight: 500; font-size: 16px; line-height: 23px; text-align: center; color: #FFFFFF; position: absolute; top: 50%; left: 50%; transform: translateY(-50%) translateX(-50%)"
            >変更を保存</span
          >
        </section>
        <section
          style="margin-buttom: 25px; font-family: Noto Sans JP; font-style: normal; font-weight: normal; font-size: 12px; line-height: 18px; color: #92B1FF"
        >
          <svg
            class="same-v"
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.99662 18H12.9561V4H0.99662V18ZM13.9527 1H10.4645L9.46789 0H4.48479L3.48817 1H0V3H13.9527V1Z"
              fill="#92B1FF"
            />
          </svg>
          <div class="same-v">この科目を削除</div>
        </section>
      </article>
    </nav>
    <!-- 全体を暗くする -->
    <nav class="back" @click="add = !add"></nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
  @Prop({ default: false, required: true })
  add!: boolean;
}
</script>

<style lang="sass" scoped></style>
