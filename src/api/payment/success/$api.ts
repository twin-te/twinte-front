/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
import { Methods as Methods0 } from '.'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/payment/success'
  const GET = 'GET'

  return {
    get: (option: { query: Methods0['get']['query']; config?: T }) =>
      fetch<void, BasicHeaders, Methods0['get']['status']>(
        prefix,
        PATH0,
        GET,
        option
      ).send(),
    $get: (option: { query: Methods0['get']['query']; config?: T }) =>
      fetch<void, BasicHeaders, Methods0['get']['status']>(
        prefix,
        PATH0,
        GET,
        option
      )
        .send()
        .then((r) => r.body),
    $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
      `${prefix}${PATH0}${
        option && option.query ? `?${dataToURLString(option.query)}` : ''
      }`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
