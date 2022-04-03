import { Ports } from "~/adapter";
import { isValidStatus } from "~/usecases/api";
import { NetworkAccessError, NetworkError } from "~/usecases/error";

/**
 * ログインしているかどうかをチェックする
 * vuexにユーザー情報を格納する
 */
export const authCheck = async ({ api, store }: Ports) => {
  const { body, status, originalResponse } = await api.users.me
    .get()
    .catch((error) => {
      console.error(error);
      throw new NetworkError();
    });
  store.commit("setUser", body);
  if (isValidStatus(status)) {
    return (status as number) !== 401;
  } else if ((status as number) === 401) {
    // 401 は未ログインを示すのでエラーにしない
    // HACK: なぜか const status: 200 が指定されているので number にキャストする
    return false;
  } else {
    throw new NetworkAccessError(originalResponse);
  }
};
