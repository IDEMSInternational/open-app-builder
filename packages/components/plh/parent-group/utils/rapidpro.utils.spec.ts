import { rapidproUtils } from "./rapidpro.utils";
import type {
  IParent,
  IParentFromExternalSource,
  IParentInSharedData,
} from "../plh-parent-group.types";

/**
 * Call standalone tests via:
 * yarn ng test --include ../packages/components/plh/parent-group/utils/rapidpro.utils.spec.ts
 */
describe("rapidproUtils", () => {
  it("should format a parent from RapidPro correctly", () => {
    const parentFromRapidPro = {
      rapidpro_uuid: "uuid-123",
      rapidpro_fields: {
        name: "Jasper",
        age: 10,
        custom_field: "value",
      },
    } as IParentFromExternalSource;
    const parentGroupId = "group-456";
    const result = rapidproUtils.transformParentWithExternalSourceDataToLocalFormat(
      parentFromRapidPro,
      parentGroupId
    );
    expect(result).toEqual({
      id: "group-456+uuid-123",
      group_id: "group-456",
      rp_uuid: "uuid-123",
      rp_name: "Jasper",
      rp_age: 10,
      rp_custom_field: "value",
    });
  });

  it("should format a parent from app join_remote correctly", () => {
    const parentFromApp = {
      app_user_id: "app-user-123",
      auth_user_id: "auth-user-999",
      rapidpro_fields: {
        name: "Jasper",
        age: 10,
      },
    } as IParentFromExternalSource;
    const parentGroupId = "group-456";
    const result = rapidproUtils.transformParentWithExternalSourceDataToLocalFormat(
      parentFromApp,
      parentGroupId
    );
    expect(result).toEqual({
      id: "group-456+auth-user-999",
      group_id: "group-456",
      app_user_id: "app-user-123",
      auth_user_id: "auth-user-999",
      rp_name: "Jasper",
      rp_age: 10,
    });
  });

  it("should format a parent from app join_remote using app_user_id when auth_user_id is missing", () => {
    const parentFromApp = {
      app_user_id: "app-user-123",
      rapidpro_fields: {
        name: "Jasper",
        age: 10,
      },
    } as IParentFromExternalSource;
    const parentGroupId = "group-456";
    const result = rapidproUtils.transformParentWithExternalSourceDataToLocalFormat(
      parentFromApp,
      parentGroupId
    );
    expect(result).toEqual({
      id: "group-456+app-user-123",
      group_id: "group-456",
      app_user_id: "app-user-123",
      rp_name: "Jasper",
      rp_age: 10,
    });
  });

  it("should not throw when rapidpro_fields is missing", () => {
    const parentFromApp = {
      app_user_id: "app-user-123",
    } as IParentFromExternalSource;
    const parentGroupId = "group-456";
    const result = rapidproUtils.transformParentWithExternalSourceDataToLocalFormat(
      parentFromApp,
      parentGroupId
    );
    expect(result).toEqual({
      id: "group-456+app-user-123",
      group_id: "group-456",
      app_user_id: "app-user-123",
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
            rp_uuid: "uuid-1",
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
      const result = rapidproUtils.formatParentGroupDataForPush({ ...parentGroup });
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

  describe("mergeParentsArraysPreservingExternalSourceData", () => {
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
      const result = rapidproUtils.mergeParentsArraysPreservingExternalSourceData(
        existing,
        incoming
      );
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
      const result = rapidproUtils.mergeParentsArraysPreservingExternalSourceData(
        existing,
        incoming
      );
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
      const result = rapidproUtils.mergeParentsArraysPreservingExternalSourceData(
        existing,
        incoming
      );
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

    it("should merge by app_user_id and avoid duplicate appended local parent", () => {
      const existing = [
        {
          app_user_id: "593cc833-7f71-4021-8ea1-d23faa7873d1",
          rapidpro_fields: {
            gender: "woman",
            name: "Bobby",
            timestamp: "2026-04-14T14:18:08.133Z",
          },
        } as IParentInSharedData,
        {
          app_user_id: "2825e892-16f0-4a17-bee0-0dd1635852ea",
          rapidpro_fields: {
            gender: "man",
            name: "Gigi",
            timestamp: "2026-04-14T14:19:45.470Z",
          },
        } as IParentInSharedData,
      ];
      const incoming = [
        {
          id: "b3d292f6-b7ce-4096-b30e-f1dff9890718+593cc833-7f71-4021-8ea1-d23faa7873d1",
          group_id: "b3d292f6-b7ce-4096-b30e-f1dff9890718",
          app_user_id: "593cc833-7f71-4021-8ea1-d23faa7873d1",
          text: "Test 1",
        } as IParent,
      ];
      const result = rapidproUtils.mergeParentsArraysPreservingExternalSourceData(
        existing,
        incoming
      );
      expect(result).toEqual([
        {
          id: "b3d292f6-b7ce-4096-b30e-f1dff9890718+593cc833-7f71-4021-8ea1-d23faa7873d1",
          group_id: "b3d292f6-b7ce-4096-b30e-f1dff9890718",
          app_user_id: "593cc833-7f71-4021-8ea1-d23faa7873d1",
          text: "Test 1",
          rapidpro_fields: {
            gender: "woman",
            name: "Bobby",
            timestamp: "2026-04-14T14:18:08.133Z",
          },
        },
        {
          app_user_id: "2825e892-16f0-4a17-bee0-0dd1635852ea",
          rapidpro_fields: {
            gender: "man",
            name: "Gigi",
            timestamp: "2026-04-14T14:19:45.470Z",
          },
        },
      ]);
    });

    it("should merge by auth_user_id when available", () => {
      const existing = [
        {
          auth_user_id: "auth-user-42",
          app_user_id: "app-user-42",
          rapidpro_fields: { name: "Auth Parent" },
        } as IParentInSharedData,
      ];
      const incoming = [
        {
          id: "group-1+auth-user-42",
          group_id: "group-1",
          auth_user_id: "auth-user-42",
          app_user_id: "app-user-42",
          first_name: "Incoming",
        } as IParent,
      ];
      const result = rapidproUtils.mergeParentsArraysPreservingExternalSourceData(
        existing,
        incoming
      );
      expect(result).toEqual([
        {
          id: "group-1+auth-user-42",
          group_id: "group-1",
          auth_user_id: "auth-user-42",
          app_user_id: "app-user-42",
          first_name: "Incoming",
          rapidpro_fields: { name: "Auth Parent" },
        },
      ]);
    });
  });
});
