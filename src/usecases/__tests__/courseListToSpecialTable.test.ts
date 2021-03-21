import { RegisteredCourse } from "~/api/@types";
import { SpecialTable } from "~/entities/table";
import { courseListToSpecialTable } from "../courseListToSpecialTable";

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
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const res1: { module: string[]; name: string; room: string; id: string } = {
  module: ["夏休"],
  name: "初等社会特論",
  room: "8B204",
  id: "xxx",
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
const res2: { module: string[]; name: string; room: string; id: string } = {
  module: ["春BC", "夏休"],
  name: "日本美術特別技法演習-1",
  room: "アート&デザイン実習室",
  id: "xxx",
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
const res3: { module: string[]; name: string; room: string; id: string } = {
  module: ["秋ABC"],
  name: "原子核実験物理学II",
  room: "自然B118",
  id: "xxx",
};
const course4: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "国際生命産業科学インターンシップ",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "Annual",
      day: "Appointment",
      period: 0,
      room: "",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const res4: { module: string[]; name: string; room: string; id: string } = {
  module: ["通年"],
  name: "国際生命産業科学インターンシップ",
  room: "",
  id: "xxx",
};
const course5: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  course: {
    id: "xxx",
    year: 0,
    code: "xxx",
    name: "xxx",
    instructor: "xxx",
    credit: 0,
    overview: "xxx",
    remarks: "xxx",
    recommendedGrades: [0],
    methods: ["FaceToFace"],
    schedules: [
      {
        module: "Annual",
        day: "Appointment",
        period: 0,
        room: "研究室",
      },
    ],
  },
  year: 0,
  name: "応用動物昆虫学特別研究I",
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const res5: { module: string[]; name: string; room: string; id: string } = {
  module: ["通年"],
  name: "応用動物昆虫学特別研究I",
  room: "研究室",
  id: "xxx",
};
const course6: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "色彩学",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SpringC",
      day: "AnyTime",
      period: 0,
      room: "3A棟",
    },
    {
      module: "SummerVacation",
      day: "AnyTime",
      period: 0,
      room: "中央図書館",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const res6: { module: string[]; name: string; room: string; id: string } = {
  module: ["春C", "夏休"],
  name: "色彩学",
  room: "3A棟, 中央図書館",
  id: "xxx",
};
const course7: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "International Conference Seminar I",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "Annual",
      day: "AnyTime",
      period: 0,
      room: "",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const res7: { module: string[]; name: string; room: string; id: string } = {
  module: ["通年"],
  name: "International Conference Seminar I",
  room: "",
  id: "xxx",
};
const course8: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "International Conference Seminar I",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SpringA",
      day: "AnyTime",
      period: 0,
      room: "情報理工後期特別研究室",
    },
    {
      module: "SpringB",
      day: "AnyTime",
      period: 0,
      room: "情報理工後期特別研究室",
    },
    {
      module: "SpringC",
      day: "AnyTime",
      period: 0,
      room: "情報理工後期特別研究室",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const res8: { module: string[]; name: string; room: string; id: string } = {
  module: ["春ABC"],
  name: "International Conference Seminar I",
  room: "情報理工後期特別研究室",
  id: "xxx",
};

describe(courseListToSpecialTable.name, () => {
  it("test", () => {
    const courses = [
      course1,
      course2,
      course3,
      course4,
      course5,
      course6,
      course7,
      course8,
    ];
    const table: SpecialTable = {
      Intensive: [res2, res1, res3],
      Appointment: [res4, res5],
      AnyTime: [res7, res8, res6],
    };
    expect(courseListToSpecialTable(courses)).toEqual(table);
  });
});
