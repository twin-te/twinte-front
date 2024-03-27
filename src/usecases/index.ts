import { createConnectTransport } from "@connectrpc/connect-web";
import { AuthUseCase, IAuthUseCase } from "./auth";
import { FeedbackUseCase, IFeedbackUseCase } from "./feedback";
import { INewsUseCase, NewsUseCase } from "./news";
import {
  ISchoolCalendarUseCase,
  SchoolCalendarUseCase,
} from "./schoolCalendar";
import { ISettingUseCase, SettingUseCase } from "./setting";
import { ITimetableUseCase, TimetableUseCase } from "./timetable";

const transport = createConnectTransport({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  useHttpGet: true,
});

export const authUseCase: IAuthUseCase = new AuthUseCase(transport);
export const feedbackUseCase: IFeedbackUseCase = new FeedbackUseCase();
export const newsUseCase: INewsUseCase = new NewsUseCase(transport);
export const schoolCalendarUseCase: ISchoolCalendarUseCase = new SchoolCalendarUseCase(
  transport
);
export const settingUseCase: ISettingUseCase = new SettingUseCase();
export const timetableUseCase: ITimetableUseCase = new TimetableUseCase(
  transport
);
