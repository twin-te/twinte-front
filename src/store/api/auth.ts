/**
 * ログインされているかの判定 true : false
 * ネートワークエラーもfalse
 */
async function isLogin(): Promise<boolean> {
  try {
    await $nuxt.$api.users.me.$get()
    return true
  } catch (error) {
    return false
  }
}

export { isLogin }
