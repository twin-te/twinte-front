<template>
  <transition name="bound">
    <div class="card">
      <div class="card__title">手動で設定する</div>

      <div class="card__section checkbox">
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

      <div class="card__section checkbox">
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

      <div class="card__section checkbox">
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

      <div class="card__section card__divider" />

      <div class="card__section reacquisition" @click="reacquisition">
        <div class="reacquisition__title">
          <i class="material-icons icon --refresh">refresh</i
          >シラバスから再取得する
        </div>
        <div class="reacquisition__sub-title">
          手動で行った設定がリセットされます
        </div>
      </div>
    </div>
  </transition>
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
  border: 0.14rem solid $element-light-gray;
  border-radius: 0.4rem;
  padding: 1rem;

  &__section {
    margin-top: 1.2rem;
  }

  &__title {
    font-size: 1.4rem;
    color: $sub-text-color;
  }

  &__divider {
    border-top: 0.14rem solid $element-light-gray;
  }
}

.icon {
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  padding-bottom: 0.4vh;

  &.--refresh {
    font-size: 1.7rem;
    margin-right: 0.8rem;
  }
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

.reacquisition {
  line-height: 1.7rem;

  &__sub-title {
    margin-left: 2.5rem;
    font-size: 0.9rem;
    color: $sub-text-color;
  }
}

.bound-enter-active,
.bound-leave-active {
  transition: all 0.1s ease-in;
}

.bound-enter,
.bound-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
