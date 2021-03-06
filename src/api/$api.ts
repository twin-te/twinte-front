/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
import { Methods as Methods0 } from './courses'
import { Methods as Methods1 } from './courses/_year@number/_code@string'
import { Methods as Methods2 } from './courses/search'
import { Methods as Methods3 } from './donation/aggregate/totalAmount'
import { Methods as Methods4 } from './donation/aggregate/users'
import { Methods as Methods5 } from './donation/payment'
import { Methods as Methods6 } from './donation/session/onetime'
import { Methods as Methods7 } from './donation/session/subscription'
import { Methods as Methods8 } from './donation/subscriptions'
import { Methods as Methods9 } from './donation/subscriptions/_id@string'
import { Methods as Methods10 } from './donation/users/me'
import { Methods as Methods11 } from './information'
import { Methods as Methods12 } from './registered-courses'
import { Methods as Methods13 } from './registered-courses/_id@string'
import { Methods as Methods14 } from './school-calendar/events'
import { Methods as Methods15 } from './school-calendar/modules'
import { Methods as Methods16 } from './tags'
import { Methods as Methods17 } from './tags/_id@string'
import { Methods as Methods18 } from './timetable/_date@string'
import { Methods as Methods19 } from './users/me'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/courses'
  const PATH1 = '/courses/search'
  const PATH2 = '/donation/aggregate/totalAmount'
  const PATH3 = '/donation/aggregate/users'
  const PATH4 = '/donation/payment'
  const PATH5 = '/donation/session/onetime'
  const PATH6 = '/donation/session/subscription'
  const PATH7 = '/donation/subscriptions'
  const PATH8 = '/donation/users/me'
  const PATH9 = '/information'
  const PATH10 = '/registered-courses'
  const PATH11 = '/school-calendar/events'
  const PATH12 = '/school-calendar/modules'
  const PATH13 = '/tags'
  const PATH14 = '/timetable'
  const PATH15 = '/users/me'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'
  const PATCH = 'PATCH'

  return {
    courses: {
      _year: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}`

        return {
          _code: (val2: string) => {
            const prefix2 = `${prefix1}/${val2}`

            return {
              /**
               * @returns 成功
               */
              get: (option?: { config?: T }) =>
                fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix2, GET, option).json(),
              /**
               * @returns 成功
               */
              $get: (option?: { config?: T }) =>
                fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}`
            }
          }
        }
      },
      search: {
        /**
         * @param option.body - 検索クエリ
         * @returns 成功
         */
        post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
          fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH1, POST, option).json(),
        /**
         * @param option.body - 検索クエリ
         * @returns 成功
         */
        $post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
          fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      },
      /**
       * 指定した複数の講義を取得する。 指定された講義が一部見つからない場合もエラーなく完了するが、 それらは結果には含まれない。
       * @returns 成功
       */
      get: (option: { query: Methods0['get']['query'], config?: T }) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
      /**
       * 指定した複数の講義を取得する。 指定された講義が一部見つからない場合もエラーなく完了するが、 それらは結果には含まれない。
       * @returns 成功
       */
      $get: (option: { query: Methods0['get']['query'], config?: T }) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    donation: {
      aggregate: {
        totalAmount: {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T }) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH2, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T }) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH2}`
        },
        users: {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T }) =>
            fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH3, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T }) =>
            fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH3}`
        }
      },
      payment: {
        /**
         * @returns 成功
         */
        get: (option?: { config?: T }) =>
          fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH4, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option?: { config?: T }) =>
          fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH4}`
      },
      session: {
        onetime: {
          /**
           * @returns 成功
           */
          post: (option: { body: Methods6['post']['reqBody'], config?: T }) =>
            fetch<Methods6['post']['resBody'], BasicHeaders, Methods6['post']['status']>(prefix, PATH5, POST, option).json(),
          /**
           * @returns 成功
           */
          $post: (option: { body: Methods6['post']['reqBody'], config?: T }) =>
            fetch<Methods6['post']['resBody'], BasicHeaders, Methods6['post']['status']>(prefix, PATH5, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH5}`
        },
        subscription: {
          /**
           * @returns 成功
           */
          post: (option: { body: Methods7['post']['reqBody'], config?: T }) =>
            fetch<Methods7['post']['resBody'], BasicHeaders, Methods7['post']['status']>(prefix, PATH6, POST, option).json(),
          /**
           * @returns 成功
           */
          $post: (option: { body: Methods7['post']['reqBody'], config?: T }) =>
            fetch<Methods7['post']['resBody'], BasicHeaders, Methods7['post']['status']>(prefix, PATH6, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH6}`
        }
      },
      subscriptions: {
        _id: (val2: string) => {
          const prefix2 = `${PATH7}/${val2}`

          return {
            delete: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods9['delete']['status']>(prefix, prefix2, DELETE, option).send(),
            $delete: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods9['delete']['status']>(prefix, prefix2, DELETE, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix2}`
          }
        },
        /**
         * @returns 成功
         */
        get: (option?: { config?: T }) =>
          fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, PATH7, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option?: { config?: T }) =>
          fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, PATH7, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH7}`
      },
      users: {
        me: {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T }) =>
            fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, PATH8, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T }) =>
            fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, PATH8, GET, option).json().then(r => r.body),
          /**
           * @returns 成功
           */
          patch: (option: { body: Methods10['patch']['reqBody'], config?: T }) =>
            fetch<Methods10['patch']['resBody'], BasicHeaders, Methods10['patch']['status']>(prefix, PATH8, PATCH, option).json(),
          /**
           * @returns 成功
           */
          $patch: (option: { body: Methods10['patch']['reqBody'], config?: T }) =>
            fetch<Methods10['patch']['resBody'], BasicHeaders, Methods10['patch']['status']>(prefix, PATH8, PATCH, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH8}`
        }
      }
    },
    information: {
      /**
       * @returns 成功
       */
      get: (option: { query: Methods11['get']['query'], config?: T }) =>
        fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, PATH9, GET, option).json(),
      /**
       * @returns 成功
       */
      $get: (option: { query: Methods11['get']['query'], config?: T }) =>
        fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, PATH9, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods11['get']['query'] }) =>
        `${prefix}${PATH9}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    registered_courses: {
      _id: (val1: string) => {
        const prefix1 = `${PATH10}/${val1}`

        return {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T }) =>
            fetch<Methods13['get']['resBody'], BasicHeaders, Methods13['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T }) =>
            fetch<Methods13['get']['resBody'], BasicHeaders, Methods13['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          /**
           * @returns 成功
           */
          put: (option: { body: Methods13['put']['reqBody'], config?: T }) =>
            fetch<Methods13['put']['resBody'], BasicHeaders, Methods13['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * @returns 成功
           */
          $put: (option: { body: Methods13['put']['reqBody'], config?: T }) =>
            fetch<Methods13['put']['resBody'], BasicHeaders, Methods13['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods13['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods13['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns 成功
       */
      get: (option: { query: Methods12['get']['query'], config?: T }) =>
        fetch<Methods12['get']['resBody'], BasicHeaders, Methods12['get']['status']>(prefix, PATH10, GET, option).json(),
      /**
       * @returns 成功
       */
      $get: (option: { query: Methods12['get']['query'], config?: T }) =>
        fetch<Methods12['get']['resBody'], BasicHeaders, Methods12['get']['status']>(prefix, PATH10, GET, option).json().then(r => r.body),
      /**
       * @returns 成功
       */
      post: (option: { body: Methods12['post']['reqBody'], config?: T }) =>
        fetch<Methods12['post']['resBody'], BasicHeaders, Methods12['post']['status']>(prefix, PATH10, POST, option).json(),
      /**
       * @returns 成功
       */
      $post: (option: { body: Methods12['post']['reqBody'], config?: T }) =>
        fetch<Methods12['post']['resBody'], BasicHeaders, Methods12['post']['status']>(prefix, PATH10, POST, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods12['get']['query'] }) =>
        `${prefix}${PATH10}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    school_calendar: {
      events: {
        /**
         * @returns 成功
         */
        get: (option: { query: Methods14['get']['query'], config?: T }) =>
          fetch<Methods14['get']['resBody'], BasicHeaders, Methods14['get']['status']>(prefix, PATH11, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option: { query: Methods14['get']['query'], config?: T }) =>
          fetch<Methods14['get']['resBody'], BasicHeaders, Methods14['get']['status']>(prefix, PATH11, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods14['get']['query'] }) =>
          `${prefix}${PATH11}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      modules: {
        /**
         * @returns 成功
         */
        get: (option: { query: Methods15['get']['query'], config?: T }) =>
          fetch<Methods15['get']['resBody'], BasicHeaders, Methods15['get']['status']>(prefix, PATH12, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option: { query: Methods15['get']['query'], config?: T }) =>
          fetch<Methods15['get']['resBody'], BasicHeaders, Methods15['get']['status']>(prefix, PATH12, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods15['get']['query'] }) =>
          `${prefix}${PATH12}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      }
    },
    tags: {
      _id: (val1: string) => {
        const prefix1 = `${PATH13}/${val1}`

        return {
          /**
           * @returns 成功
           */
          put: (option: { body: Methods17['put']['reqBody'], config?: T }) =>
            fetch<Methods17['put']['resBody'], BasicHeaders, Methods17['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * @returns 成功
           */
          $put: (option: { body: Methods17['put']['reqBody'], config?: T }) =>
            fetch<Methods17['put']['resBody'], BasicHeaders, Methods17['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods17['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods17['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns 成功
       */
      get: (option?: { config?: T }) =>
        fetch<Methods16['get']['resBody'], BasicHeaders, Methods16['get']['status']>(prefix, PATH13, GET, option).json(),
      /**
       * @returns 成功
       */
      $get: (option?: { config?: T }) =>
        fetch<Methods16['get']['resBody'], BasicHeaders, Methods16['get']['status']>(prefix, PATH13, GET, option).json().then(r => r.body),
      /**
       * @returns 成功
       */
      post: (option: { body: Methods16['post']['reqBody'], config?: T }) =>
        fetch<Methods16['post']['resBody'], BasicHeaders, Methods16['post']['status']>(prefix, PATH13, POST, option).json(),
      /**
       * @returns 成功
       */
      $post: (option: { body: Methods16['post']['reqBody'], config?: T }) =>
        fetch<Methods16['post']['resBody'], BasicHeaders, Methods16['post']['status']>(prefix, PATH13, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH13}`
    },
    timetable: {
      _date: (val1: string) => {
        const prefix1 = `${PATH14}/${val1}`

        return {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T }) =>
            fetch<Methods18['get']['resBody'], BasicHeaders, Methods18['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T }) =>
            fetch<Methods18['get']['resBody'], BasicHeaders, Methods18['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      }
    },
    users: {
      me: {
        /**
         * @returns 成功
         */
        get: (option?: { config?: T }) =>
          fetch<Methods19['get']['resBody'], BasicHeaders, Methods19['get']['status']>(prefix, PATH15, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option?: { config?: T }) =>
          fetch<Methods19['get']['resBody'], BasicHeaders, Methods19['get']['status']>(prefix, PATH15, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH15}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
