import { NormalDay, normalDays, specialDays } from "~/domain/day";
import {
  BaseModule,
  fallModules,
  isBaseModule,
  Module,
  modules,
  springModules,
  VacationModule,
} from "~/domain/module";
import { isPeriod, Period, periods } from "~/domain/period";
import {
  isNormalSchedule,
  NormalSchedule,
  Schedule,
  SpecialSchedule,
} from "~/domain/schedule";
import {
  initializeNormalTimetable,
  initializeSpecialTimetable,
  NormalTimetable,
  SpecialTimetable,
  Timetable,
} from "~/domain/timetable";
import { hasProperty, initializeObject } from "~/utils";
import {
  isNotSpecified,
  NotSpecified,
  notSpecified,
} from "../viewmodels/option";
import {
  DisplayNormalSchedule,
  DisplaySchedule,
  DisplaySpecialSchedule,
  EditableNormalSchedule,
  EditableSchedule,
  EditableSpecialSchedule,
} from "../viewmodels/schedule";
import {
  displayToNormalDay,
  displayToSpecialDay,
  isDisplayNormalDay,
  isDisplaySpecialDay,
  isEditableNormalDay,
  isEditableSpecialDay,
  normalDayMap,
  specialDayMap,
} from "./day";
import {
  displayToModule,
  isDisplayModule,
  isEditableModule,
  moduleMap,
} from "./module";
import { isEditablePeriod } from "./period";

export const isDisplayNormalSchedule = (
  schedule: object
): schedule is DisplayNormalSchedule => {
  return (
    hasProperty(schedule, "module", isDisplayModule) &&
    hasProperty(schedule, "day", isDisplayNormalDay) &&
    hasProperty(schedule, "period", isPeriod)
  );
};

export const isDisplaySpecialSchedule = (
  schedule: object
): schedule is DisplaySpecialSchedule => {
  return (
    hasProperty(schedule, "module", isDisplayModule) &&
    hasProperty(schedule, "day", isDisplaySpecialDay)
  );
};

export const isDisplaySchedule = (
  schedule: object
): schedule is DisplaySchedule => {
  return (
    isDisplayNormalSchedule(schedule) || isDisplaySpecialSchedule(schedule)
  );
};

export const isEditableNormalSchedule = (
  schedule: object
): schedule is EditableNormalSchedule => {
  return (
    hasProperty(schedule, "module", isEditableModule) &&
    hasProperty(schedule, "day", isEditableNormalDay) &&
    hasProperty(schedule, "period", isEditablePeriod)
  );
};

export const isEditableSpecialSchedule = (
  schedule: object
): schedule is EditableSpecialSchedule => {
  return (
    hasProperty(schedule, "module", isEditableModule) &&
    hasProperty(schedule, "day", isEditableSpecialDay)
  );
};

export const isEditableSchedule = (
  schedule: object
): schedule is EditableSchedule => {
  return (
    isEditableNormalSchedule(schedule) || isEditableSpecialSchedule(schedule)
  );
};

export const createBlankEditableSchedule = (): EditableSchedule => {
  return { module: notSpecified, day: notSpecified, period: notSpecified };
};

export const normalScheduleToDisplay = ({
  module,
  day,
  period,
}: NormalSchedule): DisplayNormalSchedule => {
  return {
    module: moduleMap[module],
    day: normalDayMap[day],
    period,
  };
};

export const specialScheduleToDisplay = ({
  module,
  day,
}: SpecialSchedule): DisplaySpecialSchedule => {
  return {
    module: moduleMap[module],
    day: specialDayMap[day],
  };
};

export const scheduleToDisplay = (schedule: Schedule) => {
  return isNormalSchedule(schedule)
    ? normalScheduleToDisplay(schedule)
    : specialScheduleToDisplay(schedule);
};

export const schedulesToDisplay = (
  schedules: Schedule[]
): DisplaySchedule[] => {
  return schedules.map(scheduleToDisplay);
};

export const displayToNormalSchedule = ({
  module,
  day,
  period,
}: DisplayNormalSchedule): NormalSchedule => {
  return {
    module: displayToModule(module),
    day: displayToNormalDay(day),
    period,
  };
};

export const displayToSpecialSchedule = ({
  module,
  day,
}: DisplaySpecialSchedule): SpecialSchedule => {
  return {
    module: displayToModule(module),
    day: displayToSpecialDay(day),
  };
};

export const displayToSchedule = (schedule: DisplaySchedule): Schedule => {
  return isDisplayNormalSchedule(schedule)
    ? displayToNormalSchedule(schedule)
    : displayToSpecialSchedule(schedule);
};

export const displayToSchedules = (
  displaySchedules: DisplaySchedule[]
): Schedule[] => {
  return displaySchedules.map((displaySchedule) =>
    displayToSchedule(displaySchedule)
  );
};

export const editableSchedulesToTimetable = (
  editableSchedules: EditableSchedule[]
): Timetable<Module, boolean> => {
  const normalTimetable: NormalTimetable<
    Module,
    boolean
  > = initializeNormalTimetable(modules, false);
  const specialTimetable: SpecialTimetable<
    Module,
    boolean
  > = initializeSpecialTimetable(modules, false);

  const additionalEditableSchedules = editableSchedules.reduce<
    EditableSchedule[]
  >((ret, schedule) => {
    if (!isNotSpecified(schedule.day)) return ret;

    if (hasProperty(schedule, "period", isEditablePeriod)) {
      if (isNotSpecified(schedule.period))
        ret.push({ module: schedule.module, day: schedule.day });
    } else {
      ret.push({
        module: schedule.module,
        day: schedule.day,
        period: notSpecified,
      });
    }

    return ret;
  }, []);

  [...editableSchedules, ...additionalEditableSchedules].forEach((schedule) => {
    const targetModules = isNotSpecified(schedule.module)
      ? modules
      : [displayToModule(schedule.module)];

    if (isEditableNormalSchedule(schedule)) {
      const targetDays = isNotSpecified(schedule.day)
        ? normalDays
        : [displayToNormalDay(schedule.day)];
      const targetPeriods = isNotSpecified(schedule.period)
        ? periods
        : [schedule.period];

      targetModules.forEach((module) => {
        targetDays.forEach((day) => {
          targetPeriods.forEach((period) => {
            normalTimetable[module][day][period] = true;
          });
        });
      });
    } else {
      const targetDays = isNotSpecified(schedule.day)
        ? specialDays
        : [displayToSpecialDay(schedule.day)];

      targetModules.forEach((module) => {
        targetDays.forEach((day) => {
          specialTimetable[module][day] = true;
        });
      });
    }
  });

  return {
    normal: normalTimetable,
    special: specialTimetable,
  };
};

export const isNotSpecifiedSchedule = (
  schedule: EditableSchedule
): schedule is
  | { module: NotSpecified; day: NotSpecified; period: NotSpecified }
  | { module: NotSpecified; day: NotSpecified } => {
  return (
    isNotSpecified(schedule.module) &&
    isNotSpecified(schedule.day) &&
    (isEditableSpecialSchedule(schedule) || isNotSpecified(schedule.period))
  );
};

/**
 * Convert schedules to only module format string for display.
 */
export const schedulesToModuleStrings = (schedules: Schedule[]): string[] => {
  const moduleFlag = schedules.reduce<Record<Module, boolean>>(
    (obj, { module }) => {
      obj[module] = true;
      return obj;
    },
    initializeObject(modules, false)
  );

  const moduleStrings: string[] = [];
  const springModuleString = springModules.reduce((ret, module) => {
    if (moduleFlag[module]) {
      ret += module.charAt(module.length - 1);
    }
    return ret;
  }, "春");

  const fallModuleString = fallModules.reduce((ret, module) => {
    if (moduleFlag[module]) {
      ret += module.charAt(module.length - 1);
    }
    return ret;
  }, "秋");

  if (springModuleString.length !== 1) moduleStrings.push(springModuleString);
  if (moduleFlag["SummerVacation"])
    moduleStrings.push(moduleMap["SummerVacation"]);
  if (fallModuleString.length !== 1) moduleStrings.push(fallModuleString);
  if (moduleFlag["SpringVacation"])
    moduleStrings.push(moduleMap["SpringVacation"]);

  return moduleStrings;
};

/**
 * Convert schedules to full format string for display.
 */
export const schedulesToFullString = (schedules: Schedule[]): string => {
  const timetable = schedules.reduce<Timetable<Module, boolean>>(
    (timetable, schedule) => {
      if (isNormalSchedule(schedule)) {
        const { module, day, period } = schedule;
        timetable.normal[module][day][period] = true;
      } else {
        const { module, day } = schedule;
        timetable.special[module][day] = true;
      }
      return timetable;
    },
    {
      normal: initializeNormalTimetable(modules, false),
      special: initializeSpecialTimetable(modules, false),
    }
  );

  const moduleToDateString: Record<
    "normal" | "special",
    Record<Module, string>
  > = {
    normal: initializeObject(modules, ""), // { SpringA: "月1,2", SpringB: "月火1", SpringC: "月1 火2", ... }
    special: initializeObject(modules, ""), // { SpringA: "集中", SpringB: "集中 応談"...}
  };

  modules.forEach((module) => {
    const dayToPeriodString = normalDays.reduce<Record<NormalDay, string>>(
      (dayToPeriodString, day) => {
        dayToPeriodString[day] = periods
          .filter((period) => timetable.normal[module][day][period]) // ["1", "3", "4", "5", "7", "8"]
          .reduce<Period[][]>((ret, currentPeriod) => {
            if (ret.length === 0) {
              ret.push([currentPeriod]);
              return ret;
            }

            const prevPeriod =
              ret[ret.length - 1][ret[ret.length - 1].length - 1];
            if (Number(prevPeriod) + 1 === Number(currentPeriod)) {
              ret[ret.length - 1].push(currentPeriod);
            } else {
              ret.push([currentPeriod]);
            }

            return ret;
          }, [] as Period[][]) // [["1"], ["3", "4", "5"], ["7", "8"]]
          .map<string>((periods) => {
            if (periods.length < 3) return periods.join(",");
            return `${periods[0]}-${periods[periods.length - 1]}`;
          }) // ["1", "3-5", "7,8"]
          .join(","); // "1,3-5,7,8"

        return dayToPeriodString;
      },
      {} as Record<NormalDay, string>
    );

    moduleToDateString.normal[module] = normalDays
      .reduce<{ day: string; period: string }[]>((ret, day) => {
        if (dayToPeriodString[day] === "") return ret;

        const index = ret.findIndex(
          ({ period }) => period === dayToPeriodString[day]
        );

        if (index === -1)
          ret.push({ day: normalDayMap[day], period: dayToPeriodString[day] });
        else ret[index].day += normalDayMap[day];

        return ret;
      }, [])
      .map(({ day, period }) => `${day}${period}`)
      .join(" ");

    moduleToDateString.special[module] = specialDays
      .filter((day) => timetable.special[module][day])
      .map((day) => specialDayMap[day])
      .join(" ");
  });

  const combinedModulesAndDate = (["normal", "special"] as (
    | "normal"
    | "special"
  )[]).reduce<
    Record<
      "normal" | "special",
      Record<"spring" | "fall", { modules: BaseModule[]; date: string }>
    >
  >(
    (ret, courseType) => {
      (["spring", "fall"] as ("spring" | "fall")[]).forEach((moduleType) => {
        const season = moduleType.charAt(0).toUpperCase() + moduleType.slice(1);
        const moduleSet: Set<BaseModule> = new Set();

        for (const alphabets of ["AB", "BC", "AC"]) {
          if (
            moduleToDateString[courseType][
              `${season}${alphabets[0]}` as BaseModule
            ] ===
            moduleToDateString[courseType][
              `${season}${alphabets[1]}` as BaseModule
            ]
          ) {
            moduleSet.add(`${season}${alphabets[0]}` as BaseModule);
            moduleSet.add(`${season}${alphabets[1]}` as BaseModule);
          }
        }

        if (moduleSet.size === 0) return;
        const modules = [...moduleSet];
        const date = moduleToDateString[courseType][modules[0]];
        ret[courseType][moduleType].modules = modules;
        ret[courseType][moduleType].date = date;
      });

      return ret;
    },
    {
      normal: {
        spring: { modules: [], date: "" },
        fall: { modules: [], date: "" },
      },
      special: {
        spring: { modules: [], date: "" },
        fall: { modules: [], date: "" },
      },
    }
  );

  const moduleAndDateStrings: { module: string; date: string }[] = [];

  const processBaseModule = (
    courseType: "normal" | "special",
    module: BaseModule
  ): void => {
    const moduleType = module.startsWith("Spring") ? "spring" : "fall";

    const index = combinedModulesAndDate[courseType][
      moduleType
    ].modules.findIndex((combinedModule) => combinedModule === module);

    if (index === -1) {
      moduleAndDateStrings.push({
        module: moduleMap[module],
        date: moduleToDateString[courseType][module],
      });
    }

    if (index === 0) {
      const moduleString =
        moduleMap[module].slice(0, -1) +
        combinedModulesAndDate[courseType][moduleType].modules
          .map((combinedModule) =>
            combinedModule.charAt(combinedModule.length - 1)
          )
          .join("");
      moduleAndDateStrings.push({
        module: moduleString,
        date: combinedModulesAndDate[courseType][moduleType].date,
      });
    }
  };

  const processVacationModule = (
    courseType: "normal" | "special",
    module: VacationModule
  ) => {
    moduleAndDateStrings.push({
      module: moduleMap[module],
      date: moduleToDateString[courseType][module],
    });
  };

  modules.forEach((module) => {
    if (isBaseModule(module)) {
      processBaseModule("normal", module);
      processBaseModule("special", module);
    } else {
      processVacationModule("normal", module);
      processVacationModule("special", module);
    }
  });

  return moduleAndDateStrings
    .filter(({ date }) => date !== "")
    .reduce<{ module: string; date: string }[]>((ret, { module, date }) => {
      const index = ret.findIndex(
        (moduleAndDateString) => moduleAndDateString.module === module
      );
      if (index === -1) ret.push({ module, date });
      else ret[index].date += ` ${date}`;
      return ret;
    }, [])
    .map(({ module, date }) => `${module} ${date}`)
    .join(" / ");
};
