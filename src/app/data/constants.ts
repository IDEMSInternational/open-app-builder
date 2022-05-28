import { getDefaultAppConstants, IAppConstants } from "data-models";
import { environment } from "src/environments/environment";
import { deepMergeObjects } from "../shared/utils";

const app_constant_overrides = (environment.deploymentConfig as any).app_constants || {};

/** List of constants provided by data-models combined with deployment-specific overrides */
export const APP_CONSTANTS: IAppConstants = deepMergeObjects(
  getDefaultAppConstants(),
  app_constant_overrides
);
