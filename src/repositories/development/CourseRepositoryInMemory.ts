import { ICourseRepository } from "~/application/ports/ICourseRepository";
import { Course, RegisteredCourse, SearchMode } from "~/domain/course";
import {
  InternalServerError,
  isResultError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
  ValueError,
} from "~/domain/error";
import { Module } from "~/domain/module";
import {
  isNormalSchedule,
  isSpecialSchedule,
  Schedule,
} from "~/domain/schedule";
import { Tag } from "~/domain/tag";
import { Timetable } from "~/domain/timetable";
import courses_json from "~/tests/data/courses.json";
import {
  deepCopy,
  deleteElementInArray,
  isEqualSet,
  updateElementInArray,
  createId,
} from "~/utils";

export class CourseRepositoryInMemory implements ICourseRepository {
  #courses_db: Course[];
  #courses: RegisteredCourse[];
  #tags: Tag[];

  constructor() {
    this.#courses_db = courses_json as Course[];
    this.#courses = [];
    this.#tags = [];

    this.#initCourses();
    this.#initTags();
  }

  #initCourses() {
    this.#initNormalCourses(100);
    this.#initSpecialCourses(20);
  }

  #initNormalCourses(num: number) {
    const inputData = this.#courses_db
      .filter((course) => course.schedules.some(isNormalSchedule))
      .slice(0, num)
      .map(({ year, code }) => ({ year, code }));
    this.addCoursesByCodes(inputData);
  }

  #initSpecialCourses(num: number) {
    const inputData = this.#courses_db
      .filter((course) => course.schedules.some(isSpecialSchedule))
      .slice(0, num)
      .map(({ year, code }) => ({ year, code }));
    this.addCoursesByCodes(inputData);
  }

  #initTags() {
    this.createTag("必修");
    this.createTag("選択");
  }

  async searchCourse(
    year: number,
    keywords: string[],
    codes: string[],
    timetable: Timetable<Module, boolean>,
    searchMode: SearchMode,
    offset: number,
    limit: number
  ): Promise<
    Course[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    const isContainedInTimetable = (schedule: Schedule): boolean => {
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
        if (searchMode === "Cover") {
          return course.schedules.some(isContainedInTimetable);
        } else {
          return course.schedules.every(isContainedInTimetable);
        }
      })
      .slice(offset, offset + limit);

    return courses;
  }

  async getCourses(
    inputData: {
      year: number;
      code: string;
    }[]
  ): Promise<
    | Course[]
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  > {
    const courses = this.#courses_db.filter((course) =>
      inputData.find(
        ({ year, code }) => course.year === year && course.code === code
      )
    );
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
      id: createId(),
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
    if (isResultError(result)) return result;
    const course = { ...result, ...updatedData };
    updateElementInArray(this.#courses, course);
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
    deleteElementInArray(this.#courses, id);
    return null;
  }

  async getAllTags(): Promise<
    Tag[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    return deepCopy(this.#tags);
  }

  async getTagById(
    id: string
  ): Promise<
    Tag | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  > {
    if (this.#tags.length === 0) {
      const result = await this.getAllTags();
      if (isResultError(result)) return result;
    }
    const tag = this.#tags.find((tag) => tag.id === id);
    return tag ? deepCopy(tag) : new NotFoundError();
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
      id: createId(),
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
    if (isResultError(result)) return result;
    const newTag = { ...result, name };
    updateElementInArray(this.#tags, newTag);
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
    deleteElementInArray(this.#tags, id);
    return null;
  }
}
