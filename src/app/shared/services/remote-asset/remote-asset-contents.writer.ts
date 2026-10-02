import type { IAssetEntry, IAssetOverrideProps } from "packages/data-models";
import { deepMergeObjects } from "../../utils";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { ASSET_CONTENTS_DATA_LIST, ASSET_CONTENTS_FLUSH_INTERVAL } from "./remote-asset.types";

/**
 * An `_assets_contents` row, or an update to one. Partial because a row need not describe every
 * slot of its entry - a pack may supply only an override, and a slot update carries only its own.
 */
type IAssetContentsRow = Partial<IAssetEntry> & { id: string };

/** A row still waiting for some of the slots this attempt intends to settle for it */
interface IPartialRow {
  row: IAssetContentsRow;
  /** Slots this attempt still expects to settle before the row can be written */
  outstanding: number;
  /** Whether any slot has been integrated into the row, i.e. whether it has anything to write */
  integrated: boolean;
}

/**
 * The update integrating one slot makes to its `_assets_contents` row: that slot's own manifest
 * fields with its saved `filePath`, and nothing belonging to the entry's other slots.
 *
 * Scoped to the slot because the resume gate reads a slot's recorded checksum and `filePath` as a
 * pair describing one file on disk. Writing the whole manifest entry would hand every sibling slot
 * the new checksum while its `filePath` still pointed at a file an earlier version saved, so a
 * sibling that then failed would be recorded as current. An override would still be caught, as its
 * manifest `filePath` overwrites the local one, but a base entry carries no `filePath` in the
 * manifest - so a stale base file of unchanged size would be trusted and never re-fetched.
 */
export function buildAssetSlotUpdate(
  assetEntry: IAssetEntry,
  filePath: string,
  overrideProps?: IAssetOverrideProps
): IAssetContentsRow {
  if (overrideProps) {
    const { themeName, languageCode } = overrideProps;
    const overrideEntry = assetEntry.overrides?.[themeName]?.[languageCode];
    return {
      id: assetEntry.id,
      overrides: { [themeName]: { [languageCode]: { ...overrideEntry, filePath } } },
    };
  }
  const { overrides, ...baseFields } = assetEntry;
  return { ...baseFields, id: assetEntry.id, filePath };
}

/**
 * Accumulates `_assets_contents` updates in memory and writes them in bulk.
 *
 * Exists because integrating a pack one slot at a time costs a read-modify-write per file, which
 * for a 400-file pack is the single largest non-network cost of a download. Batching those into
 * `bulkUpsert` calls removes almost all of it.
 *
 * The subtlety is that `bulkUpsert` REPLACES a row while the per-slot path deep-MERGES into it,
 * and those are not interchangeable. `_assets_contents` is keyed by base asset id and seeded at
 * startup from the bundled core contents, so a pack row can legitimately be layered on top of a
 * core one - that is exactly what `overridesOnly` entries are for, where the base file and some
 * language variants ship in the bundle and the pack adds only the extra overrides. Writing the
 * integrated slots alone would drop the bundled base `filePath` and every override language the
 * pack does not supply. So the merge has to happen here instead, before the write.
 */
export class AssetContentsWriter {
  /** Rows whose slots have all settled, waiting to be written */
  private completed = new Map<string, IAssetContentsRow>();
  private partial = new Map<string, IPartialRow>();

  constructor(
    private dynamicDataService: DynamicDataService,
    /**
     * Snapshot of `_assets_contents` taken before this attempt wrote anything. Treated as strictly
     * read-only: it is also what the resume gate reads, and mutating it mid-attempt would corrupt
     * those decisions.
     */
    private existingContents: Record<string, IAssetEntry>,
    private flushInterval = ASSET_CONTENTS_FLUSH_INTERVAL
  ) {}

  /**
   * Declare how many slots this attempt will settle for an entry, before settling any of them.
   *
   * A row is only written once every one of them has resolved, because an archive stream delivers
   * whatever order the archive was built in - a base file and its overrides need not be adjacent.
   * Writing a row when its first slot lands would persist a half-updated row, and writing only at
   * the very end would mean an interruption discarded everything.
   */
  public expectSlots(assetEntry: IAssetEntry, slotCount: number) {
    if (slotCount <= 0) return;
    const id = assetEntry.id;
    const existing = this.partial.get(id);
    if (existing) {
      existing.outstanding += slotCount;
      return;
    }
    this.partial.set(id, {
      row: this.buildBaseRow(assetEntry),
      outstanding: slotCount,
      integrated: false,
    });
  }

  /**
   * Record the outcome of one slot. A failed slot still counts as settled: its siblings' evidence
   * is worth keeping, and leaving the failed slot exactly as the snapshot had it is precisely what
   * makes the resume gate re-fetch that one file and nothing else next time.
   */
  public settleSlot(
    assetEntry: IAssetEntry,
    outcome: { filePath?: string; overrideProps?: IAssetOverrideProps }
  ) {
    const id = assetEntry.id;
    const pending = this.partial.get(id);
    if (!pending) {
      console.warn(`[REMOTE ASSETS] Slot settled for unexpected asset entry: ${id}`);
      return;
    }
    if (outcome.filePath) {
      deepMergeObjects(
        pending.row,
        buildAssetSlotUpdate(assetEntry, outcome.filePath, outcome.overrideProps)
      );
      pending.integrated = true;
    }
    pending.outstanding -= 1;
    if (pending.outstanding <= 0) {
      this.partial.delete(id);
      // A row with nothing integrated would only restate the snapshot - or, with no snapshot row,
      // invent one describing no files at all
      if (pending.integrated) this.completed.set(id, pending.row);
    }
  }

  /** Number of settled rows not yet written, exposed for logging and tests */
  public get pendingRowCount() {
    return this.completed.size;
  }

  /** Write settled rows if enough have accumulated */
  public async flushIfDue() {
    if (this.completed.size >= this.flushInterval) {
      await this.flush();
    }
  }

  /**
   * Write every settled row.
   *
   * Also called when an attempt is cancelled or fails: those files are on disk and their rows are
   * complete, so discarding them would throw away work already paid for and force a re-download
   * of files that are sitting there.
   */
  public async flush() {
    if (this.completed.size === 0) return;
    // Copy-and-clear before awaiting, so a slot settling during the write is neither lost nor
    // written twice.
    const rows = [...this.completed.values()];
    this.completed.clear();
    await this.dynamicDataService.bulkUpsert<IAssetContentsRow>(
      "asset_pack",
      ASSET_CONTENTS_DATA_LIST,
      rows
    );
  }

  /**
   * Start a row from the pre-attempt snapshot, which is what preserves bundled keys the pack never
   * mentions. Each integrated slot is then merged over it, and nothing else from the manifest is.
   */
  private buildBaseRow(assetEntry: IAssetEntry): IAssetContentsRow {
    // Deep clone: slot updates are merged into it, and snapshot rows are frozen RxDB documents
    // shared with the resume gate.
    const existing = this.existingContents[assetEntry.id];
    return existing ? JSON.parse(JSON.stringify(existing)) : { id: assetEntry.id };
  }
}
