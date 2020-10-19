import { Plugin } from '@nuxt/types'
import axiosClient from '@aspida/axios'
import api, { ApiInstance } from '~/api/$api'

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiInstance
  }
}

const plugin: Plugin = ({ $axios }, inject) =>
  inject('api', api(axiosClient($axios, { withCredentials: true })))

export default plugin
