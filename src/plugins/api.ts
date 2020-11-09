import { Plugin } from '@nuxt/types'
import axiosClient from '@aspida/axios'
import { AxiosInstance } from 'axios'
import api, { ApiInstance } from '~/api/$api'
import { BASE_URL } from '~/config'

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiInstance
  }
}

const plugin: Plugin = ({ $axios }, inject) =>
  inject(
    'api',
    api(
      axiosClient($axios as AxiosInstance, {
        withCredentials: true,
        baseURL: BASE_URL,
      })
    )
  )

export default plugin
