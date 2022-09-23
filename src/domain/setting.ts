export type Setting = {
  darkMode: boolean;
  saturdayCourseMode: boolean; // Whether to show Saturday classes in the timetable.
  nightPeriodMode: boolean; // Whether to show 7 and 8 periods.
  timeLabelMode: boolean; // Whether to show the start and end time in the timetable.
  displayYear: number; // Year used for course display and search. 0 means current year.
};

export const settingProps: (keyof Setting)[] = [
  "darkMode",
  "saturdayCourseMode",
  "nightPeriodMode",
  "timeLabelMode",
  "displayYear",
];

export const getInitialSetting = (): Setting => ({
  darkMode: false,
  saturdayCourseMode: false,
  nightPeriodMode: false,
  timeLabelMode: true,
  displayYear: 0,
});
