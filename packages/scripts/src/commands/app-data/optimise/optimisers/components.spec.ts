import { IDeploymentConfigJson } from "data-models";
import { ComponentOptimiser, IComponentOptimisationParams } from "./components";
import { IAngularBuildOptions, IComponentManifest } from "../optimise.types";
import { IReportOutput } from "../../report/report.types";

/*****************************************************************************
 * Test Setup and Utilities
 ****************************************************************************/

const MOCK_OPTIMISATION_CONFIG = (implicit: string[] = []) => {
  const optimisation: IDeploymentConfigJson["optimisation"] = {
    components: { enabled: true, implicit },
  };
  return optimisation;
};

const MOCK_ANGULAR_BUILD_OPTIONS = (
  options: Partial<IAngularBuildOptions> = {
    // mock a component that also populates files from node_modules to an assets folder
    assets: [
      {
        glob: "**/*",
        input: "node_modules/mockUnusedModuleAssets",
        output: "/assets/comp-mock-unused",
      },
    ],
  }
) => options as IAngularBuildOptions;

const MOCK_INDEX_TS = () => `
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
const MOCK_INDEX_TS_OPTIMISED = `
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

const MOCK_MODULE_TS = () => `
import {MockUnusedModule} from '.'
imports:[
  MockUnusedModule
]
`;

const MOCK_MODULE_TS_OPTIMISED = `
// import {MockUnusedModule} from '.'
imports:[
//   MockUnusedModule
]
`;

const MOCK_COMPONENTS = {
  mock_used: "MockUsedComponent",
  mock_unused: "MockUnusedComponent",
  mock_implicit: "MockImplicitComponent",
};
type IMockComponentName = keyof typeof MOCK_COMPONENTS;

const MOCK_MANIFEST: IComponentManifest<IMockComponentName, IMockComponentName> = {
  mock_used: {
    implicit: ["mock_implicit"],
  },
  mock_unused: {
    module: "MockUnusedModule",
    assets: "/assets/comp-mock-unused",
  },
};
const MOCK_REPORT_DATA: IReportOutput["template_components"]["data"] = [
  { type: "mock_used", count: 1 },
];

/*****************************************************************************
 * Basic Tests
 ****************************************************************************/

/** yarn workspace scripts test -t optimisers/components.spec.ts */
describe("optimise components - basic", () => {
  let optimiser: ComponentOptimiser;
  beforeEach(() => {
    const params: IComponentOptimisationParams = {
      angularBuildOptions: MOCK_ANGULAR_BUILD_OPTIONS(),
      config: MOCK_OPTIMISATION_CONFIG(),
      indexTs: MOCK_INDEX_TS(),
      manifest: MOCK_MANIFEST,
      moduleTs: MOCK_MODULE_TS(),
      reportData: MOCK_REPORT_DATA,
    };
    optimiser = new ComponentOptimiser(params);
  });
  it("lists used components (including manifest implicit)", () => {
    optimiser.run();
    expect(optimiser["usedComponents"]).toEqual({ mock_used: true, mock_implicit: true });
  });

  it("lists unused components", () => {
    optimiser.run();
    expect(optimiser["unusedComponents"]).toEqual({
      mock_unused: "MockUnusedComponent",
    });
  });

  it("includes implicit components defined in manifest", () => {
    optimiser.run();
    console.log("unused components", optimiser["unusedComponents"]);
    expect(optimiser["unusedComponents"]).toEqual({ mock_unused: "MockUnusedComponent" });
  });

  it("includes implicit components defined in config", () => {
    optimiser["params"].config.components.implicit = ["mock_unused"];
    optimiser.run();
    expect(optimiser["unusedComponents"]).toEqual({});
  });

  it("optimises component index", () => {
    const { indexTs } = optimiser.run();
    expect(indexTs).toEqual(MOCK_INDEX_TS_OPTIMISED);
  });

  it("optimises component module", () => {
    const { moduleTs } = optimiser.run();
    expect(moduleTs).toEqual(MOCK_MODULE_TS_OPTIMISED);
  });

  it("optimises angular assets", () => {
    const { angularBuildOptions } = optimiser.run();
    console.log("angularBuildOpts", angularBuildOptions);
    expect(angularBuildOptions).toEqual({ assets: [] });
  });
});
