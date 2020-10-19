/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida'
import { Methods as Methods0 } from '.'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/payment/totalAmount'
  const GET = 'GET'

  return {
    get: (option?: { config?: T }) =>
      fetch<void, BasicHeaders, Methods0['get']['status']>(
        prefix,
        PATH0,
        GET,
        option
      ).send(),
    $get: (option?: { config?: T }) =>
      fetch<void, BasicHeaders, Methods0['get']['status']>(
        prefix,
        PATH0,
        GET,
        option
      )
        .send()
        .then((r) => r.body),
    $path: () => `${prefix}${PATH0}`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
