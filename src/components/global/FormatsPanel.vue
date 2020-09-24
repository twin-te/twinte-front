<template>
  <div class="card">
    <div class="card__title">手動で設定する</div>

    <div class="checkbox">
      <input
        id="FaceToFace"
        type="checkbox"
        v-model="FaceToFace"
        class="checkbox__input"
      />
      <label class="checkbox__checkbox" for="FaceToFace">
        <span class="material-icons">check</span>
      </label>
      <div class="checkbox__contents">対面</div>
    </div>

    <div class="checkbox">
      <input
        id="Synchronous"
        type="checkbox"
        v-model="Synchronous"
        class="checkbox__input"
      />
      <label class="checkbox__checkbox" for="Synchronous">
        <span class="material-icons">check</span>
      </label>
      <div class="checkbox__contents">オンライン（同時双方向）</div>
    </div>

    <div class="checkbox">
      <input
        id="Asynchronous"
        type="checkbox"
        v-model="Asynchronous"
        class="checkbox__input"
      />
      <label class="checkbox__checkbox" for="Asynchronous">
        <span class="material-icons">check</span>
      </label>
      <div class="checkbox__contents">オンライン（オンデマンド）</div>
    </div>

    <hr />

    <div>
      <i @click="reacquisition" class="material-icons icon">refresh</i
      >シラバスから再取得する
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { LectureFormat } from '@/types/server'

@Component({})
export default class FormatsPanel extends Vue {
  @Prop({ required: true })
  formats!: Array<LectureFormat>

  get FaceToFace() {
    return this.formats.includes('FaceToFace')
  }
  set FaceToFace(value) {
    this.$emit('change-formats', 'FaceToFace', value)
  }

  get Asynchronous() {
    return this.formats.includes('Asynchronous')
  }
  set Asynchronous(value) {
    this.$emit('change-formats', 'Asynchronous', value)
  }

  get Synchronous() {
    return this.formats.includes('Synchronous')
  }
  set Synchronous(value) {
    this.$emit('change-formats', 'Synchronous', value)
  }

  async reacquisition() {
    this.$emit('reacquisition')
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variable.scss';
.card {
  position: absolute;
  background: white;
  border: 1px solid gray;
}

.checkbox {
  display: flex;

  &__input {
    display: none;
  }
  &__checkbox {
    position: relative;
    display: inline-block;
    width: 1.7rem;
    height: 1.7rem;
    border: 0.14rem solid $element-gray;
    border-radius: 20% 20%;
    margin-right: 0.8rem;
    cursor: pointer;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      font-size: 100%;
      font-weight: 600;
      color: $element-gray;
      cursor: pointer;
      user-select: none;
    }
  }
  &__input:checked ~ &__checkbox {
    border: 0.14rem solid $primary-color;
    background-color: $primary-color;
    opacity: 1;
    span {
      color: $white;
      font-weight: 600;
      opacity: 1;
    }
  }
  &__contents {
    line-height: 1.7rem;
  }
}
</style>
