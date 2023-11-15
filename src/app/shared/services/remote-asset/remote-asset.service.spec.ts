import { TestBed } from "@angular/core/testing";

import { RemoteAssetService } from "./remote-asset.service";
import { AppDataService } from "../data/app-data.service";

describe("RemoteAssetsService", () => {
  let service: RemoteAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteAssetService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("generates core asset pack from asset contents", () => {
    // TODO
  });
});
