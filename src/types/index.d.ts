import './shims-vuex-impl'
import './shims-vuex-type'

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

type LectureFormat = 'Asynchronous' | 'Synchronous' | 'FaceToFace' | 'Others'

type Module =
  | '春A'
  | '春B'
  | '春C'
  | '秋A'
  | '秋B'
  | '秋C'
  | '夏季休業中'
  | '春季休業中'
  | '通年'
  | '不明'

export { SubjectSettings, LectureFormat, Module }
