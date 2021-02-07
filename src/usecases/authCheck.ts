import { Ports } from "~/adapter";

/**
 * ログインしているかどうかをチェックする
 * vuexにユーザー情報を格納する
 */
export const authCheck = async ({ api, store }: Ports) => {
  try {
    const { status, body: user } = await api.users.me.get();
    store.commit("setUser", user);
    return status === 200;
  } catch (error) {
    return false;
  }
};
