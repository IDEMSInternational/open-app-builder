import {
  IParent,
  IParentFromExternalSource,
  IParentGroup,
  IParentInSharedData,
} from "../plh-parent-group.types";

/**
 * Helper functions to support external-source integration (e.g. RapidPro or app join_remote payloads):
 * adding parents to shared data and pulling this data into local parent group dynamic data.
 * These util methods are separated here for clarity.
 */

/**
 * Format parent group data for push to shared data by removing RapidPro fields
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

function parentHasExternalSourceData(
  parent: IParentInSharedData
): parent is IParentFromExternalSource {
  const sharedDataParent = parent as IParentFromExternalSource;
  return sharedDataParent.rapidpro_uuid !== undefined || sharedDataParent.app_user_id !== undefined;
}

/**
 * Convert parent data added to shared data from RapidPro/app join into local parent data format.
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
 * @param parent - Parent data from RapidPro/app join
 * @param parentGroupId - ID of the parent group
 * @returns Formatted parent data
 */
function transformParentWithExternalSourceDataToLocalFormat(
  parent: IParentFromExternalSource,
  parentGroupId: string
): IParent {
  const { rapidpro_uuid, app_user_id, auth_user_id, rapidpro_fields, ...rest } = parent;
  const normalizedRapidproFields =
    rapidpro_fields && typeof rapidpro_fields === "object" ? rapidpro_fields : {};
  const parsedExternalFields = Object.fromEntries(
    Object.entries(normalizedRapidproFields).map(([key, value]) => [`rp_${key}`, value])
  );

  const uniqueId = rapidpro_uuid || auth_user_id || app_user_id || (rest as IParent).id;
  const localParentId = `${parentGroupId}+${uniqueId}`;

  return {
    ...rest,
    ...parsedExternalFields,
    // Use a combined id of the parent group id and source identifier to ensure uniqueness
    id: localParentId,
    group_id: parentGroupId,
    ...(rapidpro_uuid ? { rp_uuid: rapidpro_uuid } : {}),
    ...(app_user_id ? { app_user_id } : {}),
    ...(auth_user_id ? { auth_user_id } : {}),
  } as IParent;
}

/**
 * Merge two arrays of parents, ensuring that parents representing the same entity are merged,
 * and any external-source fields added to shared data are preserved.
 * - For each incoming parent:
 *   - If an existing parent matches by `id`, or by `rapidpro_uuid` (where `rapidpro_uuid === incoming.id`), merge fields:
 *     - Use the incoming parent as the base, but add `rapidpro_fields` and `rapidpro_uuid` from the existing parent if present.
 *   - If no match, use the incoming parent as-is.
 * - After merging, add any existing parent with a `rapidpro_uuid` (and no `id`) that was not already merged.
 * This ensures no duplicates and preserves external-source data.
 */
function mergeParentsArraysPreservingExternalSourceData(
  existing: IParentInSharedData[],
  incoming: IParent[]
): IParentInSharedData[] {
  const matchedIncoming = new Set<any>();
  const merged: any[] = [];

  // 1. For each parent in existing, merge with matching incoming (by id or rapidpro_uuid), preserving order
  for (const existingParent of existing) {
    const incomingParent = findMatchingIncomingParent(existingParent, incoming);
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

/**
 * Find a matching incoming parent for an existing parent, by id or rapidpro_uuid.
 * Returns the matching incoming parent or undefined if not found.
 */
function findMatchingIncomingParent(
  existingParent: IParentInSharedData,
  incoming: IParent[]
): IParent | undefined {
  const incomingById = new Map(incoming.filter((p) => p.id).map((p) => [p.id, p]));
  const incomingByRapidproUuid = new Map(
    incoming.filter((p) => p.rp_uuid).map((p) => [p.rp_uuid, p])
  );
  const incomingByAppUserId = new Map(
    incoming.filter((p) => p.app_user_id).map((p) => [p.app_user_id, p])
  );
  const incomingByAuthUserId = new Map(
    incoming.filter((p) => p.auth_user_id).map((p) => [p.auth_user_id, p])
  );
  // Try to match by id
  if ((existingParent as IParent).id) {
    const matchById = incomingById.get((existingParent as IParent).id!);
    if (matchById) return matchById;
  }
  // Try to match by rapidpro_uuid
  if (existingParent.rapidpro_uuid) {
    const matchById = incomingById.get(existingParent.rapidpro_uuid);
    if (matchById) return matchById;
    const matchByRapidproUuid = incomingByRapidproUuid.get(existingParent.rapidpro_uuid);
    if (matchByRapidproUuid) return matchByRapidproUuid;
  }
  // Try to match by app/auth identifiers from app join_remote records
  if (existingParent.auth_user_id) {
    const matchByAuthUserId = incomingByAuthUserId.get(existingParent.auth_user_id);
    if (matchByAuthUserId) return matchByAuthUserId;
  }
  if (existingParent.app_user_id) {
    const matchByAppUserId = incomingByAppUserId.get(existingParent.app_user_id);
    if (matchByAppUserId) return matchByAppUserId;
  }
  return undefined;
}

export const rapidproUtils = {
  formatParentGroupDataForPush,
  parentHasExternalSourceData,
  transformParentWithExternalSourceDataToLocalFormat,
  mergeParentsArraysPreservingExternalSourceData,
};
