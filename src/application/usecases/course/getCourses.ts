import { Ports } from "~/application/ports";
import { Course } from "~/domain/course";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
} from "~/domain/error";

export const getCourses = ({ courseRepository }: Ports) => (
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
> => {
  return courseRepository.getCourses(inputData);
};
