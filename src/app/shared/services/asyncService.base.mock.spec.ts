import { AsyncServiceBase } from "./asyncService.base";

export class MockAsyncServiceBase extends AsyncServiceBase {
  constructor(name = "MockAsyncServiceBase") {
    super(name);
  }
}
