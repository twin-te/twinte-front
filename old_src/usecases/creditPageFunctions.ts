import { CreditCourseWithState } from "~/entities/course";
import {
  CreditTag,
  DisplayTag,
  isCreditTag,
  isDisplayTag,
} from "~/entities/tag";

export type ApiCourseForCredit = {
  id: string;
  name: string;
  code: string;
  credit: number;
  tags: string[];
};
export type TagWithoutId = { name: string; order: number };
export type ApiTag = { id: string } & TagWithoutId;

/**
 * `CreditTag[]` を作成する。
 * `CreditTag.credit` はタグ毎の単位数を表す。
 */
export const apiToCreditTags = (
  apiCourses: ApiCourseForCredit[],
  apiTags: ApiTag[]
): CreditTag[] => {
  const tagIdToCredit: Record<string, number> = {};
  apiTags.forEach(({ id }) => (tagIdToCredit[id] = 0));

  apiCourses.forEach(({ credit, tags }) =>
    tags.forEach((tagId) => {
      if (!(tagId in tagIdToCredit))
        throw new Error("Not found tag with id " + tagId);
      tagIdToCredit[tagId] += Number(credit);
    })
  );

  return apiTags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    credit: tagIdToCredit[tag.id].toFixed(1),
  }));
};

/**
 * `ApiTag[]` から `DisplayTag[]` を作成する。
 * `assignedTagIds` に含まれるタグの `assign` の初期値は `true` になる。
 */
export const apiToDisplayTags = (
  assignedTagIds: string[],
  apiTags: ApiTag[]
): DisplayTag[] => {
  return apiTags.map((apiTag) => ({
    id: apiTag.id,
    name: apiTag.name,
    assign: assignedTagIds.includes(apiTag.id),
  }));
};

export const apiToCreditCourseWithStateList = (
  apiCourses: ApiCourseForCredit[],
  apiTags: ApiTag[]
): CreditCourseWithState[] => {
  return apiCourses.map(({ id, name, code, credit, tags: assignedTagIds }) => ({
    id,
    name,
    code,
    credit: credit.toFixed(1),
    state: "default",
    tags: apiToDisplayTags(assignedTagIds, apiTags),
  }));
};

/**
 * view の変更を最小限にするために、リアクティビティを失わずに `CreditTag` または `DisplayTag` を更新する。
 * タグの追加、削除、`id` 以外のプロパティの変更を行う。
 *
 * @param reactiveTags リアクティブな配列
 * @param compTags 比較対象となる配列
 */
export const updateReactiveTags = <T extends CreditTag | DisplayTag>(
  reactiveTags: T[],
  compTags: T[]
) => {
  const reactiveTagIds = reactiveTags.map((tag) => tag.id);
  const compTagIds = compTags.map((tag) => tag.id);

  const commonTagIds = compTagIds.filter((id) => reactiveTagIds.includes(id));
  const newTagIds = compTagIds.filter((id) => !commonTagIds.includes(id));
  const deletedTagIds = reactiveTagIds.filter(
    (id) => !commonTagIds.includes(id)
  );

  // delete tags
  const deleteTagIndices = reactiveTagIds.reduce<number[]>(
    (indices, id, idx) => {
      if (deletedTagIds.includes(id)) indices.push(idx);
      return indices;
    },
    []
  );
  deleteTagIndices.reverse().forEach((i) => reactiveTags.splice(i, 1));

  // この時点で、 reactiveTags に含まれるのは共通のタグのみ

  // reactiveTags の要素の順番が compCommonTags の要素の順番と一致するようにソートする。
  const compCommonTags = compTags.filter((tag) =>
    commonTagIds.includes(tag.id)
  );
  const idToOrder = compCommonTags.reduce<Record<string, number>>(
    (idToOrder, tag, i) => {
      idToOrder[tag.id] = i;
      return idToOrder;
    },
    {}
  );
  reactiveTags.sort((a, b) => idToOrder[a.id] - idToOrder[b.id]);

  // update tag property
  reactiveTags.forEach((reactiveTag, idx) => {
    const compTag = compCommonTags[idx];
    reactiveTag.name = compTag.name;
    if (isCreditTag(reactiveTag) && isCreditTag(compTag))
      reactiveTag.credit = compTag.credit;
    if (isDisplayTag(reactiveTag) && isDisplayTag(compTag))
      reactiveTag.assign = compTag.assign;
  });

  // add tags
  const newTags = compTags.filter((tag) => newTagIds.includes(tag.id));
  reactiveTags.push(...newTags);
};

/**
 * view の変更を最小限にするために、リアクティビティを失わずに `reactiveCreditCourseWithStateList` を更新する。
 * タグの追加、削除、タグ名と `assign` の変更を行う。
 *
 * @param reactiveCreditCourseWithStateList リアクティブな配列
 * @param compCreditCourseWithStateList 比較対象
 */
export const updateCreditCourseWithStateList = (
  reactiveCreditCourseWithStateList: CreditCourseWithState[],
  compCreditCourseWithStateList: CreditCourseWithState[]
) => {
  // delete courses
  const compIds = compCreditCourseWithStateList.map(({ id }) => id);
  const deletedIndices: number[] = [];
  reactiveCreditCourseWithStateList.forEach(({ id }, idx) => {
    if (!compIds.includes(id)) deletedIndices.push(idx);
  });
  deletedIndices
    .reverse()
    .forEach((idx) => reactiveCreditCourseWithStateList.splice(idx, 1));

  // update display tags
  reactiveCreditCourseWithStateList.forEach(({ id, tags: reactiveTags }) => {
    const compTags = compCreditCourseWithStateList.find(
      (course) => course.id === id
    )?.tags;
    if (compTags === undefined) return;
    updateReactiveTags(reactiveTags, compTags);
  });

  // add courses
  const existingIds = reactiveCreditCourseWithStateList.map(({ id }) => id);
  const addedCourses = compCreditCourseWithStateList.filter(
    ({ id }) => !existingIds.includes(id)
  );
  reactiveCreditCourseWithStateList.push(...addedCourses);

  // sort courses
  const idToOrder = compCreditCourseWithStateList.reduce<
    Record<string, number>
  >((map, { id }, idx) => ({ ...map, [id]: idx }), {});
  reactiveCreditCourseWithStateList.sort(
    (a, b) => idToOrder[a.id] - idToOrder[b.id]
  );
};

/**
 * 合計単位数を取得する
 */
export const getTotalCredit = (apiCourses: ApiCourseForCredit[]): string => {
  return apiCourses
    .reduce((credit, course) => credit + Number(course.credit), 0)
    .toFixed(1);
};
