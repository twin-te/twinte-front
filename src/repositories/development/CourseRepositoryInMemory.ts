import { ICourseRepository } from "~/application/ports/ICourseRepository";
import {
  Course,
  Module,
  RegisteredCourse,
  Schedule,
  ScheduleMode,
  Tag,
  Timetable,
} from "~/domain";
import {
  InternalServerError,
  isError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
  ValueError,
} from "~/domain/result";
import { isNormalSchedule } from "~/domain/validations";
import courses_json from "~/tests/data/courses.json";
import { copy, isEqualSet, manipulateArrayEl } from "~/utils";

export class CourseRepositoryInMemory implements ICourseRepository {
  #courses_db: Course[];
  #courses: RegisteredCourse[];
  #tags: Tag[];

  constructor() {
    this.#courses_db = courses_json as Course[];
    this.#courses = [];
    this.#tags = [];

    this.#initCourses();
  }

  #initCourses() {
    const inputData = this.#courses_db
      .slice(0, 50)
      .map(({ year, code }) => ({ year, code }));
    this.addCoursesByCodes(inputData);
  }

  async searchCourse(
    year: number,
    keywords: string[],
    codes: string[],
    timetable: Timetable<Module, boolean>,
    scheduleMode: ScheduleMode,
    offset: number,
    limit: number
  ): Promise<
    Course[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    const isContainInTimetable = (schedule: Schedule): boolean => {
      if (isNormalSchedule(schedule)) {
        return timetable.normal[schedule.module][schedule.day][schedule.period];
      } else {
        return timetable.special[schedule.module][schedule.day];
      }
    };

    const courses = this.#courses_db
      .filter((course) => course.year === year)
      .filter((course) =>
        keywords.some((keyword) => new RegExp(keyword).test(course.name))
      )
      .filter((course) =>
        codes.some((code) => new RegExp(code).test(course.code))
      )
      .filter((course) => {
        if (scheduleMode === "Cover") {
          course.schedules.some(isContainInTimetable);
        } else {
          course.schedules.every(isContainInTimetable);
        }
      })
      .slice(offset, limit);

    return courses;
  }

  async addCoursesByCodes(
    inputData: { year: number; code: string }[]
  ): Promise<
    | RegisteredCourse[]
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  > {
    inputData = inputData.filter(({ year, code }) => {
      const course = this.#courses.find(
        (course) => course.year === year && course.code === code
      );
      return course == undefined;
    });

    const courses = inputData
      .map(({ year, code }) => {
        const course = this.#courses_db.find(
          (course) => course.year === year && course.code === code
        );
        return course;
      })
      .filter((course) => course != undefined) as Course[];

    if (courses.length !== inputData.length) {
      return new NotFoundError();
    }

    const registeredCourses = courses.map<RegisteredCourse>((course) => ({
      ...course,
      memo: "",
      attendance: 0,
      absence: 0,
      late: 0,
      tagIds: [],
    }));

    this.#courses = [...this.#courses, ...registeredCourses];

    return registeredCourses;
  }

  async addCustomizedCourse(
    course: Omit<RegisteredCourse, "id" | "code">
  ): Promise<
    RegisteredCourse | UnauthorizedError | NetworkError | InternalServerError
  > {
    const newCourse: RegisteredCourse = {
      id: new Date().getTime().toString(16),
      ...course,
    };

    this.#courses.push(newCourse);

    return newCourse;
  }

  async getRegisteredCoursesByYear(
    year: number
  ): Promise<
    RegisteredCourse[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    const courses = this.#courses.filter((course) => course.year === year);
    return courses;
  }

  async getRegisteredCourseById(
    id: string
  ): Promise<
    | RegisteredCourse
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  > {
    const course = this.#courses.find((course) => course.id === id);
    if (course == undefined) return new NotFoundError();
    return course;
  }

  async updateRegisteredCourse(
    id: string,
    updatedData: Partial<Omit<RegisteredCourse, "id" | "year" | "code">>
  ): Promise<
    | RegisteredCourse
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  > {
    const result = await this.getRegisteredCourseById(id);
    if (isError(result)) return result;
    const course = { ...result, ...updatedData };
    manipulateArrayEl(this.#courses, (c) => c.id === id, course);
    return course;
  }

  async dropRegisteredCourse(
    id: string
  ): Promise<
    | null
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  > {
    manipulateArrayEl(this.#courses, (c) => c.id === id);
    return null;
  }

  async getAllTags(): Promise<
    Tag[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    return copy(this.#tags);
  }

  async getTagById(
    id: string
  ): Promise<
    Tag | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  > {
    if (this.#tags.length === 0) {
      const result = await this.getAllTags();
      if (isError(result)) return result;
    }
    const tag = this.#tags.find((tag) => tag.id === id);
    return tag ? copy(tag) : new NotFoundError();
  }

  /**
   * Create the new tag of which order is set to last.
   * @param name - Tag name
   * @return Created tag
   */
  async createTag(
    name: string
  ): Promise<Tag | UnauthorizedError | NetworkError | InternalServerError> {
    const newTag = {
      id: new Date().getTime().toString(16),
      name,
      order: this.#tags.length,
    };

    this.#tags.push(newTag);
    return newTag;
  }

  async updateTagName(
    id: string,
    name: string
  ): Promise<
    Tag | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  > {
    const result = await this.getTagById(id);
    if (isError(result)) return result;
    const newTag = { ...result, name };
    manipulateArrayEl(this.#tags, (tag) => tag.id === id, newTag);
    return newTag;
  }

  async updateTagOrders(
    inputData: Pick<Tag, "id" | "order">[]
  ): Promise<
    Tag[] | ValueError | UnauthorizedError | NetworkError | InternalServerError
  > {
    const getIdSet = (array: { id: string }[]): Set<string> =>
      new Set(array.map(({ id }) => id));

    if (!isEqualSet(getIdSet(this.#tags), getIdSet(inputData))) {
      return new ValueError("Please specify all tag ids you have.");
    }

    const idToTag = this.#tags.reduce<Record<string, Tag>>(
      (map, tag) => ({
        ...map,
        [tag.id]: tag,
      }),
      {}
    );

    inputData.forEach(({ id, order }) => {
      idToTag[id]["order"] = order;
    });

    return this.getAllTags();
  }

  async deleteTag(
    id: string
  ): Promise<
    | null
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  > {
    manipulateArrayEl(this.#tags, (tag) => tag.id === id);
    return null;
  }
}
