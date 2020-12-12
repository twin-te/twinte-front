import { YEAR } from '~/config'
import { UserLectureEntity } from '~/api/@types'

export class UserLectures {
  /**
   * 指定した講義のユーザーデータを追加
   * 取得された `user_lecture_id` はとっても大事
   */
  async postUserData(
    lecture_name: string,
    instructor: string,
    credits = 0,
    formats = []
  ) {
    try {
      const data = await $nuxt.$api.user_lectures.$post({
        body: {
          year: YEAR,
          lecture_name,
          instructor,
          credits,
          formats,
        },
      })
      return data
    } catch (error) {
      return null
    }
  }

  /**
   * 指定した講義のユーザーデータを取得
   * @param user_lecture_id
   */
  async getUserData(user_lecture_id: string) {
    const data = await $nuxt.$api.user_lectures
      ._user_lecture_id(user_lecture_id)
      .$get()

    return data
  }

  /**
   * 指定した講義のユーザーデータを更新
   * @param user_lecture_id
   */
  async updateUserData(userLecture: UserLectureEntity) {
    const data = await $nuxt.$api.user_lectures
      ._user_lecture_id(userLecture.user_lecture_id)
      .$put({ body: userLecture })

    return data
  }

  /**
   * 指定した講義のユーザーデータを削除
   * @param user_lecture_id
   */
  async deleteUserData(user_lecture_id: string) {
    await $nuxt.$api.user_lectures._user_lecture_id(user_lecture_id).$delete()
  }
}
