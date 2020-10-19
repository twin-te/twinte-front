/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
import { Methods as Methods0 } from './_provider'
import { Methods as Methods1 } from './logout'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/auth'
  const PATH1 = '/auth/logout'
  const GET = 'GET'

  return {
    _provider: (val0: number | string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        get: (option?: { query?: Methods0['get']['query']; config?: T }) =>
          fetch<void, BasicHeaders, Methods0['get']['status']>(
            prefix,
            prefix0,
            GET,
            option
          ).send(),
        $get: (option?: { query?: Methods0['get']['query']; config?: T }) =>
          fetch<void, BasicHeaders, Methods0['get']['status']>(
            prefix,
            prefix0,
            GET,
            option
          )
            .send()
            .then((r) => r.body),
        $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
          `${prefix}${prefix0}${
            option && option.query ? `?${dataToURLString(option.query)}` : ''
          }`,
      }
    },
    logout: {
      get: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods1['get']['status']>(
          prefix,
          PATH1,
          GET,
          option
        ).send(),
      $get: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods1['get']['status']>(
          prefix,
          PATH1,
          GET,
          option
        )
          .send()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
