<template>
  <main class="display-settings">
    <h1 class="info">Twin:teからのお知らせ一覧</h1>
    <div class="info__post" v-for="info in information" :key="info.id">
      <div class="info__date">{{ info.date }}</div>
      <h2 class="info__subtitle">{{ info.title }}</h2>
      <div class="info__content" v-html="info.content" />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import { getInformation, parse, Information } from '../api/information'

@Component({
  components: {
    Subject: () => import('~/components/ui-subject.vue'),
    TButton: () => import('~/components/global/button.vue'),
  },
})
export default class Info extends Vue {
  $store!: Vuex.ExStore

  information: Information = []

  async fetch() {
    const { data: info } = await getInformation()
    this.information = parse(info)
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variable.scss';

.display-settings {
  padding: 1vh 6vw;
  max-width: 70vh;
  margin: 0 auto;
}
h1 {
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 2vh;
}
h2 {
  font-size: 1.8rem;
  color: $primary-color;
  font-weight: 400;
  margin: 0 0 3vh;
}

h3 {
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 1vh;
}
.setting-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: $middle-shadow;
  margin: 1vh auto 2vh auto;
  padding: 3vh 5vmin;
}

.preview-flex {
  display: flex;
  justify-content: flex-start;
}
.visible-setting {
  width: 45%;
  margin-bottom: 3vh;
  padding-left: 2vmin;
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  li {
    font-size: 1.4rem;
    line-height: 2.5 * 1.4rem;
  }
}
.preview-wrap {
  position: relative;
  width: 46%;
}
.subject {
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  -ms-wrap-margin: 0;
}

.display-check {
  position: relative;
  display: inline-block;
  width: 1.9rem;
  height: 1.9rem;
  vertical-align: middle;
  border: 0.14rem solid $unselected-element-color;
  border-radius: 20% 20%;
  margin-right: 7%;
  cursor: pointer;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    font-size: 100%;
    color: $unselected-element-color;
    cursor: pointer;
    user-select: none;
  }
}

.setting-checkbox:checked ~ .display-check {
  border: 0.14rem solid $primary-color;
  background-color: $primary-color;
  span {
    color: #fff;
    font-weight: bold;
  }
}

input {
  display: none;
}

.fontsize-setting {
  padding-left: 2vmin;
  .fontsizebtn-flex {
    display: flex;
    vertical-align: middle;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }

  .fontsize-btn {
    display: block;
    width: 6rem;
    height: 3rem;
    margin-top: 1vh;
    margin-right: 3vh;
    background-color: white;
    color: $unselected-element-color;
    text-align: center;
    line-height: 3rem;
    border: $unselected-element-color 0.14rem solid;
    border-radius: 3rem;
    user-select: none;
  }
  label:nth-child(1) {
    font-size: 1.5rem;
  }
  label:nth-child(2) {
    font-size: 1.8rem;
  }
  label:nth-child(3) {
    font-size: 2rem;
  }
  .setting-radio:checked ~ .fontsize-btn {
    border: $primary-color 0.14rem solid;
    background-color: $primary-color;
    color: white;
    opacity: 1;
  }
}
</style>
