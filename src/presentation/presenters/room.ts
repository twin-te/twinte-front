import { Room } from "~/domain/room";

export const roomsToDisplay = (rooms: Room[]): string => {
  return rooms.map(({ name }) => name).join(",");
};
