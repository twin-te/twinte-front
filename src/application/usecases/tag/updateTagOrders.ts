import { Ports } from "~/application/ports";
import { Tag } from "~/domain";
import {
  Err,
  InternalServerError,
  NetworkError,
  NotFoundError,
  PromiseResult,
  UnauthorizedError,
  ValueError,
} from "~/domain/result";

/**
 * Update tag orders. All tag ids that user have must be specified.
 * @param ids - List of tag ids. The index represent each tag order.
 */
export const updateTagOrders = ({ courseRepository }: Ports) => async (
  ids: string[]
): PromiseResult<
  Tag[],
  ValueError | UnauthorizedError | NetworkError | InternalServerError
> => {
  const result = await courseRepository.getAllTags();
  if (result.isErr()) return result;

  const registeredTagIds: Set<string> = new Set(
    result.value.map(({ id }) => id)
  );

  if (
    registeredTagIds.size !== ids.length ||
    ids.some((id) => !registeredTagIds.has(id))
  )
    return new Err(new ValueError("Please specify all tag ids you have."));

  const inputData: Pick<Tag, "id" | "order">[] = ids.map((id, index) => ({
    id,
    order: index,
  }));

  return courseRepository.updateTagOrders(inputData);
};
