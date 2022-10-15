export type DisplayCourse = {
  id: string;
  year: number;
  code: string;
  name: string;
  instructor: string;
  credit: string;
  schedule: {
    full: string;
    onlyModule: string[];
  };
  method: string;
  room: string;
  overview: string;
};

export type DisplayRegisteredCourse = {
  id: string;
  year: number;
  code: string;
  name: string;
  instructor: string;
  credit: string;
  schedule: {
    full: string;
    onlyModule: string[];
  };
  method: string;
  room: string;
  memo: string;
  attendance: number;
  absence: number;
  late: number;
  tags: { id: string; name: string; assign: boolean }[];
};
