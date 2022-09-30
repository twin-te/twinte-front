import { Room } from "~/domain/room";

export const roomsToDisplay = (rooms: Room[]): string => {
  return rooms.map(({ name }) => name).join(",");
};

export const validateRooms = (rooms: Room[]): boolean => {
  return rooms.every(
    ({ name, schedules }) => name !== "" && schedules.length > 0
  );
};
