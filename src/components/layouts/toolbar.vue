<template>
  <!-- 上につける緑のバー -->
  <div>
    <nav class="top">
      <div class="svg-button" @click="clickSettings">
        <!-- material.io <svg id="i_settings" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="none" d="M0 0h20v20H0V0z"/><path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" fill="white"/></svg> -->
        <svg id="i_settings" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.0258 13.188L21.0137 13.212C21.0622 12.816 21.1108 12.408 21.1108 12C21.1108 11.592 21.0744 11.208 21.0258 10.812L21.0379 10.836L24 8.532L21.0501 3.468L17.566 4.86L17.5781 4.872C16.9469 4.392 16.2549 3.984 15.5023 3.672H15.5144L14.956 0H9.04401L8.50986 3.684H8.522C7.76935 3.996 7.07739 4.404 6.44613 4.884L6.45827 4.872L2.96206 3.468L0 8.532L2.96206 10.836L2.9742 10.812C2.92565 11.208 2.88923 11.592 2.88923 12C2.88923 12.408 2.92564 12.816 2.98634 13.212L2.9742 13.188L0.424886 15.168L0.0242795 15.48L2.9742 20.52L6.47041 19.14L6.44613 19.092C7.08953 19.584 7.78149 19.992 8.54628 20.304H8.50986L9.05614 24H14.9439C14.9439 24 14.9803 23.784 15.0167 23.496L15.478 20.316H15.4659C16.2185 20.004 16.9226 19.596 17.566 19.104L17.5417 19.152L21.0379 20.532L23.9879 15.492C23.9879 15.492 23.8179 15.348 23.5873 15.18L21.0258 13.188ZM11.9939 16.2C9.65099 16.2 7.74507 14.316 7.74507 12C7.74507 9.684 9.65099 7.8 11.9939 7.8C14.3369 7.8 16.2428 9.684 16.2428 12C16.2428 14.316 14.3369 16.2 11.9939 16.2Z" fill="white"/></svg>
      </div>
      <icon>Twin:te</icon>
      <button class="svg-button" @click="this.$emit('chAdder')">
        <svg id="i_add" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 13.7143H13.7143V24H10.2857V13.7143H0V10.2857H10.2857V0H13.7143V10.2857H24V13.7143Z" fill="white"/></svg>
      </button>
    </nav>
    <nav class="sub"></nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
  /**
   * clickSettings
   * @description 歯車を押したときに呼ばれる。drawerの呼び出し
   * @todo ２回押さないと実行されない不具合はvuexに移行することで解決する
   */
  public clickSettings() {
    this.$emit('chDrawer');
  }
}
</script>

<style lang="sass" scoped>
.top
  width: 375px
  height: 56px
  background-color: #00C0C0
  font-size: 2em
icon
  position: absolute
  width: 117px
  height: 33px
  left: 129px
  top: 11px
.sub
  background: #C7C7C7
  height: 2px
#i_settings
  position: absolute
  left: 17px
  top: 17px
#i_add
  position: absolute
  left: 334px
  top: 16px
.svg-button
  border: none
  background: none
  cursor: pointer
  &:focus
    outline: 2px dashed #17171D
  &:hover
    svg
      transform: scale(1.1)
  svg
    outline: none
    transition: transform 0.3s liner


</style>
