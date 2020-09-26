<template>
  <main class="infomations">
    <h1>Twin:teからのお知らせ一覧</h1>
    <section
      class="infomations__post infomations__card"
      v-for="info in information"
      :key="info.id"
    >
      <div class="infomations__card__date">{{ info.date }}</div>
      <h2 class="infomations__card__topic-title">{{ info.title }}</h2>
      <div class="infomations__card__content" v-html="info.content" />
    </section>
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

@mixin elipsis {
  width: 100%;
  line-height: 140%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.infomations {
  padding: 1vh 6vw;
  max-width: 70vh;
  margin: 0 auto;

  h1 {
    font-size: 1.6rem;
    font-weight: 400;
    margin-bottom: 2vh;
  }

  &__card {
    background-color: white;
    border-radius: 1rem;
    box-shadow: $middle-shadow;
    margin: 1vh auto 2vh auto;
    padding: 3vh 5vmin;

    &__date {
      color: $sub-text-color;
      font-size: 1.1rem;
      margin: 0 0 1.5%;
    }

    &__topic-title {
      @include elipsis;

      color: $yellow-orange;
      font-size: 1.4rem;
      margin: 0 0 3%;
    }
    &__content {
      display: inline-block;
      color: $main-text-color;
      font-size: 1.2rem;
      margin: 0;

      /deep/ h2 {
        font-size: 1.35rem;
      }
      /deep/ h3 {
        font-size: 1.3rem;
      }
      /deep/ p {
        margin: 0 0 5%;
        padding: 0;
        line-height: 140%;
      }
      /deep/ a {
        text-decoration: none;
        color: $link-text-color;
      }
    }
  }
}
</style>
