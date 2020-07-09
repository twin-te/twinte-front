import { getSchoolCalender } from './school-calender'

jest.setTimeout(30000)

describe(getSchoolCalender.name, () => {
  it('basic usage', async () => {
    const cal = await getSchoolCalender('2020-06-01')
    expect(cal.status).toBe(200)
    expect(cal.data).toMatchSnapshot('cal__result')
  })
})
