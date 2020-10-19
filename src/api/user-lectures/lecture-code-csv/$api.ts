/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida'
import { Methods as Methods0 } from './_year@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/user-lectures/lecture-code-csv'
  const GET = 'GET'

  return {
    _year: (val0: number) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        get: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods0['get']['status']>(
            prefix,
            prefix0,
            GET,
            option
          ).send(),
        $get: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods0['get']['status']>(
            prefix,
            prefix0,
            GET,
            option
          )
            .send()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      }
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
