import { DEFAULT_CONSTANTS } from "data-models";
import { environment } from "src/environments/environment";

const app_constant_overrides = (environment.deploymentConfig as any).app_constants || {};

/** List of constants provided by data-models combined with deployment-specific overrides */
export const APP_CONSTANTS: typeof DEFAULT_CONSTANTS = {
  ...DEFAULT_CONSTANTS,
  ...app_constant_overrides,
};
