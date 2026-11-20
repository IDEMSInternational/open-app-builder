import { FlowTypes } from "data-models";
import type { ITranslationStrings } from "../translations/po";
import { FlowDebugLog } from "./flowDebugLog";

/**
 * Where a flow comes from
 * - `fixed`: synced from the deployment google drive folders, so `_source` links to its sheet
 * - `transient`: any other flow, e.g. a local json or one downloaded from a transient sheet
 */
export type IFlowSourceType = "fixed" | "transient";

export interface IFlowParserOptions {
  /** Path of the flow json, relative to the sheets folder it was processed from */
  path?: string;
  /** Defaults to `transient` */
  type?: IFlowSourceType;
  /** Translated strings added to `_translatedFields` (see `assignTranslatedFields`) */
  translations?: ITranslationStrings;
  /**
   * Warnings found before parsing (e.g. a duplicate flow json, see `readFlowFiles`) that were
   * already logged to the console, so are only added to `_debug.warnings`
   */
  loggedWarnings?: string[];
}

/**
 * Base parser for flows imported into app_data. Updates `_source`, and leaves parsing the rows
 * to each flow type's parser. Errors and warnings found while parsing are written to `_debug`
 * (see `FlowDebugLog`)
 */
export abstract class FlowParser {
  parse(
    flow: FlowTypes.FlowTypeWithData,
    options: IFlowParserOptions = {}
  ): FlowTypes.FlowTypeWithData {
    const log = new FlowDebugLog(flow.flow_name, options.loggedWarnings);
    return log.applyTo(this.parseFlow(flow, options, log));
  }

  /** Parse a flow, recording any errors and warnings to the log */
  protected parseFlow(
    flow: FlowTypes.FlowTypeWithData,
    options: IFlowParserOptions,
    log: FlowDebugLog
  ): FlowTypes.FlowTypeWithData {
    const rows = this.parseRows(flow.rows || [], flow, options, log);
    return { ...this.updateSource(flow, options), rows };
  }

  /** Parse the rows of a flow. The flow should not be changed */
  protected abstract parseRows(
    rows: any[],
    flow: FlowTypes.FlowTypeWithData,
    options: IFlowParserOptions,
    log: FlowDebugLog
  ): any[];

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
