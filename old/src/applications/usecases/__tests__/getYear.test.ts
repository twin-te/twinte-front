import { getYear } from "../getYear";
import { Ports } from "~/adapter";
import dayjs from "dayjs";
import "dayjs/locale/ja";

describe(getYear.name, () => {
  it("2月まで昨年度", async () => {
    const now = dayjs(new Date(2022, 1)).locale("ja");
    const mockPort: Partial<Ports> = {
      dayjs: () => now,
      store: {
        getters: {
          displayedYear: undefined,
        },
      } as any,
    };
    expect(now.format("MM/DD")).toBe("02/01");

    const data = await getYear(mockPort as any);
    expect(data).toBe(2021);
  });

  it("3月から来年度になる", async () => {
    const now = dayjs(new Date(2022, 2)).locale("ja");
    const mockPort: Partial<Ports> = {
      dayjs: () => now,
      store: {
        getters: {
          displayedYear: undefined,
        },
      } as any,
    };
    expect(now.format("MM/DD")).toBe("03/01");

    const data = await getYear(mockPort as any);
    expect(data).toBe(2022);
  });
});
