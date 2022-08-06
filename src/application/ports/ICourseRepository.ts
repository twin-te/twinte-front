import {
  Course,
  RegisteredCourse,
  Schedule,
  ScheduleMode,
  Tag,
} from "~/domain";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  PromiseResult,
  UnauthorizedError,
  ValueError,
} from "~/domain/result";

export interface ICourseRepository {
  searchCourse(
    keywords: string[],
    codes: string[],
    schedules: Schedule[],
    scheduleMode: ScheduleMode,
    offset: number,
    limit: number
  ): PromiseResult<
    Course[],
    UnauthorizedError | NetworkError | InternalServerError
  >;

  addCoursesByCodes(
    inputData: { year: number; code: string }[]
  ): PromiseResult<
    RegisteredCourse[],
    NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  >;

  addCustomizedCourse(
    course: Omit<RegisteredCourse, "id" | "code">
  ): PromiseResult<
    RegisteredCourse,
    UnauthorizedError | NetworkError | InternalServerError
  >;

  getRegisteredCoursesByYear(
    year: number
  ): PromiseResult<
    RegisteredCourse[],
    UnauthorizedError | NetworkError | InternalServerError
  >;

  getRegisteredCourseById(
    id: string
  ): PromiseResult<
    RegisteredCourse,
    NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  >;

  updateRegisteredCourse(
    id: string,
    updatedData: Partial<Omit<RegisteredCourse, "id" | "year" | "code">>
  ): PromiseResult<
    RegisteredCourse,
    NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  >;

  dropRegisteredCourse(
    id: string
  ): PromiseResult<
    null,
    NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  >;

  getAllTags(): PromiseResult<
    Tag[],
    UnauthorizedError | NetworkError | InternalServerError
  >;

  getTagById(
    id: string
  ): PromiseResult<
    Tag,
    NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  >;

  /**
   * Create the new tag of which order is set to last.
   * @param name - Tag name
   * @return Created tag
   */
  createTag(
    name: string
  ): PromiseResult<Tag, UnauthorizedError | NetworkError | InternalServerError>;

  updateTagName(
    id: string,
    name: string
  ): PromiseResult<
    Tag,
    NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  >;

  /**
   * Update tag orders. All tag ids that user have must be specified.
   * @param ids - List of tag ids. The index represent each tag order.
   */
  updateTagOrders(
    ids: string[]
  ): PromiseResult<
    Tag[],
    ValueError | UnauthorizedError | NetworkError | InternalServerError
  >;

  deleteTag(
    id: string
  ): PromiseResult<
    null,
    NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  >;
}
