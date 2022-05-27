import { DEFAULT_APP_CONSTANTS, IAppConstants } from "data-models";
import { environment } from "src/environments/environment";
import { deepMergeObjects } from "../shared/utils";

const app_constant_overrides = (environment.deploymentConfig as any).app_constants || {};

/** List of constants provided by data-models combined with deployment-specific overrides */
export const APP_CONSTANTS: IAppConstants = deepMergeObjects(
  DEFAULT_APP_CONSTANTS,
  app_constant_overrides
);
