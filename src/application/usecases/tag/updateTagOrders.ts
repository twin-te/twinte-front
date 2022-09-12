import { Ports } from "~/application/ports";
import {
  InternalServerError,
  isResultError,
  NetworkError,
  UnauthorizedError,
  ValueError,
} from "~/domain/error";
import { Tag } from "~/domain/tag";

/**
 * Update tag orders. All tag ids that the user has must be specified.
 * @param ids - List of tag ids. The index represents each tag order.
 */
export const updateTagOrders = ({ courseRepository }: Ports) => async (
  ids: string[]
): Promise<
  Tag[] | ValueError | UnauthorizedError | NetworkError | InternalServerError
> => {
  const result = await courseRepository.getAllTags();
  if (isResultError(result)) return result;

  const registeredTagIds: Set<string> = new Set(result.map(({ id }) => id));

  if (
    registeredTagIds.size !== ids.length ||
    ids.some((id) => !registeredTagIds.has(id))
  )
    return new ValueError("Please specify all tag ids you have.");

  const inputData: Pick<Tag, "id" | "order">[] = ids.map((id, index) => ({
    id,
    order: index,
  }));

  return courseRepository.updateTagOrders(inputData);
};
