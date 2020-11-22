export const getToday = async () => {
  const today = $nuxt.$dayjs().format('YYYY-MM-DD')
  return await $nuxt.$api.school_calender._date(today).$get()
}
