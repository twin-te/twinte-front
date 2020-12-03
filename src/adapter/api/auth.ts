export class Auth {
  /**
   * ログインされているかの判定 true : false
   * ネートワークエラーもfalse
   */
  async isLogin(): Promise<boolean> {
    try {
      const res = await $nuxt.$api.users.me.get()
      return res.status === 200
    } catch (error) {
      return false
    }
  }
}
