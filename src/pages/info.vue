<template>
  <main class="display-settings">
    <h1 class="info">Twin:teからのお知らせ一覧</h1>
    <div class="info__post" v-for="info in information" :key="info.id">
      <div class="info__date">{{ info.date }}</div>
      <h2 class="info__topic-title">{{ info.title }}</h2>
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
