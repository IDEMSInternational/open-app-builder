import { FlowTypes } from "data-models";
import { arrayToHashmap, Logger } from "../../../../utils";

/**
 * Check all flows for specified overrides and link to override_target row where exists
 **/
export function assignFlowOverrides(flows: FlowTypes.FlowTypeWithData[]) {
  const flowsByName = arrayToHashmap(flows, "flow_name");
  for (const flow of flows) {
    const { override_target, override_condition, flow_name } = flow;
    if (override_target) {
      if (!flowsByName[override_target]) {
        Logger.warning({
          msg1: `Override target does not exist: ${override_target}`,
          msg2: flow_name,
        });
      } else {
        if (!flowsByName[override_target]._overrides) {
          flowsByName[override_target]._overrides = {};
        }
        flowsByName[override_target]._overrides[flow_name] = override_condition;
      }
    }
  }
  return Object.values(flowsByName);
}
