import { generateManifest, sortJsonByKey } from "./manifest";
import { IParsedWorkbookData } from "../types";

const MOCK_WORKBOOKS: IParsedWorkbookData = {
  template: [],
};

/** yarn workspace scripts test -t manifest.spec.ts */
describe("App Data Manifest", () => {
  it("Generates manifest", () => {
    const res = generateManifest(MOCK_WORKBOOKS);
    expect(res).toEqual({});
  });
});
