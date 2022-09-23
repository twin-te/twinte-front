import { computed, reactive } from "vue";
import { usePorts } from "~/adapter";
import Usecase from "~/application/usecases";
import { isResultError } from "~/domain/error";
import { News } from "~/domain/news";
import { deepCopy, updateAllElementsInArray } from "~/utils";

// state
const news = reactive<News[]>([]);

// getter
export const getNews = () => {
  return computed(() => deepCopy(news));
};

export const getUnreadNews = () => {
  return computed(() => deepCopy(news.filter(({ read }) => !read)));
};

// action
const ports = usePorts();

export const setNews = async () => {
  const result = await Usecase.getNews(ports)();
  if (isResultError(result)) throw result;
  updateAllElementsInArray(news, result);
};

export const updateNewsRead = async (id: string, read: boolean) => {
  const result = await Usecase.updateNewsRead(ports)(id, read);
  if (isResultError(result)) throw result;
  await setNews();
};
