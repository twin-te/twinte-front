/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida'
import { Methods as Methods0 } from '.'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/payment/users/me'
  const GET = 'GET'
  const PATCH = 'PATCH'

  return {
    get: (option?: { config?: T }) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option).json(),
    $get: (option?: { config?: T }) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option)
        .json()
        .then((r) => r.body),
    patch: (option: { body: Methods0['patch']['reqBody']; config?: T }) =>
      fetch<
        Methods0['patch']['resBody'],
        BasicHeaders,
        Methods0['patch']['status']
      >(prefix, PATH0, PATCH, option).json(),
    $patch: (option: { body: Methods0['patch']['reqBody']; config?: T }) =>
      fetch<
        Methods0['patch']['resBody'],
        BasicHeaders,
        Methods0['patch']['status']
      >(prefix, PATH0, PATCH, option)
        .json()
        .then((r) => r.body),
    $path: () => `${prefix}${PATH0}`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
