/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida'
import { Methods as Methods0 } from '.'
import { Methods as Methods1 } from './me'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/payment/users'
  const PATH1 = '/payment/users/me'
  const GET = 'GET'
  const PATCH = 'PATCH'

  return {
    me: {
      get: (option?: { config?: T }) =>
        fetch<
          Methods1['get']['resBody'],
          BasicHeaders,
          Methods1['get']['status']
        >(prefix, PATH1, GET, option).json(),
      $get: (option?: { config?: T }) =>
        fetch<
          Methods1['get']['resBody'],
          BasicHeaders,
          Methods1['get']['status']
        >(prefix, PATH1, GET, option)
          .json()
          .then((r) => r.body),
      patch: (option: { body: Methods1['patch']['reqBody']; config?: T }) =>
        fetch<
          Methods1['patch']['resBody'],
          BasicHeaders,
          Methods1['patch']['status']
        >(prefix, PATH1, PATCH, option).json(),
      $patch: (option: { body: Methods1['patch']['reqBody']; config?: T }) =>
        fetch<
          Methods1['patch']['resBody'],
          BasicHeaders,
          Methods1['patch']['status']
        >(prefix, PATH1, PATCH, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
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
