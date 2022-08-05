import {
  Course,
  RegisteredCourse,
  Schedule,
  ScheduleMode,
  Tag,
} from "~/domain";
import { Result } from "~/domain/result";

export interface ICourseRepository {
  searchCourse(
    keywords: string[],
    codes: string[],
    schedules: Schedule[],
    scheduleMode: ScheduleMode,
    offset: number,
    limit: number
  ): Promise<Result<Course[]>>;

  addCoursesByCodes(
    inputData: { year: number; code: string }[]
  ): Promise<Result<RegisteredCourse[]>>;

  addCustomizedCourse(
    course: Omit<RegisteredCourse, "id" | "code">
  ): Promise<Result<RegisteredCourse>>;

  getRegisteredCoursesByYear(year: number): Promise<Result<RegisteredCourse[]>>;

  getRegisteredCourseById(id: string): Promise<Result<RegisteredCourse>>;

  updateRegisteredCourse(
    id: string,
    updatedData: Partial<Omit<RegisteredCourse, "id" | "year" | "code">>
  ): Promise<Result<RegisteredCourse>>;

  dropRegisteredCourse(id: string): Promise<Result<null>>;

  getAllTags(): Promise<Result<Tag[]>>;

  getTagById(id: string): Promise<Result<Tag>>;

  /**
   * Create the new tag of which order is set to last.
   * @param name - Tag name
   * @return Created tag
   */
  createTag(name: string): Promise<Result<Tag>>;

  updateTagName(name: string): Promise<Result<Tag>>;

  /**
   * Update tag orders. All tag ids that user have must be specified.
   * @param ids - List of tag ids. The index represent each tag order.
   */
  updateTagOrders(ids: string[]): Promise<Result<Tag[]>>;

  deleteTag(id: string): Promise<Result<null>>;
}
