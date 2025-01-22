import { AppDataService, IAppDataCache } from "./app-data.service";
import { _wait } from "packages/shared/src/utils/async-utils";
import { MockErrorHandlerService } from "../error-handler/error-handler.service.mock.spec";
import { MockAppDataVariableService } from "./app-data-variable.service.spec";
import { ErrorHandlerService } from "../error-handler/error-handler.service";
import { AppDataVariableService } from "./app-data-variable.service";
import { HttpClient } from "@angular/common/http";
import { delay, of } from "rxjs";

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

const mockHttpClient = (responses: { [url: string]: any }): Partial<HttpClient> => ({
  get: (url: string, options) => of<any>(responses[url]).pipe(delay(50)),
});

/** Mock calls for sheets from the appData service to return test data */
export class MockAppDataService extends AppDataService {
  public appDataCache: IAppDataCache;

  // allow additional specs implementing service to provide their own data if required
  constructor(
    mockData: Partial<IAppDataCache> = {},
    /** List of url-data pairs for http client to return */
    mockHttpResponses: { [url: string]: any } = {}
  ) {
    super(
      mockHttpClient(mockHttpResponses) as HttpClient,
      new MockErrorHandlerService() as ErrorHandlerService,
      new MockAppDataVariableService() as AppDataVariableService
    );
    this.appDataCache = { ...DATA_CACHE_CLEAN, ...mockData };
    this.sheetContents = { ...DATA_CACHE_CLEAN, ...mockData };
  }
}
