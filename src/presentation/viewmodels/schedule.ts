import { Period } from "~/domain/period";
import {
  DisplayNormalDay,
  DisplaySpecialDay,
  EditableNormalDay,
  EditableSpecialDay,
} from "./day";
import { DisplayModule, EditableModule } from "./module";
import { EditablePeriod } from "./period";

export type DisplayNormalSchedule = {
  module: DisplayModule;
  day: DisplayNormalDay;
  period: Period;
};

export type DisplaySpecialSchedule = {
  module: DisplayModule;
  day: DisplaySpecialDay;
};

export type DisplaySchedule = DisplayNormalSchedule | DisplaySpecialSchedule;

export type EditableNormalSchedule = {
  module: EditableModule;
  day: EditableNormalDay;
  period: EditablePeriod;
};

export type EditableSpecialSchedule = {
  module: EditableModule;
  day: EditableSpecialDay;
};

export type EditableSchedule = EditableNormalSchedule | EditableSpecialSchedule;
