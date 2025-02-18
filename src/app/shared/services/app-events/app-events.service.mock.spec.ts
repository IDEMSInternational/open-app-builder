import { AppConfigService } from "../app-config/app-config.service";
import { MockAppConfigService } from "../app-config/app-config.service.mock.spec";
import { MockDbService } from "../db/db.service.mock.spec";
import { MockLocalStorageService } from "../local-storage/local-storage.service.mock.spec";
import { AppEventService } from "./app-events.service";

export class MockAppEventService extends AppEventService {
  constructor() {
    super(
      new MockDbService(),
      new MockLocalStorageService(),
      new MockAppConfigService() as any as AppConfigService
    );
  }
}
