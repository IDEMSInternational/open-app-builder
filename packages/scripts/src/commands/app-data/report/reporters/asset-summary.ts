import { FlowTypes } from "data-models";
import { IReportTable } from "../report.types";
import { isObjectLiteral, sortJsonKeys } from "shared";
import { IParsedWorkbookData } from "../../convert/types";

interface IReportData {
  path: string;
  count: number;
}

interface IAssetsSummary extends IReportTable {
  data: IReportData[];
}

/**
 * TODO
 * - Refactor all reports to have access to entire context (e.g. assets contents)
 * - Compare assets against contents
 * - Extract assets from config (e.g. android splash)
 * - Extract assets from app_config defaults (if required)
 * - Separate web and local assets
 */

/**
 * List of known valid extensions used within assets
 *
 * TODO - list of valid extensions can first be generated from asset contents , e.g.
 * ```ts
 * const extensions = [...new Set(Object.keys(assets).map(v=>v.split('.').pop()))]
 * ```
 */
const EXTENSIONS = ["jpeg", "jpg", "json", "mov", "mp3", "mp4", "png", "pdf", "svg", "wav"];

/**
 * Generate a list of all assets referenced
 *
 * NOTE - this does not account for asset post-processing where filters and overrides may
 * be applied. Follow-up reports required to identify unused/hanging assets
 * (these reports are generated as part of sync-sheets... TODO - should it be later?)
 * */
export class AssetsSummaryReport {
  private assetSummary: Record<string, number> = {};

  public async process(data: IParsedWorkbookData) {
    // HACK - check for assets within all the content of all the flows
    // Could be replaced with more fine-grained checks like example `extractTemplateAssets`
    this.checkForAssets(data);

    const summaryData: IReportData[] = Object.entries(sortJsonKeys(this.assetSummary)).map(
      ([path, count]) => ({ path, count })
    );

    const asset_summary: IAssetsSummary = {
      data: sortJsonKeys(summaryData),
      level: "info",
      title: "Assets",
      type: "table",
    };
    return { asset_summary };
  }

  private checkForAssets(v: any, logName = "") {
    if (v) {
      if (typeof v === "string") {
        if (this.isAssetPath(v)) {
          // Debugging - use logNames to understand where v originated
          // console.log(logName,v)
          this.markAsset(v);
        }
        return;
      }
      //
      if (Array.isArray(v)) {
        return v.map((el) => this.checkForAssets(el, logName));
      }
      //
      if (isObjectLiteral(v)) {
        logName += ` ${v.name || v.id || "json"}`;
        return Object.values(v).map((el) => this.checkForAssets(el, logName));
      }
    }
  }
  private markAsset(name: string) {
    this.assetSummary[name] ??= 0;
    this.assetSummary[name]++;
  }

  /**
   * Check if a string value represents a path to an asset
   * This is a simple check that to assert the string ends in a known extension,
   * e.g. `.pdf` or `.jpeg`
   * */
  private isAssetPath(value: string) {
    if (typeof value === "string") {
      const segments = value.split(".");
      // avoid single word, e.g. 'PDF'
      if (segments.length > 1) {
        const extension = segments.pop();
        if (EXTENSIONS.includes(extension.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }

  /** Example fine-grained check for assets within templates */
  private extractTemplateAssets(rows: FlowTypes.TemplateRow[]) {
    // check template row values and parameter lists for assets
    for (const { value, parameter_list } of rows) {
      this.checkForAssets(value);
      this.checkForAssets(parameter_list);
    }
  }
}
