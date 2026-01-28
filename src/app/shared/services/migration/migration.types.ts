export interface Migration<T = any> {
  /**
   * Identifier for the migration. This should be unique on a per-source (service)
   * level used to register migrations
   */
  id: string;

  /**
   * Optional check to determine if this migration should run.
   * If this returns false, the migration is marked as SKIPPED and will not be re-evaluated.
   * Useful for migrations that only apply to specific configurations or data states.
   */
  preconditions?: (context: T) => Promise<boolean>;

  /**
   * The logic to execute for this migration. The migration logic should ideally be
   * idempotent, in cases where migrations may be run on multiple occasions
   * @param context The service or data object required by this migration
   */
  run(context: T): Promise<void>;
}

export interface MigrationHistoryItem {
  status: "RUN" | "SKIPPED" | "FAILED";
  timestamp: number;
}

export type MigrationHistory = { [id: string]: MigrationHistoryItem };
