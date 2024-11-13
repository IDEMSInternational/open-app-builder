import { IDeploymentConfigJson } from "data-models";
import { ComponentOptimiser } from "./components";
import { IAngularBuildOptions } from "../optimise.types";
import { IReportOutput } from "../../report/report.types";

/*****************************************************************************
 * Test Setup and Utilities
 ****************************************************************************/

const MOCK_OPTIMISATION_CONFIG = (implicit: string[] = []) => {
  const optimisation: IDeploymentConfigJson["optimisation"] = {
    components: { enabled: true, implicit },
  };
  return { optimisation } as IDeploymentConfigJson;
};

const MOCK_ANGULAR_BUILD_OPTIONS = (options: Partial<IAngularBuildOptions> = { assets: [] }) =>
  options as IAngularBuildOptions;

const MOCK_COMPONENTS_INDEX = `
import { MockUsedComponent } from ".";
import { MockUnusedComponent } from ".";
import { MockImplicitComponent } from ".";

export const TEMPLATE_COMPONENTS = [
  MockUsedComponent,
  MockUnusedComponent,
  MockImplicitComponent,
]

const COMMON_COMPONENT_MAPPING = {
  /* optimise:components:start */
  mock_used: MockUsedComponent,
  mock_unused: MockUnusedComponent,
  mock_implicit: MockImplicitComponent,
  /* optimise:components:end */
}
`;

// expected output (unused commented out)
const MOCK_COMPONENTS_INDEX_OPTIMISED = `
import { MockUsedComponent } from ".";
// import { MockUnusedComponent } from ".";
import { MockImplicitComponent } from ".";

export const TEMPLATE_COMPONENTS = [
  MockUsedComponent,
//   MockUnusedComponent,
  MockImplicitComponent,
]

const COMMON_COMPONENT_MAPPING = {
  /* optimise:components:start */
  mock_used: MockUsedComponent,
//   mock_unused: MockUnusedComponent,
  mock_implicit: MockImplicitComponent,
  /* optimise:components:end */
}
`;

const MOCK_REPORT_DATA: IReportOutput["template_components"]["data"] = [
  { type: "mock_used", count: 1 },
];

/*****************************************************************************
 * Basic Tests
 ****************************************************************************/

/** yarn workspace scripts test -t optimisers/components.spec.ts */
describe("optimise components - basic", () => {
  it("lists unused components", () => {
    const config = MOCK_OPTIMISATION_CONFIG();
    const optimiser = new ComponentOptimiser(config);
    const res = optimiser["listUnusedComponents"](MOCK_REPORT_DATA, MOCK_COMPONENTS_INDEX);
    expect(res).toEqual({
      mock_unused: "MockUnusedComponent",
      mock_implicit: "MockImplicitComponent",
    });
  });

  it("includes implicit components defined in config", () => {
    const config = MOCK_OPTIMISATION_CONFIG(["mock_implicit"]);
    const optimiser = new ComponentOptimiser(config);
    const res = optimiser["listUnusedComponents"](MOCK_REPORT_DATA, MOCK_COMPONENTS_INDEX);
    expect(res).toEqual({ mock_unused: "MockUnusedComponent" });
  });

  it("optimises component index", () => {
    const config = MOCK_OPTIMISATION_CONFIG(["mock_implicit"]);
    const optimiser = new ComponentOptimiser(config);
    const res = optimiser["optimiseComponentsIndex"](
      { mock_unused: "MockUnusedComponent" } as any,
      MOCK_COMPONENTS_INDEX
    );
    expect(res).toEqual(MOCK_COMPONENTS_INDEX_OPTIMISED);
  });

  it("runs when called", () => {
    const config = MOCK_OPTIMISATION_CONFIG(["mock_implicit"]);
    const optimiser = new ComponentOptimiser(config);
    const angularBuildOptions = MOCK_ANGULAR_BUILD_OPTIONS();
    const componentsIndex = MOCK_COMPONENTS_INDEX;
    const reportData = MOCK_REPORT_DATA;
    const res = optimiser.run({ angularBuildOptions, componentsIndex, reportData });
    expect(res.optimisedIndex).toEqual(MOCK_COMPONENTS_INDEX_OPTIMISED);
    expect(res.optimisedBuildOptions).toEqual({ assets: [] });
  });
});

/*****************************************************************************
 * Advanced Tests
 * Ensure specific functionality for advanced use-cases
 ****************************************************************************/
// Use root angular json to ensure advanced test cases pass as expected
import PROD_ANGULAR_JSON from "../../.././../../../../angular.json";

const MOCK_COMPONENTS_INDEX_ADVANCED = `
import { TmplPdfComponent } from ".";

export const TEMPLATE_COMPONENTS = [
  TmplPdfComponent
]

const COMMON_COMPONENT_MAPPING = {
  /* optimise:components:start */
  pdf: TmplPdfComponent,
  /* optimise:components:end */
}
`;

describe("optimise components - advanced", () => {
  it("removes pdf component assets from angular config", () => {
    const config = MOCK_OPTIMISATION_CONFIG(["mock_implicit"]);
    const optimiser = new ComponentOptimiser(config);
    const angularBuildOptions = PROD_ANGULAR_JSON.projects.app.architect.build.options;
    // check pdfAssets defined in angular.json
    const pdfAssets = angularBuildOptions.assets.find((v) => v.output === "/assets/comp-pdf");
    expect(pdfAssets).toBeTruthy();
    const componentsIndex = MOCK_COMPONENTS_INDEX_ADVANCED;
    const reportData = [];
    const res = optimiser.run({ angularBuildOptions, componentsIndex, reportData });
    // check pdfAssets removed from optimised build
    const pdfAssetsUpdated = res.optimisedBuildOptions.assets.find(
      (v) => v.output === "/assets/comp-pdf"
    );
    expect(pdfAssetsUpdated).toBeUndefined();
  });
});
