export class SchoolCalendar {
  async getByDate(day: string) {
    return await $nuxt.$api.school_calender._date(day).$get()
  }

  async getToday() {
    const today = $nuxt.$dayjs().format('YYYY-MM-DD')
    return await this.getByDate(today)
  }
}
