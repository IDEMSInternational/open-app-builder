import { TestBed } from "@angular/core/testing";

import { RemoteAssetService } from "./remote-asset.service";

describe("RemoteAssetsService", () => {
  let service: RemoteAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteAssetService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
