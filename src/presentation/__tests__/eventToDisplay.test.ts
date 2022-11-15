import dayjs from "dayjs";
import { Event } from "~/domain/event";
import { eventToDisplay } from "../presenters/event";

describe(eventToDisplay.name, () => {
  it("Test PublicHoliday", () => {
    const event = {
      date: dayjs("2021-07-23T00:00:00.000Z"),
      description: "スポーツの日",
      eventType: "PublicHoliday",
    } as Event;
    expect(eventToDisplay(event)).toBe("スポーツの日");
  });

  it("Test Holiday", () => {
    const event = {
      date: dayjs("2021-11-05T00:00:00.000Z"),
      description: "学園祭",
      eventType: "Holiday",
    } as Event;
    expect(eventToDisplay(event)).toBe("学園祭");
  });

  it("Test Exam", () => {
    const event = {
      date: dayjs("2021-05-19T00:00:00.000Z"),
      description: "春A 期末試験",
      eventType: "Exam",
    } as Event;
    expect(eventToDisplay(event)).toBe("春A 期末試験");
  });

  it("Test Other", () => {
    const event = {
      date: dayjs("2022-01-15T00:00:00.000Z"),
      description: "大学入学共通テスト",
      eventType: "Other",
    } as Event;
    expect(eventToDisplay(event)).toBe("大学入学共通テスト");
  });

  it("Test SubstituteDay", () => {
    const event = {
      date: dayjs("2021-07-22T00:00:00.000Z"),
      description: "",
      eventType: "SubstituteDay",
      changeTo: "Fri",
    } as Event;
    expect(eventToDisplay(event)).toBe("金曜日課");
  });
});
