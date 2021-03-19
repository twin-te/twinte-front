import { Ports } from "~/adapter";
import {
  Course,
  RegisteredCourse,
  RegisteredCourseWithoutID,
} from "~/api/@types";
import { getDuplicatedCourses } from "~/usecases/getDuplicatedCourses";

const registeredCourse1: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "xxx",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SpringA",
      day: "Mon",
      period: 1,
      room: "xxx",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const registeredCourse2: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "xxx",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "FallB",
      day: "Wed",
      period: 3,
      room: "xxx",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const registeredCourse3: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "xxx",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SummerVacation",
      day: "Intensive",
      period: 0,
      room: "xxx",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};
const registeredCourse4: RegisteredCourse = {
  id: "xxx",
  userId: "xxx",
  year: 0,
  name: "xxx",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SpringC",
      day: "Intensive",
      period: 0,
      room: "xxx",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};

const course1: Course = {
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
      module: "SpringA",
      day: "Mon",
      period: 1,
      room: "xxx",
    },
  ],
};
const course2: Course = {
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
      module: "FallB",
      day: "Wed",
      period: 3,
      room: "xxx",
    },
  ],
};
const course3: Course = {
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
      module: "SummerVacation",
      day: "Intensive",
      period: 0,
      room: "xxx",
    },
  ],
};
const course4: Course = {
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
      module: "SpringC",
      day: "Intensive",
      period: 0,
      room: "xxx",
    },
  ],
};
const course5: RegisteredCourseWithoutID = {
  year: 0,
  name: "xxx",
  instructor: "xxx",
  credit: 0,
  methods: ["FaceToFace"],
  schedules: [
    {
      module: "SpringA",
      day: "Mon",
      period: 1,
      room: "xxx",
    },
  ],
  memo: "",
  attendance: 0,
  absence: 0,
  late: 0,
  tags: [],
};

describe(getDuplicatedCourses.name, () => {
  it("春A月曜1限が重複", () => {
    const registeredCourses = [registeredCourse1];
    const courses = [course1];
    const duplicatedCourses = [course1];
    const mockPort = {
      store: { getters: { courses: registeredCourses } },
    } as Ports;
    expect(getDuplicatedCourses(mockPort, courses)).toEqual(duplicatedCourses);
  });

  it("夏季休業中、集中は含めない", () => {
    const registeredCourses = [registeredCourse3, registeredCourse4];
    const courses = [course3, course4];
    const duplicatedCourses = [];
    const mockPort = {
      store: { getters: { courses: registeredCourses } },
    } as Ports;
    expect(getDuplicatedCourses(mockPort, courses)).toEqual(duplicatedCourses);
  });

  it("RegisteredCourseWithoutIDの型でも動く", () => {
    const registeredCourses = [registeredCourse1];
    const courses = [course5];
    const duplicatedCourses = [course5];
    const mockPort = {
      store: { getters: { courses: registeredCourses } },
    } as Ports;
    expect(getDuplicatedCourses(mockPort, courses)).toEqual(duplicatedCourses);
  });
});
