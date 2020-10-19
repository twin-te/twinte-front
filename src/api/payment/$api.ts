/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
import { Methods as Methods0 } from '.'
import { Methods as Methods1 } from './checkout-session/onetime'
import { Methods as Methods2 } from './checkout-session/subscription'
import { Methods as Methods3 } from './subscriptions'
import { Methods as Methods4 } from './subscriptions/_id@string'
import { Methods as Methods5 } from './success'
import { Methods as Methods6 } from './totalAmount'
import { Methods as Methods7 } from './users'
import { Methods as Methods8 } from './users/me'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/payment'
  const PATH1 = '/payment/checkout-session/onetime'
  const PATH2 = '/payment/checkout-session/subscription'
  const PATH3 = '/payment/subscriptions'
  const PATH4 = '/payment/success'
  const PATH5 = '/payment/totalAmount'
  const PATH6 = '/payment/users'
  const PATH7 = '/payment/users/me'
  const GET = 'GET'
  const POST = 'POST'
  const DELETE = 'DELETE'
  const PATCH = 'PATCH'

  return {
    checkout_session: {
      onetime: {
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
      subscription: {
        post: (option: { body: Methods2['post']['reqBody']; config?: T }) =>
          fetch<
            Methods2['post']['resBody'],
            BasicHeaders,
            Methods2['post']['status']
          >(prefix, PATH2, POST, option).json(),
        $post: (option: { body: Methods2['post']['reqBody']; config?: T }) =>
          fetch<
            Methods2['post']['resBody'],
            BasicHeaders,
            Methods2['post']['status']
          >(prefix, PATH2, POST, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH2}`,
      },
    },
    subscriptions: {
      _id: (val0: string) => {
        const prefix0 = `${PATH3}/${val0}`

        return {
          delete: (option?: { config?: T }) =>
            fetch<
              Methods4['delete']['resBody'],
              BasicHeaders,
              Methods4['delete']['status']
            >(prefix, prefix0, DELETE, option).json(),
          $delete: (option?: { config?: T }) =>
            fetch<
              Methods4['delete']['resBody'],
              BasicHeaders,
              Methods4['delete']['status']
            >(prefix, prefix0, DELETE, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}`,
        }
      },
      get: (option?: { config?: T }) =>
        fetch<
          Methods3['get']['resBody'],
          BasicHeaders,
          Methods3['get']['status']
        >(prefix, PATH3, GET, option).json(),
      $get: (option?: { config?: T }) =>
        fetch<
          Methods3['get']['resBody'],
          BasicHeaders,
          Methods3['get']['status']
        >(prefix, PATH3, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH3}`,
    },
    success: {
      get: (option: { query: Methods5['get']['query']; config?: T }) =>
        fetch<void, BasicHeaders, Methods5['get']['status']>(
          prefix,
          PATH4,
          GET,
          option
        ).send(),
      $get: (option: { query: Methods5['get']['query']; config?: T }) =>
        fetch<void, BasicHeaders, Methods5['get']['status']>(
          prefix,
          PATH4,
          GET,
          option
        )
          .send()
          .then((r) => r.body),
      $path: (option?: { method?: 'get'; query: Methods5['get']['query'] }) =>
        `${prefix}${PATH4}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    totalAmount: {
      get: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods6['get']['status']>(
          prefix,
          PATH5,
          GET,
          option
        ).send(),
      $get: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods6['get']['status']>(
          prefix,
          PATH5,
          GET,
          option
        )
          .send()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH5}`,
    },
    users: {
      me: {
        get: (option?: { config?: T }) =>
          fetch<
            Methods8['get']['resBody'],
            BasicHeaders,
            Methods8['get']['status']
          >(prefix, PATH7, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<
            Methods8['get']['resBody'],
            BasicHeaders,
            Methods8['get']['status']
          >(prefix, PATH7, GET, option)
            .json()
            .then((r) => r.body),
        patch: (option: { body: Methods8['patch']['reqBody']; config?: T }) =>
          fetch<
            Methods8['patch']['resBody'],
            BasicHeaders,
            Methods8['patch']['status']
          >(prefix, PATH7, PATCH, option).json(),
        $patch: (option: { body: Methods8['patch']['reqBody']; config?: T }) =>
          fetch<
            Methods8['patch']['resBody'],
            BasicHeaders,
            Methods8['patch']['status']
          >(prefix, PATH7, PATCH, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH7}`,
      },
      get: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods7['get']['status']>(
          prefix,
          PATH6,
          GET,
          option
        ).send(),
      $get: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods7['get']['status']>(
          prefix,
          PATH6,
          GET,
          option
        )
          .send()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH6}`,
    },
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
    $path: () => `${prefix}${PATH0}`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
