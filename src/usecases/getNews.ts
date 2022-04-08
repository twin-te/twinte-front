import { Ports } from "~/adapter";
import { Information } from "~/api/@types";
import { isValidStatus } from "~/usecases/api";
import { NetworkError, NetworkAccessError } from "~/usecases/error";

/**
 * 取得したお知らせに既読をつける
 */
const makeNewsRead = (ports: Ports) => async (ids: Information["id"][]) => {
  const { api } = ports;
  ids.forEach(async (id) => {
    // console.log(id);
    const { body, status, originalResponse } = await api.information
      ._id(id)
      .put({
        body: {
          read: true,
        },
      })
      .catch(() => {
        throw new NetworkError();
      });
    if (isValidStatus(status)) {
      return;
    } else {
      console.error(body);
      throw new NetworkAccessError(originalResponse);
    }
  });
};

/**
 * APIから新着お知らせを取得する
 */
export const getNews = (ports: Ports) => async ({
  ignoreReadNews = false,
  offset = 0,
  limit = 1000,
} = {}): Promise<Information[]> => {
  const { api, dayjs } = ports;
  const { body, status, originalResponse } = await api.information
    .get({
      query: {
        limit,
        offset,
      },
    })
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    const info = body.sort((a, b) =>
      dayjs(a.publishedAt).isBefore(dayjs(b.publishedAt)) ? 1 : -1
    );

    const unreadInfo = info.filter((news) => !news.read).map((news) => news.id);

    await makeNewsRead(ports)(unreadInfo);
    if (ignoreReadNews) {
      return info.filter((news) => !news.read);
    } else {
      return info;
    }
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
