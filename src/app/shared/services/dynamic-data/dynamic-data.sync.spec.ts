import { omitLocalOnlyDynamicDataFlows, isLocalOnlyDynamicDataFlow } from "./dynamic-data.sync";

describe("dynamic-data.sync", () => {
  it("identifies local-only asset pack flows", () => {
    expect(isLocalOnlyDynamicDataFlow("asset_pack", "_assets_contents")).toBeTrue();
    expect(isLocalOnlyDynamicDataFlow("data_list", "_asset_packs")).toBeTrue();
    expect(isLocalOnlyDynamicDataFlow("data_list", "user_progress")).toBeFalse();
  });

  it("omits local-only flows from sync state", () => {
    const state = {
      data_list: {
        user_progress: {
          row_1: { completed: true },
        },
        _asset_packs: {
          pack_1: { download_status: "completed" },
        },
      },
      asset_pack: {
        _assets_contents: {
          "images/a.png": { filepath: "/local/a.png" },
        },
      },
    };

    expect(omitLocalOnlyDynamicDataFlows(state)).toEqual({
      data_list: {
        user_progress: {
          row_1: { completed: true },
        },
      },
    });
  });

  it("removes empty flow types after omitting local-only flows", () => {
    const state = {
      asset_pack: {
        _assets_contents: {
          "images/a.png": { filepath: "/local/a.png" },
        },
      },
    };

    expect(omitLocalOnlyDynamicDataFlows(state)).toEqual({});
  });
});
