export type Tag = {
  id: string;
  name: string;
  order: number; // 0-indices
};

export type UndefinedTagOrder = -1;

export const undefinedTagOrder: UndefinedTagOrder = -1;
