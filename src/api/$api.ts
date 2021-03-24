/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
import { Methods as Methods0 } from './courses/_year@number/_code@string'
import { Methods as Methods1 } from './courses/search'
import { Methods as Methods2 } from './registered-courses'
import { Methods as Methods3 } from './registered-courses/_id@string'
import { Methods as Methods4 } from './school-calendar/events'
import { Methods as Methods5 } from './school-calendar/modules'
import { Methods as Methods6 } from './tags'
import { Methods as Methods7 } from './tags/_id@string'
import { Methods as Methods8 } from './timetable/_date@string'
import { Methods as Methods9 } from './users/me'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://api.dev.twinte.net/v3' : baseURL).replace(/\/$/, '')
  const PATH0 = '/courses'
  const PATH1 = '/courses/search'
  const PATH2 = '/registered-courses'
  const PATH3 = '/school-calendar/events'
  const PATH4 = '/school-calendar/modules'
  const PATH5 = '/tags'
  const PATH6 = '/timetable'
  const PATH7 = '/users/me'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

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
                fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, prefix2, GET, option).json(),
              /**
               * @returns 成功
               */
              $get: (option?: { config?: T }) =>
                fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}`
            }
          }
        }
      },
      search: {
        /**
         * @returns 成功
         */
        post: (option?: { config?: T }) =>
          fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).json(),
        /**
         * @returns 成功
         */
        $post: (option?: { config?: T }) =>
          fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      }
    },
    registered_courses: {
      _id: (val1: string) => {
        const prefix1 = `${PATH2}/${val1}`

        return {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T }) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T }) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          /**
           * @returns 成功
           */
          put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
            fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * @returns 成功
           */
          $put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
            fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns 成功
       */
      get: (option: { query: Methods2['get']['query'], config?: T }) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json(),
      /**
       * @returns 成功
       */
      $get: (option: { query: Methods2['get']['query'], config?: T }) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
      /**
       * @returns 成功
       */
      post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
        fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json(),
      /**
       * @returns 成功
       */
      $post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
        fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods2['get']['query'] }) =>
        `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    school_calendar: {
      events: {
        /**
         * @returns 成功
         */
        get: (option: { query: Methods4['get']['query'], config?: T }) =>
          fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH3, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option: { query: Methods4['get']['query'], config?: T }) =>
          fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods4['get']['query'] }) =>
          `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      modules: {
        /**
         * @returns 成功
         */
        get: (option: { query: Methods5['get']['query'], config?: T }) =>
          fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH4, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option: { query: Methods5['get']['query'], config?: T }) =>
          fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods5['get']['query'] }) =>
          `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      }
    },
    tags: {
      _id: (val1: string) => {
        const prefix1 = `${PATH5}/${val1}`

        return {
          /**
           * @returns 成功
           */
          put: (option: { body: Methods7['put']['reqBody'], config?: T }) =>
            fetch<Methods7['put']['resBody'], BasicHeaders, Methods7['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * @returns 成功
           */
          $put: (option: { body: Methods7['put']['reqBody'], config?: T }) =>
            fetch<Methods7['put']['resBody'], BasicHeaders, Methods7['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods7['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods7['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns 成功
       */
      get: (option?: { config?: T }) =>
        fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, PATH5, GET, option).json(),
      /**
       * @returns 成功
       */
      $get: (option?: { config?: T }) =>
        fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, PATH5, GET, option).json().then(r => r.body),
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
    timetable: {
      _date: (val1: string) => {
        const prefix1 = `${PATH6}/${val1}`

        return {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T }) =>
            fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T }) =>
            fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
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
          fetch<Methods9['get']['resBody'], BasicHeaders, Methods9['get']['status']>(prefix, PATH7, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option?: { config?: T }) =>
          fetch<Methods9['get']['resBody'], BasicHeaders, Methods9['get']['status']>(prefix, PATH7, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH7}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
