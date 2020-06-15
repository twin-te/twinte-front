import axios, { AxiosResponse } from 'axios'
import marked from 'marked'

import { BASE_URL } from '../common/config'

export type Information = {
  id: string
  title: string
  content: string
  date: string
}[]

/**
 * 運営からのお知らせを取得する
 *
 * [
 *   {
 *     "date": "2020-06-14 20:00:00",
 *     "id": "eab4dbd6-7e52-45a5-8c92-23b9bdde9226",
 *     "title": "お知らせ機能を追加しました！",
 *     "content": "# Twin:te（ついんて）とは？\n\n## 筑波大生による筑波大生のための時間割アプリ\n\n筑波大生に最適な設計になっており、いかに時間割を簡単に作るかに重きを置いています。\nわずか数ステップで時間割を作成・管理することができます。\n\n\n現在もOSSとして保守・アップデートが行われているため、新たな機能を提案していただくことも可能です。\n\n## Twinsから安全に時間割を自動登録\n\nTwin:teではTwinsの時間割データを用いて簡単に時間割を作成することができます。\n また昨今の危険性が指摘されている時間割アプリのように、学籍番号やパスワードといった情報をサーバー側で取得することはございません。\n（どのような動作原理なのかは [開発者ブログ](https://twinte.hatenablog.com/)をご参照ください。また全てのソースコードを[Github](https://github.com/twin-te) にて公開しています。）",
 *     "tag": "info"
 *   }
 * ]
 */
export const getInformation = async (
  limit = 50,
  offset = 0
): Promise<AxiosResponse<Information>> => {
  const url = `${BASE_URL}/information/`

  return axios.get<Information>(url, {
    params: {
      limit,
      offset,
    },
  })
}

/**
 * markdownをHTMLに変換
 */
export const parse = (infos: Information): Information => {
  return infos.map((info) => ({ ...info, content: marked(info.content) }))
}
