import { TestBed } from "@angular/core/testing";

import { PlhParentGroupService } from "./plh-parent-group.service";

/**
 * TODO: Integrate with testing environment - e.g. Move to src?
 * Call standalone tests via (not currently working):
 * yarn ng test --include packages/components/plh/parent-group/plh-parent-group.service.spec.ts
 */
describe("PlhParentGroupService", () => {
  let service: PlhParentGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlhParentGroupService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should format a parent from RapidPro correctly", () => {
    const parentFromRapidPro = {
      rapidpro_uuid: "uuid-123",
      rapidpro_fields: {
        name: "Jasper",
        age: 10,
        custom_field: "value",
      },
      name: "Lana",
    };
    const parentGroupId = "group-456";
    const result = service["hackFormatParentFromRapidPro"](parentFromRapidPro, parentGroupId);
    expect(result).toEqual({
      id: "uuid-123",
      group_id: "group-456",
      rapidpro_uuid: "uuid-123",
      rp_name: "Jasper",
      rp_age: 10,
      rp_custom_field: "value",
      name: "Lana",
    });
  });

  describe("hackRemoveRapidProFieldsFromParentData", () => {
    it("should remove RapidPro fields from parent data", () => {
      const parentWithRapidProFields = {
        rapidpro_uuid: "uuid-789",
        name: "Parent Name",
        rp_name: "Jasper",
        rp_age: 10,
        rp_custom_field: "value",
        other_field: "keep me",
      };
      const result = service["hackRemoveRapidProFieldsFromParentData"](parentWithRapidProFields);
      expect(result).toEqual({
        name: "Parent Name",
        other_field: "keep me",
      });
    });

    it("should return parent unchanged if not from RapidPro", () => {
      const localParent = {
        id: "parent-1",
        name: "Normal Parent",
        age: 40,
      };
      const result = service["hackRemoveRapidProFieldsFromParentData"](localParent);
      expect(result).toEqual(localParent);
    });
  });
});
