import { TestBed } from "@angular/core/testing";

import { NavStackService } from "./nav-stack.service";

describe("NavStackService", () => {
  let service: NavStackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavStackService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
