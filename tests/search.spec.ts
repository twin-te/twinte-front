import { expect, test } from "@playwright/test";
import {
  DUMMY_COURSE,
  DUMMY_REGISTERED_COURSE,
  mockApi,
  USER_ID,
} from "./mock";

test.beforeEach(async ({ page }) => {
  await mockApi(page, "/users/me", {
    "GET": { json: { id: USER_ID } },
  });
  await mockApi(page, /events/, {
    "GET": { json: [] },
  });
  await mockApi(page, /information/, {
    "GET": { json: [] },
  });
  await mockApi(page, /school-calendar\/modules/, {
    "GET": {
      json: [
        {
          "id": 1,
          "year": 2023,
          "module": "SpringA",
          "start": "2023-04-05T00:00:00.000Z",
          "end": "2024-03-31T00:00:00.000Z",
        },
      ],
    },
  });
  await mockApi(page, "/courses/search", {
    "POST": { json: [DUMMY_COURSE] },
  });
  await mockApi(page, /registered-courses/, {
    "GET": { json: [] },
  });
  await mockApi(page, "/registered-courses", {
    "POST": { json: [DUMMY_REGISTERED_COURSE] },
  });
});

test.describe("授業の検索", () => {
  test("検索して追加できる", async ({ page }) => {
    await page.goto("/add/search");

    // 検索
    await page.getByPlaceholder("例）情報 倫理").fill("ダミー講義名");
    await page.getByRole("button").filter({ hasText: "search" }).click();
    await expect(page.locator(".search__result")).toContainText("ダミー講義名");

    // 選択して追加
    await page.getByText("done").click();
    await page.getByRole("button").filter({ hasText: "選択した授業を追加" }).click();
    await expect(page).toHaveTitle("Twin:te | ホーム");
    await expect(page.locator(".table")).toContainText("ダミー講義名");
  });

  test("検索結果の詳細と簡易を切り替えられる", async ({ page }) => {
    await page.goto("/add/search");

    // 検索
    await page.getByPlaceholder("例）情報 倫理").fill("ダミー講義名");
    await page.getByRole("button").filter({ hasText: "search" }).click();
    await expect(page.locator(".search__result")).toContainText("ダミー講義名");

    // 簡易モードで検索結果を表示
    await page.getByRole("button").filter({ hasText: "簡易" }).click();
    await expect(page.getByText("ダミー講義名")).toBeVisible();
    await expect(page.getByText("ダミー講義の説明文")).not.toBeVisible();

    // 詳細モードで検索結果を表示
    await page.getByRole("button").filter({ hasText: "詳細" }).click();
    await expect(page.getByText("ダミー講義名")).toBeVisible();
    await expect(page.getByText("ダミー講義の説明文")).toBeVisible();
  });
});
