export type UndefinedTagOrder = -1;

export type Tag = {
  id: string;
  name: string;
  order: number; // 0-indices
};

export const undefinedTagOrder: UndefinedTagOrder = -1;
