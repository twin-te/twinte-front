import { Ports } from "~/application/ports";
import { RegisteredCourse } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
} from "~/domain/result";

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
