import { Ports } from "~/application/ports";
import { RegisteredCourse } from "~/domain/course";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
} from "~/domain/error";

export const updateRegisteredCourse = ({ courseRepository }: Ports) => (
  id: string,
  updatedData: Partial<Omit<RegisteredCourse, "id" | "year" | "code">>
): Promise<
  | RegisteredCourse
  | NotFoundError
  | UnauthorizedError
  | NetworkError
  | InternalServerError
> => {
  return courseRepository.updateRegisteredCourse(id, updatedData);
};
