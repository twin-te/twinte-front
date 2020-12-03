import { Dayjs } from 'dayjs'
import { YEAR } from '~/config'

export class SchoolCalendar {
  async getEvents(day: Dayjs, year = YEAR) {
    const events = await $nuxt.$api.school_calendar.events.$get({
      query: { year },
    })

    return events.find((event) => {
      const eventDate = $nuxt.$dayjs(event.date)
      const target = $nuxt.$dayjs(day)

      return target.isSame(eventDate)
    })
  }

  async getTodayEvent() {
    const today = $nuxt.$dayjs()
    return await this.getEvents(today)
  }

  async getModules(day: Dayjs, year = YEAR) {
    const modules = await $nuxt.$api.school_calendar.modules.$get({
      query: { year },
    })

    return modules.find((module) => {
      const target = $nuxt.$dayjs(day)
      const start = $nuxt.$dayjs(module.start)
      const end = $nuxt.$dayjs(module.end)

      return target.isAfter(start) && target.isBefore(end)
    })
  }

  async getTodayModule() {
    const today = $nuxt.$dayjs()
    return await this.getModules(today)
  }
}
