import { Page } from "@playwright/test";

const API_BASE_URL = `http://localhost:8080/api/v3`;

type Method = "GET" | "POST" | "PUT" | "DELETE";

// route.fulfill function's parameter type
type fullfillOptions = Parameters<
  Parameters<Parameters<Page["route"]>[1]>[0]["fulfill"]
>[0];

export const mockApi = async (
  page: Page,
  path: string | RegExp,
  responses: {
    [K in Method]?: fullfillOptions;
  },
): Promise<void> => {
  const routeTarget = typeof path === "string"
    ? `${API_BASE_URL}${path}`
    : (url: URL) =>
      url.href.startsWith(API_BASE_URL) && path.test(url.pathname);
  page.route(routeTarget, async (route) => {
    for (const [method, response] of Object.entries(responses)) {
      if (route.request().method() === method) await route.fulfill(response);
    }
  });
};

export const USER_ID = `00000000-0000-0000-0000-000000000000`;
export const DUMMY_COURSE = {
  "recommendedGrades": [2],
  "id": "00000000-0000-0000-0000-000000000000",
  "year": 2023,
  "code": "XX000000",
  "name": "ダミー講義名",
  "instructor": "ダミー講義の講師",
  "credit": 2,
  "overview": "ダミー講義の説明文",
  "remarks": "対面",
  "lastUpdate": "2023-03-28T01:21:32.000Z",
  "hasParseError": false,
  "isAnnual": false,
  "methods": ["Asynchronous"],
  "schedules": [
    { "module": "SpringA", "day": "Mon", "period": 5, "room": "" },
    { "module": "SpringA", "day": "Mon", "period": 6, "room": "" },
    { "module": "SpringA", "day": "Mon", "period": 5, "room": "" },
    { "module": "SpringA", "day": "Mon", "period": 6, "room": "" },
  ],
};
export const DUMMY_REGISTERED_COURSE = {
  "tags": [],
  "id": "00000000-0000-0000-0000-000000000000",
  "userId": "00000000-0000-0000-0000-000000000000",
  "year": 2023,
  "memo": "",
  "attendance": 0,
  "absence": 0,
  "late": 0,
  "course": DUMMY_COURSE,
};
