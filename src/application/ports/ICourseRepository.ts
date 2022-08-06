import {
  Course,
  RegisteredCourse,
  Schedule,
  ScheduleMode,
  Tag,
} from "~/domain";
import { PromiseResult } from "~/domain/result";

export interface ICourseRepository {
  searchCourse(
    keywords: string[],
    codes: string[],
    schedules: Schedule[],
    scheduleMode: ScheduleMode,
    offset: number,
    limit: number
  ): PromiseResult<Course[]>;

  addCoursesByCodes(
    inputData: { year: number; code: string }[]
  ): PromiseResult<RegisteredCourse[]>;

  addCustomizedCourse(
    course: Omit<RegisteredCourse, "id" | "code">
  ): PromiseResult<RegisteredCourse>;

  getRegisteredCoursesByYear(year: number): PromiseResult<RegisteredCourse[]>;

  getRegisteredCourseById(id: string): PromiseResult<RegisteredCourse>;

  updateRegisteredCourse(
    id: string,
    updatedData: Partial<Omit<RegisteredCourse, "id" | "year" | "code">>
  ): PromiseResult<RegisteredCourse>;

  dropRegisteredCourse(id: string): PromiseResult<null>;

  getAllTags(): PromiseResult<Tag[]>;

  getTagById(id: string): PromiseResult<Tag>;

  /**
   * Create the new tag of which order is set to last.
   * @param name - Tag name
   * @return Created tag
   */
  createTag(name: string): PromiseResult<Tag>;

  updateTagName(name: string): PromiseResult<Tag>;

  /**
   * Update tag orders. All tag ids that user have must be specified.
   * @param ids - List of tag ids. The index represent each tag order.
   */
  updateTagOrders(ids: string[]): PromiseResult<Tag[]>;

  deleteTag(id: string): PromiseResult<null>;
}
