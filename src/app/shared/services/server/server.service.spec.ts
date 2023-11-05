import { DeviceInfo } from "@capacitor/device";
import { ServerService } from "./server.service";

/** Minimal mock server service to metadata values for other tests */
export class MockServerService implements Partial<ServerService> {
  public ready(): boolean {
    return true;
  }
  app_user_id = "test_1234";
  device_info = {} as DeviceInfo;
}

//   TODO - testing methods for main service public methods
