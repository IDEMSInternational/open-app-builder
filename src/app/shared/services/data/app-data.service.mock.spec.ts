import { FlowTypes } from "packages/data-models";
import type { AppDataService, IAppDataCache } from "./app-data.service";
import { _wait } from "packages/shared/src/utils/async-utils";

/** Base mock data for use with any services calling mock app-data handlers */
const DATA_CACHE_CLEAN: IAppDataCache = {
  asset_pack: {},
  data_list: {},
  data_pipe: {},
  generator: {},
  global: {},
  template: {},
  tour: {},
};

/** Mock calls for sheets from the appData service to return test data */
export class MockAppDataService implements Partial<AppDataService> {
  public appDataCache: IAppDataCache;

  // allow additional specs implementing service to provide their own data if required
  constructor(mockData: Partial<IAppDataCache> = {}) {
    this.appDataCache = { ...DATA_CACHE_CLEAN, ...mockData };
  }

  public ready() {
    return true;
  }

  public async getSheet<T extends FlowTypes.FlowTypeWithData>(
    flow_type: FlowTypes.FlowType,
    flow_name: string
  ): Promise<T> {
    await _wait(50);
    return this.appDataCache[flow_type]?.[flow_name] as T;
  }
  public async getTranslationStrings(language_code: string) {
    return {};
  }
}
