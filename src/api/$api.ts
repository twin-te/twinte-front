/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
import { Methods as Methods0 } from './auth/_provider'
import { Methods as Methods1 } from './auth/logout'
import { Methods as Methods2 } from './information'
import { Methods as Methods3 } from './internal-information'
import { Methods as Methods4 } from './internal-information/_info_id@string'
import { Methods as Methods5 } from './lectures/search'
import { Methods as Methods6 } from './payment'
import { Methods as Methods7 } from './payment/checkout-session/onetime'
import { Methods as Methods8 } from './payment/checkout-session/subscription'
import { Methods as Methods9 } from './payment/subscriptions'
import { Methods as Methods10 } from './payment/subscriptions/_id@string'
import { Methods as Methods11 } from './payment/success'
import { Methods as Methods12 } from './payment/totalAmount'
import { Methods as Methods13 } from './payment/users'
import { Methods as Methods14 } from './payment/users/me'
import { Methods as Methods15 } from './school-calender/_date@string'
import { Methods as Methods16 } from './school-calender/substitutes/list'
import { Methods as Methods17 } from './system'
import { Methods as Methods18 } from './timetables'
import { Methods as Methods19 } from './timetables/_year@number/_module/_day/_period@number'
import { Methods as Methods20 } from './user-lectures'
import { Methods as Methods21 } from './user-lectures/_user_lecture_id@string'
import { Methods as Methods22 } from './user-lectures/lecture-code-csv/_year@number'
import { Methods as Methods23 } from './users/me'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/auth'
  const PATH1 = '/auth/logout'
  const PATH2 = '/information'
  const PATH3 = '/internal-information'
  const PATH4 = '/lectures/search'
  const PATH5 = '/payment'
  const PATH6 = '/payment/checkout-session/onetime'
  const PATH7 = '/payment/checkout-session/subscription'
  const PATH8 = '/payment/subscriptions'
  const PATH9 = '/payment/success'
  const PATH10 = '/payment/totalAmount'
  const PATH11 = '/payment/users'
  const PATH12 = '/payment/users/me'
  const PATH13 = '/school-calender'
  const PATH14 = '/school-calender/substitutes/list'
  const PATH15 = '/system'
  const PATH16 = '/timetables'
  const PATH17 = '/user-lectures'
  const PATH18 = '/user-lectures/lecture-code-csv'
  const PATH19 = '/users/me'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'
  const PATCH = 'PATCH'

  return {
    auth: {
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
          $path: (option?: {
            method?: 'get'
            query: Methods0['get']['query']
          }) =>
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
    },
    information: {
      get: (option?: { query?: Methods2['get']['query']; config?: T }) =>
        fetch<
          Methods2['get']['resBody'],
          BasicHeaders,
          Methods2['get']['status']
        >(prefix, PATH2, GET, option).json(),
      $get: (option?: { query?: Methods2['get']['query']; config?: T }) =>
        fetch<
          Methods2['get']['resBody'],
          BasicHeaders,
          Methods2['get']['status']
        >(prefix, PATH2, GET, option)
          .json()
          .then((r) => r.body),
      $path: (option?: { method?: 'get'; query: Methods2['get']['query'] }) =>
        `${prefix}${PATH2}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    internal_information: {
      _info_id: (val1: string) => {
        const prefix1 = `${PATH3}/${val1}`

        return {
          put: (option: { body: Methods4['put']['reqBody']; config?: T }) =>
            fetch<
              Methods4['put']['resBody'],
              BasicHeaders,
              Methods4['put']['status']
            >(prefix, prefix1, PUT, option).json(),
          $put: (option: { body: Methods4['put']['reqBody']; config?: T }) =>
            fetch<
              Methods4['put']['resBody'],
              BasicHeaders,
              Methods4['put']['status']
            >(prefix, prefix1, PUT, option)
              .json()
              .then((r) => r.body),
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods4['delete']['status']>(
              prefix,
              prefix1,
              DELETE,
              option
            ).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods4['delete']['status']>(
              prefix,
              prefix1,
              DELETE,
              option
            )
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        }
      },
      post: (option: { body: Methods3['post']['reqBody']; config?: T }) =>
        fetch<
          Methods3['post']['resBody'],
          BasicHeaders,
          Methods3['post']['status']
        >(prefix, PATH3, POST, option).json(),
      $post: (option: { body: Methods3['post']['reqBody']; config?: T }) =>
        fetch<
          Methods3['post']['resBody'],
          BasicHeaders,
          Methods3['post']['status']
        >(prefix, PATH3, POST, option)
          .json()
          .then((r) => r.body),
      get: (option?: { query?: Methods3['get']['query']; config?: T }) =>
        fetch<
          Methods3['get']['resBody'],
          BasicHeaders,
          Methods3['get']['status']
        >(prefix, PATH3, GET, option).json(),
      $get: (option?: { query?: Methods3['get']['query']; config?: T }) =>
        fetch<
          Methods3['get']['resBody'],
          BasicHeaders,
          Methods3['get']['status']
        >(prefix, PATH3, GET, option)
          .json()
          .then((r) => r.body),
      $path: (option?: { method?: 'get'; query: Methods3['get']['query'] }) =>
        `${prefix}${PATH3}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    lectures: {
      search: {
        get: (option: { query: Methods5['get']['query']; config?: T }) =>
          fetch<
            Methods5['get']['resBody'],
            BasicHeaders,
            Methods5['get']['status']
          >(prefix, PATH4, GET, option).json(),
        $get: (option: { query: Methods5['get']['query']; config?: T }) =>
          fetch<
            Methods5['get']['resBody'],
            BasicHeaders,
            Methods5['get']['status']
          >(prefix, PATH4, GET, option)
            .json()
            .then((r) => r.body),
        $path: (option?: { method?: 'get'; query: Methods5['get']['query'] }) =>
          `${prefix}${PATH4}${
            option && option.query ? `?${dataToURLString(option.query)}` : ''
          }`,
      },
    },
    payment: {
      checkout_session: {
        onetime: {
          post: (option: { body: Methods7['post']['reqBody']; config?: T }) =>
            fetch<
              Methods7['post']['resBody'],
              BasicHeaders,
              Methods7['post']['status']
            >(prefix, PATH6, POST, option).json(),
          $post: (option: { body: Methods7['post']['reqBody']; config?: T }) =>
            fetch<
              Methods7['post']['resBody'],
              BasicHeaders,
              Methods7['post']['status']
            >(prefix, PATH6, POST, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH6}`,
        },
        subscription: {
          post: (option: { body: Methods8['post']['reqBody']; config?: T }) =>
            fetch<
              Methods8['post']['resBody'],
              BasicHeaders,
              Methods8['post']['status']
            >(prefix, PATH7, POST, option).json(),
          $post: (option: { body: Methods8['post']['reqBody']; config?: T }) =>
            fetch<
              Methods8['post']['resBody'],
              BasicHeaders,
              Methods8['post']['status']
            >(prefix, PATH7, POST, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH7}`,
        },
      },
      subscriptions: {
        _id: (val2: string) => {
          const prefix2 = `${PATH8}/${val2}`

          return {
            delete: (option?: { config?: T }) =>
              fetch<
                Methods10['delete']['resBody'],
                BasicHeaders,
                Methods10['delete']['status']
              >(prefix, prefix2, DELETE, option).json(),
            $delete: (option?: { config?: T }) =>
              fetch<
                Methods10['delete']['resBody'],
                BasicHeaders,
                Methods10['delete']['status']
              >(prefix, prefix2, DELETE, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
        get: (option?: { config?: T }) =>
          fetch<
            Methods9['get']['resBody'],
            BasicHeaders,
            Methods9['get']['status']
          >(prefix, PATH8, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<
            Methods9['get']['resBody'],
            BasicHeaders,
            Methods9['get']['status']
          >(prefix, PATH8, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH8}`,
      },
      success: {
        get: (option: { query: Methods11['get']['query']; config?: T }) =>
          fetch<void, BasicHeaders, Methods11['get']['status']>(
            prefix,
            PATH9,
            GET,
            option
          ).send(),
        $get: (option: { query: Methods11['get']['query']; config?: T }) =>
          fetch<void, BasicHeaders, Methods11['get']['status']>(
            prefix,
            PATH9,
            GET,
            option
          )
            .send()
            .then((r) => r.body),
        $path: (option?: {
          method?: 'get'
          query: Methods11['get']['query']
        }) =>
          `${prefix}${PATH9}${
            option && option.query ? `?${dataToURLString(option.query)}` : ''
          }`,
      },
      totalAmount: {
        get: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods12['get']['status']>(
            prefix,
            PATH10,
            GET,
            option
          ).send(),
        $get: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods12['get']['status']>(
            prefix,
            PATH10,
            GET,
            option
          )
            .send()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH10}`,
      },
      users: {
        me: {
          get: (option?: { config?: T }) =>
            fetch<
              Methods14['get']['resBody'],
              BasicHeaders,
              Methods14['get']['status']
            >(prefix, PATH12, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<
              Methods14['get']['resBody'],
              BasicHeaders,
              Methods14['get']['status']
            >(prefix, PATH12, GET, option)
              .json()
              .then((r) => r.body),
          patch: (option: {
            body: Methods14['patch']['reqBody']
            config?: T
          }) =>
            fetch<
              Methods14['patch']['resBody'],
              BasicHeaders,
              Methods14['patch']['status']
            >(prefix, PATH12, PATCH, option).json(),
          $patch: (option: {
            body: Methods14['patch']['reqBody']
            config?: T
          }) =>
            fetch<
              Methods14['patch']['resBody'],
              BasicHeaders,
              Methods14['patch']['status']
            >(prefix, PATH12, PATCH, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH12}`,
        },
        get: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods13['get']['status']>(
            prefix,
            PATH11,
            GET,
            option
          ).send(),
        $get: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods13['get']['status']>(
            prefix,
            PATH11,
            GET,
            option
          )
            .send()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH11}`,
      },
      get: (option?: { config?: T }) =>
        fetch<
          Methods6['get']['resBody'],
          BasicHeaders,
          Methods6['get']['status']
        >(prefix, PATH5, GET, option).json(),
      $get: (option?: { config?: T }) =>
        fetch<
          Methods6['get']['resBody'],
          BasicHeaders,
          Methods6['get']['status']
        >(prefix, PATH5, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH5}`,
    },
    school_calender: {
      _date: (val3: string) => {
        const prefix3 = `${PATH13}/${val3}`

        return {
          get: (option?: { config?: T }) =>
            fetch<
              Methods15['get']['resBody'],
              BasicHeaders,
              Methods15['get']['status']
            >(prefix, prefix3, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<
              Methods15['get']['resBody'],
              BasicHeaders,
              Methods15['get']['status']
            >(prefix, prefix3, GET, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix3}`,
        }
      },
      substitutes: {
        list: {
          get: (option: { query: Methods16['get']['query']; config?: T }) =>
            fetch<
              Methods16['get']['resBody'],
              BasicHeaders,
              Methods16['get']['status']
            >(prefix, PATH14, GET, option).json(),
          $get: (option: { query: Methods16['get']['query']; config?: T }) =>
            fetch<
              Methods16['get']['resBody'],
              BasicHeaders,
              Methods16['get']['status']
            >(prefix, PATH14, GET, option)
              .json()
              .then((r) => r.body),
          $path: (option?: {
            method?: 'get'
            query: Methods16['get']['query']
          }) =>
            `${prefix}${PATH14}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
      },
    },
    system: {
      get: (option?: { config?: T }) =>
        fetch<
          Methods17['get']['resBody'],
          BasicHeaders,
          Methods17['get']['status']
        >(prefix, PATH15, GET, option).json(),
      $get: (option?: { config?: T }) =>
        fetch<
          Methods17['get']['resBody'],
          BasicHeaders,
          Methods17['get']['status']
        >(prefix, PATH15, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH15}`,
    },
    timetables: {
      _year: (val4: number) => {
        const prefix4 = `${PATH16}/${val4}`

        return {
          _module: (val5: number | string) => {
            const prefix5 = `${prefix4}/${val5}`

            return {
              _day: (val6: number | string) => {
                const prefix6 = `${prefix5}/${val6}`

                return {
                  _period: (val7: number) => {
                    const prefix7 = `${prefix6}/${val7}`

                    return {
                      get: (option?: { config?: T }) =>
                        fetch<
                          Methods19['get']['resBody'],
                          BasicHeaders,
                          Methods19['get']['status']
                        >(prefix, prefix7, GET, option).json(),
                      $get: (option?: { config?: T }) =>
                        fetch<
                          Methods19['get']['resBody'],
                          BasicHeaders,
                          Methods19['get']['status']
                        >(prefix, prefix7, GET, option)
                          .json()
                          .then((r) => r.body),
                      put: (option: {
                        body: Methods19['put']['reqBody']
                        config?: T
                      }) =>
                        fetch<
                          Methods19['put']['resBody'],
                          BasicHeaders,
                          Methods19['put']['status']
                        >(prefix, prefix7, PUT, option).json(),
                      $put: (option: {
                        body: Methods19['put']['reqBody']
                        config?: T
                      }) =>
                        fetch<
                          Methods19['put']['resBody'],
                          BasicHeaders,
                          Methods19['put']['status']
                        >(prefix, prefix7, PUT, option)
                          .json()
                          .then((r) => r.body),
                      delete: (option?: { config?: T }) =>
                        fetch<
                          void,
                          BasicHeaders,
                          Methods19['delete']['status']
                        >(prefix, prefix7, DELETE, option).send(),
                      $delete: (option?: { config?: T }) =>
                        fetch<
                          void,
                          BasicHeaders,
                          Methods19['delete']['status']
                        >(prefix, prefix7, DELETE, option)
                          .send()
                          .then((r) => r.body),
                      $path: () => `${prefix}${prefix7}`,
                    }
                  },
                }
              },
            }
          },
        }
      },
      post: (option: { body: Methods18['post']['reqBody']; config?: T }) =>
        fetch<
          Methods18['post']['resBody'],
          BasicHeaders,
          Methods18['post']['status']
        >(prefix, PATH16, POST, option).json(),
      $post: (option: { body: Methods18['post']['reqBody']; config?: T }) =>
        fetch<
          Methods18['post']['resBody'],
          BasicHeaders,
          Methods18['post']['status']
        >(prefix, PATH16, POST, option)
          .json()
          .then((r) => r.body),
      get: (option?: { query?: Methods18['get']['query']; config?: T }) =>
        fetch<
          Methods18['get']['resBody'],
          BasicHeaders,
          Methods18['get']['status']
        >(prefix, PATH16, GET, option).json(),
      $get: (option?: { query?: Methods18['get']['query']; config?: T }) =>
        fetch<
          Methods18['get']['resBody'],
          BasicHeaders,
          Methods18['get']['status']
        >(prefix, PATH16, GET, option)
          .json()
          .then((r) => r.body),
      $path: (option?: { method?: 'get'; query: Methods18['get']['query'] }) =>
        `${prefix}${PATH16}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    user_lectures: {
      _user_lecture_id: (val8: string) => {
        const prefix8 = `${PATH17}/${val8}`

        return {
          get: (option?: { config?: T }) =>
            fetch<
              Methods21['get']['resBody'],
              BasicHeaders,
              Methods21['get']['status']
            >(prefix, prefix8, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<
              Methods21['get']['resBody'],
              BasicHeaders,
              Methods21['get']['status']
            >(prefix, prefix8, GET, option)
              .json()
              .then((r) => r.body),
          put: (option: { body: Methods21['put']['reqBody']; config?: T }) =>
            fetch<
              Methods21['put']['resBody'],
              BasicHeaders,
              Methods21['put']['status']
            >(prefix, prefix8, PUT, option).json(),
          $put: (option: { body: Methods21['put']['reqBody']; config?: T }) =>
            fetch<
              Methods21['put']['resBody'],
              BasicHeaders,
              Methods21['put']['status']
            >(prefix, prefix8, PUT, option)
              .json()
              .then((r) => r.body),
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods21['delete']['status']>(
              prefix,
              prefix8,
              DELETE,
              option
            ).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods21['delete']['status']>(
              prefix,
              prefix8,
              DELETE,
              option
            )
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix8}`,
        }
      },
      lecture_code_csv: {
        _year: (val9: number) => {
          const prefix9 = `${PATH18}/${val9}`

          return {
            get: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods22['get']['status']>(
                prefix,
                prefix9,
                GET,
                option
              ).send(),
            $get: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods22['get']['status']>(
                prefix,
                prefix9,
                GET,
                option
              )
                .send()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix9}`,
          }
        },
      },
      post: (option: { body: Methods20['post']['reqBody']; config?: T }) =>
        fetch<
          Methods20['post']['resBody'],
          BasicHeaders,
          Methods20['post']['status']
        >(prefix, PATH17, POST, option).json(),
      $post: (option: { body: Methods20['post']['reqBody']; config?: T }) =>
        fetch<
          Methods20['post']['resBody'],
          BasicHeaders,
          Methods20['post']['status']
        >(prefix, PATH17, POST, option)
          .json()
          .then((r) => r.body),
      get: (option?: { query?: Methods20['get']['query']; config?: T }) =>
        fetch<
          Methods20['get']['resBody'],
          BasicHeaders,
          Methods20['get']['status']
        >(prefix, PATH17, GET, option).json(),
      $get: (option?: { query?: Methods20['get']['query']; config?: T }) =>
        fetch<
          Methods20['get']['resBody'],
          BasicHeaders,
          Methods20['get']['status']
        >(prefix, PATH17, GET, option)
          .json()
          .then((r) => r.body),
      $path: (option?: { method?: 'get'; query: Methods20['get']['query'] }) =>
        `${prefix}${PATH17}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    users: {
      me: {
        get: (option?: { config?: T }) =>
          fetch<
            Methods23['get']['resBody'],
            BasicHeaders,
            Methods23['get']['status']
          >(prefix, PATH19, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<
            Methods23['get']['resBody'],
            BasicHeaders,
            Methods23['get']['status']
          >(prefix, PATH19, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH19}`,
      },
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
