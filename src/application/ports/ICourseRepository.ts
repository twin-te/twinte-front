import { Course, RegisteredCourse, SearchMode } from "~/domain/course";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
  ValueError,
} from "~/domain/error";
import { Module } from "~/domain/module";
import { Tag } from "~/domain/tag";
import { Timetable } from "~/domain/timetable";

export interface ICourseRepository {
  searchCourse(
    year: number,
    keywords: string[],
    codes: string[],
    timetable: Timetable<Module, boolean>,
    scheduleMode: SearchMode,
    offset: number,
    limit: number
  ): Promise<Course[] | UnauthorizedError | NetworkError | InternalServerError>;

  getCourses(
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
  >;

  addCoursesByCodes(
    inputData: { year: number; code: string }[]
  ): Promise<
    | RegisteredCourse[]
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  >;

  addCustomizedCourse(
    course: Omit<RegisteredCourse, "id" | "code">
  ): Promise<
    RegisteredCourse | UnauthorizedError | NetworkError | InternalServerError
  >;

  getRegisteredCoursesByYear(
    year: number
  ): Promise<
    RegisteredCourse[] | UnauthorizedError | NetworkError | InternalServerError
  >;

  getRegisteredCourseById(
    id: string
  ): Promise<
    | RegisteredCourse
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  >;

  updateRegisteredCourse(
    id: string,
    updatedData: Partial<Omit<RegisteredCourse, "id" | "year" | "code">>
  ): Promise<
    | RegisteredCourse
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  >;

  dropRegisteredCourse(
    id: string
  ): Promise<
    | null
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  >;

  getAllTags(): Promise<
    Tag[] | UnauthorizedError | NetworkError | InternalServerError
  >;

  getTagById(
    id: string
  ): Promise<
    Tag | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  >;

  /**
   * Create the new tag of which order is set to last.
   */
  createTag(
    name: string
  ): Promise<Tag | UnauthorizedError | NetworkError | InternalServerError>;

  updateTagName(
    id: string,
    name: string
  ): Promise<
    Tag | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  >;

  updateTagOrders(
    inputData: Pick<Tag, "id" | "order">[]
  ): Promise<
    Tag[] | ValueError | UnauthorizedError | NetworkError | InternalServerError
  >;

  deleteTag(
    id: string
  ): Promise<
    | null
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  >;
}
