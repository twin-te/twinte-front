import { tableConstructor } from "../table";

describe("table", () => {
  it("constractor は [5][6] の配列を返す", () => {
    const tableState = tableConstructor("default");
    expect(tableState.length).toBe(6);
    expect(tableState[0].length).toBe(5);
  });
});
