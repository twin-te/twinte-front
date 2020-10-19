/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida'
import { Methods as Methods0 } from './onetime'
import { Methods as Methods1 } from './subscription'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/payment/checkout-session/onetime'
  const PATH1 = '/payment/checkout-session/subscription'
  const POST = 'POST'

  return {
    onetime: {
      post: (option: { body: Methods0['post']['reqBody']; config?: T }) =>
        fetch<
          Methods0['post']['resBody'],
          BasicHeaders,
          Methods0['post']['status']
        >(prefix, PATH0, POST, option).json(),
      $post: (option: { body: Methods0['post']['reqBody']; config?: T }) =>
        fetch<
          Methods0['post']['resBody'],
          BasicHeaders,
          Methods0['post']['status']
        >(prefix, PATH0, POST, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    subscription: {
      post: (option: { body: Methods1['post']['reqBody']; config?: T }) =>
        fetch<
          Methods1['post']['resBody'],
          BasicHeaders,
          Methods1['post']['status']
        >(prefix, PATH1, POST, option).json(),
      $post: (option: { body: Methods1['post']['reqBody']; config?: T }) =>
        fetch<
          Methods1['post']['resBody'],
          BasicHeaders,
          Methods1['post']['status']
        >(prefix, PATH1, POST, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
