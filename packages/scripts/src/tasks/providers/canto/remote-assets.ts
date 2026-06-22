/**
 * Match Canto manifest entries against remote asset pack conditions.
 *
 * Only `custom_field` leaf conditions are implemented today. To support additional
 * condition types, add a case to `matchesRemoteAssetCondition` below (and the
 * corresponding type in `data-models/deployment.model.ts`).
 */
import type { ICantoRemoteAssetPack, ICantoRemoteAssetPackCondition } from "data-models";
import { logWarning } from "../../../utils";
import type { CantoManifest } from "./types";

type CantoManifestEntry = CantoManifest[0];

export interface ICantoRemoteAssetMatchContext {
  /** Canto source folder id, used by path-based condition types */
  folderId: string;
}

export function getCantoCustomFieldValue(
  file: CantoManifestEntry,
  fieldName: string
): string | null | undefined {
  const value = file.additional?.[fieldName];
  if (Array.isArray(value)) {
    return value[0] ?? undefined;
  }
  return value ?? undefined;
}

function matchesCustomFieldCondition(
  file: CantoManifestEntry,
  condition: Extract<ICantoRemoteAssetPackCondition, { type: "custom_field" }>
): boolean {
  const fieldValue = file.additional?.[condition.field];
  if (fieldValue === undefined || fieldValue === null) {
    return false;
  }
  if (Array.isArray(fieldValue)) {
    return fieldValue.includes(condition.value);
  }
  return fieldValue === condition.value;
}

function assertUnreachableCondition(condition: never): never {
  throw new Error(
    `Unsupported Canto remote asset condition type: ${(condition as { type: string }).type}`
  );
}

export function matchesRemoteAssetCondition(
  file: CantoManifestEntry,
  condition: ICantoRemoteAssetPackCondition,
  _context: ICantoRemoteAssetMatchContext
): boolean {
  // Add new leaf condition types here as they are introduced in deployment config
  switch (condition.type) {
    case "custom_field":
      return matchesCustomFieldCondition(file, condition);
    case "and":
      return condition.conditions.every((nestedCondition) =>
        matchesRemoteAssetCondition(file, nestedCondition, _context)
      );
    case "or":
      return condition.conditions.some((nestedCondition) =>
        matchesRemoteAssetCondition(file, nestedCondition, _context)
      );
    default:
      return assertUnreachableCondition(condition);
  }
}

export function findMatchingRemotePack(
  file: CantoManifestEntry,
  remotePacks: ICantoRemoteAssetPack[],
  context: ICantoRemoteAssetMatchContext
): ICantoRemoteAssetPack | undefined {
  const matches = remotePacks.filter((pack) =>
    matchesRemoteAssetCondition(file, pack.condition, context)
  );
  if (matches.length > 1) {
    logWarning({
      msg1: `Canto asset "${file.name}" matches multiple remote asset packs`,
      msg2: `Using "${matches[0].name}". Matched: ${matches.map((pack) => pack.name).join(", ")}`,
    });
  }
  return matches[0];
}
