import axios, { AxiosResponse } from 'axios'

import { BASE_URL } from '../common/config'

export type SchoolCalender = {
  event?: {
    description: string
    event_type: string
    metadata: any
    date: string
  }
  substituteDay?: {
    date: string
    change_to: string
  }
  module: string
}

export const getSchoolCalender = async (
  date: string
): Promise<AxiosResponse<SchoolCalender>> => {
  const url = `${BASE_URL}/school-calender​/${date}`
    // ゼロ幅スペース削除
    .replace(/[\u200B-\u200D\uFEFF]/g, '')

  return axios.get<SchoolCalender>(url)
}

export type SubstitutesList = {
  date: string
  change_to: string
}[]

export const getSchoolCalenderSubstitutesList = async (): Promise<
  AxiosResponse<SubstitutesList>
> => {
  const url = `${BASE_URL}/school-calender/substitutes/list`

  return axios.get<SubstitutesList>(url)
}
