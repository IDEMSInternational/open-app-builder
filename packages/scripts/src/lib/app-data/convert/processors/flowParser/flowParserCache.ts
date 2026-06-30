import { createHash } from "crypto";
import { FlowTypes } from "data-models";
import { FlowParserProcessor } from "./flowParser";

export function hashJson(data: unknown): string {
  const hash = createHash("md5");
  hash.update(JSON.stringify(data ?? null));
  return hash.digest("hex");
}

export function getGeneratorInputDataListName(flow: FlowTypes.GeneratorFlow): string | undefined {
  const parameterList = flow.parameter_list;
  if (!parameterList) {
    return undefined;
  }
  if (typeof parameterList === "string") {
    return undefined;
  }
  return parameterList.input_data_list;
}

/** Unique external input sources referenced by a data pipe */
export function getDataPipeInputSources(flow: FlowTypes.DataPipeFlow): string[] {
  const sources = new Set<string>();
  for (const row of flow.rows || []) {
    const { input_source } = row;
    if (input_source && typeof input_source === "string") {
      sources.add(input_source);
    }
  }
  return [...sources].sort();
}

/**
 * Build a checksum of dependency data_list rows currently available in the processor hashmap.
 * Missing dependencies return a sentinel so cache keys do not match until deps are ready.
 */
export function buildDependencyChecksum(
  processor: FlowParserProcessor,
  dependencyNames: string[]
): string {
  if (dependencyNames.length === 0) {
    return "no-deps";
  }
  const dataLists = processor.processedFlowHashmap.data_list || {};
  const parts = dependencyNames.map((name) => {
    if (!dataLists.hasOwnProperty(name)) {
      return `missing:${name}`;
    }
    return hashJson(dataLists[name]);
  });
  return hashJson(parts);
}

export function getFlowDependencyNames(flow: FlowTypes.FlowTypeWithData): string[] {
  if (flow.flow_type === "generator") {
    const listName = getGeneratorInputDataListName(flow as FlowTypes.GeneratorFlow);
    return listName ? [listName] : [];
  }
  if (flow.flow_type === "data_pipe") {
    return getDataPipeInputSources(flow as FlowTypes.DataPipeFlow);
  }
  return [];
}

function normalizeArgsList(args_list: unknown): string {
  if (typeof args_list === "string") {
    return args_list;
  }
  if (Array.isArray(args_list) && args_list.length === 1 && typeof args_list[0] === "string") {
    return args_list[0];
  }
  return JSON.stringify(args_list);
}

function normalizeGeneratorParameterList(
  parameterList: FlowTypes.GeneratorFlow["parameter_list"]
): FlowTypes.GeneratorFlow["parameter_list"] {
  if (!parameterList || typeof parameterList === "string") {
    return parameterList;
  }
  return {
    input_data_list: parameterList.input_data_list,
    output_flow_name: parameterList.output_flow_name,
    output_flow_type: parameterList.output_flow_type,
    output_flow_subtype: parameterList.output_flow_subtype,
  };
}

/**
 * Stable cache-key payload for a flow. Excludes parser-added metadata so keys match
 * before and after row processing (e.g. generator retries defer a processed clone).
 */
export function getCacheKeyPayload(flow: FlowTypes.FlowTypeWithData): unknown {
  if (flow.flow_type === "generator") {
    const generator = flow as FlowTypes.GeneratorFlow;
    return {
      flow_name: generator.flow_name,
      flow_type: generator.flow_type,
      parameter_list: normalizeGeneratorParameterList(generator.parameter_list),
      rows: generator.rows?.map(({ name, value }) => ({ name, value })),
    };
  }
  if (flow.flow_type === "data_pipe") {
    const pipe = flow as FlowTypes.DataPipeFlow;
    return {
      flow_name: pipe.flow_name,
      flow_type: pipe.flow_type,
      rows: pipe.rows?.map((row) => ({
        input_source: row.input_source,
        operation: row.operation,
        output_target: row.output_target,
        args_list: normalizeArgsList(row.args_list),
      })),
    };
  }
  return flow;
}

export function getDependencyChecksumForFlow(
  processor: FlowParserProcessor,
  flow: FlowTypes.FlowTypeWithData
): string {
  return buildDependencyChecksum(processor, getFlowDependencyNames(flow));
}

export type ICachedParentFlow = FlowTypes.FlowTypeWithData & {
  _output_flows?: Array<
    Pick<FlowTypes.FlowTypeWithData, "flow_type" | "flow_name" | "flow_subtype">
  >;
  _generated_children?: FlowTypes.FlowTypeWithData[];
};

export function stripGeneratedChildrenFromParent<T extends ICachedParentFlow>(parent: T): T {
  const { _generated_children, ...rest } = parent;
  return rest as T;
}
