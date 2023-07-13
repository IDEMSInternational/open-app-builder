import { TestBed } from "@angular/core/testing";

import { CrashlyticsService } from "./crashlytics.service";

describe("CrashlyticsService", () => {
  let service: CrashlyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrashlyticsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
