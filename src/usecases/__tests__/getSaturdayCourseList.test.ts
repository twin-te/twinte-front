import { RegisteredCourse } from "~/api/@types";
import { getSaturdayCourseList } from "../getSaturdayCourseList";
import { SaturdayCourse } from "~/entities/table";

describe(getSaturdayCourseList.name, () => {
  it("test", () => {
    const courses: RegisteredCourse[] = [
      course1, // 土曜授業ではない
      course2, // 土曜授業ではない
      course3, // 土曜授業ではない
      course4, // 土曜授業
      course5, // 土曜授業
    ];
    expect(getSaturdayCourseList(courses)).toEqual([res4, res5]);
  });
});

// 土曜授業ではない
const course1: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "初等社会特論",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SummerVacation",
      day: "Intensive",
      period: 0,
      room: "8B204",
    },
    {
      module: "SpringVacation",
      day: "Intensive",
      period: 0,
      room: "8B204",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const course2: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "日本美術特別技法演習-1",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SpringB",
      day: "Intensive",
      period: 0,
      room: "アート&デザイン実習室",
    },
    {
      module: "SpringC",
      day: "Intensive",
      period: 0,
      room: "アート&デザイン実習室",
    },
    {
      module: "SummerVacation",
      day: "Intensive",
      period: 0,
      room: "アート&デザイン実習室",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const course3: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  course: {
    id: "xxx",
    year: 0,
    code: "xxx",
    name: "原子核実験物理学II",
    instructor: "xxx",
    credit: 0,
    overview: "xxx",
    remarks: "xxx",
    recommendedGrades: [0],
    methods: ["FaceToFace"],
    schedules: [
      {
        module: "FallA",
        day: "Intensive",
        period: 0,
        room: "自然B118",
      },
      {
        module: "FallB",
        day: "Intensive",
        period: 0,
        room: "自然B118",
      },
      {
        module: "FallC",
        day: "Intensive",
        period: 0,
        room: "自然B118",
      },
    ],
  },
  year: 0,
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};

// 土曜授業
const course4: RegisteredCourse = {
  id: "e6494b28-2f2a-470b-9412-77a93e5d42ae",
  userId: "xxx",
  year: 0,
  name: "生涯発達臨床心理学I",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SpringA",
      day: "Sat",
      period: 2,
      room: "1F118講義室",
    },
    {
      module: "SpringA",
      day: "Sat",
      period: 3,
      room: "1F118講義室",
    },
    {
      module: "SpringB",
      day: "Sat",
      period: 2,
      room: "1F118講義室",
    },
    {
      module: "SpringB",
      day: "Sat",
      period: 3,
      room: "1F118講義室",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const course5: RegisteredCourse = {
  id: "070e5903-9c4a-460d-9c39-51fde7e151dd",
  userId: "xxx",
  year: 0,
  name: "学校心理学",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "FallA",
      day: "Sat",
      period: 6,
      room: "",
    },
    {
      module: "FallA",
      day: "Sat",
      period: 7,
      room: "",
    },
    {
      module: "FallB",
      day: "Sat",
      period: 6,
      room: "",
    },
    {
      module: "FallB",
      day: "Sat",
      period: 7,
      room: "",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};

const res4: SaturdayCourse = {
  module: ["春AB"],
  name: "生涯発達臨床心理学I",
  room: "1F118講義室",
  id: "e6494b28-2f2a-470b-9412-77a93e5d42ae",
};

const res5: SaturdayCourse = {
  module: ["秋AB"],
  name: "学校心理学",
  room: "",
  id: "070e5903-9c4a-460d-9c39-51fde7e151dd",
};
