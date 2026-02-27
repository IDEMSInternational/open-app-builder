import type { IDeploymentConfigJson } from "data-models";
import { deepMergeObjects, type RecursivePartial } from "shared";
import { ActiveDeployment } from "../../src/commands/deployment/get";

type IDeploymentConfigStub = RecursivePartial<IDeploymentConfigJson>;

const defaultConfig: IDeploymentConfigStub = {
  _workspace_path: "mock",
  app_data: {
    assets_filter_function: () => true,
    sheets_filter_function: () => true,
    output_path: "mock/app_data",
  },
  translations: { filter_language_codes: [] },
  app_config: {
    APP_THEMES: { available: [] },
  },
};

/**
 * Populated mock values when getActiveDeployment method called from main command
 **/
export function stubDeploymentConfig(stub: IDeploymentConfigStub = {}) {
  const stubDeployment = deepMergeObjects({} as IDeploymentConfigJson, defaultConfig, stub);
  jest.mocked(ActiveDeployment.get).mockReturnValue(stubDeployment);
}
