/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
import { Methods as Methods0 } from '.'
import { Methods as Methods1 } from './_user_lecture_id@string'
import { Methods as Methods2 } from './lecture-code-csv/_year@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/user-lectures'
  const PATH1 = '/user-lectures/lecture-code-csv'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    _user_lecture_id: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        get: (option?: { config?: T }) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, prefix0, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, prefix0, GET, option)
            .json()
            .then((r) => r.body),
        put: (option: { body: Methods1['put']['reqBody']; config?: T }) =>
          fetch<
            Methods1['put']['resBody'],
            BasicHeaders,
            Methods1['put']['status']
          >(prefix, prefix0, PUT, option).json(),
        $put: (option: { body: Methods1['put']['reqBody']; config?: T }) =>
          fetch<
            Methods1['put']['resBody'],
            BasicHeaders,
            Methods1['put']['status']
          >(prefix, prefix0, PUT, option)
            .json()
            .then((r) => r.body),
        delete: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(
            prefix,
            prefix0,
            DELETE,
            option
          ).send(),
        $delete: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(
            prefix,
            prefix0,
            DELETE,
            option
          )
            .send()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      }
    },
    lecture_code_csv: {
      _year: (val1: number) => {
        const prefix1 = `${PATH1}/${val1}`

        return {
          get: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods2['get']['status']>(
              prefix,
              prefix1,
              GET,
              option
            ).send(),
          $get: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods2['get']['status']>(
              prefix,
              prefix1,
              GET,
              option
            )
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        }
      },
    },
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

    get: (option?: { query?: Methods0['get']['query']; config?: T }) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option).json(),
    $get: (option?: { query?: Methods0['get']['query']; config?: T }) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option)
        .json()
        .then((r) => r.body),
    $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
      `${prefix}${PATH0}${
        option && option.query ? `?${dataToURLString(option.query)}` : ''
      }`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
