export type WeekDayJa = "月" | "火" | "水" | "木" | "金" | "土";

export type WeekEndDayJa = "日";

export type NormalDayJa = WeekDayJa | WeekEndDayJa;

export type SpecialDayJa = "集中" | "応談" | "随時";

export type DayJa = NormalDayJa | SpecialDayJa;
