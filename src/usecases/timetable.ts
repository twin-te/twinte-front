import {
  createPromiseClient,
  ConnectError,
  Code,
  PromiseClient,
  Transport,
} from "@connectrpc/connect";
import { Mutex } from "async-mutex";
import { RegisteredCourse, Course } from "~/domain/course";
import { normalDays } from "~/domain/day";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
  ValueError,
  isResultError,
} from "~/domain/error";
import { Module, modules } from "~/domain/module";
import { periods } from "~/domain/period";
import { NormalSchedule, Schedule, isNormalSchedule } from "~/domain/schedule";
import { Tag } from "~/domain/tag";
import {
  NormalTimetable,
  initializeTimetable,
  normalSchedulesToNormalTimetable,
  timetableToSchedules,
} from "~/domain/timetable";
import {
  toPBAcademicYear,
  toPBUUID,
} from "~/infrastructure/api/converters/shared";
import {
  fromPBCourse,
  fromPBRegisteredCourse,
  fromPBTag,
  toPBCourseMethod,
  toPBCredit,
  toPBInstructors,
  toPBSchedules,
} from "~/infrastructure/api/converters/timetablev1";
import { assurePresence } from "~/infrastructure/api/converters/utils";
import * as SharedPB from "~/infrastructure/api/gen/shared/type_pb";
import { TimetableService } from "~/infrastructure/api/gen/timetable/v1/service_connect";
import * as TimetableV1PB from "~/infrastructure/api/gen/timetable/v1/type_pb";
import { handleError } from "~/infrastructure/api/utils";
import {
  addElementsInArray,
  deepCopy,
  deleteElementInArray,
  updateElementInArray,
} from "~/utils";
import { IAuthUseCase } from "./auth";

export interface ITimetableUseCase {
  getCoursesByCodes(inputData: {
    year: number;
    codes: string[];
  }): Promise<
    | Course[]
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  >;

  searchCourses(conds: {
    year: number;
    keywords: string[];
    codePrefixes: { included: string[]; excluded: string[] };
    schedules: {
      fullyIncluded: Schedule[];
      partiallyOverlapped: Schedule[];
    };
    offset: number;
    limit: number;
  }): Promise<
    Course[] | UnauthorizedError | NetworkError | InternalServerError
  >;

  searchCoursesOnBlank(conds: {
    year: number;
    keywords: string[];
    codePrefixes: { included: string[]; excluded: string[] };
    offset: number;
    limit: number;
  }): Promise<
    Course[] | UnauthorizedError | NetworkError | InternalServerError
  >;

  addCoursesByCodes(inputData: {
    year: number;
    codes: string[];
  }): Promise<
    | RegisteredCourse[]
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  >;

  addCustomizedCourse(
    inputData: Pick<
      RegisteredCourse,
      | "year"
      | "name"
      | "instructors"
      | "credit"
      | "schedules"
      | "methods"
      | "rooms"
    >
  ): Promise<
    RegisteredCourse | UnauthorizedError | NetworkError | InternalServerError
  >;

  getRegisteredCourses(
    year?: number
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

  deleteRegisteredCourse(
    id: string
  ): Promise<
    | null
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  >;

  /**
   * Return true if the schedules do not overlap comparing to the schedules of registered courses. Return false otherwise.
   */
  checkScheduleDuplicate(
    year: number,
    schedules: Schedule[]
  ): Promise<boolean | UnauthorizedError | NetworkError | InternalServerError>;

  createTag(
    name: string
  ): Promise<Tag | UnauthorizedError | NetworkError | InternalServerError>;

  getTags(): Promise<
    Tag[] | UnauthorizedError | NetworkError | InternalServerError
  >;

  updateTagName(
    id: string,
    name: string
  ): Promise<
    Tag | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  >;

  /**
   * Update tag orders. All tag ids that the user has must be specified.
   * @param ids - List of tag ids. The index represents each tag order.
   */
  updateTagOrders(
    ids: string[]
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

export class TimetableUseCase implements ITimetableUseCase {
  #client: PromiseClient<typeof TimetableService>;

  #mutex: {
    registeredCourses: Mutex;
    tags: Mutex;
  };

  #registeredCourses?: RegisteredCourse[];
  #tags?: Tag[];

  constructor(transport: Transport) {
    this.#client = createPromiseClient(TimetableService, transport);
    this.#mutex = {
      registeredCourses: new Mutex(),
      tags: new Mutex(),
    };
  }

  #getRegisteredCourses(): Promise<
    RegisteredCourse[] | UnauthorizedError | NetworkError
  > {
    return this.#mutex.registeredCourses.runExclusive(() => {
      if (this.#registeredCourses) {
        return this.#registeredCourses;
      }

      return this.#client
        .getRegisteredCourses({})
        .then((res) => res.registeredCourses.map(fromPBRegisteredCourse))
        .then((registeredCourses) => {
          return (this.#registeredCourses = registeredCourses);
        })
        .catch((error) => {
          return handleError(error, (connectError: ConnectError) => {
            if (connectError.code === Code.Unauthenticated) {
              return new UnauthorizedError();
            }

            throw error;
          });
        });
    });
  }

  #getTags(): Promise<Tag[] | UnauthorizedError | NetworkError> {
    return this.#mutex.tags.runExclusive(() => {
      if (this.#tags) {
        return this.#tags;
      }

      return this.#client
        .getTags({})
        .then((res) => res.tags.map(fromPBTag))
        .then((tags) => {
          return (this.#tags = tags);
        })
        .catch((error) => {
          return handleError(error, (connectError: ConnectError) => {
            if (connectError.code === Code.Unauthenticated) {
              return new UnauthorizedError();
            }

            throw error;
          });
        });
    });
  }

  getCoursesByCodes(inputData: {
    year: number;
    codes: string[];
  }): Promise<
    | Course[]
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  > {
    const pbAcademicYear = toPBAcademicYear(inputData.year);

    return this.#client
      .getCoursesByCodes({ year: pbAcademicYear, codes: inputData.codes })
      .then((res) => res.courses.map(fromPBCourse))
      .catch((error) => handleError(error));
  }

  // TODO
  searchCourses(conds: {
    year: number;
    keywords: string[];
    codePrefixes: { included: string[]; excluded: string[] };
    schedules: {
      fullyIncluded: Schedule[];
      partiallyOverlapped: Schedule[];
    };
    offset: number;
    limit: number;
  }): Promise<
    Course[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    return this.#client
      .searchCourses({
        year: toPBAcademicYear(conds.year),
        keywords: conds.keywords,
        codePrefixesIncluded: conds.codePrefixes.included,
        codePrefixesExcluded: conds.codePrefixes.excluded,
        schedulesFullyIncluded: toPBSchedules(
          conds.schedules.fullyIncluded,
          []
        ),
        schedulesPartiallyOverlapped: toPBSchedules(
          conds.schedules.partiallyOverlapped,
          []
        ),
        offset: conds.offset,
        limit: conds.limit,
      })
      .then((res) => res.courses.map(fromPBCourse))
      .catch((error) => handleError(error));
  }

  // TODO
  async searchCoursesOnBlank(conds: {
    year: number;
    keywords: string[];
    codePrefixes: { included: string[]; excluded: string[] };
    offset: number;
    limit: number;
  }): Promise<
    Course[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    const result = await this.getRegisteredCourses(conds.year);
    if (isResultError(result)) {
      return result;
    }

    const timetable = initializeTimetable(modules, true);

    result
      .map(({ schedules }) => schedules)
      .flat()
      .filter(isNormalSchedule)
      .forEach(({ module, day, period }) => {
        timetable.normal[module][day][period] = false;
      });

    const schedules = timetableToSchedules(timetable);

    return this.#client
      .searchCourses({
        year: toPBAcademicYear(conds.year),
        keywords: conds.keywords,
        codePrefixesIncluded: conds.codePrefixes.included,
        codePrefixesExcluded: conds.codePrefixes.excluded,
        schedulesFullyIncluded: toPBSchedules(schedules, []),
        schedulesPartiallyOverlapped: [],
        offset: conds.offset,
        limit: conds.limit,
      })
      .then((res) => res.courses.map(fromPBCourse))
      .catch((error) => handleError(error));
  }

  addCoursesByCodes(inputData: {
    year: number;
    codes: string[];
  }): Promise<
    | RegisteredCourse[]
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  > {
    const pbAcademicYear = toPBAcademicYear(inputData.year);
    return this.#client
      .createRegisteredCoursesByCodes({
        year: pbAcademicYear,
        codes: inputData.codes,
      })
      .then((res) => res.registeredCourses.map(fromPBRegisteredCourse))
      .then((registeredCourses) => {
        return this.#mutex.registeredCourses.runExclusive(() => {
          if (this.#registeredCourses) {
            addElementsInArray(
              this.#registeredCourses,
              ...deepCopy(registeredCourses)
            );
          }
          return registeredCourses;
        });
      })
      .catch((error) =>
        handleError(error, (connectError: ConnectError) => {
          if (connectError.code === Code.Unauthenticated) {
            return new UnauthorizedError();
          }

          if (connectError.code === Code.NotFound) {
            return new NotFoundError();
          }

          throw error;
        })
      );
  }

  // TODO
  addCustomizedCourse(
    inputData: Pick<
      RegisteredCourse,
      | "year"
      | "name"
      | "instructors"
      | "credit"
      | "schedules"
      | "methods"
      | "rooms"
    >
  ): Promise<
    RegisteredCourse | UnauthorizedError | NetworkError | InternalServerError
  > {
    return this.#client
      .createRegisteredCourseManually({
        year: toPBAcademicYear(inputData.year),
        name: inputData.name,
        instructors: toPBInstructors(inputData.instructors),
        schedules: toPBSchedules(inputData.schedules, inputData.rooms),
        methods: inputData.methods.map(toPBCourseMethod),
      })
      .then((res) =>
        fromPBRegisteredCourse(assurePresence(res.registeredCourse))
      )
      .then((registeredCourse) => {
        return this.#mutex.registeredCourses.runExclusive(() => {
          if (this.#registeredCourses) {
            addElementsInArray(
              this.#registeredCourses,
              deepCopy(registeredCourse)
            );
          }
          return registeredCourse;
        });
      })
      .catch((error) =>
        handleError(error, (connectError: ConnectError) => {
          if (connectError.code === Code.Unauthenticated) {
            return new UnauthorizedError();
          }

          throw error;
        })
      );
  }

  async getRegisteredCourses(
    year?: number
  ): Promise<
    RegisteredCourse[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    const result = await this.#getRegisteredCourses();

    if (isResultError(result)) {
      return result;
    }

    let registeredCourses = result;

    if (year) {
      registeredCourses = registeredCourses.filter(
        (registeredCourse) => registeredCourse.year === year
      );
    }

    return deepCopy(registeredCourses);
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
    const result = await this.#getRegisteredCourses();

    if (isResultError(result)) {
      return result;
    }

    const registeredCourse = result.find(
      (registeredCourse) => registeredCourse.id === id
    );

    return registeredCourse ?? new NotFoundError();
  }

  // TODO
  updateRegisteredCourse(
    id: string,
    updatedData: Partial<Omit<RegisteredCourse, "id" | "year" | "code">>
  ): Promise<
    | RegisteredCourse
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  > {
    return this.#client
      .updateRegisteredCourse({
        id: toPBUUID(id),
        name: updatedData.name,
        instructors: updatedData.instructors
          ? toPBInstructors(updatedData.instructors)
          : undefined,
        credit: updatedData.credit ? toPBCredit(updatedData.credit) : undefined,
        methods: updatedData.methods
          ? new TimetableV1PB.CourseMethodList({
              values: updatedData.methods.map(toPBCourseMethod),
            })
          : undefined,
        schedules: new TimetableV1PB.ScheduleList({
          values:
            updatedData.schedules && updatedData.rooms
              ? toPBSchedules(updatedData.schedules, updatedData.rooms)
              : undefined,
        }),
        memo: updatedData.memo,
        attendance: updatedData.attendance,
        absence: updatedData.absence,
        late: updatedData.late,
        tagIds: updatedData.tagIds
          ? new SharedPB.UUIDList({ values: updatedData.tagIds.map(toPBUUID) })
          : undefined,
      })
      .then((res) =>
        fromPBRegisteredCourse(assurePresence(res.registeredCourse))
      )
      .then((registeredCourse) => {
        return this.#mutex.registeredCourses.runExclusive(() => {
          if (this.#registeredCourses) {
            updateElementInArray(
              this.#registeredCourses,
              deepCopy(registeredCourse)
            );
          }
          return registeredCourse;
        });
      })
      .catch((error) => {
        return handleError(error, (connectError: ConnectError) => {
          if (connectError.code === Code.Unauthenticated) {
            return new UnauthorizedError();
          }

          if (connectError.code === Code.NotFound) {
            return new NotFoundError();
          }

          throw error;
        });
      });
  }

  deleteRegisteredCourse(
    id: string
  ): Promise<
    | null
    | NotFoundError
    | UnauthorizedError
    | NetworkError
    | InternalServerError
  > {
    return this.#client
      .deleteRegisteredCourse({ id: toPBUUID(id) })
      .then(() => {
        return this.#mutex.registeredCourses.runExclusive(() => {
          if (this.#registeredCourses) {
            deleteElementInArray(this.#registeredCourses, id);
          }
          return null;
        });
      })
      .catch((error) => {
        return handleError(error, (connectError: ConnectError) => {
          if (connectError.code === Code.Unauthenticated) {
            return new UnauthorizedError();
          }

          if (connectError.code === Code.NotFound) {
            return new NotFoundError();
          }

          throw error;
        });
      });
  }

  async checkScheduleDuplicate(
    year: number,
    schedules: Schedule[]
  ): Promise<boolean | UnauthorizedError | NetworkError | InternalServerError> {
    const result = await this.getRegisteredCourses(year);
    if (isResultError(result)) return result;

    const normalSchedules: NormalSchedule[] = schedules.filter(
      isNormalSchedule
    );
    const registeredNormalSchedules: NormalSchedule[] = result
      .map(({ schedules }) => schedules)
      .flat()
      .filter(isNormalSchedule);

    const timetable: NormalTimetable<
      Module,
      boolean
    > = normalSchedulesToNormalTimetable(normalSchedules);
    const registeredTimetable: NormalTimetable<
      Module,
      boolean
    > = normalSchedulesToNormalTimetable(registeredNormalSchedules);

    return !modules.some((module) =>
      normalDays.some((day) =>
        periods.some(
          (period) =>
            timetable[module][day][period] &&
            registeredTimetable[module][day][period]
        )
      )
    );
  }

  createTag(
    name: string
  ): Promise<Tag | UnauthorizedError | NetworkError | InternalServerError> {
    return this.#client
      .createTag({ name })
      .then((res) => fromPBTag(assurePresence(res.tag)))
      .then((tag) => {
        return this.#mutex.tags.runExclusive(() => {
          if (this.#tags) {
            addElementsInArray(this.#tags, deepCopy(tag));
          }
          return tag;
        });
      })
      .catch((error) => {
        return handleError(error, (connectError: ConnectError) => {
          if (connectError.code === Code.Unauthenticated) {
            return new UnauthorizedError();
          }

          throw error;
        });
      });
  }

  async getTags(): Promise<
    Tag[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    const result = await this.#getTags();

    if (isResultError(result)) {
      return result;
    }

    return deepCopy(result);
  }

  updateTagName(
    id: string,
    name: string
  ): Promise<
    Tag | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
  > {
    return this.#client
      .updateTag({ id: toPBUUID(id), name })
      .then((res) => fromPBTag(assurePresence(res.tag)))
      .then((tag) => {
        return this.#mutex.tags.runExclusive(() => {
          if (this.#tags) {
            updateElementInArray(this.#tags, deepCopy(tag));
          }
          return tag;
        });
      })
      .catch((error) => {
        return handleError(error, (connectError: ConnectError) => {
          if (connectError.code === Code.Unauthenticated) {
            return new UnauthorizedError();
          }

          if (connectError.code === Code.NotFound) {
            return new NotFoundError();
          }

          throw error;
        });
      });
  }

  /**
   * Update tag orders. All tag ids that the user has must be specified.
   * @param ids - List of tag ids. The index represents each tag order.
   */
  updateTagOrders(
    ids: string[]
  ): Promise<
    Tag[] | ValueError | UnauthorizedError | NetworkError | InternalServerError
  > {
    return this.#client
      .rearrangeTags({ ids: ids.map(toPBUUID) })
      .then((res) => res.tags.map((tag) => fromPBTag(assurePresence(tag))))
      .then((tags) => {
        return this.#mutex.tags.runExclusive(() => {
          if (this.#tags) {
            this.#tags = deepCopy(tags);
          }
          return tags;
        });
      })
      .catch((error) => {
        return handleError(error, (connectError: ConnectError) => {
          if (connectError.code === Code.Unauthenticated) {
            return new UnauthorizedError();
          }

          if (connectError.code === Code.InvalidArgument) {
            return new ValueError();
          }

          throw error;
        });
      });
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
    return this.#client
      .deleteTag({ id: toPBUUID(id) })
      .then(() => {
        return this.#mutex.tags.runExclusive(() => {
          if (this.#tags) {
            deleteElementInArray(this.#tags, id);
          }
          return null;
        });
      })
      .catch((error) => {
        return handleError(error, (connectError: ConnectError) => {
          if (connectError.code === Code.Unauthenticated) {
            return new UnauthorizedError();
          }

          throw error;
        });
      });
  }
}
