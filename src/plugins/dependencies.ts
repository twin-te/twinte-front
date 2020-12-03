import { Plugin } from '@nuxt/types'
import {
  Courses,
  Ports,
  RegisteredCourses,
  SchoolCalendar,
  Users,
} from '~/adapter'
import { Tags } from '~/adapter/api/tags'

declare module 'vue/types/vue' {
  interface Vue {
    $deps: Ports
  }
}

/**
 * DI
 */
const plugin: Plugin = ({ store }, inject) => {
  const deps: Ports = {
    courses: new Courses(),
    registeredCourses: new RegisteredCourses(),
    schoolCalendar: new SchoolCalendar(),
    users: new Users(),
    tags: new Tags(),
    store,
  }

  inject('deps', deps)
}

export default plugin
