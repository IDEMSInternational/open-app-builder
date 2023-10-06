import fs from "fs-extra";
import mockFs from "mock-fs";
import path from "path";
import { DEPLOYMENTS_PATH } from "shared";

import { createDeployment } from "./create";

const deploymentsBase = path.resolve(DEPLOYMENTS_PATH);

const mockDirs = {
  [deploymentsBase]: {
    test_1: {
      "config.ts": `export default {}`,
    },
  },
};

describe("Creates new deployment", () => {
  it("Creates new deployment", () => {});

  it("Extends existing deployment", () => {});
});
