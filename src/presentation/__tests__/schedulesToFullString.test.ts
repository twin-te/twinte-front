import { Schedule } from "~/domain/schedule";
import { schedulesToFullString } from "../presenters/schedule";

describe(`${schedulesToFullString.name} - full format - basic`, () => {
  it("'春A 月1,2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月1,2");
  });

  it("'春A 月火1'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月火1");
  });

  it("'春A 月1 火2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月1 火2");
  });

  it("'春AB 月1'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 月1");
  });

  it("'春A 月1 / 春B 火2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月1 / 春B 火2");
  });

  it("'春A 月1 / 秋A 月1'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月1 / 秋A 月1");
  });

  it("'春A 月火1,2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月火1,2");
  });

  it("'春A 月1,2 火3,4'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月1,2 火3,4");
  });

  it("'春AB 月1,2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 月1,2");
  });

  it("'春AB 月火1'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 月火1");
  });

  it("'春AB 月1 火2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 月1 火2");
  });

  it("'春AB 月火1,2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 月火1,2");
  });

  it("'春AB 月1,2 火3,4'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 月1,2 火3,4");
  });

  it("'春AB 月1 / 秋AB 月1'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 月1 / 秋AB 月1");
  });

  it("'春AB 月1,2 / 秋AB 月1,2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 月1,2 / 秋AB 月1,2");
  });

  it("'春C 月1 火2 / 秋ABC 月1 火2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe(
      "春C 月1 火2 / 秋ABC 月1 火2"
    );
  });

  it("'春A 月1-3'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月1-3");
  });

  it("'春A 月火水1'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月火水1");
  });

  it("'春A 月1 火2 水3'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月1 火2 水3");
  });

  it("'春ABC 月1'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 月1");
  });

  it("'春ABC 月1,2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 月1,2");
  });

  it("'春ABC 月火1'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 月火1");
  });

  it("'春ABC 月1 火2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 月1 火2");
  });

  it("'春ABC 月火1,2'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 月火1,2");
  });

  it("'春ABC 月1,2 火3,4'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 月1,2 火3,4");
  });

  it("'春A 応談'", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
      },
    ];
    expect(schedulesToFullString(schedules)).toBe("春A 応談");
  });

  it("'春AB 応談'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 応談");
  });

  it("'春C 応談 / 秋A 応談'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春C 応談 / 秋A 応談");
  });

  it("'春ABC 応談'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 応談");
  });

  it("'春ABC 応談 / 秋A 応談'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 応談 / 秋A 応談");
  });

  it("'春ABC 応談 / 秋AB 応談'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 応談 / 秋AB 応談");
  });

  it("'春C 月1 集中'", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春C 月1 集中");
  });

  it("'夏休 集中'", () => {
    const schedules: Schedule[] = [
      {
        module: "SummerVacation",
        day: "Intensive",
      },
    ];
    expect(schedulesToFullString(schedules)).toBe("夏休 集中");
  });

  it("'春休 集中'", () => {
    const schedules: Schedule[] = [
      {
        module: "SpringVacation",
        day: "Intensive",
      },
    ];
    expect(schedulesToFullString(schedules)).toBe("春休 集中");
  });
});

describe(`${schedulesToFullString.name} - full format - combination`, () => {
  it("'春AB 月3 / 秋ABC 集中' - 発展体育水泳（春）", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 月3 / 秋ABC 集中");
  });

  it("'秋AB 月4 / 秋C 集中' - 発展体育ジョグ&ウォーク（秋）", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋AB 月4 / 秋C 集中");
  });

  it("'秋ABC 月2 火2,4' - Japan-Expert日本語　上級読む", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋ABC 月2 火2,4");
  });

  it("'春ABC 火水木金4' - 総合日本語1A", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 火水木金4");
  });

  it("'春AB 水5,6 / 秋AB 水5,6 / 秋C 集中' - 学際的社会科学演習", () => {
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
    expect(schedulesToFullString(schedules)).toBe(
      "春AB 水5,6 / 秋AB 水5,6 / 秋C 集中"
    );
  });

  it("'春AB 水6 / 秋A 集中' - 筑波山から学ぶー地域の文化資源発掘", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 水6 / 秋A 集中");
  });

  it("'秋AB 水1 / 秋C 水1,2' - 国語科教育演習Ⅰ", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋AB 水1 / 秋C 水1,2");
  });

  it("'秋AB 木1 / 秋C 木2 集中' - 数学科教育概論Ⅱ", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋AB 木1 / 秋C 木2 集中");
  });

  it("'春C 集中 / 夏休 集中' - 農業教育法概論", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春C 集中 / 夏休 集中");
  });

  it("'夏休 集中 / 秋AB 集中' - 教職実事演習（中・高）", () => {
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
    expect(schedulesToFullString(schedules)).toBe("夏休 集中 / 秋AB 集中");
  });

  it("'春ABC 月2 / 春C 集中' - 博物館学Ⅰ", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 月2 / 春C 集中");
  });

  it("'春C 金4 / 夏休 集中' - 東洋宗教思想史演習Ⅱ-b", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春C 金4 / 夏休 集中");
  });

  it("'秋ABC 水6 集中' - 民俗学実習-B", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋ABC 水6 集中");
  });

  it("'秋ABC 金3 / 秋B 集中' - 文化地理学野外自習Ⅱ", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋ABC 金3 / 秋B 集中");
  });

  it("'春AB 金6 / 夏休 集中 / 秋AB 金6' - 日本語方言研究フィールド実習Ⅱ", () => {
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
    expect(schedulesToFullString(schedules)).toBe(
      "春AB 金6 / 夏休 集中 / 秋AB 金6"
    );
  });

  it("'秋AC 随時 / 秋B 集中' - 日本語・日本文化実験実習", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋AC 随時 / 秋B 集中");
  });

  it("'春AB 応談 / 秋ABC 木6 応談' - 社会学演習Ⅰb", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 応談 / 秋ABC 木6 応談");
  });

  it("'春A 月5,6 水4-6 応談' - 民法総則", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月5,6 水4-6 応談");
  });

  it("'秋AB 火3 / 秋B 集中' - 運動障害の指導法", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋AB 火3 / 秋B 集中");
  });

  it("'春AB 金4-6 / 春ABC 応談' - 基礎生物学実験Ⅰ ", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 金4-6 / 春ABC 応談");
  });

  it("'春B 木5,6 / 春C 応談 / 夏休 応談' - 分子細胞生物学概論", () => {
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
    expect(schedulesToFullString(schedules)).toBe(
      "春B 木5,6 / 春C 応談 / 夏休 応談"
    );
  });

  it("'春BC 火5 / 夏休 応談' - 遺伝学概論", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春BC 火5 / 夏休 応談");
  });

  it("'春AB 金3 / 春ABC 応談 / 秋AB 火3' - 理論生物学の基礎Ⅰ", () => {
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
    expect(schedulesToFullString(schedules)).toBe(
      "春AB 金3 / 春ABC 応談 / 秋AB 火3"
    );
  });

  it("'秋B 木4-6 金4,5 応談' - 電子顕微鏡実験", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋B 木4-6 金4,5 応談");
  });

  it("'秋B 月金4-6 火木4,5' - 応用生物化学実験Ⅲ", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋B 月金4-6 火木4,5");
  });

  it("'春C 水金1-5 / 夏休 応談' - 植物バイオテクノロジーⅠ", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春C 水金1-5 / 夏休 応談");
  });

  it("'春AC 月4-6 火4,5' - 人間生物学Ⅰ", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AC 月4-6 火4,5");
  });

  it("'春ABC 水3-6 / 秋ABC 水3-6' - 物理学実験II", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 水3-6 / 秋ABC 水3-6");
  });

  it("'春AB 木1 / 春C 火2,3' - 常微分方程式", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 木1 / 春C 火2,3");
  });

  it("'春AB 金5 / 秋A 火1,2' - 熱力学Ⅰ", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 金5 / 秋A 火1,2");
  });

  it("'秋A 木1,2 / 秋BC 木1' - 応用数学A", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋A 木1,2 / 秋BC 木1");
  });

  it("'春ABC 水3,4 金5,6 / 春C 集中' - ビジネスシステムデザインA", () => {
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
    expect(schedulesToFullString(schedules)).toBe(
      "春ABC 水3,4 金5,6 / 春C 集中"
    );
  });

  it("'夏休 集中 / 秋ABC 集中 / 春休 集中' - 医学の基礎", () => {
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
    expect(schedulesToFullString(schedules)).toBe(
      "夏休 集中 / 秋ABC 集中 / 春休 集中"
    );
  });

  it("'春A 火3,4 / 春B 火3-5 / 春C 火2-4' - 小児看護学演習", () => {
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
    expect(schedulesToFullString(schedules)).toBe(
      "春A 火3,4 / 春B 火3-5 / 春C 火2-4"
    );
  });

  it("'春A 月1 / 春B 月水1' - 医科学英語論文購読の基礎", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春A 月1 / 春B 月水1");
  });

  it("'秋A 月4,5 / 秋BC 月4-6' - 生化学成分検査実習", () => {
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
    expect(schedulesToFullString(schedules)).toBe("秋A 月4,5 / 秋BC 月4-6");
  });

  it("'春ABC 随時 / 秋AB 随時' - 卒業研究", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 随時 / 秋AB 随時");
  });

  it("'春C 集中 / 夏休 集中' - テラコッタ実習", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春C 集中 / 夏休 集中");
  });

  it("'秋A 水4,5 金5,6 / 秋BC 水4,5 金3,4 / 秋C 集中' - Seminars on Global Issues B-Ⅰ", () => {
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
    expect(schedulesToFullString(schedules)).toBe(
      "秋A 水4,5 金5,6 / 秋BC 水4,5 金3,4 / 秋C 集中"
    );
  });

  it("'春ABC 月火水木金1-4' - 集中日本語DOOOA", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春ABC 月火水木金1-4");
  });

  it("'春AB 土7,8' - 大学院生用", () => {
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
    expect(schedulesToFullString(schedules)).toBe("春AB 土7,8");
  });

  it("'夏休 土4-6' - 大学院生用", () => {
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
    expect(schedulesToFullString(schedules)).toBe("夏休 土4-6");
  });
});
