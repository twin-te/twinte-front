import {
  createPromiseClient,
  ConnectError,
  PromiseClient,
  Transport,
  Code,
} from "@connectrpc/connect";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { News } from "~/domain/news";
import { fromPBAnnouncement } from "~/infrastructure/api/converters/announcementv1";
import { toPBUUID } from "~/infrastructure/api/converters/shared";
import { assurePresence } from "~/infrastructure/api/converters/utils";
import { AnnouncementService } from "~/infrastructure/api/gen/announcement/v1/service_connect";
import { handleError } from "~/infrastructure/api/utils";

export interface INewsUseCase {
  getNews(): Promise<
    News[] | UnauthorizedError | NetworkError | InternalServerError
  >;

  updateNewsRead(
    id: string,
    read: boolean
  ): Promise<null | UnauthorizedError | NetworkError | InternalServerError>;
}

export class NewsUseCase implements INewsUseCase {
  #client: PromiseClient<typeof AnnouncementService>;

  constructor(transport: Transport) {
    this.#client = createPromiseClient(AnnouncementService, transport);
  }

  async getNews(): Promise<
    News[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    return this.#client
      .getAnnouncements({})
      .then(async (res) => {
        const readFlags = await this.#client
          .getReadFlags({
            ids: res.announcements.map(({ id }) => assurePresence(id)),
          })
          .then((res) => {
            return res.readFlags;
          });

        return res.announcements.map((pbAnnouncement, index) =>
          fromPBAnnouncement(pbAnnouncement, readFlags[index])
        );
      })
      .catch((error) => handleError(error));
  }

  updateNewsRead(
    id: string,
    read: boolean
  ): Promise<null | UnauthorizedError | NetworkError | InternalServerError> {
    return this.#client
      .updateReadFlag({ id: toPBUUID(id), readFlag: read })
      .then(() => null)
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
