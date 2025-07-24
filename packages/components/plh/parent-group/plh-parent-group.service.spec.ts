import { TestBed } from "@angular/core/testing";

import { PlhParentGroupService } from "./plh-parent-group.service";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { SharedDataService } from "src/app/feature/shared-data/shared-data.service";

/**
 * Call standalone tests via:
 * yarn ng test --include ../packages/components/plh/parent-group/plh-parent-group.service.spec.ts
 */
describe("PlhParentGroupService", () => {
  let service: PlhParentGroupService;

  let mockDynamicDataService: jasmine.SpyObj<DynamicDataService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockSharedDataService: jasmine.SpyObj<SharedDataService>;

  beforeEach(() => {
    mockDynamicDataService = jasmine.createSpyObj("DynamicDataService", [
      "query$",
      "ready",
      "remove",
      "upsert",
      "update",
    ]);

    mockAuthService = jasmine.createSpyObj("AuthService", ["ready"]);

    mockSharedDataService = jasmine.createSpyObj("SharedDataService", ["ready"]);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: DynamicDataService, useValue: mockDynamicDataService },
        { provide: SharedDataService, useValue: mockSharedDataService },
      ],
    });
    service = TestBed.inject(PlhParentGroupService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
