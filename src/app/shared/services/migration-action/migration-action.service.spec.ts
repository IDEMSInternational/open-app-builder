import { TestBed } from "@angular/core/testing";

import { MigrationActionService } from "./migration-action.service";

describe("MigrationActionService", () => {
  let service: MigrationActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MigrationActionService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
