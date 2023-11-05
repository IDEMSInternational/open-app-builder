import { getDefaultAppConfig, IAppConfig } from "data-models";
import { environment } from "src/environments/environment";
import { deepMergeObjects } from "../shared/utils";

/**
 * Retrive app config merged with any deployment overrides
 * Call as function to avoid breaking test environments
 *  */
export const getAppConfig = (): IAppConfig =>
  deepMergeObjects(getDefaultAppConfig(), (environment.deploymentConfig as any).app_config || {});
