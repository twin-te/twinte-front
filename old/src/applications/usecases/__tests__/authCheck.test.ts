import { User } from "~/api/@types";
import { authCheck } from "../authCheck";

describe(authCheck.name, () => {
  it("when user has not logined, should return false", async () => {
    const mockPort = {
      api: {
        users: { me: { get: async () => ({ status: 401, body: null }) } },
      } as any,
      store: { commit: () => {} } as any,
    };

    const data = await authCheck(mockPort as any);
    expect(data).not.toBeTruthy();
  });

  it("when user has logined, should return true", async () => {
    const mockPort = {
      api: {
        users: {
          me: {
            get: async () => ({
              status: 200,
              body: { id: "gb11514", name: "SampleUser" } as User,
            }),
          },
        },
      },
      store: { commit: () => {} },
    };

    const data = await authCheck(mockPort as any);
    expect(data).toBeTruthy();
  });
});
