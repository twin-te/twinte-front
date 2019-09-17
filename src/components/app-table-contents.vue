/** -> "../pages/index.vue" */
<template>
  <transition :name="moveDirection === 'left' ? 'slide-l' : 'slide-r'">
    <content class="row" v-show="visible">
      <!-- 時限 -->
      <section class="column">
        <div
          id="time"
          v-for="i in 6"
          :key="i"
          :style="{ background: i % 2 === 0 ? '#F3F3F3' : '#F8F8F8' }"
        >
          {{ i }}
          <p>{{ timeTable[i - 1][0] }}</p>
          <p class="tilde">~</p>
          <p>{{ timeTable[i - 1][1] }}</p>
        </div>
      </section>

      <!-- 授業 -->
      <section class="column">
        <div v-for="y in 6" :key="y" class="row">
          <div v-for="x in 5" :key="x">
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
                background: getColor(table[module][x - 1][y - 1].number)
              }"
              @click="popUp(x, y)"
              v-else
            >
              <div class="sbj-number">
                {{ table[module][x - 1][y - 1].number }}
              </div>
              <div class="sbj-name">
                {{ table[module][x - 1][y - 1].name }}
              </div>
              <div class="sbj-classroom">
                {{ table[module][x - 1][y - 1].classroom }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </content>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Vuex from "vuex";

@Component({
  components: {
    ripple: () => import("~/components/ui-ripple.vue")
  }
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;
  timeTable = [
    ['8:40', '9:55'],
    ['10:10', '11:25'],
    ['12:15', '13:30'],
    ['13:45', '15:00'],
    ['15:15', '16:30'],
    ['16:45', '18:00']
  ]
  popUp(x: number, y: number) {
    if (
      this.table === null ||
      this.table[this.module] === null ||
      this.table[this.module][x - 1][y - 1].number === ""
    ) {
      this.chAdd();
    } else {
      this.chDetail(x, y);
    }
  }
  chDetail(x: number, y: number) {
    console.log(x, y); //TODO
    this.$store.commit("visible/chDetail", { display: true });
  }
  chAdd() {
    this.$store.commit("visible/chAdd", { display: true });
  }

  get table() {
    return this.$store.getters["old_api/data"];
  }
  get module() {
    return this.$store.getters["table/moduleNum"];
  }
  get visible() {
    return this.$store.getters["visible/table"].display;
  }
  get moveDirection() {
    return this.$store.getters["visible/table"].move;
  }

  /** 授業に応じたテーマ色を返す */
  getColor(number: string): string {
    const char = number.split("")[0];
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
      default: return ''
    }
  }
}
</script>

<style lang="scss" scoped>
$height: calc((100vh - 16.5vh - 6vmin - 12vmin) / 6);
$subject-height: calc((100vh - 58px - 62px - 37px - 12vh) / 6);
$width: calc((100vw - 8vw - 10vw - 13vw) / 5);

content {
  position: relative;
  margin: 2vmin 2vw;
  padding: 2vmin 2vw;
  box-shadow: 3px 3px 16px rgba(147, 147, 147, 0.25);
  border-radius: 10px;
  top: 7vh;
}
.row {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
}
div {
  color: #555555;
}
#time {
  width: calc(11vw);
  height: $height;
  font-style: normal;
  font-weight: 500;
  font-size: 1.9vh;
  line-height: 3vh;
  text-align: center;
  color: #9a9a9a;
  padding: 1vmin 1vw;
}

.column p {
  font-size: 1.5vh;
  line-height: 1vh;
  font-weight: 400;
}
.tilde {
  transform: rotate(90deg);
}
#subject {
  width: $width;
  height: $height;
  padding: 1vmin 1vw;
  word-break: break-all;
  font-style: normal;
  font-weight: 700;
  font-size: 1.3vh;
  line-height: 2vh;
  overflow: hidden;
}
.sbj-number {
  font-weight: 400;
}
.sbj-name {
  font-weight: 700;
}
.sbj-classroom {
  font-weight: 400;
}

/* animation */
.slide-l-enter-active,
.slide-l-leave-active {
  transition: transform 0.2s ease;
}
.slide-l-enter {
  transform: translateX(-100%);
}
.slide-l-leave-to {
  transform: translateX(100%);
}

.slide-r-enter-active,
.slide-r-leave-active {
  transition: transform 0.2s ease;
}
.slide-r-enter {
  transform: translateX(100%);
}
.slide-r-leave-to {
  transform: translateX(-100%);
}
</style>
