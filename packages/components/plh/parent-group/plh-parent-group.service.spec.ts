import { TestBed } from "@angular/core/testing";

import { PlhParentGroupService } from "./plh-parent-group.service";

describe("PlhParentGroupService", () => {
  let service: PlhParentGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlhParentGroupService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
