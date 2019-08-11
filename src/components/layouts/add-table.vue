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
        <!-- 科目詳細 -->
        <section>
          <div
            style="display: flex; width: 100%; justify-content: space-between; margin-top: 26px; border-bottom: 1px solid #00C0C0; font-size: 14px"
          >
            <div style="color: #00C0C0">
              <!-- <i> -->
              <svg
                class="same-v"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0339 3.33333C5.72599 3.33333 2.22974 6.81777 2.22974 11.1111C2.22974 15.4044 5.72599 18.8889 10.0339 18.8889C14.3418 18.8889 17.838 15.4044 17.838 11.1111C17.838 6.81777 14.3418 3.33333 10.0339 3.33333ZM10.8143 15H9.25347V10.3333H10.8143V15ZM10.8143 8.77777H9.25347V7.22222H10.8143V8.77777Z"
                  fill="#00C0C0"
                />
              </svg>
              <div class="same-v">科目詳細</div>
            </div>
            <div style="color: #C4C4C4">シラバス</div>
          </div>
          <div style="margin-top: 10px; margin-left: 21px; line-height: 28px">
            <div>
              <span style="font-weight: 500">担当教員</span
              ><span
                style="position: relative; left: 30px; color: #555555; font-weight: normal"
                >{{ looking.teacher }}
              </span>
            </div>
            <div>
              <span style="font-weight: 500">開講時限</span
              ><span
                style="position: relative; left: 30px; color: #555555; font-weight: normal"
                >{{ looking.season }} {{ looking.time }}</span
              >
            </div>
            <div>
              <span style="font-weight: 500">教室 </span
              ><span
                style="position: relative; left: 30px; color: #555555; font-weight: normal"
                >{{ looking.classroom }}
              </span>
            </div>
          </div>
        </section>
        <!-- メモ -->
        <section>
          <div
            style="width: 100%; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #00C0C0;　color: #00C0C0; font-size: 14px; line-height: 20px"
          >
            <!-- <✐> -->
            <svg
              class="same-v"
              width="15"
              height="13"
              viewBox="0 0 15 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.0101929 10.292V13H2.93634L11.5665 5.01333L8.64038 2.30537L0.0101929 10.292ZM13.8294 2.91918C14.1337 2.63755 14.1337 2.18261 13.8294 1.90099L12.0035 0.211221C11.6992 -0.0704069 11.2076 -0.0704069 10.9033 0.211221L9.4753 1.5327L12.4015 4.24066L13.8294 2.91918Z"
                fill="#00C0C0"
              />
            </svg>
            <div class="same-v">メモ</div>
          </div>
          <!-- 入力の枠 -->
          <div
            style="margin-bottom: 8px; margin-left: 10px; margin-right: 10px"
          >
            <input
              type="text"
              style="width: 100%; height: 85px; border: 1px solid #DDDDDD; box-sizing: border-box; border-radius: 8px;"
            />
          </div>
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
  @Prop({ type: Boolean, default: false, required: true })
  add!: Boolean;
}
</script>

<style lang="sass" scoped></style>
