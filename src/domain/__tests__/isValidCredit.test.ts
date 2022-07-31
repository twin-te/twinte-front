import { isValidCredit } from "../utils";

describe(isValidCredit.name, () => {
  it("'1.0' is valid format.", () => {
    expect(isValidCredit("1.0")).toBe(true);
  });

  it("'45.0' is valid format.", () => {
    expect(isValidCredit("45.0")).toBe(true);
  });

  it("'1' is invalid format.", () => {
    expect(isValidCredit("1")).toBe(false);
  });

  it("'3.14' is invalid format.", () => {
    expect(isValidCredit("3.14")).toBe(false);
  });
});
