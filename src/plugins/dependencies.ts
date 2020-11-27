import { Plugin } from '@nuxt/types'
import {
  Auth,
  Information,
  Lecture,
  Ports,
  SchoolCalendar,
  TimeTable,
  UserLectures,
} from '~/adapter'

declare module 'vue/types/vue' {
  interface Vue {
    $deps: Ports
  }
}

/**
 * DI
 */
const plugin: Plugin = ({}, inject) => {
  const deps: Ports = {
    auth: new Auth(),
    information: new Information(),
    lecture: new Lecture(),
    schoolCalendar: new SchoolCalendar(),
    timeTable: new TimeTable(),
    userLectures: new UserLectures(),
  }

  inject('deps', deps)
}

export default plugin
