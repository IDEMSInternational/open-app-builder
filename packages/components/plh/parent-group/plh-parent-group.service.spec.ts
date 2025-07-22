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

  describe("formatParentGroupDataForPush", () => {
    it("should remove protected fields and RapidPro fields from parent group and parents", () => {
      const parentGroup: any = {
        _access_code: "secret",
        id: "group-1",
        name: "Test Group",
        text: "Some text",
        archived: false,
        hidden: false,
        parents: [
          {
            rapidpro_uuid: "uuid-1",
            rp_name: "RapidPro Name",
            rp_age: 30,
            rp_custom_field: "should be removed",
            name: "Parent1",
            other_field: "keep me",
            id: "parent-1",
            group_id: "group-1",
          },
          {
            id: "parent-2",
            group_id: "group-1",
            name: "Parent2",
            age: "40",
            _internal: "should be removed",
          },
        ],
        _internal: "should be removed",
        cofacilitator_id: "cofac-1",
      };
      const result = service["formatParentGroupDataForPush"]({ ...parentGroup });
      expect(result).toEqual({
        id: "group-1",
        name: "Test Group",
        text: "Some text",
        archived: false,
        hidden: false,
        parents: [
          {
            name: "Parent1",
            other_field: "keep me",
            id: "parent-1",
            group_id: "group-1",
          },
          {
            id: "parent-2",
            group_id: "group-1",
            name: "Parent2",
            age: "40",
          },
        ],
        cofacilitator_id: "cofac-1",
      });
    });
  });

  describe("hackMergeParentsArrays", () => {
    it("should merge parents arrays correctly, preserving rapidpro_fields, rapidpro_uuid, and rapidpro_uuid-only parents", () => {
      const existing = [
        {
          id: "parent-1",
          name: "Existing Parent 1",
          rapidpro_fields: { foo: "bar" },
          rapidpro_uuid: "uuid-1",
        },
        {
          id: "parent-2",
          name: "Existing Parent 2",
        },
        {
          rapidpro_uuid: "uuid-3",
          rapidpro_fields: { rp: "rapid" },
        },
      ];
      const incoming = [
        {
          id: "parent-1",
          name: "Incoming Parent 1",
        },
        {
          id: "parent-2",
          name: "Incoming Parent 2",
        },
        {
          id: "parent-4",
          name: "Incoming Parent 4",
        },
      ];
      const result = service["hackMergeParentsArrays"](existing, incoming);
      expect(result).toEqual([
        {
          id: "parent-1",
          name: "Incoming Parent 1",
          rapidpro_fields: { foo: "bar" },
          rapidpro_uuid: "uuid-1",
        },
        {
          id: "parent-2",
          name: "Incoming Parent 2",
        },
        {
          id: "parent-4",
          name: "Incoming Parent 4",
        },
        {
          rapidpro_uuid: "uuid-3",
          rapidpro_fields: { rp: "rapid" },
        },
      ]);
    });
  });
});
