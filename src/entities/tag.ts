export type DisplayTag = { id: string; name: string; assign: boolean };

export type CreditTag = { id: string; name: string; credit: string };

export const isCreditTag = (tag: CreditTag | DisplayTag): tag is CreditTag => {
  return "credit" in tag;
};

export const isDisplayTag = (
  tag: CreditTag | DisplayTag
): tag is DisplayTag => {
  return "assign" in tag;
};

export const NEW_TAG_ID = "new-tag";
export const ALL_COURSES_ID = "all-courses";
