import { Schedule } from "~/domain/schedule";
import { schedulesToModuleStrings } from "../presenters/schedule";

describe(`${schedulesToModuleStrings.name} - only module format - basic`, () => {
  it("[春A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春A"]);
  });

  it("[春A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "1",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春A"]);
  });

  it("[春A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春A"]);
  });

  it("[春AB]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB"]);
  });

  it("[春AB]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB"]);
  });

  it("[春A, 秋A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "FallA",
        day: "Mon",
        period: "1",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春A", "秋A"]);
  });

  it("[春A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春A"]);
  });

  it("[春A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "4",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春A"]);
  });

  it("[春AB]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB"]);
  });

  it("[春AB]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "1",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB"]);
  });

  it("[春AB]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB"]);
  });

  it("[春AB]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB"]);
  });

  it("[春AB]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "4",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB"]);
  });

  it("[春AB, 秋AB]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "FallA",
        day: "Mon",
        period: "1",
      },
      {
        module: "FallB",
        day: "Mon",
        period: "1",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB", "秋AB"]);
  });

  it("[春AB, 秋AB]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "2",
      },
      {
        module: "FallA",
        day: "Mon",
        period: "1",
      },
      {
        module: "FallA",
        day: "Mon",
        period: "2",
      },
      {
        module: "FallB",
        day: "Mon",
        period: "1",
      },
      {
        module: "FallB",
        day: "Mon",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB", "秋AB"]);
  });

  it("[春C, 秋ABC]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringC",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "2",
      },
      {
        module: "FallA",
        day: "Mon",
        period: "1",
      },
      {
        module: "FallA",
        day: "Tue",
        period: "2",
      },
      {
        module: "FallB",
        day: "Mon",
        period: "1",
      },
      {
        module: "FallB",
        day: "Tue",
        period: "2",
      },
      {
        module: "FallC",
        day: "Mon",
        period: "1",
      },
      {
        module: "FallC",
        day: "Tue",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春C", "秋ABC"]);
  });

  it("[春A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "3",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春A"]);
  });

  it("[春A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "1",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春A"]);
  });

  it("[春A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "3",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春A"]);
  });

  it("[春ABC]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "1",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春ABC]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春ABC]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "1",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春ABC]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春ABC]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春ABC]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "4",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春A"]);
  });

  it("[春AB]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
      },
      {
        module: "SpringB",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB"]);
  });

  it("[春C, 秋A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringC",
        day: "Appointment",
      },
      {
        module: "FallA",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春C", "秋A"]);
  });

  it("[春ABC]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
      },
      {
        module: "SpringB",
        day: "Appointment",
      },
      {
        module: "SpringC",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春ABC, 秋A]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
      },
      {
        module: "SpringB",
        day: "Appointment",
      },
      {
        module: "SpringC",
        day: "Appointment",
      },
      {
        module: "FallA",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC", "秋A"]);
  });

  it("[春ABC, 秋AB]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
      },
      {
        module: "SpringB",
        day: "Appointment",
      },
      {
        module: "SpringC",
        day: "Appointment",
      },
      {
        module: "FallA",
        day: "Appointment",
      },
      {
        module: "FallB",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC", "秋AB"]);
  });

  it("[春C]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringC",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春C"]);
  });

  it("[夏休]", () => {
    const schedules: Schedule[] = [
      {
        module: "SummerVacation",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["夏休"]);
  });

  it("[春休]", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringVacation",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春休"]);
  });
});

describe(`${schedulesToModuleStrings.name} - only module format - combination`, () => {
  it("[春AB, 秋ABC] - 発展体育水泳（春）", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "3",
      },
      {
        module: "FallA",
        day: "Intensive",
      },
      {
        module: "FallB",
        day: "Intensive",
      },
      {
        module: "FallC",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB", "秋ABC"]);
  });

  it("[秋ABC] - 発展体育ジョグ&ウォーク（秋）", () => {
    const schedules: Schedule[] = [
      {
        module: "FallA",
        day: "Mon",
        period: "4",
      },
      {
        module: "FallB",
        day: "Mon",
        period: "4",
      },
      {
        module: "FallC",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋ABC"]);
  });

  it("[秋ABC] - Japan-Expert日本語　上級読む", () => {
    const schedules: Schedule[] = [
      {
        module: "FallA",
        day: "Mon",
        period: "2",
      },
      {
        module: "FallA",
        day: "Tue",
        period: "2",
      },
      {
        module: "FallA",
        day: "Tue",
        period: "4",
      },
      {
        module: "FallB",
        day: "Mon",
        period: "2",
      },
      {
        module: "FallB",
        day: "Tue",
        period: "2",
      },
      {
        module: "FallB",
        day: "Tue",
        period: "4",
      },
      {
        module: "FallC",
        day: "Mon",
        period: "2",
      },
      {
        module: "FallC",
        day: "Tue",
        period: "2",
      },
      {
        module: "FallC",
        day: "Tue",
        period: "4",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋ABC"]);
  });

  it("[春ABC] - 総合日本語1A", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Thu",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Thu",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "4",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春AB, 秋ABC] - 学際的社会科学演習", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Wed",
        period: "5",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "6",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "5",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "6",
      },
      {
        module: "FallA",
        day: "Wed",
        period: "5",
      },
      {
        module: "FallA",
        day: "Wed",
        period: "6",
      },
      {
        module: "FallB",
        day: "Wed",
        period: "5",
      },
      {
        module: "FallB",
        day: "Wed",
        period: "6",
      },
      {
        module: "FallC",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB", "秋ABC"]);
  });

  it("[春AB, 秋A] - 筑波山から学ぶー地域の文化資源発掘", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Wed",
        period: "6",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "6",
      },
      {
        module: "FallA",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB", "秋A"]);
  });

  it("[秋ABC] - 国語科教育演習Ⅰ", () => {
    const schedules: Schedule[] = [
      {
        module: "FallA",
        day: "Wed",
        period: "1",
      },
      {
        module: "FallB",
        day: "Wed",
        period: "1",
      },
      {
        module: "FallC",
        day: "Wed",
        period: "1",
      },
      {
        module: "FallC",
        day: "Wed",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋ABC"]);
  });

  it("[秋ABC] - 数学科教育概論Ⅱ", () => {
    const schedules: Schedule[] = [
      {
        module: "FallA",
        day: "Thu",
        period: "1",
      },
      {
        module: "FallB",
        day: "Thu",
        period: "1",
      },
      {
        module: "FallC",
        day: "Thu",
        period: "2",
      },
      {
        module: "FallC",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋ABC"]);
  });

  it("[春C, 夏休] - 農業教育法概論", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringC",
        day: "Intensive",
      },
      {
        module: "SummerVacation",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春C", "夏休"]);
  });

  it("[夏休, 秋AB] - 教職実事演習（中・高）", () => {
    const schedules: Schedule[] = [
      {
        module: "SummerVacation",
        day: "Intensive",
      },
      {
        module: "FallA",
        day: "Intensive",
      },
      {
        module: "FallB",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["夏休", "秋AB"]);
  });

  it("[春ABC] - 博物館学Ⅰ", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春C, 夏休] - 東洋宗教思想史演習Ⅱ-b", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringC",
        day: "Fri",
        period: "4",
      },
      {
        module: "SummerVacation",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春C", "夏休"]);
  });

  it("[秋ABC] - 民俗学実習-B", () => {
    const schedules: Schedule[] = [
      {
        module: "FallA",
        day: "Wed",
        period: "6",
      },
      {
        module: "FallA",
        day: "Intensive",
      },
      {
        module: "FallB",
        day: "Wed",
        period: "6",
      },
      {
        module: "FallB",
        day: "Intensive",
      },
      {
        module: "FallC",
        day: "Wed",
        period: "6",
      },
      {
        module: "FallC",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋ABC"]);
  });

  it("[秋ABC] - 文化地理学野外自習Ⅱ", () => {
    const schedules: Schedule[] = [
      {
        module: "FallA",
        day: "Fri",
        period: "3",
      },
      {
        module: "FallB",
        day: "Fri",
        period: "3",
      },
      {
        module: "FallC",
        day: "Fri",
        period: "3",
      },
      {
        module: "FallB",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋ABC"]);
  });

  it("[春AB, 夏休, 秋AB] - 日本語方言研究フィールド実習Ⅱ", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Fri",
        period: "6",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "6",
      },
      {
        module: "SummerVacation",
        day: "Intensive",
      },
      {
        module: "FallA",
        day: "Fri",
        period: "6",
      },
      {
        module: "FallB",
        day: "Fri",
        period: "6",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual([
      "春AB",
      "夏休",
      "秋AB",
    ]);
  });

  it("[秋ABC] - 日本語・日本文化実験実習", () => {
    const schedules: Schedule[] = [
      {
        module: "FallA",
        day: "AnyTime",
      },
      {
        module: "FallB",
        day: "Intensive",
      },
      {
        module: "FallC",
        day: "AnyTime",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋ABC"]);
  });

  it("[春AB, 秋ABC] - 社会学演習Ⅰb", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
      },
      {
        module: "SpringB",
        day: "Appointment",
      },
      {
        module: "FallA",
        day: "Thu",
        period: "6",
      },
      {
        module: "FallA",
        day: "Appointment",
      },
      {
        module: "FallB",
        day: "Thu",
        period: "6",
      },
      {
        module: "FallB",
        day: "Appointment",
      },
      {
        module: "FallC",
        day: "Thu",
        period: "6",
      },
      {
        module: "FallC",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB", "秋ABC"]);
  });

  it("[春A] - 民法総則", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "5",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "6",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "5",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "6",
      },
      {
        module: "SpringA",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春A"]);
  });

  it("[秋AB] - 運動障害の指導法", () => {
    const schedules: Schedule[] = [
      {
        module: "FallA",
        day: "Tue",
        period: "3",
      },
      {
        module: "FallB",
        day: "Tue",
        period: "3",
      },
      {
        module: "FallB",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋AB"]);
  });

  it("[春ABC] - 基礎生物学実験Ⅰ ", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Fri",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: "5",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: "6",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "5",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "6",
      },
      {
        module: "SpringA",
        day: "Appointment",
      },
      {
        module: "SpringB",
        day: "Appointment",
      },
      {
        module: "SpringC",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春BC, 夏休] - 分子細胞生物学概論", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringB",
        day: "Thu",
        period: "5",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: "6",
      },
      {
        module: "SpringC",
        day: "Appointment",
      },
      {
        module: "SummerVacation",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春BC", "夏休"]);
  });

  it("[春BC, 夏休] - 遺伝学概論", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringB",
        day: "Tue",
        period: "5",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "5",
      },
      {
        module: "SummerVacation",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春BC", "夏休"]);
  });

  it("[春ABC, 秋AB] - 理論生物学の基礎Ⅰ", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Fri",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Appointment",
      },
      {
        module: "SpringB",
        day: "Appointment",
      },
      {
        module: "SpringC",
        day: "Appointment",
      },
      {
        module: "FallA",
        day: "Tue",
        period: "3",
      },
      {
        module: "FallB",
        day: "Tue",
        period: "3",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC", "秋AB"]);
  });

  it("[秋B] - 電子顕微鏡実験", () => {
    const schedules: Schedule[] = [
      {
        module: "FallB",
        day: "Thu",
        period: "4",
      },
      {
        module: "FallB",
        day: "Thu",
        period: "5",
      },
      {
        module: "FallB",
        day: "Thu",
        period: "6",
      },
      {
        module: "FallB",
        day: "Fri",
        period: "4",
      },
      {
        module: "FallB",
        day: "Fri",
        period: "5",
      },
      {
        module: "FallB",
        day: "Appointment",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋B"]);
  });

  it("[秋B] - 応用生物化学実験Ⅲ", () => {
    const schedules: Schedule[] = [
      {
        module: "FallB",
        day: "Mon",
        period: "4",
      },
      {
        module: "FallB",
        day: "Mon",
        period: "5",
      },
      {
        module: "FallB",
        day: "Mon",
        period: "6",
      },
      {
        module: "FallB",
        day: "Fri",
        period: "4",
      },
      {
        module: "FallB",
        day: "Fri",
        period: "5",
      },
      {
        module: "FallB",
        day: "Fri",
        period: "6",
      },
      {
        module: "FallB",
        day: "Thu",
        period: "5",
      },
      {
        module: "FallB",
        day: "Thu",
        period: "4",
      },
      {
        module: "FallB",
        day: "Tue",
        period: "5",
      },
      {
        module: "FallB",
        day: "Tue",
        period: "4",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋B"]);
  });

  it("[春C, 夏休] - 植物バイオテクノロジーⅠ", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringC",
        day: "Wed",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "3",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "5",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "3",
      },
      {
        module: "SummerVacation",
        day: "Appointment",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "5",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春C", "夏休"]);
  });

  it("[春AC] - 人間生物学Ⅰ", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringC",
        day: "Mon",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "5",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "6",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "5",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "6",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "5",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "5",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AC"]);
  });

  it("[春ABC, 秋ABC] - 物理学実験II", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Wed",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "5",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "6",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "5",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "6",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "3",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "5",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "6",
      },
      {
        module: "FallA",
        day: "Wed",
        period: "3",
      },
      {
        module: "FallA",
        day: "Wed",
        period: "4",
      },
      {
        module: "FallA",
        day: "Wed",
        period: "5",
      },
      {
        module: "FallA",
        day: "Wed",
        period: "6",
      },
      {
        module: "FallB",
        day: "Wed",
        period: "3",
      },
      {
        module: "FallB",
        day: "Wed",
        period: "4",
      },
      {
        module: "FallB",
        day: "Wed",
        period: "5",
      },
      {
        module: "FallB",
        day: "Wed",
        period: "6",
      },
      {
        module: "FallC",
        day: "Wed",
        period: "3",
      },
      {
        module: "FallC",
        day: "Wed",
        period: "4",
      },
      {
        module: "FallC",
        day: "Wed",
        period: "5",
      },
      {
        module: "FallC",
        day: "Wed",
        period: "6",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC", "秋ABC"]);
  });

  it("[春ABC] - 常微分方程式", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Thu",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "3",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春AB, 秋A] - 熱力学Ⅰ", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Fri",
        period: "5",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "5",
      },
      {
        module: "FallA",
        day: "Tue",
        period: "1",
      },
      {
        module: "FallA",
        day: "Tue",
        period: "2",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB", "秋A"]);
  });

  it("[秋ABC] - 応用数学A", () => {
    const schedules: Schedule[] = [
      {
        module: "FallA",
        day: "Thu",
        period: "1",
      },
      {
        module: "FallA",
        day: "Thu",
        period: "2",
      },
      {
        module: "FallB",
        day: "Thu",
        period: "1",
      },
      {
        module: "FallC",
        day: "Thu",
        period: "1",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋ABC"]);
  });

  it("[春ABC] - ビジネスシステムデザインA", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Wed",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: "5",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: "6",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "5",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "6",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "3",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "5",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "6",
      },
      {
        module: "SpringC",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[夏休, 秋ABC, 春休] - 医学の基礎", () => {
    const schedules: Schedule[] = [
      {
        module: "SummerVacation",
        day: "Intensive",
      },
      {
        module: "FallA",
        day: "Intensive",
      },
      {
        module: "FallB",
        day: "Intensive",
      },
      {
        module: "FallC",
        day: "Intensive",
      },
      {
        module: "SpringVacation",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual([
      "夏休",
      "秋ABC",
      "春休",
    ]);
  });

  it("[春ABC] - 小児看護学演習", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "5",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "4",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春AB] - 医科学英語論文購読の基礎", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "1",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB"]);
  });

  it("[秋ABC] - 生化学成分検査実習", () => {
    const schedules: Schedule[] = [
      {
        module: "FallA",
        day: "Mon",
        period: "4",
      },
      {
        module: "FallA",
        day: "Mon",
        period: "5",
      },
      {
        module: "FallB",
        day: "Mon",
        period: "4",
      },
      {
        module: "FallB",
        day: "Mon",
        period: "5",
      },
      {
        module: "FallB",
        day: "Mon",
        period: "6",
      },
      {
        module: "FallC",
        day: "Mon",
        period: "4",
      },
      {
        module: "FallC",
        day: "Mon",
        period: "5",
      },
      {
        module: "FallC",
        day: "Mon",
        period: "6",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋ABC"]);
  });

  it("[春ABC, 秋AB] - 卒業研究", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "AnyTime",
      },
      {
        module: "SpringB",
        day: "AnyTime",
      },
      {
        module: "SpringC",
        day: "AnyTime",
      },
      {
        module: "FallA",
        day: "AnyTime",
      },
      {
        module: "FallB",
        day: "AnyTime",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC", "秋AB"]);
  });

  it("[春C, 夏休] - テラコッタ実習", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringC",
        day: "Intensive",
      },
      {
        module: "SummerVacation",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春C", "夏休"]);
  });

  it("[秋ABC] - Seminars on Global Issues B-Ⅰ", () => {
    const schedules: Schedule[] = [
      {
        module: "FallA",
        day: "Wed",
        period: "4",
      },
      {
        module: "FallA",
        day: "Wed",
        period: "5",
      },
      {
        module: "FallA",
        day: "Fri",
        period: "5",
      },
      {
        module: "FallA",
        day: "Fri",
        period: "6",
      },
      {
        module: "FallB",
        day: "Wed",
        period: "4",
      },
      {
        module: "FallB",
        day: "Wed",
        period: "5",
      },
      {
        module: "FallB",
        day: "Fri",
        period: "3",
      },
      {
        module: "FallB",
        day: "Fri",
        period: "4",
      },
      {
        module: "FallC",
        day: "Wed",
        period: "4",
      },
      {
        module: "FallC",
        day: "Wed",
        period: "5",
      },
      {
        module: "FallC",
        day: "Fri",
        period: "3",
      },
      {
        module: "FallC",
        day: "Fri",
        period: "4",
      },
      {
        module: "FallC",
        day: "Intensive",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["秋ABC"]);
  });

  it("[春ABC] - 集中日本語DOOOA", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Thu",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Thu",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Thu",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Thu",
        period: "4",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: "1",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: "2",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: "3",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: "4",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "1",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "2",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "3",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "3",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "3",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "3",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Thu",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Thu",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Thu",
        period: "3",
      },
      {
        module: "SpringC",
        day: "Thu",
        period: "4",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "1",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "2",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "3",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: "4",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春ABC"]);
  });

  it("[春AB] - 大学院生用", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Sat",
        period: "7",
      },
      {
        module: "SpringA",
        day: "Sat",
        period: "8",
      },
      {
        module: "SpringB",
        day: "Sat",
        period: "7",
      },
      {
        module: "SpringB",
        day: "Sat",
        period: "8",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["春AB"]);
  });

  it("[夏休] - 大学院生用", () => {
    const schedules: Schedule[] = [
      {
        module: "SummerVacation",
        day: "Sat",
        period: "4",
      },
      {
        module: "SummerVacation",
        day: "Sat",
        period: "5",
      },
      {
        module: "SummerVacation",
        day: "Sat",
        period: "6",
      },
    ];
    expect(schedulesToModuleStrings(schedules)).toEqual(["夏休"]);
  });
});
