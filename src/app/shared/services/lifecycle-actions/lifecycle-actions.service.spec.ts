import { TestBed } from "@angular/core/testing";

import { LifecycleActionsService } from "./lifecycle-actions.service";

describe("LifecycleActionsService", () => {
  let service: LifecycleActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifecycleActionsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
