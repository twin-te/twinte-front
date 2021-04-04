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
const course9: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "生物機械工学",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SummerVacation",
      day: "AnyTime",
      period: 0,
      room: "2D306",
    },
    {
      module: "SpringVacation",
      day: "AnyTime",
      period: 0,
      room: "2D306",
    },
    {
      module: "FallC",
      day: "AnyTime",
      period: 0,
      room: "2D306",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const course10: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "教職論I",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "Annual",
      day: "Appointment",
      period: 0,
      room: "1A101",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const course11: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "住環境計画概論",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SummerVacation",
      day: "Intensive",
      period: 0,
      room: "3A403",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const course12: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "スポーツ倫理学",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "Annual",
      day: "Appointment",
      period: 0,
      room: "5C416",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const course13: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "アジア文化資料研究演習III",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "Annual",
      day: "Appointment",
      period: 0,
      room: "2D305",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const course14: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "English Reading Skills I",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "Annual",
      day: "Appointment",
      period: 0,
      room: "共同利用棟A102",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const course15: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "発展体育接待ゴルフ",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SpringA",
      day: "Intensive",
      period: 0,
      room: "人社A201",
    },
    {
      module: "SpringB",
      day: "Intensive",
      period: 0,
      room: "1A101",
    },
    {
      module: "SpringC",
      day: "Intensive",
      period: 0,
      room: "第1多目的道場",
    },
    {
      module: "FallA",
      day: "Intensive",
      period: 0,
      room: "3A403",
    },
    {
      module: "FallB",
      day: "Intensive",
      period: 0,
      room: "3A403",
    },
    {
      module: "FallC",
      day: "Intensive",
      period: 0,
      room: "共同利用棟A102",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const res1: { module: string[]; name: string; room: string; id: string } = {
  module: ["夏休", "春休"],
  name: "初等社会特論",
  room: "8B204",
  id: "xxx",
};
const res2: { module: string[]; name: string; room: string; id: string } = {
  module: ["春BC", "夏休"],
  name: "日本美術特別技法演習-1",
  room: "アート&デザイン実習室",
  id: "xxx",
};
const res3: { module: string[]; name: string; room: string; id: string } = {
  module: ["秋ABC"],
  name: "原子核実験物理学II",
  room: "自然B118",
  id: "xxx",
};
const res4: { module: string[]; name: string; room: string; id: string } = {
  module: ["通年"],
  name: "国際生命産業科学インターンシップ",
  room: "",
  id: "xxx",
};
const res5: { module: string[]; name: string; room: string; id: string } = {
  module: ["通年"],
  name: "応用動物昆虫学特別研究I",
  room: "研究室",
  id: "xxx",
};
const res6: { module: string[]; name: string; room: string; id: string } = {
  module: ["春C", "夏休"],
  name: "色彩学",
  room: "3A棟, 中央図書館",
  id: "xxx",
};
const res7: { module: string[]; name: string; room: string; id: string } = {
  module: ["通年"],
  name: "International Conference Seminar I",
  room: "",
  id: "xxx",
};
const res8: { module: string[]; name: string; room: string; id: string } = {
  module: ["春ABC"],
  name: "International Conference Seminar I",
  room: "情報理工後期特別研究室",
  id: "xxx",
};
const res9: { module: string[]; name: string; room: string; id: string } = {
  module: ["夏休", "秋C", "春休"],
  name: "生物機械工学",
  room: "2D306",
  id: "xxx",
};
const res10: { module: string[]; name: string; room: string; id: string } = {
  module: ["通年"],
  name: "教職論I",
  room: "1A101",
  id: "xxx",
};
const res11: { module: string[]; name: string; room: string; id: string } = {
  module: ["夏休"],
  name: "住環境計画概論",
  room: "3A403",
  id: "xxx",
};
const res12: { module: string[]; name: string; room: string; id: string } = {
  module: ["通年"],
  name: "スポーツ倫理学",
  room: "5C416",
  id: "xxx",
};
const res13: { module: string[]; name: string; room: string; id: string } = {
  module: ["通年"],
  name: "アジア文化資料研究演習III",
  room: "2D305",
  id: "xxx",
};
const res14: { module: string[]; name: string; room: string; id: string } = {
  module: ["通年"],
  name: "English Reading Skills I",
  room: "共同利用棟A102",
  id: "xxx",
};
const res15: { module: string[]; name: string; room: string; id: string } = {
  module: ["春ABC", "秋ABC"],
  name: "発展体育接待ゴルフ",
  room: "人社A201, 1A101, 第1多目的道場, 3A403, 共同利用棟A102",
  id: "xxx",
};

describe(courseListToSpecialTable.name, () => {
  it("create spcial table.", () => {
    const courses = [
      course1,
      course2,
      course3,
      course4,
      course6,
      course7,
      course8,
      course9,
      course11,
      course12,
      course13,
      course14,
      course15,
    ];
    const table: SpecialTable = {
      Intensive: [res15, res2, res11, res1, res3],
      Appointment: [res14, res13, res12, res4],
      AnyTime: [res7, res8, res6, res9],
    };
    expect(courseListToSpecialTable(courses)).toEqual(table);
  });
});
