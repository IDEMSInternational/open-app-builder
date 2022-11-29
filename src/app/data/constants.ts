import { getDefaultAppConfig, IAppConfig } from "data-models";
import { environment } from "src/environments/environment";
import { deepMergeObjects } from "../shared/utils";

const app_constant_overrides = (environment.deploymentConfig as any).app_config || {};

/** List of constants provided by data-models combined with deployment-specific overrides */
export const APP_CONFIG: IAppConfig = deepMergeObjects(
  getDefaultAppConfig(),
  app_constant_overrides
);
