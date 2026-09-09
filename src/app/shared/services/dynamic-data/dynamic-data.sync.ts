import type { FlowTypes } from "packages/data-models";

import type { PersistedState } from "./adapters/persistence/persistence.interface";

export type IDynamicDataFlowRef = {
  flow_type: FlowTypes.FlowType;
  flow_name: string;
};

/**
 * Flows persisted locally via the dynamic data write cache but excluded from
 * server `dynamic_data` sync.
 */
export const LOCAL_ONLY_DYNAMIC_DATA_FLOWS: readonly IDynamicDataFlowRef[] = [
  // Flow names match remote-asset.types.ts constants
  { flow_type: "asset_pack", flow_name: "_assets_contents" },
  { flow_type: "data_list", flow_name: "_asset_packs" },
];

export function isLocalOnlyDynamicDataFlow(
  flow_type: FlowTypes.FlowType,
  flow_name: string
): boolean {
  return LOCAL_ONLY_DYNAMIC_DATA_FLOWS.some(
    (flow) => flow.flow_type === flow_type && flow.flow_name === flow_name
  );
}

export function omitLocalOnlyDynamicDataFlows(state: PersistedState): PersistedState {
  const syncState: PersistedState = { ...state };
  for (const { flow_type, flow_name } of LOCAL_ONLY_DYNAMIC_DATA_FLOWS) {
    const flowsByType = syncState[flow_type];
    if (!flowsByType?.[flow_name]) continue;
    const { [flow_name]: _removed, ...remainingFlows } = flowsByType;
    if (Object.keys(remainingFlows).length === 0) {
      delete syncState[flow_type];
    } else {
      syncState[flow_type] = remainingFlows;
    }
  }
  return syncState;
}
