import type { IDeploymentRuntimeConfig } from "packages/data-models";
import { Migration } from "../../migration/migration.types";
import type { DynamicDataService } from "../dynamic-data.service";

import m_20260123_native_persist_json from "./2026-01-23-native-persist-json";

export const DYNAMIC_DATA_MIGRATIONS: Migration<{
  service: DynamicDataService;
  deployment: IDeploymentRuntimeConfig;
}>[] = [m_20260123_native_persist_json];
