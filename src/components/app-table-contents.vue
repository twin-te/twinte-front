/** -> "../pages/index.vue" */
<template>
  <content class="row">
    <!-- 時限 -->
    <section class="column">
      <div
        id="time"
        v-for="i in 6"
        :key="i"
        :style="{ background: i % 2 === 0 ? '#F3F3F3' : '#F8F8F8' }"
      >
        {{ i }}
      </div>
    </section>

    <!-- 授業 -->
    <section class="column">
      <div v-for="y in 6" :key="y" class="row">
      <ripple v-for="x in 5" :key="x">
        <div
          id="subject"
          @click="chAdd()"
          v-if="
            table === null ||
              table[module] === undefined ||
              table[module][x - 1][y - 1].number === 'undefined'
          "
        ></div>
        <div
          id="subject"
          :style="{
            background: getColor(table[module][x - 1][y - 1].number),
          }"
          @click="chDetail(x, y)"
          v-else
        >
          <div style="font-size: 9px">
            {{ table[module][x - 1][y - 1].number }}
          </div>
          <div style="font-size: 8px">
            {{ table[module][x - 1][y - 1].name }}
          </div>
          <div style="font-size: 9px">
            {{ table[module][x - 1][y - 1].classroom }}
          </div>
        </div>
      </ripple>
      </div>
    </section>
  </content>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'

@Component({
  components: {
    ripple: () => import('~/components/ui-ripple.vue'),
  },
})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  chDetail(x: number, y: number): void {
    console.log(x, y) //TODO
    this.$store.commit('visible/chDetail', { bool: true })
  }
  chAdd() {
    this.$store.commit('visible/chAdd', { bool: true })
  }

  get table() {
    return this.$store.getters['old_api/data']
  }
  get module() {
    return this.$store.getters['table/moduleNum']
  }

  /** 授業に応じたテーマ色を返す */
  getColor(number: string): string {
    const char = number.split('')[0]
    switch (char) {
      case 'A': return '#DEFFF9'
      case 'B': return '#DEFFF9'
      case 'C': return '#DEFFF9'
      case 'E': return '#DEFFF9'
      case 'F': return '#DEFFF9'
      case 'G': return '#DEFFF9'
      case 'H': return '#DEFFF9'
      case 'W': return '#DEFFF9'
      case 'Y': return '#DEFFF9'
      case '1': return '#FFEEF7'
      case '2': return '#F0EBFF'
      case '3': return '#FFFCEB'
      default : return ''
    }
  }
}
</script>

<style lang="sass" scoped>
$height: calc((100vh - 43px - 58px - 40px) / 6)
$width: calc((100vw - 48px - 13vw) / 5)

content
  margin-left: 14px
  margin-right: 14px
  padding: 10px
  box-shadow: 3px 3px 16px rgba(147, 147, 147, 0.25)
  border-radius: 10px
.row
  display: flex
  flex-direction: row
.column
  display: flex
  flex-direction: column
div
  color: #555555
#time
  width: 13vw
  height: $height
  font-style: normal
  font-weight: 600
  font-size: 11px
  line-height: 15px
  text-align: center
  color: #9A9A9A
#subject
  width: $width
  height: $height
  word-break: break-all
  font-style: normal
  font-weight: 600
  font-size: 9px
  line-height: 12px
</style>
