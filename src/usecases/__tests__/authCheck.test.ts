/* eslint-disable @typescript-eslint/no-explicit-any */
import { authCheck } from "../authCheck";

describe(authCheck.name, () => {
  it("when user has not logined, should return false", async () => {
    const mockPort: any = {
      api: {
        users: { me: { get: async () => ({ status: 401, body: null }) } },
      },
      store: { commit: () => void 0 },
    };

    const data = await authCheck(mockPort);
    expect(data).not.toBeTruthy();
  });

  it("when user has logined, should return true", async () => {
    const mockPort: any = {
      api: {
        users: {
          me: {
            get: async () => ({
              status: 200,
              body: { id: "gb11514", name: "SampleUser" },
            }),
          },
        },
      },
      store: { commit: () => void 0 },
    };

    const data = await authCheck(mockPort);
    expect(data).toBeTruthy();
  });
});
