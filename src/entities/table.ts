import { Day, RegisteredCourse } from "~/api/@types";
import { SpecialDay, weeksNum } from "./day";

export const getValue = <T = unknown>(
  target: T[][],
  day: Day,
  peirod: number
) => target[weeksNum(day)][peirod];

export type CourseState = {
  name: string;
  room: string;
  courseId: string;
};

export type SpecialCourse = {
  id: string;
  name: string;
  module: string[];
  room: string;
};

/**
 * ```
 * table
 *   [曜日]
 *   [時限 0~5]
 *   [該当する科目は一つとは限らないので配列（重複しなければ0番目に目的の CourseState が入っている）]
 * ```
 */
export type Table = CourseState[][][];

export type SpecialTable = {
  [key in SpecialDay]: SpecialCourse[];
};

export const dummyData: { table: Table } = {
  table: [
    [
      [{ name: "節足動物学野外演習", room: "1A101", courseId: "gb11514" }],
      [
        { name: "節足動物学野外演習", room: "1A101", courseId: "gb11514" },
        { name: "重複科目", room: "1A102", courseId: "gb11451" },
      ],
      [],
      [],
      [],
      [],
    ],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
  ],
};

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
const course5: RegisteredCourse = {
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
const course6: RegisteredCourse = {
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
const course8: RegisteredCourse = {
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

export const dummySpecial: RegisteredCourse[] = [
  course1,
  course2,
  course3,
  course4,
  course5,
  course6,
  course7,
  course8,
  course9,
  course10,
  course11,
  course12,
  course13,
  course14,
  course15,
];
