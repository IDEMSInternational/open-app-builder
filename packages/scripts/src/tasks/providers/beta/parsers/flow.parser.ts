import { FlowTypes } from "data-models";

/**
 * Where a flow comes from
 * - `fixed`: synced from the deployment google drive folders, so `_source` links to its sheet
 * - `transient`: any other flow, e.g. a local json or one downloaded from a transient sheet
 */
export type IFlowSourceType = "fixed" | "transient";

export interface IFlowParserOptions {
  /** Absolute path of the flow json */
  path?: string;
  /** Defaults to `transient` */
  type?: IFlowSourceType;
}

/**
 * Base parser for flows imported into app_data. Updates `_source`, and leaves parsing the rows
 * to each flow type's parser
 */
export abstract class FlowParser {
  parse(
    flow: FlowTypes.FlowTypeWithData,
    options: IFlowParserOptions = {}
  ): FlowTypes.FlowTypeWithData {
    const rows = this.parseRows(flow.rows || [], flow);
    return { ...this.updateSource(flow, options), rows };
  }

  /** Parse the rows of a flow. The flow should not be changed */
  protected abstract parseRows(rows: any[], flow: FlowTypes.FlowTypeWithData): any[];

  /**
   * Add `path` and `type` to `_source`. A transient flow may be a copy of a fixed one, so any
   * `name` and `url` are removed, as they link to the other flow's sheet
   */
  updateSource(
    flow: FlowTypes.FlowTypeWithData,
    options: IFlowParserOptions = {}
  ): FlowTypes.FlowTypeWithData {
    const { path, type = "transient" } = options;
    const { name, url, ...rest } = flow._source || {};
    const kept = type === "transient" ? rest : { ...rest, name, url };
    // Drop unset values, so they are not written as keys
    const _source = Object.fromEntries(
      Object.entries({ ...kept, path, type }).filter(([, value]) => value !== undefined)
    ) as FlowTypes.FlowTypeBase["_source"];
    return { ...flow, _source };
  }
}
