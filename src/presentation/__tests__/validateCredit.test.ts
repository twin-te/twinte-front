import { validateCredit } from "../presenters/credit";

describe(validateCredit.name, () => {
  it("'1' is valid format.", () => {
    expect(validateCredit("1")).toBe(true);
  });

  it("'1.0' is valid format.", () => {
    expect(validateCredit("1.0")).toBe(true);
  });

  it("'45.0' is valid format.", () => {
    expect(validateCredit("45.0")).toBe(true);
  });

  it("'126' is valid format.", () => {
    expect(validateCredit("126")).toBe(true);
  });

  it("'.' is invalid format.", () => {
    expect(validateCredit(".")).toBe(false);
  });

  it("'1a3;' is invalid format.", () => {
    expect(validateCredit("1a3;")).toBe(false);
  });

  it("'3.14' is invalid format.", () => {
    expect(validateCredit("3.14")).toBe(false);
  });
});
