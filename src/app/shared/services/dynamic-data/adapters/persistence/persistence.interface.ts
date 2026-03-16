import { FlowTypes } from "data-models";

export type PersistedState = {
  [flow_type in FlowTypes.FlowType]?: {
    [flow_name: string]: {
      [row_id: string]: { [key: string]: any };
    };
  };
};

export interface IPersistenceStrategy {
  /**
   * Load the full persisted state from storage
   */
  load(): Promise<PersistedState>;

  /**
   * Save the full persisted state to storage
   */
  save(state: PersistedState): Promise<void>;

  /**
   * Clear all persisted data
   */
  clear(): Promise<void>;

  /**
   * Initialize the strategy (e.g. open DB connection, check file permissions)
   */
  init(): Promise<void>;
}
