import { ICourseRepository } from "~/application/ports/ICourseRepository";
import {
  Course,
  Module,
  RegisteredCourse,
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
import { Api } from "~/infrastructure/api";
import * as ApiType from "~/infrastructure/api/aspida/@types";
import { apiToCourse } from "~/infrastructure/api/converters/course";
import {
  apiToRegisteredCourse,
  registeredCourseToApi,
} from "~/infrastructure/api/converters/registeredCourse";
import { schedulesToApi } from "~/infrastructure/api/converters/schedule";
import { apiToTag } from "~/infrastructure/api/converters/tag";
import { timetableToApi } from "~/infrastructure/api/converters/timetable";
import { isEqualSet, manipulateArrayEl } from "~/utils";

export class CourseRepository implements ICourseRepository {
  #api: Api;
  #years: Set<number>;
  #courses: RegisteredCourse[];
  #tags: Tag[];

  constructor() {
    this.#api = Api.getInstance();
    this.#years = new Set();
    this.#courses = [];
    this.#tags = [];
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
    const reqBody = {
      year,
      searchMode: scheduleMode,
      keywords,
      codes,
      timetable: timetableToApi(timetable),
      offset,
      limit,
    };

    return this.#api.call<ApiType.Course[], Course[], 200, 400 | 401 | 500>(
      (client) => client.courses.search.post({ body: reqBody }),
      (body) => {
        const courses: Course[] = body.map(apiToCourse);
        return courses;
      },
      [200],
      [400, 401, 500]
    );
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
    return this.#api.call<
      ApiType.RegisteredCourse[] | ApiType.RegisteredCourse,
      RegisteredCourse[],
      200,
      400 | 401 | 500
    >(
      (client) => client.registered_courses.post({ body: inputData }),
      (body) => {
        const courses: RegisteredCourse[] = Array.isArray(body)
          ? body.map(apiToRegisteredCourse)
          : [apiToRegisteredCourse(body)];
        this.#courses = [...this.#courses, ...courses];
        return courses;
      },
      [200],
      [400, 401, 500]
    );
  }

  async addCustomizedCourse(
    course: Omit<RegisteredCourse, "id" | "code">
  ): Promise<
    RegisteredCourse | UnauthorizedError | NetworkError | InternalServerError
  > {
    const reqBody = {
      year: course.year,
      name: course.name,
      instructor: course.instructors.join(","),
      credit: course.credit,
      methods: course.methods,
      schedules: schedulesToApi(course.schedules, course.rooms),
      tags: course.tagIds.map((id) => ({ id })),
    };

    return this.#api.call<
      ApiType.RegisteredCourse | ApiType.RegisteredCourse[],
      RegisteredCourse,
      200,
      400 | 401 | 500,
      InternalServerError
    >(
      (client) =>
        client.registered_courses.post({
          body: reqBody,
        }),
      (body) => {
        if (Array.isArray(body))
          return new InternalServerError("Incorrect Implementation");
        const course = apiToRegisteredCourse(body);
        this.#courses.push(course);
        return course;
      },
      [200],
      [400, 401, 500]
    );
  }

  async getRegisteredCoursesByYear(
    year: number
  ): Promise<
    RegisteredCourse[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    if (this.#years.has(year)) {
      const storedCourses = this.#courses.filter(
        (course) => course.year === year
      );
      return storedCourses;
    }

    return this.#api.call<
      ApiType.RegisteredCourse[],
      RegisteredCourse[],
      200,
      400 | 401 | 500
    >(
      (client) => client.registered_courses.get({ query: { year } }),
      (body) => {
        const courses: RegisteredCourse[] = body.map(apiToRegisteredCourse);
        this.#courses = [...this.#courses, ...courses];
        this.#years.add(year);
        return courses;
      },
      [200],
      [400, 401, 500]
    );
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
    const storedCourse = this.#courses.find((course) => course.id === id);
    if (storedCourse) return storedCourse;

    return this.#api.call<
      ApiType.RegisteredCourse,
      RegisteredCourse,
      200,
      400 | 401 | 404 | 500
    >(
      (client) => client.registered_courses._id(id).get(),
      (body) => {
        const course: RegisteredCourse = apiToRegisteredCourse(body);
        this.#courses.push(course);
        return course;
      },
      [200],
      [400, 401, 404, 500]
    );
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
    const result = await this.#api.call<
      ApiType.RegisteredCourse,
      ApiType.RegisteredCourse,
      200,
      400 | 401 | 404 | 500
    >(
      (client) => client.registered_courses._id(id).get(),
      (body) => body,
      [200],
      [400, 401, 404, 500]
    );
    if (isError(result)) return result;

    const storedApiCourse: ApiType.RegisteredCourse = result;
    const updatedCourse: RegisteredCourse = {
      ...apiToRegisteredCourse(storedApiCourse),
      ...updatedData,
    };
    const updatedApiCourse: ApiType.RegisteredCourse = registeredCourseToApi(
      updatedCourse,
      storedApiCourse
    );

    return this.#api.call<
      ApiType.RegisteredCourseWithoutID,
      RegisteredCourse,
      200,
      400 | 401 | 404 | 500
    >(
      (client) =>
        client.registered_courses._id(id).put({
          body: updatedApiCourse as {
            course: { id: string };
          } & ApiType.RegisteredCourseWithoutID,
        }),
      (body) => {
        const newApiCourse: ApiType.RegisteredCourse = {
          ...updatedApiCourse,
          ...body,
        };
        const newCourse = apiToRegisteredCourse(newApiCourse);
        manipulateArrayEl(this.#courses, (c) => c.id === id, newCourse);
        return newCourse;
      },
      [200],
      [400, 401, 404, 500]
    );
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
    return this.#api.call<void, null, 204, 400 | 401 | 404 | 500>(
      (client) => client.registered_courses._id(id).delete(),
      () => {
        manipulateArrayEl(this.#courses, (c) => c.id === id);
        return null;
      },
      [204],
      [400, 401, 404, 500]
    );
  }

  async getAllTags(): Promise<
    Tag[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    return this.#api.call<ApiType.Tag[], Tag[], 200, 401 | 500>(
      (client) => client.tags.get(),
      (body) => {
        this.#tags = body.map(apiToTag);
        return this.#tags;
      },
      [200],
      [401, 500]
    );
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
    return tag ? tag : new NotFoundError();
  }

  /**
   * Create the new tag of which order is set to last.
   * @param name - Tag name
   * @return Created tag
   */
  async createTag(
    name: string
  ): Promise<Tag | UnauthorizedError | NetworkError | InternalServerError> {
    return this.#api.call<ApiType.Tag, Tag, 200, 400 | 401 | 500>(
      (client) => client.tags.post({ body: { name } }),
      (body) => {
        const tag = apiToTag(body);
        this.#tags.push(tag);
        return tag;
      },
      [200],
      [400, 401, 500]
    );
  }

  async updateTagName(
    id: string,
    name: string
  ): Promise<
    Tag | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  > {
    return this.#api.call<ApiType.Tag, Tag, 200, 400 | 401 | 404 | 500>(
      (client) => client.tags._id(id).put({ body: { name } }),
      (body) => {
        const updatedTag = apiToTag(body);
        manipulateArrayEl(this.#tags, (tag) => tag.id === id, updatedTag);
        return updatedTag;
      },
      [200],
      [400, 401, 404, 500]
    );
  }

  async updateTagOrders(
    inputData: Pick<Tag, "id" | "order">[]
  ): Promise<
    Tag[] | ValueError | UnauthorizedError | NetworkError | InternalServerError
  > {
    const tagPositionOnly: ApiType.TagPositionOnly[] = inputData.map(
      ({ id, order }) => ({ id, position: order })
    );

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

    return this.#api.call<
      ApiType.TagPositionOnly[],
      Tag[],
      200,
      400 | 401 | 500
    >(
      (client) => client.tags.patch({ body: tagPositionOnly }),
      (body) => {
        const updatedTags: Tag[] = body.map(({ id, position }) => ({
          ...idToTag[id],
          order: position,
        }));
        return updatedTags;
      },
      [200],
      [400, 401, 500]
    );
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
    return this.#api.call<void, null, 204, 400 | 401 | 404 | 500>(
      (client) => client.tags._id(id).delete(),
      () => {
        manipulateArrayEl(this.#tags, (tag) => tag.id === id);
        this.#courses.forEach((course) => {
          manipulateArrayEl(course.tagIds, (tagId) => tagId === id);
        });
        return null;
      },
      [204],
      [400, 401, 404, 500]
    );
  }
}
