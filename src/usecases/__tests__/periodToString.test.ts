import { Course, CourseSchedule } from "~/api/@types";
import { periodToString } from "../periodToString";

describe(`${periodToString.name} ベース`, () => {
  /** ベース */

  it("'春A 月1,2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月1,2");
  });

  it("'春A 月火1'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 1,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月火1");
  });

  it("'春A 月1 火2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月1 火2");
  });

  it("'春AB 月1'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 月1");
  });

  it("'春A 月1 / 春B 火2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月1 / 春B 火2");
  });

  it("'春A 月1 / 秋A 月1'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "FallA",
        day: "Mon",
        period: 1,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月1 / 秋A 月1");
  });

  it("'春A 月火1,2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月火1,2");
  });

  it("'春A 月1,2 火3,4'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 4,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月1,2 火3,4");
  });

  it("'春AB 月1,2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 月1,2");
  });

  it("'春AB 月火1'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 1,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 月火1");
  });

  it("'春AB 月1 火2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 月1 火2");
  });

  it("'春AB 月火1,2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 月火1,2");
  });

  it("'春AB 月1,2 火3,4'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 4,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 月1,2 火3,4");
  });

  it("'春AB 月1 / 秋AB 月1'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "FallA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "FallB",
        day: "Mon",
        period: 1,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 月1 / 秋AB 月1");
  });

  it("'春AB 月1,2 / 秋AB 月1,2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "FallA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "FallA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "FallB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "FallB",
        day: "Mon",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 月1,2 / 秋AB 月1,2");
  });

  it("'春C 月1 火2 / 秋ABC 月1 火2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringC",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "FallA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "FallA",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "FallB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "FallB",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "FallC",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "FallC",
        day: "Tue",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春C 月1 火2 / 秋ABC 月1 火2");
  });

  it("'春A 月1-3'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 3,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月1-3");
  });

  it("'春A 月火水1'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 1,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月火水1");
  });

  it("'春A 月1 火2 水3'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 3,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月1 火2 水3");
  });

  it("'春ABC 月1'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 1,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 月1");
  });

  it("'春ABC 月1,2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 月1,2");
  });

  it("'春ABC 月火1'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 1,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 月火1");
  });

  it("'春ABC 月1 火2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 月1 火2");
  });

  it("'春ABC 月火1,2'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 月火1,2");
  });

  it("'春ABC 月1,2 火3,4'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 4,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 月1,2 火3,4");
  });

  it("'春A 応談'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 応談");
  });

  it("'春AB 応談'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringB",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 応談");
  });

  it("'春C 応談 / 秋A 応談'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringC",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "FallA",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春C 応談 / 秋A 応談");
  });

  it("'春ABC 応談'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringB",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringC",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 応談");
  });

  it("'春ABC 応談 / 秋A 応談'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringB",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringC",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "FallA",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 応談 / 秋A 応談");
  });

  it("'春ABC 応談 / 秋AB 応談'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringB",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringC",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "FallA",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "FallB",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 応談 / 秋AB 応談");
  });

  it("'春C 月1 集中'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringC",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春C 月1 集中");
  });

  it("'夏季休業中 集中'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SummerVacation",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("夏季休業中 集中");
  });

  it("'春季休業中 集中'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringVacation",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春季休業中 集中");
  });

  it("'通年 応談'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "Annual",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("通年 応談");
  });

  it("'通年 随時'", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "Annual",
        day: "AnyTime",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("通年 随時");
  });
});

/** 組み合わせ */

describe(`${periodToString.name} 組み合わせ`, () => {
  it("'春AB 月3 / 秋ABC 集中'　発展体育水泳（春）", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 3,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 3,
        room: "",
      },
      {
        module: "FallA",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "FallB",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "FallC",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 月3 / 秋ABC 集中");
  });

  it("'秋AB 月4 / 秋C 集中'　発展体育ジョグ&ウォーク（秋）", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallA",
        day: "Mon",
        period: 4,
        room: "",
      },
      {
        module: "FallB",
        day: "Mon",
        period: 4,
        room: "",
      },
      {
        module: "FallC",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋AB 月4 / 秋C 集中");
  });

  it("'秋ABC 月2 火2,4'　Japan-Expert日本語　上級読む", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "FallA",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "FallA",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "FallB",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "FallB",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "FallB",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "FallC",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "FallC",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "FallC",
        day: "Tue",
        period: 4,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋ABC 月2 火2,4");
  });

  it("'春ABC 火水木金4'　総合日本語1A", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Thu",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Thu",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 4,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 火水木金4");
  });

  it("'春AB 水5,6 / 秋AB 水5,6 / 秋C 集中'　学際的社会科学演習", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Wed",
        period: 5,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 6,
        room: "",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: 5,
        room: "",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: 6,
        room: "",
      },
      {
        module: "FallA",
        day: "Wed",
        period: 5,
        room: "",
      },
      {
        module: "FallA",
        day: "Wed",
        period: 6,
        room: "",
      },
      {
        module: "FallB",
        day: "Wed",
        period: 5,
        room: "",
      },
      {
        module: "FallB",
        day: "Wed",
        period: 6,
        room: "",
      },
      {
        module: "FallC",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe(
      "春AB 水5,6 / 秋AB 水5,6 / 秋C 集中"
    );
  });

  it("'春AB 水6 / 秋A 集中'　筑波山から学ぶー地域の文化資源発掘", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Wed",
        period: 6,
        room: "",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: 6,
        room: "",
      },
      {
        module: "FallA",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 水6 / 秋A 集中");
  });

  it("'秋AB 水1 / 秋C 水1,2'　国語科教育演習Ⅰ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallA",
        day: "Wed",
        period: 1,
        room: "",
      },
      {
        module: "FallB",
        day: "Wed",
        period: 1,
        room: "",
      },
      {
        module: "FallC",
        day: "Wed",
        period: 1,
        room: "",
      },
      {
        module: "FallC",
        day: "Wed",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋AB 水1 / 秋C 水1,2");
  });

  it("'秋AB 木1 / 秋C 木2 集中'　数学科教育概論Ⅱ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallA",
        day: "Thu",
        period: 1,
        room: "",
      },
      {
        module: "FallB",
        day: "Thu",
        period: 1,
        room: "",
      },
      {
        module: "FallC",
        day: "Thu",
        period: 2,
        room: "",
      },
      {
        module: "FallC",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋AB 木1 / 秋C 木2 集中");
  });

  it("'春C 集中 / 夏季休業中 集中'　農業教育法概論", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringC",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "SummerVacation",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春C 集中 / 夏季休業中 集中");
  });

  it("'夏季休業中 集中 / 秋AB 集中'　教職実事演習（中・高）", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SummerVacation",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "FallA",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "FallB",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("夏季休業中 集中 / 秋AB 集中");
  });

  it("'春ABC 月2 / 春C 集中'　博物館学Ⅰ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 月2 / 春C 集中");
  });

  it("'春C 金4 / 夏季休業中 集中'　東洋宗教思想史演習Ⅱ-b", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringC",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "SummerVacation",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春C 金4 / 夏季休業中 集中");
  });

  it("'秋ABC 水6 集中'　民俗学実習-B", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallA",
        day: "Wed",
        period: 6,
        room: "",
      },
      {
        module: "FallA",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "FallB",
        day: "Wed",
        period: 6,
        room: "",
      },
      {
        module: "FallB",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "FallC",
        day: "Wed",
        period: 6,
        room: "",
      },
      {
        module: "FallC",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋ABC 水6 集中");
  });

  it("'秋ABC 金3 / 秋B 集中'　文化地理学野外自習Ⅱ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallA",
        day: "Fri",
        period: 3,
        room: "",
      },
      {
        module: "FallB",
        day: "Fri",
        period: 3,
        room: "",
      },
      {
        module: "FallC",
        day: "Fri",
        period: 3,
        room: "",
      },
      {
        module: "FallB",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋ABC 金3 / 秋B 集中");
  });

  it("'春AB 金6 / 夏季休業中 集中 / 秋AB 金6'　日本語方言研究フィールド実習Ⅱ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Fri",
        period: 6,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 6,
        room: "",
      },
      {
        module: "SummerVacation",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "FallA",
        day: "Fri",
        period: 6,
        room: "",
      },
      {
        module: "FallB",
        day: "Fri",
        period: 6,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe(
      "春AB 金6 / 夏季休業中 集中 / 秋AB 金6"
    );
  });

  it("'秋AC 随時 / 秋B 集中'　日本語・日本文化実験実習", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallA",
        day: "AnyTime",
        period: 0,
        room: "",
      },
      {
        module: "FallB",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "FallC",
        day: "AnyTime",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋AC 随時 / 秋B 集中");
  });

  it("'春AB 応談 / 秋ABC 木6 応談'　社会学演習Ⅰb", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringB",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "FallA",
        day: "Thu",
        period: 6,
        room: "",
      },
      {
        module: "FallA",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "FallB",
        day: "Thu",
        period: 6,
        room: "",
      },
      {
        module: "FallB",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "FallC",
        day: "Thu",
        period: 6,
        room: "",
      },
      {
        module: "FallC",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 応談 / 秋ABC 木6 応談");
  });

  it("'春A 月5,6 水4-6 応談'　民法総則", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 5,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 6,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 5,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 6,
        room: "",
      },
      {
        module: "SpringA",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月5,6 水4-6 応談");
  });

  it("'秋AB 火3 / 秋B 集中'　運動障害の指導法", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallA",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "FallB",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "FallB",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋AB 火3 / 秋B 集中");
  });

  it("'春AB 金4-6 / 春ABC 応談'　基礎生物学実験Ⅰ ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: 5,
        room: "",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: 6,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 5,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 6,
        room: "",
      },
      {
        module: "SpringA",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringB",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringC",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 金4-6 / 春ABC 応談");
  });

  it("'春B 木5,6 / 春C 応談 / 夏季休業中 応談'　分子細胞生物学概論", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringB",
        day: "Thu",
        period: 5,
        room: "",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: 6,
        room: "",
      },
      {
        module: "SpringC",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SummerVacation",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe(
      "春B 木5,6 / 春C 応談 / 夏季休業中 応談"
    );
  });

  it("'春BC 火5 / 夏季休業中 応談'　遺伝学概論", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringB",
        day: "Tue",
        period: 5,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 5,
        room: "",
      },
      {
        module: "SummerVacation",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春BC 火5 / 夏季休業中 応談");
  });

  it("'春AB 金3 / 春ABC 応談 / 秋AB 火3'　理論生物学の基礎Ⅰ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Fri",
        period: 3,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 3,
        room: "",
      },
      {
        module: "SpringA",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringB",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringC",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "FallA",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "FallB",
        day: "Tue",
        period: 3,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 金3 / 春ABC 応談 / 秋AB 火3");
  });

  it("'秋B 木4-6 金4,5 応談'　電子顕微鏡実験", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallB",
        day: "Thu",
        period: 4,
        room: "",
      },
      {
        module: "FallB",
        day: "Thu",
        period: 5,
        room: "",
      },
      {
        module: "FallB",
        day: "Thu",
        period: 6,
        room: "",
      },
      {
        module: "FallB",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "FallB",
        day: "Fri",
        period: 5,
        room: "",
      },
      {
        module: "FallB",
        day: "Appointment",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋B 木4-6 金4,5 応談");
  });

  it("'秋B 月金4-6 火木4,5'　応用生物化学実験Ⅲ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallB",
        day: "Mon",
        period: 4,
        room: "",
      },
      {
        module: "FallB",
        day: "Mon",
        period: 5,
        room: "",
      },
      {
        module: "FallB",
        day: "Mon",
        period: 6,
        room: "",
      },
      {
        module: "FallB",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "FallB",
        day: "Fri",
        period: 5,
        room: "",
      },
      {
        module: "FallB",
        day: "Fri",
        period: 6,
        room: "",
      },
      {
        module: "FallB",
        day: "Thu",
        period: 5,
        room: "",
      },
      {
        module: "FallB",
        day: "Thu",
        period: 4,
        room: "",
      },
      {
        module: "FallB",
        day: "Tue",
        period: 5,
        room: "",
      },
      {
        module: "FallB",
        day: "Tue",
        period: 4,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋B 月金4-6 火木4,5");
  });

  it("'春C 水金1-5 / 夏季休業中 応談'　植物バイオテクノロジーⅠ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringC",
        day: "Wed",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: 3,
        room: "",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: 5,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 3,
        room: "",
      },
      {
        module: "SummerVacation",
        day: "Appointment",
        period: 0,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 5,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春C 水金1-5 / 夏季休業中 応談");
  });

  it("'春AC 月4-6 火4,5'　人間生物学Ⅰ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringC",
        day: "Mon",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 5,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 6,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 5,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 6,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 5,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 5,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AC 月4-6 火4,5");
  });

  it("'通年 水3-5 金4,5'　物理学実験3", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "Annual",
        day: "Wed",
        period: 3,
        room: "",
      },
      {
        module: "Annual",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "Annual",
        day: "Wed",
        period: 5,
        room: "",
      },
      {
        module: "Annual",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "Annual",
        day: "Fri",
        period: 5,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("通年 水3-5 金4,5");
  });

  it("'春AB 木1 / 春C 火2,3'　常微分方程式", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Thu",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 3,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 木1 / 春C 火2,3");
  });

  it("'春AB 金5 / 秋A 火1,2'　熱力学Ⅰ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Fri",
        period: 5,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 5,
        room: "",
      },
      {
        module: "FallA",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "FallA",
        day: "Tue",
        period: 2,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 金5 / 秋A 火1,2");
  });

  it("'秋A 木1,2 / 秋BC 木1'　応用数学A", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallA",
        day: "Thu",
        period: 1,
        room: "",
      },
      {
        module: "FallA",
        day: "Thu",
        period: 2,
        room: "",
      },
      {
        module: "FallB",
        day: "Thu",
        period: 1,
        room: "",
      },
      {
        module: "FallC",
        day: "Thu",
        period: 1,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋A 木1,2 / 秋BC 木1");
  });

  it("'春ABC 水3,4 金5,6 / 春C 集中'　ビジネスシステムデザインA", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Wed",
        period: 3,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: 5,
        room: "",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: 6,
        room: "",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: 3,
        room: "",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 5,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 6,
        room: "",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: 3,
        room: "",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 5,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 6,
        room: "",
      },
      {
        module: "SpringC",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 水3,4 金5,6 / 春C 集中");
  });

  it("'夏季休業中 集中 / 秋ABC 集中 / 春季休業中 集中'　医学の基礎", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SummerVacation",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "FallA",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "FallB",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "FallC",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "SpringVacation",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe(
      "夏季休業中 集中 / 秋ABC 集中 / 春季休業中 集中"
    );
  });

  it("'春A 火3,4 / 春B 火3-5 / 春C 火2-4'　小児看護学演習", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 5,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 4,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 火3,4 / 春B 火3-5 / 春C 火2-4");
  });

  it("'春A 月1 / 春B 月水1'　医科学英語論文購読の基礎", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: 1,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春A 月1 / 春B 月水1");
  });

  it("'秋A 月4,5 / 秋BC 月4-6'　生化学成分検査実習", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallA",
        day: "Mon",
        period: 4,
        room: "",
      },
      {
        module: "FallA",
        day: "Mon",
        period: 5,
        room: "",
      },
      {
        module: "FallB",
        day: "Mon",
        period: 4,
        room: "",
      },
      {
        module: "FallB",
        day: "Mon",
        period: 5,
        room: "",
      },
      {
        module: "FallB",
        day: "Mon",
        period: 6,
        room: "",
      },
      {
        module: "FallC",
        day: "Mon",
        period: 4,
        room: "",
      },
      {
        module: "FallC",
        day: "Mon",
        period: 5,
        room: "",
      },
      {
        module: "FallC",
        day: "Mon",
        period: 6,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("秋A 月4,5 / 秋BC 月4-6");
  });

  it("'春ABC 随時 / 秋AB 随時'　卒業研究", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "AnyTime",
        period: 0,
        room: "",
      },
      {
        module: "SpringB",
        day: "AnyTime",
        period: 0,
        room: "",
      },
      {
        module: "SpringC",
        day: "AnyTime",
        period: 0,
        room: "",
      },
      {
        module: "FallA",
        day: "AnyTime",
        period: 0,
        room: "",
      },
      {
        module: "FallB",
        day: "AnyTime",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 随時 / 秋AB 随時");
  });

  it("'春C 集中 / 夏季休業中 集中'　テラコッタ実習", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringC",
        day: "Intensive",
        period: 0,
        room: "",
      },
      {
        module: "SummerVacation",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春C 集中 / 夏季休業中 集中");
  });

  it("'秋A 水4,5 金5,6 / 秋BC 水4,5 金3,4 / 秋C 集中'　Seminars on Global Issues B-Ⅰ", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "FallA",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "FallA",
        day: "Wed",
        period: 5,
        room: "",
      },
      {
        module: "FallA",
        day: "Fri",
        period: 5,
        room: "",
      },
      {
        module: "FallA",
        day: "Fri",
        period: 6,
        room: "",
      },
      {
        module: "FallB",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "FallB",
        day: "Wed",
        period: 5,
        room: "",
      },
      {
        module: "FallB",
        day: "Fri",
        period: 3,
        room: "",
      },
      {
        module: "FallB",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "FallC",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "FallC",
        day: "Wed",
        period: 5,
        room: "",
      },
      {
        module: "FallC",
        day: "Fri",
        period: 3,
        room: "",
      },
      {
        module: "FallC",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "FallC",
        day: "Intensive",
        period: 0,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe(
      "秋A 水4,5 金5,6 / 秋BC 水4,5 金3,4 / 秋C 集中"
    );
  });

  it("'春ABC 月火水木金1-4'　集中日本語DOOOA", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 3,
        room: "",
      },
      {
        module: "SpringA",
        day: "Mon",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringA",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 3,
        room: "",
      },
      {
        module: "SpringA",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Thu",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Thu",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Thu",
        period: 3,
        room: "",
      },
      {
        module: "SpringA",
        day: "Thu",
        period: 4,
        room: "",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: 1,
        room: "",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: 2,
        room: "",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: 3,
        room: "",
      },
      {
        module: "SpringA",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 3,
        room: "",
      },
      {
        module: "SpringB",
        day: "Mon",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringB",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: 3,
        room: "",
      },
      {
        module: "SpringB",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: 3,
        room: "",
      },
      {
        module: "SpringB",
        day: "Thu",
        period: 4,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 1,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 2,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 3,
        room: "",
      },
      {
        module: "SpringB",
        day: "Fri",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 3,
        room: "",
      },
      {
        module: "SpringC",
        day: "Mon",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 3,
        room: "",
      },
      {
        module: "SpringC",
        day: "Tue",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: 3,
        room: "",
      },
      {
        module: "SpringC",
        day: "Wed",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Thu",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Thu",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Thu",
        period: 3,
        room: "",
      },
      {
        module: "SpringC",
        day: "Thu",
        period: 4,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 1,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 2,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 3,
        room: "",
      },
      {
        module: "SpringC",
        day: "Fri",
        period: 4,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春ABC 月火水木金1-4");
  });

  it("'春AB 土7,8'　大学院生用", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SpringA",
        day: "Sat",
        period: 7,
        room: "",
      },
      {
        module: "SpringA",
        day: "Sat",
        period: 8,
        room: "",
      },
      {
        module: "SpringB",
        day: "Sat",
        period: 7,
        room: "",
      },
      {
        module: "SpringB",
        day: "Sat",
        period: 8,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("春AB 土7,8");
  });

  it("'夏季休業中 土4-6'　大学院生用", () => {
    const schedules: CourseSchedule[] = [
      {
        module: "SummerVacation",
        day: "Sat",
        period: 4,
        room: "",
      },
      {
        module: "SummerVacation",
        day: "Sat",
        period: 5,
        room: "",
      },
      {
        module: "SummerVacation",
        day: "Sat",
        period: 6,
        room: "",
      },
    ];
    expect(periodToString(schedules)).toBe("夏季休業中 土4-6");
  });
});
