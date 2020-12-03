export * from '~/api/@types'

/**
 * 表示設定
 * 現状ユーザーデータとしてサーバーで管理せず、端末ごとに管理してる
 */
type SubjectSettings = {
  lecture_name: boolean
  lecture_code: boolean
  instructor: boolean
  room: boolean
  font_size: 'small' | 'medium' | 'large'
}

export { SubjectSettings }
