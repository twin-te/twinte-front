import { searchLectures } from "../src/store/api/lectures";
import res_tomato from "./data/トマト.json";
import res_GB11514 from "./data/GB11514.json";

describe("授業名での検索 searchLectures", () => {
  it("search トマト -> オートマトン", async () => {
    const data = await searchLectures("トマト");
    expect(data).toMatchObject(res_tomato);
  });
  it("search ンゴー(no match)", async () => {
    const data = await searchLectures("ンゴー");
    expect(data).toBeNull;
  });
  it("GB11514 -> シミュレーション物理", async () => {
    const data = await searchLectures("GB11514");
    expect(data).toMatchObject(res_GB11514);
  });
  it("GB114514(no match)", async () => {
    const data = await searchLectures("GB114514");
    expect(data).toBeNull;
  });
});
