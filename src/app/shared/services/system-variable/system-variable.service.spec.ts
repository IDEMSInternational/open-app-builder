import { TestBed } from "@angular/core/testing";

import { SystemVariableService } from "./system-variable.service";

describe("SystemVariableService", () => {
  let service: SystemVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemVariableService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
