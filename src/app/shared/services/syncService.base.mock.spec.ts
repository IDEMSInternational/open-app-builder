import { SyncServiceBase } from "./syncService.base";

export class MockSyncServiceBase extends SyncServiceBase {
  constructor(name = "MockSyncServiceBase") {
    super(name);
  }
}
