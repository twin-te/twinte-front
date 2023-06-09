import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './courses'
import type { Methods as Methods1 } from './courses/_year@number/_code@string'
import type { Methods as Methods2 } from './courses/search'
import type { Methods as Methods3 } from './donation/aggregate/totalAmount'
import type { Methods as Methods4 } from './donation/aggregate/users'
import type { Methods as Methods5 } from './donation/payment'
import type { Methods as Methods6 } from './donation/session/onetime'
import type { Methods as Methods7 } from './donation/session/subscription'
import type { Methods as Methods8 } from './donation/subscriptions'
import type { Methods as Methods9 } from './donation/subscriptions/_id@string'
import type { Methods as Methods10 } from './donation/users/me'
import type { Methods as Methods11 } from './information'
import type { Methods as Methods12 } from './information/_id@string'
import type { Methods as Methods13 } from './registered-courses'
import type { Methods as Methods14 } from './registered-courses/_id@string'
import type { Methods as Methods15 } from './school-calendar/events'
import type { Methods as Methods16 } from './school-calendar/modules'
import type { Methods as Methods17 } from './tags'
import type { Methods as Methods18 } from './tags/_id@string'
import type { Methods as Methods19 } from './timetable/_date@string'
import type { Methods as Methods20 } from './users/me'
import type { AspidaClient, BasicHeaders } from 'aspida'

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
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix2, GET, option).json(),
              /**
               * @returns 成功
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
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
        post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH1, POST, option).json(),
        /**
         * @param option.body - 検索クエリ
         * @returns 成功
         */
        $post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      },
      /**
       * 指定した複数の講義を取得する。 指定された講義が一部見つからない場合もエラーなく完了するが、 それらは結果には含まれない。
       * @returns 成功
       */
      get: (option: { query: Methods0['get']['query'], config?: T | undefined }) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
      /**
       * 指定した複数の講義を取得する。 指定された講義が一部見つからない場合もエラーなく完了するが、 それらは結果には含まれない。
       * @returns 成功
       */
      $get: (option: { query: Methods0['get']['query'], config?: T | undefined }) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods0['get']['query'] } | undefined) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    donation: {
      aggregate: {
        totalAmount: {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH2, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH2}`
        },
        users: {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH3, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH3}`
        }
      },
      payment: {
        /**
         * @returns 成功
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH4, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH4}`
      },
      session: {
        onetime: {
          /**
           * @returns 成功
           */
          post: (option: { body: Methods6['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['post']['resBody'], BasicHeaders, Methods6['post']['status']>(prefix, PATH5, POST, option).json(),
          /**
           * @returns 成功
           */
          $post: (option: { body: Methods6['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['post']['resBody'], BasicHeaders, Methods6['post']['status']>(prefix, PATH5, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH5}`
        },
        subscription: {
          /**
           * @returns 成功
           */
          post: (option: { body: Methods7['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods7['post']['resBody'], BasicHeaders, Methods7['post']['status']>(prefix, PATH6, POST, option).json(),
          /**
           * @returns 成功
           */
          $post: (option: { body: Methods7['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods7['post']['resBody'], BasicHeaders, Methods7['post']['status']>(prefix, PATH6, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH6}`
        }
      },
      subscriptions: {
        _id: (val2: string) => {
          const prefix2 = `${PATH7}/${val2}`

          return {
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods9['delete']['status']>(prefix, prefix2, DELETE, option).send(),
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods9['delete']['status']>(prefix, prefix2, DELETE, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix2}`
          }
        },
        /**
         * @returns 成功
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, PATH7, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, PATH7, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH7}`
      },
      users: {
        me: {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, PATH8, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, PATH8, GET, option).json().then(r => r.body),
          /**
           * @returns 成功
           */
          patch: (option: { body: Methods10['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods10['patch']['resBody'], BasicHeaders, Methods10['patch']['status']>(prefix, PATH8, PATCH, option).json(),
          /**
           * @returns 成功
           */
          $patch: (option: { body: Methods10['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods10['patch']['resBody'], BasicHeaders, Methods10['patch']['status']>(prefix, PATH8, PATCH, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH8}`
        }
      }
    },
    information: {
      _id: (val1: string) => {
        const prefix1 = `${PATH9}/${val1}`

        return {
          put: (option: { body: Methods12['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods12['put']['status']>(prefix, prefix1, PUT, option).send(),
          $put: (option: { body: Methods12['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods12['put']['status']>(prefix, prefix1, PUT, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns 成功
       */
      get: (option: { query: Methods11['get']['query'], config?: T | undefined }) =>
        fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, PATH9, GET, option).json(),
      /**
       * @returns 成功
       */
      $get: (option: { query: Methods11['get']['query'], config?: T | undefined }) =>
        fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, PATH9, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods11['get']['query'] } | undefined) =>
        `${prefix}${PATH9}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    registered_courses: {
      _id: (val1: string) => {
        const prefix1 = `${PATH10}/${val1}`

        return {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods14['get']['resBody'], BasicHeaders, Methods14['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods14['get']['resBody'], BasicHeaders, Methods14['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          /**
           * @returns 成功
           */
          put: (option: { body: Methods14['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods14['put']['resBody'], BasicHeaders, Methods14['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * @returns 成功
           */
          $put: (option: { body: Methods14['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods14['put']['resBody'], BasicHeaders, Methods14['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods14['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods14['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns 成功
       */
      get: (option: { query: Methods13['get']['query'], config?: T | undefined }) =>
        fetch<Methods13['get']['resBody'], BasicHeaders, Methods13['get']['status']>(prefix, PATH10, GET, option).json(),
      /**
       * @returns 成功
       */
      $get: (option: { query: Methods13['get']['query'], config?: T | undefined }) =>
        fetch<Methods13['get']['resBody'], BasicHeaders, Methods13['get']['status']>(prefix, PATH10, GET, option).json().then(r => r.body),
      /**
       * @returns 成功
       */
      post: (option: { body: Methods13['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods13['post']['resBody'], BasicHeaders, Methods13['post']['status']>(prefix, PATH10, POST, option).json(),
      /**
       * @returns 成功
       */
      $post: (option: { body: Methods13['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods13['post']['resBody'], BasicHeaders, Methods13['post']['status']>(prefix, PATH10, POST, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods13['get']['query'] } | undefined) =>
        `${prefix}${PATH10}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    school_calendar: {
      events: {
        /**
         * @returns 成功
         */
        get: (option: { query: Methods15['get']['query'], config?: T | undefined }) =>
          fetch<Methods15['get']['resBody'], BasicHeaders, Methods15['get']['status']>(prefix, PATH11, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option: { query: Methods15['get']['query'], config?: T | undefined }) =>
          fetch<Methods15['get']['resBody'], BasicHeaders, Methods15['get']['status']>(prefix, PATH11, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods15['get']['query'] } | undefined) =>
          `${prefix}${PATH11}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      modules: {
        /**
         * @returns 成功
         */
        get: (option: { query: Methods16['get']['query'], config?: T | undefined }) =>
          fetch<Methods16['get']['resBody'], BasicHeaders, Methods16['get']['status']>(prefix, PATH12, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option: { query: Methods16['get']['query'], config?: T | undefined }) =>
          fetch<Methods16['get']['resBody'], BasicHeaders, Methods16['get']['status']>(prefix, PATH12, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods16['get']['query'] } | undefined) =>
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
          put: (option: { body: Methods18['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods18['put']['resBody'], BasicHeaders, Methods18['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * @returns 成功
           */
          $put: (option: { body: Methods18['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods18['put']['resBody'], BasicHeaders, Methods18['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods18['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods18['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns 成功
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods17['get']['resBody'], BasicHeaders, Methods17['get']['status']>(prefix, PATH13, GET, option).json(),
      /**
       * @returns 成功
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods17['get']['resBody'], BasicHeaders, Methods17['get']['status']>(prefix, PATH13, GET, option).json().then(r => r.body),
      /**
       * 新しいタグは末尾に追加されます
       * @returns 成功
       */
      post: (option: { body: Methods17['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods17['post']['resBody'], BasicHeaders, Methods17['post']['status']>(prefix, PATH13, POST, option).json(),
      /**
       * 新しいタグは末尾に追加されます
       * @returns 成功
       */
      $post: (option: { body: Methods17['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods17['post']['resBody'], BasicHeaders, Methods17['post']['status']>(prefix, PATH13, POST, option).json().then(r => r.body),
      /**
       * positionを変更するタグのidとpositionの配列を送信してください。
       * positionが重複している場合はエラーになります。
       * @returns 成功
       */
      patch: (option: { body: Methods17['patch']['reqBody'], config?: T | undefined }) =>
        fetch<Methods17['patch']['resBody'], BasicHeaders, Methods17['patch']['status']>(prefix, PATH13, PATCH, option).json(),
      /**
       * positionを変更するタグのidとpositionの配列を送信してください。
       * positionが重複している場合はエラーになります。
       * @returns 成功
       */
      $patch: (option: { body: Methods17['patch']['reqBody'], config?: T | undefined }) =>
        fetch<Methods17['patch']['resBody'], BasicHeaders, Methods17['patch']['status']>(prefix, PATH13, PATCH, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH13}`
    },
    timetable: {
      _date: (val1: string) => {
        const prefix1 = `${PATH14}/${val1}`

        return {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods19['get']['resBody'], BasicHeaders, Methods19['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods19['get']['resBody'], BasicHeaders, Methods19['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      }
    },
    users: {
      me: {
        /**
         * @returns 成功
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods20['get']['resBody'], BasicHeaders, Methods20['get']['status']>(prefix, PATH15, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods20['get']['resBody'], BasicHeaders, Methods20['get']['status']>(prefix, PATH15, GET, option).json().then(r => r.body),
        delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods20['delete']['status']>(prefix, PATH15, DELETE, option).send(),
        $delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods20['delete']['status']>(prefix, PATH15, DELETE, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH15}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
