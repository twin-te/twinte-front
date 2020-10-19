/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
import { Methods as Methods0 } from './_date@string'
import { Methods as Methods1 } from './substitutes/list'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/school-calender'
  const PATH1 = '/school-calender/substitutes/list'
  const GET = 'GET'

  return {
    _date: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        get: (option?: { config?: T }) =>
          fetch<
            Methods0['get']['resBody'],
            BasicHeaders,
            Methods0['get']['status']
          >(prefix, prefix0, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<
            Methods0['get']['resBody'],
            BasicHeaders,
            Methods0['get']['status']
          >(prefix, prefix0, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      }
    },
    substitutes: {
      list: {
        get: (option: { query: Methods1['get']['query']; config?: T }) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, PATH1, GET, option).json(),
        $get: (option: { query: Methods1['get']['query']; config?: T }) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, PATH1, GET, option)
            .json()
            .then((r) => r.body),
        $path: (option?: { method?: 'get'; query: Methods1['get']['query'] }) =>
          `${prefix}${PATH1}${
            option && option.query ? `?${dataToURLString(option.query)}` : ''
          }`,
      },
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
