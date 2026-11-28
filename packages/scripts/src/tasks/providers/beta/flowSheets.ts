import open from "open";
import { logOutput } from "../../../utils";
import { findFlowBySourcePath, findSourceFlow } from "./flows";
import { createTransientSheet, findTransientSheet, ISheetOptions, ISheetResult } from "./sheets";

/**
 * Google sheets of external deployment flows, finding the flow jsons (`flows`) to open or create
 * sheets for (`sheets`), which do not use each other
 */

/** A flow name, or a name and type in case the same name is used by multiple types */
export type IFlowRef = string | { flow_name: string; flow_type?: string };

/**
 * Open the google sheet for a flow, using the `_source.url` of its json in the external
 * deployment, or its transient sheet. If neither exists, a transient sheet is created first
 */
export async function openFlowSheet(flowName: string, options: ISheetOptions = {}) {
  const { openBrowser = true } = options;
  const { flow } = findSourceFlow(flowName, options.flowType);
  const url = flow._source?.url || findTransientSheet(flow.flow_type, flowName)?.url;
  if (!url) {
    return createFlowSheet(flowName, options);
  }
  const result: ISheetResult = { flow_name: flowName, url, created: false };
  if (openBrowser) await open(url);
  logOutput({ msg1: `Sheet: ${flowName}`, msg2: url });
  return result;
}

/**
 * Create a transient google sheet from one or more flow jsons, found by the `_source.path` of
 * their app_data copies (see `findFlowBySourcePath` and `createTransientSheet`)
 */
export async function createFlowSheet(
  flowNames: IFlowRef | IFlowRef[],
  options: ISheetOptions = {}
) {
  const refs = toFlowRefs(flowNames, options.flowType);
  if (refs.length === 0) throw new Error("At least one flow name is required");
  const flows = refs.map((ref) => findFlowBySourcePath(ref.flow_name, ref.flow_type).flow);
  return createTransientSheet(flows, options);
}

/** Flow refs with their type, without duplicates */
function toFlowRefs(flowNames: IFlowRef | IFlowRef[], flowType?: string) {
  const refs: { flow_name: string; flow_type?: string }[] = [];
  for (const ref of Array.isArray(flowNames) ? flowNames : [flowNames]) {
    const { flow_name, flow_type = flowType } = typeof ref === "string" ? { flow_name: ref } : ref;
    const isDuplicate = refs.some((r) => r.flow_name === flow_name && r.flow_type === flow_type);
    if (!isDuplicate) refs.push({ flow_name, flow_type });
  }
  return refs;
}
