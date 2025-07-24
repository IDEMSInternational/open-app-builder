import {
  IParent,
  IParentFromRapidPro,
  IParentGroup,
  IParentInSharedData,
} from "../plh-parent-group.types";

/**
 * Helper functions to support RapidPro integration: namely, adding parents via the RapidPro API to shared data,
 * and pulling this data into the local parent group dynamicdata.
 * These util methods are seperated here for clarity, but the RapidPro integration is quite stringly coupled with the service code,
 * although not all deployments using parent group functionality will necessarilyintegrate with RapidPro.
 */

/**
 * Format parent group data for push to shared data by removing and RapidPro fields
 */
function formatParentGroupDataForPush(parentGroup: IParentGroup): IParentGroup {
  // Remove any field whose key starts with "rp_" (e.g. "rp_access_code", "rp_uuid")
  parentGroup = Object.fromEntries(
    Object.entries(parentGroup).filter(([key]) => !key.startsWith("rp_"))
  ) as IParentGroup;

  parentGroup.parents = parentGroup.parents.map((parent) =>
    removeRapidProFieldsFromParentData(parent as IParent)
  );

  return parentGroup;
}

/**
 * Format parent data for upload to shared data by removing RapidPro fields,
 * since these are managed by RapidPro in shared data
 */
function removeRapidProFieldsFromParentData(parent: IParent): IParent {
  // Remove any field whose key starts with "rp_" (e.g. "rp_uuid", "rp_access_code")
  const filtered = Object.fromEntries(
    Object.entries(parent).filter(([key, _]) => !key.startsWith("rp_"))
  );
  return filtered as IParent;
}

function parentHasRapidProData(parent: IParentInSharedData): parent is IParentFromRapidPro {
  return (parent as IParentFromRapidPro).rapidpro_uuid !== undefined;
}

/**
 * Convert parent data added to shared data from RapidPro into local parent data format
 *
 * Example input:
 * ```
 * {
 *   rapidpro_uuid: "uuid-123",
 *   rapidpro_fields: {
 *     name: "Jasper",
 *     age: 10,
 *     custom_field: "value",
 *   },
 * }
 * ```
 *
 * Example output:
 * ```
 * {
 *   id: "uuid-123",
 *   group_id: "group-456",
 *   rp_uuid: "uuid-123",
 *   rp_name: "Jasper",
 *   rp_age: 10,
 *   rp_custom_field: "value",
 * }
 * ```
 *
 * @param parent - Parent data from RapidPro
 * @param parentGroupId - ID of the parent group
 * @returns Formatted parent data
 */
function transformParentWithRapidProDataToLocalFormat(
  parent: IParentFromRapidPro,
  parentGroupId: string
): IParent {
  const { rapidpro_uuid, rapidpro_fields, ...rest } = parent;
  const parsedRapidProFields = Object.fromEntries(
    Object.entries(rapidpro_fields).map(([key, value]) => [`rp_${key}`, value])
  );
  return {
    ...rest,
    ...parsedRapidProFields,
    id: rapidpro_uuid,
    group_id: parentGroupId,
    rp_uuid: rapidpro_uuid,
  } as IParent;
}

/**
 * Merge two arrays of parents, ensuring that parents representing the same entity are merged,
 * and any RapidPro fields added to the shared data are preserved.
 * - For each incoming parent:
 *   - If an existing parent matches by `id`, or by `rapidpro_uuid` (where `rapidpro_uuid === incoming.id`), merge fields:
 *     - Use the incoming parent as the base, but add `rapidpro_fields` and `rapidpro_uuid` from the existing parent if present.
 *   - If no match, use the incoming parent as-is.
 * - After merging, add any existing parent with a `rapidpro_uuid` (and no `id`) that was not already merged.
 * This ensures no duplicates and preserves RapidPro data.
 */
function mergeParentsArraysPreservingRapidProData(
  existing: IParentInSharedData[],
  incoming: IParent[]
): IParentInSharedData[] {
  const incomingById = new Map(incoming.filter((p) => p.id).map((p) => [p.id, p]));
  const incomingByRapidproUuid = new Map(
    incoming.filter((p) => p.rp_uuid).map((p) => [p.rp_uuid, p])
  );
  const matchedIncoming = new Set<any>();
  const merged: any[] = [];

  // 1. For each parent in existing, merge with matching incoming (by id or rapidpro_uuid), preserving order
  for (const existingParent of existing) {
    let incomingParent = (existingParent as IParent).id
      ? incomingById.get((existingParent as IParent).id)
      : undefined;
    if (!incomingParent && existingParent.rapidpro_uuid) {
      incomingParent =
        incomingById.get(existingParent.rapidpro_uuid) ||
        incomingByRapidproUuid.get(existingParent.rapidpro_uuid);
    }
    let mergedParent: IParentInSharedData;
    if (incomingParent) {
      mergedParent = { ...incomingParent };
      // Preserve rapidpro_fields and rapidpro_uuid from existing if present
      if (existingParent.rapidpro_fields)
        mergedParent.rapidpro_fields = existingParent.rapidpro_fields;
      if (existingParent.rapidpro_uuid) mergedParent.rapidpro_uuid = existingParent.rapidpro_uuid;
      matchedIncoming.add(incomingParent);
    } else {
      mergedParent = { ...existingParent };
    }
    merged.push(mergedParent);
  }

  // 2. Append any incoming parents not matched to the end
  for (const incomingParent of incoming) {
    if (!matchedIncoming.has(incomingParent)) {
      merged.push({ ...incomingParent });
    }
  }

  return merged;
}

export const rapidproUtils = {
  formatParentGroupDataForPush,
  parentHasRapidProData,
  transformParentWithRapidProDataToLocalFormat,
  mergeParentsArraysPreservingRapidProData,
};
