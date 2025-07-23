import { TestBed } from "@angular/core/testing";

import { PlhParentGroupService } from "./plh-parent-group.service";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { SharedDataService } from "src/app/feature/shared-data/shared-data.service";
import type { IParent, IParentFromRapidPro, IParentInSharedData } from "./parent-group.types";

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

  it("should format a parent from RapidPro correctly", () => {
    const parentFromRapidPro = {
      rapidpro_uuid: "uuid-123",
      rapidpro_fields: {
        name: "Jasper",
        age: 10,
        custom_field: "value",
      },
    } as IParentFromRapidPro;
    const parentGroupId = "group-456";
    const result = service["hackFormatParentFromRapidPro"](parentFromRapidPro, parentGroupId);
    expect(result).toEqual({
      id: "uuid-123",
      group_id: "group-456",
      rapidpro_uuid: "uuid-123",
      rp_name: "Jasper",
      rp_age: 10,
      rp_custom_field: "value",
    });
  });

  describe("formatParentGroupDataForPush", () => {
    it("should remove protected fields and RapidPro fields from parent group and parents", () => {
      const parentGroup: any = {
        rp_access_code: "secret",
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
          },
        ],
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
    it("should merge parents arrays correctly, preserving rapidpro_fields, rapidpro_uuid, and rapidpro_uuid-only parents, and preserve order of existing with new at end", () => {
      const existing = [
        {
          id: "parent-1",
          group_id: "group-1",
          first_name: "Existing Parent 1",
          rapidpro_fields: { foo: "bar" },
          rapidpro_uuid: "uuid-1",
        } as IParentInSharedData,
        {
          id: "parent-2",
          group_id: "group-1",
          first_name: "Existing Parent 2",
        } as IParentInSharedData,
        {
          rapidpro_uuid: "uuid-3",
          rapidpro_fields: { rp: "rapid" },
        } as IParentInSharedData,
      ];
      const incoming = [
        {
          id: "parent-2",
          group_id: "group-1",
          first_name: "Incoming Parent 2",
        } as IParent,
        {
          id: "parent-4",
          group_id: "group-1",
          first_name: "Incoming Parent 4",
        } as IParent,
        {
          id: "parent-1",
          group_id: "group-1",
          first_name: "Incoming Parent 1",
        } as IParent,
      ];
      const result = service["hackMergeParentsArrays"](existing, incoming);
      expect(result).toEqual([
        {
          id: "parent-1",
          group_id: "group-1",
          first_name: "Incoming Parent 1",
          rapidpro_fields: { foo: "bar" },
          rapidpro_uuid: "uuid-1",
        },
        {
          id: "parent-2",
          group_id: "group-1",
          first_name: "Incoming Parent 2",
        },
        {
          rapidpro_uuid: "uuid-3",
          rapidpro_fields: { rp: "rapid" },
        },
        {
          id: "parent-4",
          group_id: "group-1",
          first_name: "Incoming Parent 4",
        },
      ]);
    });

    it("should append new incoming parents to the end, preserving order of existing", () => {
      const existing = [
        { id: "a", group_id: "g", first_name: "A" } as IParentInSharedData,
        { id: "b", group_id: "g", first_name: "B" } as IParentInSharedData,
      ];
      const incoming = [
        { id: "b", group_id: "g", first_name: "B2" } as IParent,
        { id: "c", group_id: "g", first_name: "C" } as IParent,
        { id: "a", group_id: "g", first_name: "A2" } as IParent,
        { id: "d", group_id: "g", first_name: "D" } as IParent,
      ];
      const result = service["hackMergeParentsArrays"](existing, incoming);
      expect(result).toEqual([
        { id: "a", group_id: "g", first_name: "A2" },
        { id: "b", group_id: "g", first_name: "B2" },
        { id: "c", group_id: "g", first_name: "C" },
        { id: "d", group_id: "g", first_name: "D" },
      ]);
    });

    it("should merge by rapidpro_uuid when incoming id matches existing rapidpro_uuid", () => {
      const existing = [
        {
          rapidpro_uuid: "uuid-10",
          rapidpro_fields: { foo: "bar10" },
          group_id: "group-10",
          first_name: "Existing RapidPro Parent 10",
        } as IParentInSharedData,
        {
          id: "parent-20",
          group_id: "group-10",
          first_name: "Existing Parent 20",
        } as IParentInSharedData,
      ];
      const incoming = [
        {
          id: "uuid-10",
          group_id: "group-10",
          first_name: "Incoming Parent 10",
        } as IParent,
        {
          id: "parent-20",
          group_id: "group-10",
          first_name: "Incoming Parent 20",
        } as IParent,
      ];
      const result = service["hackMergeParentsArrays"](existing, incoming);
      expect(result).toEqual([
        {
          id: "uuid-10",
          group_id: "group-10",
          first_name: "Incoming Parent 10",
          rapidpro_fields: { foo: "bar10" },
          rapidpro_uuid: "uuid-10",
        },
        {
          id: "parent-20",
          group_id: "group-10",
          first_name: "Incoming Parent 20",
        },
      ]);
    });
  });
});
